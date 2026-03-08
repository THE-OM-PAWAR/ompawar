import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import LinkPreview from "@/components/LinkPreview";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SectionCardProps {
  title: string;
  subtitle: string;
  href?: string;
  aiEnabled?: boolean;
}

const SectionCard = ({ title, subtitle, href, aiEnabled }: SectionCardProps) => {
  const content = (
    <div className="group">
      <div className="flex items-center gap-1.5">
        <h3 className="text-xs sm:text-sm font-medium text-foreground group-hover:underline underline-offset-2">
          {title}
        </h3>
        {aiEnabled && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                AI enabled project
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );

  if (href) {
    return (
      <LinkPreview href={href}>
        {content}
      </LinkPreview>
    );
  }

  return content;
};

interface SectionGroupProps {
  heading: string;
  items: SectionCardProps[];
  delay?: number;
}

const SectionGroup = ({ heading, items, delay = 0 }: SectionGroupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">{heading}</h2>
      <div className="space-y-5">
        {items.map((item, i) => (
          <SectionCard key={i} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

export { SectionCard, SectionGroup };
