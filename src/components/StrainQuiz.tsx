import { useState } from "react";
import { motion } from "framer-motion";
import {
  X, Sparkles, ArrowLeft, Leaf, Zap, Droplets, Palette, Moon,
  Sprout, Trees, Flower2, Layers, Cookie, Cigarette, type LucideIcon,
} from "lucide-react";
import menuData from "@/data/strains.json";

interface StrainQuizProps {
  onClose: () => void;
}

interface QuizOption {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

const questions: QuizQuestion[] = [
  {
    id: "mood",
    question: "What mood are you going for?",
    options: [
      { value: "energizing", label: "Energized and uplifted", description: "Ready to go out, be social, get stuff done", icon: Zap },
      { value: "relaxing", label: "Chill and relaxed", description: "Unwind, kick back, sink into the couch", icon: Droplets },
      { value: "creative", label: "Creative and focused", description: "Make music, draw, write, think deeply", icon: Palette },
      { value: "sleepy", label: "Sleepy and calm", description: "Wind down, prepare for bed, deep rest", icon: Moon },
    ],
  },
  {
    id: "experience",
    question: "How experienced are you?",
    options: [
      { value: "beginner", label: "First time or beginner", description: "I want something mild and easy", icon: Sprout },
      { value: "regular", label: "Regular smoker", description: "I know what I like, middle ground", icon: Leaf },
      { value: "connoisseur", label: "Connoisseur", description: "Give me the premium top-shelf stuff", icon: Trees },
    ],
  },
  {
    id: "format",
    question: "What format do you prefer?",
    options: [
      { value: "flower", label: "Flower (weed)", description: "Classic buds to smoke or vape", icon: Flower2 },
      { value: "hash", label: "Hash", description: "Traditional or modern concentrates", icon: Layers },
      { value: "edible", label: "Edible", description: "Eat it. Space cake, cookies, and similar.", icon: Cookie },
      { value: "preroll", label: "Pre-rolled joint", description: "Ready to smoke, no rolling needed", icon: Cigarette },
    ],
  },
];

const StrainQuiz = ({ onClose }: StrainQuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<typeof menuData.categories[0]["items"] | null>(null);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate result
      const mood = newAnswers.mood;
      const experience = newAnswers.experience;
      const format = newAnswers.format;

      let targetCategories: string[] = [];
      if (format === "flower") {
        if (experience === "connoisseur") {
          targetCategories = ["caliweed"];
        } else if (mood === "energizing" || mood === "creative") {
          targetCategories = ["sativa-hybrid", "caliweed"];
        } else {
          targetCategories = ["indica"];
        }
      } else if (format === "hash") {
        targetCategories = ["hash", "traditional-hash"];
      } else if (format === "edible") {
        targetCategories = ["edibles"];
      } else {
        targetCategories = ["prerolled"];
      }

      const allItems = menuData.categories
        .filter((c) => targetCategories.includes(c.id))
        .flatMap((c) => c.items);

      // Filter by effect
      let filtered = allItems.filter((item) => item.effect === mood);
      if (filtered.length === 0) filtered = allItems;

      // Sort by price based on experience
      if (experience === "beginner") {
        filtered.sort((a, b) => a.price1g - b.price1g);
      } else if (experience === "connoisseur") {
        filtered.sort((a, b) => b.price1g - a.price1g);
      }

      setResult(filtered.slice(0, 3));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 md:p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!result ? (
          <>
            {/* Progress */}
            <div className="mb-6 flex gap-1">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-xs uppercase tracking-wider text-primary font-medium">
                Question {step + 1} of {questions.length}
              </span>
            </div>

            <h2 className="mb-6 text-xl font-bold md:text-2xl">
              {questions[step].question}
            </h2>

            <div className="space-y-3">
              {questions[step].options.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(questions[step].id, option.value)}
                    className="group flex w-full items-start gap-3 rounded-xl border border-border bg-background p-4 text-left transition-all hover:border-primary/50 hover:bg-secondary/30"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-medium text-foreground transition-colors group-hover:text-primary">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {option.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                Back
              </button>
            )}
          </>
        ) : (
          /* Results */
          <>
            <div className="mb-6 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="text-xs uppercase tracking-wider text-primary font-medium">
                Your Recommendations
              </span>
            </div>

            <h2 className="mb-2 text-xl font-bold md:text-2xl">
              We think you'll love these
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Based on your preferences, here are our top picks:
            </p>

            <div className="space-y-3">
              {result.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.taste.join(" · ")} · {item.effect}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-primary">€{item.price1g}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setResult(null);
                  setStep(0);
                  setAnswers({});
                }}
                className="flex-1 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="gold-gradient flex-1 rounded-lg px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                View Full Menu
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default StrainQuiz;
