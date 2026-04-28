import { motion } from "framer-motion";
import { X, Leaf, Droplets, Zap, Moon, Palette, Star } from "lucide-react";

interface StrainItem {
  id: string;
  name: string;
  type: string;
  taste: string[];
  effect: string;
  thc: string;
  price1g: number;
  price5g?: number | null;
  inStock: boolean;
  description?: string;
  origin?: string;
  isFeatured?: boolean;
}

interface StrainDetailModalProps {
  item: StrainItem;
  onClose: () => void;
}

const effectIcons: Record<string, typeof Zap> = {
  energizing: Zap,
  relaxing: Droplets,
  creative: Palette,
  sleepy: Moon,
};

const effectDescriptions: Record<string, string> = {
  energizing: "Uplifting and stimulating. Good for socializing, exploring, or creative work.",
  relaxing: "Calming body and mind. Good for unwinding after a long day.",
  creative: "Sparks imagination and focus. Good for art, music, or brainstorming.",
  sleepy: "Deep relaxation heading toward sleep. Best for evening or nighttime use.",
};

const useCases: Record<string, string[]> = {
  energizing: ["Day trips around Amsterdam", "Pre-concert energy", "Social gatherings"],
  relaxing: ["Movie night", "Stress relief after work", "Quiet evenings"],
  creative: ["Making music", "Drawing or painting", "Deep conversations"],
  sleepy: ["Winding down before bed", "Pain relief", "Deep meditation"],
};

const StrainDetailModal = ({ item, onClose }: StrainDetailModalProps) => {
  const EffectIcon = effectIcons[item.effect] || Leaf;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Close strain details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Gradient header */}
        <div className="relative h-32 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-secondary to-background">
          {item.isFeatured && (
            <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              <Star className="h-3 w-3" />
              House Favorite
            </div>
          )}
        </div>

        <div className="p-6">
          <h2 className="mb-1 text-2xl font-bold text-foreground">{item.name}</h2>
          <p className="mb-4 text-sm text-primary">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)} · {item.thc} THC
          </p>

          {item.description && (
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}

          {/* Effect profile */}
          <div className="mb-6 rounded-xl border border-border bg-background p-4">
            <div className="mb-2 flex items-center gap-2">
              <EffectIcon className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">
                {item.effect.charAt(0).toUpperCase() + item.effect.slice(1)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {effectDescriptions[item.effect] || "A unique experience."}
            </p>
          </div>

          {/* Taste */}
          <div className="mb-6">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Taste Profile
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.taste.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary/30 px-3 py-1 text-xs text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended use cases */}
          <div className="mb-6">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Best For
            </h3>
            <ul className="space-y-1.5">
              {(useCases[item.effect] || []).map((uc) => (
                <li key={uc} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-1 w-1 rounded-full bg-primary" />
                  {uc}
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between border-t border-border pt-4">
            <div>
              <p className="text-xs text-muted-foreground">Price per gram</p>
              <p className="text-3xl font-bold text-primary">€{item.price1g}</p>
              {item.price5g && (
                <p className="text-sm text-primary/70">5g deal: €{item.price5g}</p>
              )}
            </div>
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                item.inStock
                  ? "bg-in-stock/10 text-in-stock"
                  : "bg-sold-out/10 text-sold-out"
              }`}
            >
              {item.inStock ? "In Stock" : "Sold Out"}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StrainDetailModal;
