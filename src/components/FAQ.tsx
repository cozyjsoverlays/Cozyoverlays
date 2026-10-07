import { FAQ as FAQ_DATA, CONTACT_EMAIL } from "@/data/site";
import { FAQItem } from "@/components/FAQItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  return (
    <section id="faq" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="gradient-text">answered</span>
            </>
          }
          subtitle={`Everything you need to know before you grab a pack. Still curious? Email ${CONTACT_EMAIL}.`}
        />

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
          {FAQ_DATA.map((entry, i) => (
            <Reveal key={entry.question} delay={i * 0.05}>
              <FAQItem entry={entry} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
