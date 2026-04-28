import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { usePageTitle } from "@/hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("Page not found · ROOTS Coffeeshop");

  return (
    <Layout>
      <section className="flex min-h-[60vh] items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-md text-center"
        >
          <p className="mb-4 text-8xl font-bold gold-text">404</p>
          <h1 className="mb-3 text-2xl font-bold text-foreground">Page not found.</h1>
          <p className="mb-8 text-muted-foreground">
            This page does not exist. The shops do.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Home className="h-4 w-4" />
              Go home
            </Link>
            <Link
              to="/locations"
              className="gold-gradient inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <MapPin className="h-4 w-4" />
              See locations
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default NotFound;
