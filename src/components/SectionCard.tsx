import { motion } from "framer-motion";

interface SectionCardProps {
  title: string;
  subtitle: string;
  href?: string;
}

const SectionCard = ({ title, subtitle, href }: SectionCardProps) => {
  const content = (
    <div className="group">
      <h3 className="text-sm font-medium text-foreground group-hover:underline underline-offset-2">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
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
