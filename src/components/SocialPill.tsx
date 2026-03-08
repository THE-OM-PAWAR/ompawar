import { FlowButton } from "@/components/ui/flow-button";

interface SocialPillProps {
  label: string;
  href: string;
}

const SocialPill = ({ label, href }: SocialPillProps) => {
  return (
    <FlowButton text={label} href={href} target="_blank" rel="noopener noreferrer" />
  );
};

export default SocialPill;
