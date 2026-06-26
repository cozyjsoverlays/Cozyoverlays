"use client";

import { useEffect, useState } from "react";

interface StarterPackPopupProps {
  open: boolean;
  onClose: () => void;
  /** Subscribe handler — throws on failure. */
  onSubmit: (email: string) => Promise<void>;
}

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Cozy Starter Pack email-capture modal. Self-contained warm/cream styling
 * (intentionally distinct from the dark site theme — this is the brand
 * lead-magnet look). 100% client-side.
 */
export function StarterPackPopup({ open, onClose, onSubmit }: StarterPackPopupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (status === "submitting") return;
    if (!EMAIL_RE.test(email.trim())) {
      setError("That email doesn't look right — mind checking it?");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      await onSubmit(email.trim());
      setStatus("success");
    } catch {
      setError("Something went wrong on our end. Try once more?");
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Nunito:wght@400;600;700;800&display=swap');
        .cz-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(43,28,42,.55);backdrop-filter:blur(4px);animation:cz-fade 220ms ease-out;}
        .cz-card{position:relative;width:100%;max-width:420px;background:#FDF7F0;border-radius:24px;box-shadow:0 24px 60px -12px rgba(59,43,58,.45);overflow:hidden;font-family:'Nunito',system-ui,sans-serif;color:#3B2B3A;animation:cz-pop 260ms cubic-bezier(.34,1.56,.64,1);}
        .cz-dusk{height:92px;background:linear-gradient(115deg,#6B4E7A 0%,#C98BA0 52%,#E9B872 100%);position:relative;}
        .cz-thumb{position:absolute;left:50%;bottom:-38px;transform:translateX(-50%);width:168px;height:96px;border-radius:14px;background:#2E2336;border:3px solid #FDF7F0;box-shadow:0 10px 24px -8px rgba(46,35,54,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;overflow:hidden;}
        .cz-glow{position:absolute;left:50%;bottom:-10px;transform:translateX(-50%);width:150px;height:150px;border-radius:50%;background:radial-gradient(circle,rgba(233,162,59,.55) 0%,rgba(233,162,59,0) 70%);animation:cz-pulse 3.2s ease-in-out infinite;pointer-events:none;}
        .cz-cam{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#C98BA0,#E9B872);box-shadow:0 0 0 3px rgba(253,247,240,.18);}
        .cz-soon{font-family:'Fraunces',serif;color:#FDF7F0;font-size:12px;letter-spacing:.5px;opacity:.95;}
        .cz-chips{display:flex;gap:4px;}
        .cz-chip{width:22px;height:7px;border-radius:4px;background:rgba(253,247,240,.32);}
        .cz-body{padding:54px 30px 28px;text-align:center;}
        .cz-eyebrow{font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#B07A57;}
        .cz-title{font-family:'Fraunces',serif;font-weight:600;font-size:27px;line-height:1.15;margin:8px 0 10px;}
        .cz-title span{color:#B05A6E;}
        .cz-sub{font-size:15px;line-height:1.5;color:#6B5A66;margin-bottom:20px;}
        .cz-field{display:flex;flex-direction:column;gap:10px;}
        .cz-input{width:100%;box-sizing:border-box;padding:14px 16px;font-size:15px;font-family:inherit;border:1.5px solid #E7D8CB;border-radius:14px;background:#FFFCF8;color:#3B2B3A;outline:none;transition:border-color .15s,box-shadow .15s;}
        .cz-input:focus{border-color:#C98BA0;box-shadow:0 0 0 4px rgba(201,139,160,.18);}
        .cz-btn{width:100%;padding:14px 16px;font-size:16px;font-weight:800;font-family:inherit;border:none;border-radius:14px;cursor:pointer;background:linear-gradient(135deg,#E9A23B,#E08A2E);color:#fff8ee;box-shadow:0 8px 18px -6px rgba(224,138,46,.7);transition:transform .12s,box-shadow .12s,filter .12s;}
        .cz-btn:hover{transform:translateY(-1px);filter:brightness(1.04);}
        .cz-btn:active{transform:translateY(0);}
        .cz-btn:disabled{opacity:.65;cursor:default;transform:none;}
        .cz-trust{margin-top:14px;font-size:12.5px;color:#8A7A85;}
        .cz-dot{color:#7C9B7A;}
        .cz-err{color:#B05A6E;font-size:13px;margin-top:4px;font-weight:600;}
        .cz-close{position:absolute;top:12px;right:12px;z-index:2;width:32px;height:32px;border-radius:50%;border:none;cursor:pointer;background:rgba(253,247,240,.85);color:#6B4E7A;font-size:18px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background .15s;}
        .cz-close:hover{background:#fff;}
        .cz-later{margin-top:14px;background:none;border:none;cursor:pointer;font-family:inherit;font-size:13px;color:#A99AA3;text-decoration:underline;}
        .cz-success{padding:50px 30px 36px;text-align:center;}
        .cz-success .cz-spark{font-size:34px;}
        @keyframes cz-fade{from{opacity:0;}to{opacity:1;}}
        @keyframes cz-pop{from{opacity:0;transform:translateY(14px) scale(.96);}to{opacity:1;transform:none;}}
        @keyframes cz-pulse{0%,100%{opacity:.5;transform:translateX(-50%) scale(.9);}50%{opacity:1;transform:translateX(-50%) scale(1.08);}}
        @media (prefers-reduced-motion: reduce){.cz-overlay,.cz-card,.cz-glow{animation:none !important;}}
      `}</style>

      <div
        className="cz-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Free Cozy Starter Pack"
      >
        <div className="cz-card" onClick={(e) => e.stopPropagation()}>
          <button className="cz-close" onClick={onClose} aria-label="Close">
            ×
          </button>

          {status === "success" ? (
            <div className="cz-success">
              <div className="cz-spark">✦</div>
              <h2 className="cz-title">Check your inbox</h2>
              <p className="cz-sub" style={{ marginBottom: 0 }}>
                Your Cozy Starter Pack is on its way. If it&apos;s hiding, peek in
                promotions or spam.
              </p>
              <button className="cz-btn" style={{ marginTop: 22 }} onClick={onClose}>
                Back to the cozy stuff
              </button>
            </div>
          ) : (
            <>
              <div className="cz-dusk">
                <div className="cz-glow" />
                <div className="cz-thumb">
                  <div className="cz-cam" />
                  <div className="cz-soon">starting soon ♡</div>
                  <div className="cz-chips">
                    <div className="cz-chip" />
                    <div className="cz-chip" />
                    <div className="cz-chip" />
                  </div>
                </div>
              </div>

              <div className="cz-body">
                <div className="cz-eyebrow">Free overlay drop</div>
                <h2 className="cz-title">
                  CozyJS Studio has a <span>gift</span> for you
                </h2>
                <p className="cz-sub">
                  Grab a free Cozy Starter Pack: Starting Soon, Be Right Back,
                  Ending, and Offline screens — plus 28 panels. Ready for OBS in
                  minutes.
                </p>

                <div className="cz-field">
                  <input
                    className="cz-input"
                    type="email"
                    inputMode="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    aria-label="Email address"
                    autoFocus
                  />
                  <button
                    className="cz-btn"
                    onClick={handleSubmit}
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending…" : "Send me the pack"}
                  </button>
                  {status === "error" && <div className="cz-err">{error}</div>}
                </div>

                <p className="cz-trust">
                  <span className="cz-dot">●</span> Instant download · no spam, just
                  cozy drops
                </p>
                <button className="cz-later" onClick={onClose}>
                  Maybe later
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
