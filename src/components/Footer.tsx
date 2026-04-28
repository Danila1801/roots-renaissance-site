import { MapPin, Clock, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { locations, BRAND_EMAIL, BRAND_INSTAGRAM } from "@/data/locations";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background pb-20 md:pb-0">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-3">
            <h3 className="text-2xl font-bold font-display">
              <span className="gold-text">ROOTS</span>
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Three coffeeshops. Two cities. One family.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href={BRAND_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                aria-label="Follow ROOTS on Instagram"
              >
                <Instagram className="h-4 w-4" />
                @roots_coffeeshop
              </a>
              <a
                href={`mailto:${BRAND_EMAIL}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {BRAND_EMAIL}
              </a>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
              Site
            </h4>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Home</Link>
              <Link to="/menu" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Menu</Link>
              <Link to="/locations" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Locations</Link>
              <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link>
              <Link to="/house-rules" className="text-sm text-muted-foreground transition-colors hover:text-foreground">House rules</Link>
              <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
            </nav>
          </div>

          <div className="md:col-span-7">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Locations
            </h4>
            <div className="grid gap-4 sm:grid-cols-3">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className="group block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
                >
                  <p className="mb-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {loc.name}
                  </p>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      <span>
                        {loc.address.street}<br />
                        {loc.address.postcode} {loc.address.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-primary" />
                      <span>{loc.hours.label}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ROOTS Coffeeshop. 18+ only. Valid ID required at every visit.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
