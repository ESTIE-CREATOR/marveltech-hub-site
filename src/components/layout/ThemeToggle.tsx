import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 rounded-md flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
      aria-label="Toggle dark mode"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
