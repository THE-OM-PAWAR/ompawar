import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useCanvasTransition } from "@/context/CanvasTransitionContext";

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
  description: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    skills: ["React.js", "Next.js", "Redux", "TypeScript", "TailwindCSS", "Framer Motion", "HTML5 / CSS3"],
    description: "Building responsive, accessible, and high-performance user interfaces with modern design tokens, micro-animations, and clean state management.",
  },
  {
    id: "backend",
    name: "Backend & Real-Time APIs",
    skills: ["Node.js", "Express.js", "REST APIs", "Socket.io", "WebSockets", "Python"],
    description: "Architecting scalable backend services, real-time WebSocket communication, authentication flows, and high-concurrency API routes.",
  },
  {
    id: "databases",
    name: "Databases & Storage",
    skills: ["MongoDB", "PostgreSQL", "Redis"],
    description: "Designing optimized relational and document database schemas, caching layers, and real-time data sync patterns.",
  },
  {
    id: "devops",
    name: "DevOps & Cloud Infrastructure",
    skills: ["AWS (EC2, S3)", "Docker", "GitHub CI/CD", "ERPNext", "Nginx"],
    description: "Deploying and managing production cloud servers on AWS, containerizing web apps, configuring SSL/Nginx, and setting up automated CI/CD pipelines.",
  },
  {
    id: "design",
    name: "Design & UX Architecture",
    skills: ["Figma (Wireframing, High-Fidelity Prototypes, Custom UI Systems)"],
    description: "Translating product ideas into clean Figma wireframes, interactive user flows, and design systems for web and mobile platforms.",
  },
  {
    id: "aiml",
    name: "AI & Machine Learning (Currently Learning)",
    skills: ["Python", "ML Foundations", "Agentic AI", "LLM Integration"],
    description: "Expanding expertise in Artificial Intelligence, agentic automation frameworks, and LLM integrations for intelligent web features.",
  },
];

const SkillsView = () => {
  const { transitionTo } = useCanvasTransition();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (activeCategory === "all") return true;
    return cat.id === activeCategory;
  });

  return (
    <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
      <div className="relative z-[2] mx-auto max-w-2xl px-8 sm:px-10 pb-20 pt-20 md:pt-28">
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
            Skills & Expertise
          </h1>
          <p className="mt-0.5 text-sm sm:text-base font-serif italic font-normal text-muted-foreground">
            Full-stack tech stack, DevOps infrastructure & design tools
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Skills" },
            { id: "frontend", label: "Frontend" },
            { id: "backend", label: "Backend" },
            { id: "devops", label: "DevOps" },
            { id: "design", label: "Design" },
            { id: "aiml", label: "AI / ML" },
          ].map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
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

        {/* Skills Categories List */}
        <div className="mt-8 space-y-8">
          {filteredCategories.map((category) => (
            <div key={category.id} className="group">
              <h2 className="text-sm sm:text-base font-medium text-foreground">
                {category.name}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {category.description}
              </p>

              {/* Skills Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 text-xs font-mono text-foreground bg-muted/50 rounded-md border border-border/50"
                  >
                    {skill}
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

export default SkillsView;
