import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Cannabis } from "lucide-react";
import Layout from "@/components/Layout";
import LeafDecoration from "@/components/LeafDecoration";
import { locations, SITE_URL } from "@/data/locations";
import { usePageTitle } from "@/hooks/usePageTitle";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ROOTS Coffeeshop",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  sameAs: ["https://www.instagram.com/roots_coffeeshop"],
  subOrganization: locations.map((loc) => ({
    "@type": "Store",
    "@id": `${SITE_URL}/locations/${loc.slug}`,
    name: loc.name,
    url: `${SITE_URL}/locations/${loc.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.street,
      postalCode: loc.address.postcode,
      addressLocality: loc.address.city,
      addressCountry: "NL",
    },
  })),
};

const Index = () => {
  usePageTitle("ROOTS Coffeeshop · Amsterdam and Amersfoort");

  return (
    <Layout>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--secondary)/0.3),transparent_60%)]" />

        <LeafDecoration className="-right-20 -top-10 h-[500px] w-[350px] rotate-12 opacity-[0.03]" />
        <LeafDecoration className="-bottom-20 -left-10 h-[400px] w-[280px] -rotate-12 opacity-[0.03]" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
            >
              <span className="gold-text">ROOTS</span>
              <br />
              <span className="text-foreground">Coffeeshop</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              Three coffeeshops. Two cities. One family.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Link
                to="/locations"
                className="gold-gradient inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                <MapPin className="h-4 w-4" />
                See locations
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                <Cannabis className="h-4 w-4" />
                View menu
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location cards */}
      <section className="relative border-t border-border py-20 md:py-28">
        <div className="container">
          <motion.div {...fadeInUp} className="mb-12">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Locations
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">Find a shop.</h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {locations.map((loc, index) => (
              <motion.div
                key={loc.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/locations/${loc.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    {loc.neighborhood}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {loc.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{loc.hours.label}</span>
                  </div>
                  <span className="mt-1 inline-flex w-fit rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                    {loc.features[0]}
                  </span>
                  <ArrowRight className="mt-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand teaser */}
      <section className="relative border-t border-border py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div {...fadeInUp}>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                The family
              </p>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Different rooms. Same standards.</h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                ROOTS runs three shops. Bijlmer ArenA opened first, in 2017. 'T Keteltje on Marnixstraat carries its own name and history. Amersfoort is the largest and the only one with a kitchen.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Read more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
