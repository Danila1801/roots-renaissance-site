import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin, Clock, Navigation, ChefHat, Cannabis, ArrowLeft,
} from "lucide-react";
import Layout from "@/components/Layout";
import MobileStickyBar from "@/components/MobileStickyBar";
import { getLocationBySlug, SITE_URL } from "@/data/locations";
import { usePageTitle } from "@/hooks/usePageTitle";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const LocationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? getLocationBySlug(slug) : undefined;

  usePageTitle(location ? `${location.name} · ROOTS Coffeeshop` : "Location · ROOTS Coffeeshop");

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE_URL}/locations/${location.slug}`,
    name: location.name,
    url: `${SITE_URL}/locations/${location.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      postalCode: location.address.postcode,
      addressLocality: location.address.city,
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.geo.lat,
      longitude: location.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayNames,
      opens: location.hours.open,
      closes: location.hours.close,
    },
    priceRange: "€€",
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-8 md:py-12">
        <div className="container">
          <Link
            to="/locations"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All locations
          </Link>

          <motion.div {...fadeInUp} className="mb-8">
            <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {location.neighborhood}
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">{location.name}</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{location.intro}</p>
          </motion.div>

          <motion.div {...fadeInUp} className="mb-8 flex flex-wrap gap-2">
            {location.features.map((f) => (
              <span
                key={f}
                className="rounded-full border border-border bg-secondary/30 px-3 py-1.5 text-xs font-medium text-foreground"
              >
                {f}
              </span>
            ))}
          </motion.div>

          <div className="mb-12 grid gap-6 md:grid-cols-2">
            <motion.div
              {...fadeInUp}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="mb-4 text-lg font-semibold">Address and hours</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{location.address.street}</p>
                    <p className="text-sm text-muted-foreground">
                      {location.address.postcode} {location.address.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{location.hours.label}</p>
                    {location.rollingCutoff && (
                      <p className="text-sm text-muted-foreground">
                        Rolling allowed inside until {location.rollingCutoff}.
                      </p>
                    )}
                  </div>
                </div>
                {location.hasKitchen && (
                  <div className="flex items-start gap-3">
                    <ChefHat className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Kitchen on site</p>
                      <p className="text-sm text-muted-foreground">Full food menu.</p>
                    </div>
                  </div>
                )}
              </div>

              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                <Navigation className="h-4 w-4" />
                Open in Google Maps
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <iframe
                src={`https://www.google.com/maps?q=${location.geo.lat},${location.geo.lng}&z=15&output=embed`}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${location.name} on Google Maps`}
                className="w-full"
              />
            </motion.div>
          </div>

          <motion.div {...fadeInUp} className="mb-12 max-w-2xl space-y-4">
            {location.body.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </motion.div>

          {location.nearby && location.nearby.length > 0 && (
            <motion.div {...fadeInUp} className="mb-12">
              <h2 className="mb-4 text-lg font-semibold">Nearby</h2>
              <div className="flex flex-wrap gap-2">
                {location.nearby.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div {...fadeInUp} className="rounded-xl border border-primary/20 bg-gradient-to-br from-secondary/40 to-background p-6 md:p-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">See the menu</h3>
                <p className="text-sm text-muted-foreground">
                  Live menu for ROOTS Bijlmer ArenA. Other locations carry their own selection in shop.
                </p>
              </div>
              <Link
                to="/menu"
                className="gold-gradient inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                <Cannabis className="h-4 w-4" />
                View menu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <MobileStickyBar />
    </Layout>
  );
};

export default LocationDetail;
