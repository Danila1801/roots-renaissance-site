import { motion } from "framer-motion";

interface LeafDecorationProps {
  className?: string;
}

const LeafDecoration = ({ className = "" }: LeafDecorationProps) => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.06 }}
      transition={{ duration: 2 }}
      className={`pointer-events-none absolute ${className}`}
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Botanical fern-like leaf */}
      <path
        d="M100 10 C80 50 30 80 20 130 C10 180 40 220 60 250 C70 265 85 280 100 290 C115 280 130 265 140 250 C160 220 190 180 180 130 C170 80 120 50 100 10Z"
        fill="currentColor"
        className="text-primary"
      />
      <path
        d="M100 30 L100 270"
        stroke="currentColor"
        className="text-background"
        strokeWidth="1.5"
      />
      {/* Veins */}
      {[60, 90, 120, 150, 180, 210].map((y, i) => (
        <path
          key={i}
          d={`M100 ${y} C${80 - i * 3} ${y - 15} ${60 - i * 2} ${y - 10} ${50 + i * 3} ${y + 5}`}
          stroke="currentColor"
          className="text-background"
          strokeWidth="0.8"
          fill="none"
        />
      ))}
      {[60, 90, 120, 150, 180, 210].map((y, i) => (
        <path
          key={`r-${i}`}
          d={`M100 ${y} C${120 + i * 3} ${y - 15} ${140 + i * 2} ${y - 10} ${150 - i * 3} ${y + 5}`}
          stroke="currentColor"
          className="text-background"
          strokeWidth="0.8"
          fill="none"
        />
      ))}
    </motion.svg>
  );
};

export default LeafDecoration;
