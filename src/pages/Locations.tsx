import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { locations } from "@/data/locations";
import { usePageTitle } from "@/hooks/usePageTitle";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Locations = () => {
  usePageTitle("Locations · ROOTS Coffeeshop");

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container">
          <motion.div {...fadeInUp} className="mb-10">
            <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Locations
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">Three coffeeshops</h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Two in Amsterdam, one in Amersfoort.
            </p>
          </motion.div>

          <div className="space-y-4">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Link
                  to={`/locations/${loc.slug}`}
                  className="group block rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-ring md:p-8"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                    <div className="flex-1">
                      <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                        {loc.neighborhood}
                      </p>
                      <h2 className="mb-2 text-2xl font-bold text-foreground transition-colors group-hover:text-primary md:text-3xl">
                        {loc.name}
                      </h2>
                      <p className="mb-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                        {loc.intro}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {loc.features.slice(0, 3).map((f) => (
                          <span
                            key={f}
                            className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end md:text-right">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{loc.address.street}, {loc.address.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{loc.hours.label}</span>
                      </div>
                      <ArrowRight className="mt-2 hidden h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary md:block" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
