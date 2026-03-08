import { ArrowDotsButton } from "@/components/ui/arrow-dots-button";

interface SocialPillProps {
  label: string;
  href: string;
}

const SocialPill = ({ label, href }: SocialPillProps) => {
  return (
    <ArrowDotsButton text={label} href={href} target="_blank" rel="noopener noreferrer" />
  );
};

export default SocialPill;
