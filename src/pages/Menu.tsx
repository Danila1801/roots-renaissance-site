import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, X, Sparkles, ChevronRight, Heart, Clock,
  Zap, Droplets, Palette, Moon, type LucideIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Layout from "@/components/Layout";
import StrainCard from "@/components/StrainCard";
import StrainQuiz from "@/components/StrainQuiz";
import StrainDetailModal from "@/components/StrainDetailModal";
import { useSavedStrains } from "@/hooks/useSavedStrains";
import { usePageTitle } from "@/hooks/usePageTitle";
import menuData from "@/data/strains.json";

type Effect = "energizing" | "relaxing" | "creative" | "sleepy";

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

const effectFilters: { value: Effect; label: string; icon: LucideIcon }[] = [
  { value: "energizing", label: "Energizing", icon: Zap },
  { value: "relaxing", label: "Relaxing", icon: Droplets },
  { value: "creative", label: "Creative", icon: Palette },
  { value: "sleepy", label: "Sleepy", icon: Moon },
];

const categoryColors: Record<string, string> = {
  indica: "bg-indica",
  caliweed: "bg-sativa",
  "sativa-hybrid": "bg-sativa",
  edibles: "bg-edible",
  hash: "bg-hash",
  "traditional-hash": "bg-hash",
  prerolled: "bg-preroll",
};

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(menuData.categories[0].id);
  const [search, setSearch] = useState("");
  const [activeEffects, setActiveEffects] = useState<Set<Effect>>(new Set());
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showQuiz, setShowQuiz] = useState(searchParams.get("quiz") === "true");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [selectedStrain, setSelectedStrain] = useState<StrainItem | null>(null);
  const { saved, toggle, isSaved, count: savedCount } = useSavedStrains();
  usePageTitle("Menu · ROOTS Bijlmer ArenA");

  const activeCategory = menuData.categories.find((c) => c.id === activeTab);

  const lastUpdatedText = useMemo(() => {
    try {
      return formatDistanceToNow(new Date(menuData.lastUpdated), { addSuffix: true });
    } catch {
      return "";
    }
  }, []);

  const filteredItems = useMemo(() => {
    if (!activeCategory) return [];
    let items = [...activeCategory.items] as StrainItem[];

    // Featured items first
    items.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });

    return items.filter((item) => {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (activeEffects.size > 0 && !activeEffects.has(item.effect as Effect)) return false;
      if (maxPrice && item.price1g > maxPrice) return false;
      if (showSavedOnly && !saved.has(item.id)) return false;
      return true;
    });
  }, [activeCategory, search, activeEffects, maxPrice, showSavedOnly, saved]);

  const toggleEffect = (effect: Effect) => {
    setActiveEffects((prev) => {
      const next = new Set(prev);
      if (next.has(effect)) next.delete(effect);
      else next.add(effect);
      return next;
    });
  };

  const clearFilters = () => {
    setSearch("");
    setActiveEffects(new Set());
    setMaxPrice(null);
    setShowSavedOnly(false);
  };

  const hasActiveFilters = search || activeEffects.size > 0 || maxPrice || showSavedOnly;

  return (
    <Layout>
      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <StrainQuiz onClose={() => { setShowQuiz(false); setSearchParams({}); }} />
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStrain && (
          <StrainDetailModal item={selectedStrain} onClose={() => setSelectedStrain(null)} />
        )}
      </AnimatePresence>

      <section className="py-8 md:py-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  ROOTS Bijlmer ArenA
                </p>
                <h1 className="text-3xl font-bold md:text-4xl">Live menu.</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Live selection at our Bijlmer ArenA shop. Other locations carry their own menu in shop.
                </p>
                {lastUpdatedText && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Updated {lastUpdatedText}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowQuiz(true)}
                className="hidden items-center gap-2 rounded-lg border border-primary/30 bg-secondary/30 px-4 py-2.5 text-sm font-medium text-primary transition-all hover:bg-secondary/50 sm:flex focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <Sparkles className="h-4 w-4" />
                What should I try?
              </button>
            </div>

            {/* Mobile quiz button */}
            <button
              onClick={() => setShowQuiz(true)}
              className="mt-4 flex w-full items-center justify-between rounded-lg border border-primary/30 bg-secondary/30 px-4 py-3 text-sm font-medium text-primary sm:hidden focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                What should I try?
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Search + Filters */}
          <div className="mb-4 space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search strains..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-label="Search strains"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  showFilters || hasActiveFilters
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Toggle filters"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>

            {/* Filter panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Filters</span>
                      {hasActiveFilters && (
                        <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                          Clear all
                        </button>
                      )}
                    </div>
                    <div className="mb-4">
                      <span className="mb-2 block text-xs font-medium text-muted-foreground">Max Price (per gram)</span>
                      <div className="flex gap-2">
                        {[5, 10, 15, 20, 30].map((price) => (
                          <button
                            key={price}
                            onClick={() => setMaxPrice(maxPrice === price ? null : price)}
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                              maxPrice === price
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            ≤€{price}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Effect filter chips + Saved filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {savedCount > 0 && (
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                  showSavedOnly
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                <Heart className="h-3 w-3" />
                Saved ({savedCount})
              </button>
            )}
            {effectFilters.map((ef) => {
              const Icon = ef.icon;
              return (
                <button
                  key={ef.value}
                  onClick={() => toggleEffect(ef.value)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                    activeEffects.has(ef.value)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {ef.label}
                </button>
              );
            })}
          </div>

          {/* Category Tabs */}
          <div className="mb-8 -mx-6 px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max pb-2">
              {menuData.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveTab(cat.id); clearFilters(); }}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                    activeTab === cat.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${categoryColors[cat.id] || "bg-primary"}`} />
                  {cat.name}
                  <span className="text-xs text-muted-foreground">({cat.items.length})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Items Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + [...activeEffects].join(",") + (maxPrice || "") + search + showSavedOnly}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
                  {filteredItems.map((item, index) => (
                    <StrainCard
                      key={item.id}
                      item={item}
                      categoryId={activeTab}
                      index={index}
                      isSaved={isSaved(item.id)}
                      onToggleSave={toggle}
                      onSelect={(i) => setSelectedStrain(i)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">No items match your filters</p>
                  <button onClick={clearFilters} className="mt-2 text-sm text-primary hover:underline">
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
