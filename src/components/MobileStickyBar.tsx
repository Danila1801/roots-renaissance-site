import { Link, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, Cannabis } from "lucide-react";
import { getLocationBySlug } from "@/data/locations";

const MobileStickyBar = () => {
  const { slug } = useParams<{ slug: string }>();
  const routerLocation = useLocation();

  if (!routerLocation.pathname.startsWith("/locations/")) return null;
  const loc = slug ? getLocationBySlug(slug) : undefined;
  if (!loc) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="glass fixed bottom-0 left-0 right-0 z-40 border-t border-border p-3 md:hidden"
      >
        <div className="flex gap-3">
          <a
            href={loc.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-secondary/30 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <Navigation className="h-4 w-4" />
            Directions
          </a>
          <Link
            to="/menu"
            className="gold-gradient flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <Cannabis className="h-4 w-4" />
            Menu
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileStickyBar;
