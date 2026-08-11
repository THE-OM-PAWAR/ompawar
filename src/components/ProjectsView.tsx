import { useState } from "react";
import { ArrowLeft, Sparkles, ExternalLink } from "lucide-react";
import { useCanvasTransition } from "@/context/CanvasTransitionContext";
import LinkPreview from "@/components/LinkPreview";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectItem {
  id: string;
  title: string;
  role: string;
  category: "fullstack" | "aiml" | "devops";
  subtitle: string;
  description: string;
  tags: string[];
  href?: string;
  aiEnabled?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "oplus-ai",
    title: "Oplus AI",
    role: "Co-Founder & Lead Engineer",
    category: "aiml",
    subtitle: "Tiktok for games — AI-driven gaming clips & discovery platform",
    description:
      "Engineered an interactive gaming clip discovery platform featuring AI-powered video recommendations, creator analytics, and instant clip feeds.",
    tags: ["React", "AI / ML", "Python", "Node.js", "AWS"],
    href: "https://playoplus.in",
    aiEnabled: true,
  },
  {
    id: "getstay",
    title: "GetStay.in",
    role: "Founder & Full-Stack Developer",
    category: "fullstack",
    subtitle: "Hostel & PG management software plus student discovery directory",
    description:
      "Built a SaaS platform for hostel and PG owners with room management, student verification, and local search.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
    href: "https://getstay.in",
  },
  {
    id: "godigiweb",
    title: "GoDigiWeb",
    role: "Founder & Solutions Architect",
    category: "fullstack",
    subtitle: "Helping businesses scale with custom web & cloud architecture",
    description:
      "Designed and deployed custom web applications, membership portals, and cloud solutions tailored for growing businesses.",
    tags: ["React", "Node.js", "AWS EC2", "Docker"],
    href: "https://www.godigiweb.site/",
  },
  {
    id: "hospital-ai",
    title: "Real-time AI Hospital System",
    role: "Hackathon Winner Project",
    category: "aiml",
    subtitle: "Real-time triage with LLM integration & custom Figma UI/UX",
    description:
      "Developed a hospital triage system using LLM models to assess symptom severity and dispatch medical staff dynamically.",
    tags: ["React", "Socket.io", "Python / LLM", "Figma"],
    aiEnabled: true,
  },
  {
    id: "chat-app",
    title: "Real-time Multi-Room Chat",
    role: "Full-Stack Project",
    category: "fullstack",
    subtitle: "High-concurrency instant messaging with presence tracking",
    description:
      "Built a scalable real-time messaging application supporting custom rooms, active online presence, and persistent chat logs.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
  },
  {
    id: "erpnext-aws",
    title: "ERPNext Cloud Infrastructure",
    role: "DevOps Architect",
    category: "devops",
    subtitle: "Large-scale enterprise ERP deployment on AWS EC2 & S3",
    description:
      "Independently deployed, configured, and benchmarked enterprise ERPNext software on AWS cloud infrastructure.",
    tags: ["AWS EC2", "AWS S3", "Docker", "Python"],
  },
];

const ProjectsView = () => {
  const { transitionTo } = useCanvasTransition();
  const [filter, setFilter] = useState<"all" | "fullstack" | "aiml" | "devops">("all");

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
      <div className="relative z-[2] mx-auto max-w-2xl px-8 sm:px-10 pb-20 pt-20 md:pt-28">
        {/* Top Header & Navigation */}
        <div>
          <button
            onClick={() => transitionTo("home")}
            className="inline-flex items-center gap-1.5 text-xs font-serif italic text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft size={13} />
            <span>Back to Home</span>
          </button>

          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Projects & Engineering
          </h1>
          <p className="mt-0.5 text-sm sm:text-base font-serif italic font-normal text-muted-foreground">
            Web applications, AI tools & cloud infrastructure
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { id: "all", label: "All" },
            { id: "fullstack", label: "Full Stack" },
            { id: "aiml", label: "AI / ML" },
            { id: "devops", label: "DevOps & Cloud" },
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

        {/* Projects List */}
        <div className="mt-8 space-y-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-medium text-foreground group-hover:underline underline-offset-2">
                      {project.title}
                    </h2>
                    {project.aiEnabled && (
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Sparkles className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            AI enabled project
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{project.role}</p>
                </div>

                {project.href && (
                  <LinkPreview href={project.href}>
                    <span className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-serif italic">
                      <span>Visit</span>
                      <ExternalLink size={12} />
                    </span>
                  </LinkPreview>
                )}
              </div>

              <p className="mt-2 text-xs font-serif italic text-foreground font-normal">
                {project.subtitle}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag, tIdx) => (
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

export default ProjectsView;
