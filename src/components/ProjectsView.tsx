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
    id: "cloudone",
    title: "CloudOne CLI",
    role: "Creator & Lead Architect",
    category: "devops",
    subtitle: "Command-line dev tool & Vercel-style deployment dashboard",
    description:
      "Engineered CloudOne CLI — a command-line developer tool helping developers manage CI/CD pipelines, integrate with GitHub, and deploy applications effortlessly. Coupled with a Vercel-like web dashboard to track and manage deployments.",
    tags: ["CLI Tool", "CI/CD", "GitHub API", "TypeScript", "Node.js", "Docker"],
  },
  {
    id: "xpert-homecare",
    title: "Xpert Homecare Management System",
    role: "Lead Full-Stack & Mobile Architect",
    category: "fullstack",
    subtitle: "Web management dashboard & dual React Native mobile applications",
    description:
      "Engineered the complete Xpert Homecare management dashboard along with two native React Native applications (one for doctors & delivery agents, one for patients). Integrates real-time bookings, status updates, and dispatch handling via Socket.io and a production-grade backend.",
    tags: ["React Native", "React", "Node.js", "Socket.io", "MongoDB"],
    href: "https://xperthomecare.com/",
  },
  {
    id: "getstay",
    title: "GetStay.in",
    role: "Founder & Full-Stack Developer",
    category: "fullstack",
    subtitle: "Hostel accommodation marketplace for students & working professionals",
    description:
      "A marketplace for hostels designed for students and working professionals to find accommodation. Selected among the Top 8 Startups of Eo-gSEA, currently operating in Bhopal with over 50+ hostels.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
    href: "https://getstay.in",
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
        {/* Right Top Feature Card */}
        <div className="hidden xl:block absolute -right-64 2xl:-right-76 top-40 w-60 2xl:w-68 pointer-events-auto">
          <FeaturePosterCard
            imageSrc="/voice-agent-poster.jpg"
            headline="AI Voice Agent for Businesses"
          >
            <div className="text-[11px] text-muted-foreground leading-relaxed flex flex-col gap-2 mt-1 font-sans">
              <p>
                Working on an AI voice agent platform for businesses to integrate directly into their websites as automated receptionists to handle user queries, provide customer support, and book appointments.
              </p>
              <p>
                Automatically refines business data and executes queries using custom MCPs for each business with lower token usage.
              </p>
              <div className="pt-2 border-t border-border/40 font-mono text-[10px] text-foreground/90 space-y-1">
                <p className="font-semibold text-foreground">Solving two key challenges:</p>
                <p>• Reducing cost to ₹1 / min conversation.</p>
                <p>• Minimizing latency & enabling natural conversation flow via fine-tuning + custom MCPs.</p>
              </div>
            </div>
          </FeaturePosterCard>
        </div>

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
              <div>
                <div className="flex items-center gap-2">
                  {project.href ? (
                    <LinkPreview href={project.href}>
                      <h2 className="text-sm sm:text-base font-medium text-foreground hover:underline underline-offset-2 inline-flex items-center gap-1.5">
                        <span>{project.title}</span>
                        <ExternalLink size={13} className="text-muted-foreground" />
                      </h2>
                    </LinkPreview>
                  ) : (
                    <h2 className="text-sm sm:text-base font-medium text-foreground">
                      {project.title}
                    </h2>
                  )}

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
