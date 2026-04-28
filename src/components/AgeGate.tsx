import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useAgeGate } from "@/hooks/useAgeGate";

interface AgeGateProps {
  children: React.ReactNode;
}

const AgeGate = ({ children }: AgeGateProps) => {
  const { verified, loaded, confirm, deny } = useAgeGate();

  if (!loaded) return null;

  return (
    <>
      <AnimatePresence>
        {!verified && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-secondary/20 blur-3xl" />
              <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative z-10 mx-4 flex max-w-md flex-col items-center gap-8 text-center"
            >
              {/* Logo */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-secondary/50">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  <span className="gold-text">ROOTS</span>
                </h1>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  Coffeeshop · Amsterdam
                </p>
              </div>

              {/* Age verification */}
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-foreground">
                  Are you 18 or older?
                </h2>
                <p className="text-sm text-muted-foreground">
                  You must be at least 18 years old to enter this website. By entering, you confirm your age and agree to our terms.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex w-full gap-3">
                <button
                  onClick={deny}
                  className="flex-1 rounded-lg border border-border bg-transparent px-6 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                >
                  No, I'm under 18
                </button>
                <button
                  onClick={confirm}
                  className="gold-gradient flex-1 rounded-lg px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                >
                  Yes, enter
                </button>
              </div>

              <p className="text-xs text-muted-foreground/60">
                Valid ID required at the door. Dutch law applies.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {verified && children}
    </>
  );
};

export default AgeGate;
