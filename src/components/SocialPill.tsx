import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface SocialPillProps {
  label: string;
  href: string;
}

const SocialPill = ({ label, href }: SocialPillProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-80"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </motion.a>
  );
};

export default SocialPill;
