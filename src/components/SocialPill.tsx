import { PixelButton } from "@/components/ui/nextjsshop-button";
import { motion } from "framer-motion";

interface SocialPillProps {
  label: string;
  href: string;
}

const SocialPill = ({ label, href }: SocialPillProps) => {
  return (
    <motion.div whileTap={{ scale: 0.97 }}>
      <PixelButton text={label} href={href} />
    </motion.div>
  );
};

export default SocialPill;
