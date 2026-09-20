import { env, isPayPalConfigured, assertConfigured } from "@/lib/env";

/**
 * Thin server-side client over the PayPal Orders v2 REST API.
 *
 * We use the REST endpoints directly (OAuth2 client-credentials → create →
 * capture) rather than a heavyweight SDK so the integration is transparent and
 * version-stable. To swap to the official `@paypal/paypal-server-sdk`, replace
 * the bodies of `createOrder` / `captureOrder` - the call sites won't change.
 *
 * The client secret is read here and NEVER reaches the browser.
 */

const API_BASE =
  env.paypalEnv === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

function ensureConfigured() {
  assertConfigured(isPayPalConfigured, "PayPal", [
    "NEXT_PUBLIC_PAYPAL_CLIENT_ID",
    "PAYPAL_CLIENT_SECRET",
  ]);
}

async function getAccessToken(): Promise<string> {
  ensureConfigured();
  const auth = Buffer.from(
    `${env.paypalClientId}:${env.paypalSecret}`,
  ).toString("base64");

  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal auth failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export interface PayPalLineItem {
  name: string;
  /** Fixed-2-decimal string, e.g. "24.00". */
  unitAmount: string;
  quantity: number;
  sku?: string;
}

export interface CreateOrderInput {
  /** Fixed-2-decimal total string, server-computed. */
  totalValue: string;
  currency: string;
  items: PayPalLineItem[];
  referenceId?: string;
}

export interface CreatedOrder {
  id: string;
  status: string;
}

export async function createOrder(
  input: CreateOrderInput,
): Promise<CreatedOrder> {
  const token = await getAccessToken();

  const itemTotal = input.totalValue;
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: input.referenceId ?? "default",
        amount: {
          currency_code: input.currency,
          value: input.totalValue,
          breakdown: {
            item_total: { currency_code: input.currency, value: itemTotal },
          },
        },
        items: input.items.map((i) => ({
          name: i.name.slice(0, 127),
          quantity: String(i.quantity),
          unit_amount: { currency_code: input.currency, value: i.unitAmount },
          sku: i.sku?.slice(0, 127),
          category: "DIGITAL_GOODS",
        })),
      },
    ],
  };

  const res = await fetch(`${API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal create-order failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as { id: string; status: string };
  return { id: data.id, status: data.status };
}

export interface CaptureResult {
  status: string;
  captureId?: string;
  /** Captured gross amount as fixed-2-decimal string. */
  capturedValue?: string;
  currency?: string;
  payerEmail?: string;
  payerName?: string;
}

export async function captureOrder(
  paypalOrderId: string,
): Promise<CaptureResult> {
  const token = await getAccessToken();

  const res = await fetch(
    `${API_BASE}/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal capture failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as any;
  const capture = data?.purchase_units?.[0]?.payments?.captures?.[0];
  const payer = data?.payer;

  return {
    status: data?.status ?? "UNKNOWN",
    captureId: capture?.id,
    capturedValue: capture?.amount?.value,
    currency: capture?.amount?.currency_code,
    payerEmail: payer?.email_address,
    payerName: payer?.name
      ? `${payer.name.given_name ?? ""} ${payer.name.surname ?? ""}`.trim()
      : undefined,
  };
}
