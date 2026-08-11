import { useState } from "react";
import { ArrowLeft, Sparkles, ExternalLink } from "lucide-react";
import { useCanvasTransition } from "@/context/CanvasTransitionContext";
import LinkPreview from "@/components/LinkPreview";
import FeaturePosterCard from "@/components/FeaturePosterCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BuildingItem {
  id: string;
  title: string;
  role: string;
  category: "startup" | "saas" | "agency";
  subtitle: string;
  description: string;
  tags: string[];
  href?: string;
  aiEnabled?: boolean;
}

const BUILDING_ITEMS: BuildingItem[] = [
  {
    id: "oplus-ai",
    title: "Oplus AI",
    role: "Co-Founder & Lead Engineer",
    category: "startup",
    subtitle: "Tiktok for games — AI-driven gaming clips & discovery platform",
    description:
      "Co-founded and engineered an interactive gaming clip platform with AI video recommendation models, creator dashboards, and high-engagement clip streams.",
    tags: ["React", "AI / ML", "Python", "Node.js", "AWS"],
    href: "https://playoplus.in",
    aiEnabled: true,
  },
  {
    id: "godigiweb",
    title: "GoDigiWeb",
    role: "Founder & Lead Solutions Architect",
    category: "agency",
    subtitle: "Helping businesses scale with custom web & cloud architecture",
    description:
      "Founding web agency scaling local and regional businesses with custom web portals, membership management, payment gateways, and cloud deployment.",
    tags: ["React", "Node.js", "AWS EC2", "Docker", "TailwindCSS"],
    href: "https://www.godigiweb.site/",
  },
  {
    id: "getstay",
    title: "GetStay.in",
    role: "Founder & Creator",
    category: "saas",
    subtitle: "Hostel & PG management software plus student discovery directory",
    description:
      "Created a full-stack SaaS property management platform for hostel and PG owners combined with a student discovery directory.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
    href: "https://getstay.in",
  },
];

const BuildingView = () => {
  const { transitionTo } = useCanvasTransition();
  const [filter, setFilter] = useState<"all" | "startup" | "saas" | "agency">("all");

  const filteredItems = BUILDING_ITEMS.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
      <div className="relative z-[2] mx-auto max-w-2xl px-8 sm:px-10 pb-20 pt-20 md:pt-28">
        {/* Left Bottom Feature Card */}
        <div className="hidden xl:block absolute -left-60 2xl:-left-72 bottom-20 w-52 2xl:w-60 pointer-events-auto">
          <FeaturePosterCard
            imageSrc="/_.jpeg"
            headline="Building community cloud"
            linkText="godigiweb.site"
            href="https://www.godigiweb.site/"
          />
        </div>
        {/* Header & Navigation */}
        <div>
          <button
            onClick={() => transitionTo("home")}
            className="inline-flex items-center gap-1.5 text-xs font-serif italic text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft size={13} />
            <span>Back to Home</span>
          </button>

          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Building & Startups
          </h1>
          <p className="mt-0.5 text-sm sm:text-base font-serif italic font-normal text-muted-foreground">
            Ventures, SaaS platforms & digital engineering solutions
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Ventures" },
            { id: "startup", label: "Startups" },
            { id: "saas", label: "SaaS Platforms" },
            { id: "agency", label: "Agency Solutions" },
          ].map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  active
                    ? "bg-foreground text-background"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Building List */}
        <div className="mt-8 space-y-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-medium text-foreground group-hover:underline underline-offset-2">
                      {item.title}
                    </h2>
                    {item.aiEnabled && (
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Sparkles className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            AI enabled platform
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.role}</p>
                </div>

                {item.href && (
                  <LinkPreview href={item.href}>
                    <span className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-serif italic">
                      <span>Visit</span>
                      <ExternalLink size={12} />
                    </span>
                  </LinkPreview>
                )}
              </div>

              <p className="mt-2 text-xs font-serif italic text-foreground font-normal">
                {item.subtitle}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 text-[11px] font-mono text-muted-foreground bg-muted/40 rounded border border-border/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-14 border-t border-border pt-8 text-center">
          <button
            onClick={() => transitionTo("home")}
            className="text-xs font-serif italic text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildingView;
