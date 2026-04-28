import { motion } from "framer-motion";
import { Heart, Leaf, Droplets, Zap, Moon, Palette, Star } from "lucide-react";

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

interface StrainCardProps {
  item: StrainItem;
  categoryId: string;
  index: number;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (item: StrainItem) => void;
}

const effectIcons: Record<string, typeof Zap> = {
  energizing: Zap,
  relaxing: Droplets,
  creative: Palette,
  sleepy: Moon,
};

const effectColors: Record<string, string> = {
  energizing: "text-sativa bg-sativa/10",
  relaxing: "text-indica bg-indica/10",
  creative: "text-hybrid bg-hybrid/10",
  sleepy: "text-preroll bg-preroll/10",
};

const typeColors: Record<string, string> = {
  indica: "bg-indica/20 text-indica",
  sativa: "bg-sativa/20 text-sativa",
  hybrid: "bg-hybrid/20 text-hybrid",
  edible: "bg-edible/20 text-edible",
};

const flagEmoji: Record<string, string> = {
  MA: "🇲🇦",
  NL: "🇳🇱",
  US: "🇺🇸",
};

function getPriceTier(price: number): { label: string; className: string } | null {
  if (price <= 7) return { label: "Budget", className: "bg-cream/20 text-cream" };
  if (price >= 16) return { label: "Top Shelf", className: "gold-gradient text-primary-foreground animate-pulse" };
  if (price >= 12) return { label: "Premium", className: "bg-primary/20 text-primary" };
  return null;
}

const StrainCard = ({ item, categoryId, index, isSaved, onToggleSave, onSelect }: StrainCardProps) => {
  const EffectIcon = effectIcons[item.effect] || Leaf;
  const tier = getPriceTier(item.price1g);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => onSelect(item)}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.2)] ${
        item.isFeatured ? "border-primary/40" : "border-border hover:border-primary/30"
      }`}
    >
      {/* Featured ribbon */}
      {item.isFeatured && (
        <div className="absolute right-0 top-0 z-10">
          <div className="flex items-center gap-1 rounded-bl-lg bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            <Star className="h-3 w-3" />
            House Favorite
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Top row: name + save + stock */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-tight text-foreground">
              {item.name}
              {item.origin && (
                <span className="ml-2 text-base">{flagEmoji[item.origin] || ""}</span>
              )}
            </h3>
            {item.description && (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(item.id);
              }}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={isSaved ? `Remove ${item.name} from saved` : `Save ${item.name}`}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
            </button>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                item.inStock
                  ? "bg-in-stock/10 text-in-stock"
                  : "bg-sold-out/10 text-sold-out"
              }`}
            >
              {item.inStock ? "In Stock" : "Sold Out"}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
              typeColors[item.type] || "bg-muted text-muted-foreground"
            }`}
          >
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
              effectColors[item.effect] || "bg-muted text-muted-foreground"
            }`}
          >
            <EffectIcon className="h-3 w-3" />
            {item.effect.charAt(0).toUpperCase() + item.effect.slice(1)}
          </span>
          {tier && (
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tier.className}`}>
              {tier.label}
            </span>
          )}
        </div>

        {/* Taste notes */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground/70">Taste:</span>{" "}
            {item.taste.join(" · ")}
          </p>
        </div>

        {/* Bottom row: THC + Price */}
        <div className="flex items-end justify-between border-t border-border pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">THC</p>
            <p className="text-sm font-semibold text-foreground">{item.thc}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              €{item.price1g % 1 === 0 ? item.price1g : item.price1g.toFixed(2)}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {categoryId === "edibles" ? "per piece" : "per gram"}
            </p>
            {item.price5g && (
              <p className="text-xs text-primary/70">5g: €{item.price5g}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StrainCard;
