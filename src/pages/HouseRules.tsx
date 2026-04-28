import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { usePageTitle } from "@/hooks/usePageTitle";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const rules = [
  {
    title: "Age and ID",
    body: "You must be 18 or older. Bring a valid ID every time. Passport, EU ID card, or Dutch driver's license. No ID, no entry.",
  },
  {
    title: "Daily limit",
    body: "Dutch law allows a maximum of 5 grams per person per day.",
  },
  {
    title: "No tobacco",
    body: "Dutch law prohibits mixing tobacco in coffeeshops. Pure joints and vaporizers only. We sell rolling papers, tips, and accessories.",
  },
  {
    title: "Photos and recording",
    body: "No filming or photos of staff or other customers. Respect the room.",
  },
  {
    title: "Payment",
    body: "Cash and PIN (Dutch debit cards). No credit cards.",
  },
];

const faqs = [
  { q: "Do I need an ID?", a: "Yes. You must be 18+ and carry a valid ID. Passport, EU ID card, or Dutch driver's license. We check every time." },
  { q: "How much can I buy?", a: "By Dutch law, the maximum is 5 grams per person per day." },
  { q: "Are tourists welcome?", a: "Yes. Anyone 18+ with a valid ID can enter. Locals and visitors are equally welcome." },
  { q: "Can I smoke inside?", a: "Only at ROOTS Amersfoort and ROOTS Bijlmer ArenA, and only pure joints or vaporizers. No tobacco. Bijlmer is walk-in retail with rolling allowed inside until 22:00, no seats. 'T Keteltje is walk-in only." },
  { q: "Do you sell tobacco?", a: "No. Dutch law prohibits selling or mixing tobacco in coffeeshops. We carry rolling papers, tips, and accessories." },
  { q: "What payment methods do you accept?", a: "Cash and PIN. No credit cards." },
];

const HouseRules = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  usePageTitle("House Rules · ROOTS Coffeeshop");

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container">
          <motion.div {...fadeInUp} className="mb-10 max-w-2xl">
            <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              House rules
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">The basics.</h1>
            <p className="mt-2 text-muted-foreground">
              The same rules apply at all three locations.
            </p>
          </motion.div>

          <div className="mb-12 grid gap-4 md:grid-cols-2">
            {rules.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h2 className="mb-2 font-semibold text-foreground">{r.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp}>
            <div className="mb-6 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">FAQ</h2>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="pr-4 font-medium text-foreground">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-border px-5 pb-5 pt-3"
                    >
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HouseRules;
