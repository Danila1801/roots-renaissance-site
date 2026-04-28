import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Instagram } from "lucide-react";
import Layout from "@/components/Layout";
import { locations, BRAND_EMAIL, BRAND_INSTAGRAM } from "@/data/locations";
import { usePageTitle } from "@/hooks/usePageTitle";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Contact = () => {
  usePageTitle("Contact · ROOTS Coffeeshop");

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container">
          <motion.div {...fadeInUp} className="mb-10">
            <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Contact
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">Get in touch.</h1>
          </motion.div>

          <div className="mb-12 max-w-md rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Brand</h2>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${BRAND_EMAIL}`}
                className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                {BRAND_EMAIL}
              </a>
              <a
                href={BRAND_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-4 w-4 text-primary" />
                @roots_coffeeshop
              </a>
            </div>
          </div>

          <h2 className="mb-4 text-lg font-semibold">Locations</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {locations.map((loc) => (
              <div
                key={loc.slug}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  {loc.neighborhood}
                </p>
                <h3 className="mb-3 font-semibold text-foreground">{loc.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      {loc.address.street}<br />
                      {loc.address.postcode} {loc.address.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{loc.hours.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
