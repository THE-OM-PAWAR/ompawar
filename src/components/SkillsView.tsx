import { ArrowLeft } from "lucide-react";
import { useCanvasTransition } from "@/context/CanvasTransitionContext";

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "aiml",
    name: "AI & Machine Learning",
    skills: [
      "Python",
      "FastAPI",
      "Pydantic",
      "Async Programming",
      "LLM APIs",
      "LangGraph",
      "LangChain",
      "Vapi & ElevenLabs",
      "Prompt Engineering",
      "LLM Fundamentals",
      "Pandas",
      "NumPy",
      "Seaborn & Matplotlib",
      "Model Context Protocol (MCP)",
    ],
  },
  {
    id: "devops",
    name: "DevOps & Cloud Infrastructure",
    skills: ["AWS (EC2, S3)", "Docker", "Terraform", "Jenkins", "GitHub CI/CD", "Nginx & SSL", "ERPNext Infrastructure"],
  },
  {
    id: "backend",
    name: "Backend Development",
    skills: ["Node.js", "Express.js", "FastAPI", "Python", "BullMQ", "REST APIs", "Socket.io & WebSockets"],
  },
  {
    id: "frontend",
    name: "Frontend Development",
    skills: ["React.js", "Next.js", "TypeScript", "TailwindCSS", "Redux", "Framer Motion", "HTML5 / CSS3"],
  },
  {
    id: "databases",
    name: "Databases & Storage",
    skills: ["MongoDB", "PostgreSQL", "Redis"],
  },
  {
    id: "design",
    name: "Design & UX Architecture",
    skills: ["Figma (Wireframing & Prototyping)", "Custom UI Component Systems", "User Experience Design"],
  },
];

const SkillsView = () => {
  const { transitionTo } = useCanvasTransition();

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
            Skills & Technical Stack
          </h1>
          <p className="mt-0.5 text-sm sm:text-base font-serif italic font-normal text-muted-foreground">
            Full-stack engineering, backend services, DevOps & AI tools
          </p>
        </div>

        {/* Skills List */}
        <div className="mt-8 space-y-7">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.id} className="group">
              <h2 className="text-sm sm:text-base font-medium text-foreground">
                {category.name}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {category.skills.map((skill, idx) => (
                  <span key={idx} className="inline-block">
                    <span className="hover:text-foreground transition-colors">{skill}</span>
                    {idx < category.skills.length - 1 && (
                      <span className="mx-2 text-muted-foreground/40 font-normal">·</span>
                    )}
                  </span>
                ))}
              </p>
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
