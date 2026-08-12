import FloatingDock from "@/components/FloatingDock";
import LiveClock from "@/components/LiveClock";
import SocialPill from "@/components/SocialPill";
import { SectionCard, SectionGroup } from "@/components/SectionCard";
import PixelTrail from "@/components/PixelTrail";
import LinkPreview from "@/components/LinkPreview";
import { CanvasTransitionProvider, useCanvasTransition } from "@/context/CanvasTransitionContext";
import CanvasViewport from "@/components/CanvasViewport";
import { ArrowUpRight } from "lucide-react";
import FeaturePosterCard from "@/components/FeaturePosterCard";


const IndexContent = () => {
  const { transitionTo } = useCanvasTransition();
  return (
    <div className="relative z-[2] mx-auto max-w-2xl px-8 sm:px-10 pb-20 pt-20 md:pt-32">
      {/* Top Left Avatar Box (Anchored on right, grows to left on hover) */}
      <div className="hidden lg:block absolute right-full -mr-2 lg:-mr-2 xl:-mr-2 top-18 md:top-34 pointer-events-auto z-20">
        <div className="w-16 lg:w-18 hover:w-32 lg:hover:w-36 aspect-square transition-all duration-300 ease-out overflow-hidden">
          <img
            src="/pixel-avatar.png"
            alt="Omprakash Pawar"
            className="w-full h-full object-cover rounded-none"
          />
        </div>
      </div>

      {/* Bottom Right Feature Card - beside main content */}
      <div className="hidden xl:block absolute -right-60 2xl:-right-72 bottom-20 w-52 2xl:w-60 pointer-events-auto">
        <FeaturePosterCard
          videoSrc="/1786485448727994.mp4"
          headline="Style inspiration, curated daily."
          linkText="klickpin.com"
          href="https://klickpin.com"
        />
      </div>

      {/* Hero */}
      <div id="hero" className="scroll-mt-28">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Omprakash Pawar
        </h1>
        <p className="mt-0.5 text-sm sm:text-base font-serif italic font-normal text-muted-foreground">
          AI Backend Engineer & Product Builder
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <p className="leading-relaxed text-foreground text-sm">
          Building production-ready AI applications, backend systems, and scalable web products from architecture to deployment.
        </p>
        <p className="leading-relaxed text-foreground text-sm">
          Currently building{" "}
          <LinkPreview
            href="https://getstay.in"
            className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            GetStay.in
          </LinkPreview>{" "}
          and{" "}
          <LinkPreview
            href="https://www.godigiweb.site/"
            className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            GoDigiWeb
          </LinkPreview>
          , focused on AI agents and cloud infrastructure.
        </p>
      </div>

      {/* Social Pills */}
      <div className="mt-5 flex flex-wrap gap-2">
        <SocialPill label="GitHub" href="https://github.com/THE-OM-PAWAR" />
        <SocialPill
          label="LinkedIn"
          href="https://www.linkedin.com/in/ompawar15/"
        />
        <SocialPill
          label="Resume"
          href="/resume.pdf"
        />
        <SocialPill label="Contact" href="mailto:ompawar.work@gmail.com" />
      </div>

      {/* Building Section */}
      <div id="building" className="mt-12 scroll-mt-28">
        <button
          onClick={() => transitionTo("building")}
          className="group inline-flex items-center gap-1 text-base font-semibold tracking-tight text-foreground hover:text-muted-foreground transition-colors"
        >
          Building
          <ArrowUpRight size={14} className="text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
        <p className="mt-2 leading-relaxed text-foreground text-sm">
          Currently building{" "}
          <LinkPreview href="https://getstay.in" className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors">
            GetStay.in
          </LinkPreview>
          {" "}— a hostel marketplace operating in Bhopal with 50+ hostels (Top 8 Eo-gSEA startup), and{" "}
          <LinkPreview href="https://www.godigiweb.site/" className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors">
            GoDigiWeb
          </LinkPreview>
          {" "}— a software development & business growth agency.
        </p>
      </div>

      {/* Work Section */}
      <div id="work" className="mt-10 scroll-mt-28">
        <h2 className="text-base font-semibold tracking-tight text-foreground">Work</h2>
        <div className="mt-3.5 space-y-4 pl-1 border-l border-border/40 ml-0.5">
          {[
            {
              title: "Software Engineer & TA @ Sheryians Coding School",
              subtitle: "Build production software & mentor students in Full-Stack, Backend & Python.",
              href: "https://sheryians.com/",
            },
            {
              title: "Frontend Developer Intern @ Atlyr.in (3 months)",
              subtitle: "Owned major parts of website UI & Studio experience, working with core engineering.",
              href: "https://atlyr.app",
            },
            {
              title: "Backend Developer Intern @ Plixipy (3 months)",
              subtitle: "Built production APIs, DB workflows & server-side features with hands-on optimization.",
              href: "https://www.linkedin.com/company/plixipy/posts/?feedView=all",
            },
            {
              title: "Technology Intern @ Silov Solutions",
              subtitle: "Developed & maintained company website, improved UI/UX functionality & SEO performance.",
              href: "https://silovsolutions.com/",
            },
            {
              title: "Full-Stack & Mobile Architect @ Xpert Homecare",
              subtitle: "Built Xpert management dashboard & dual React Native apps (doctors/delivery agents & patients) with real-time Socket.io bookings.",
              href: "https://xperthomecare.com/",
            },
            {
              title: "Hackathons & Awards",
              subtitle: "2nd Runner-Up out of 3,000+ teams across India at Google Lakecity Hackathon & 2nd Runner-Up @ Fibohack.",
            },
          ].map((item, i) => (
            <div key={i} className="pl-3">
              <SectionCard {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="mt-10 scroll-mt-28">
        <button
          onClick={() => transitionTo("projects")}
          className="group inline-flex items-center gap-1 text-base font-semibold tracking-tight text-foreground hover:text-muted-foreground transition-colors"
        >
          Projects
          <ArrowUpRight size={14} className="text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
        <p className="mt-2 leading-relaxed text-foreground text-sm">
          Currently, I am working on a <em className="font-serif font-normal">Voice Agent</em> project which is designed to feel completely natural to human nature and conversational speed. I also created <em className="font-serif font-normal">CloudOne CLI</em> — a CLI dev tool for CI/CD pipelines, GitHub integration, and Vercel-like deployment dashboards, along with a few more projects.{" "}
          <button
            onClick={() => transitionTo("projects")}
            className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors text-foreground inline-flex items-center gap-0.5"
          >
            view more →
          </button>
        </p>
      </div>

      {/* Skills Section */}
      <div id="skills" className="mt-10 scroll-mt-28">
        <button
          onClick={() => transitionTo("skills")}
          className="group inline-flex items-center gap-1 text-base font-semibold tracking-tight text-foreground hover:text-muted-foreground transition-colors"
        >
          Skills
          <ArrowUpRight size={14} className="text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
        <div className="mt-2 space-y-1 text-xs leading-relaxed text-foreground">
          <p>
            <span className="text-muted-foreground">AI & ML:</span> Python, FastAPI, Pydantic, LLM APIs, LangGraph, LangChain, MCP
          </p>
          <p>
            <span className="text-muted-foreground">DevOps:</span> AWS (EC2, S3), Docker, Terraform, Jenkins, GitHub CI/CD
          </p>
          <p>
            <span className="text-muted-foreground">Backend:</span> Node.js, Express.js, FastAPI, Python, BullMQ, Socket.io
          </p>
          <p>
            <span className="text-muted-foreground">Frontend:</span> React.js, Next.js, Redux, TypeScript, TailwindCSS
          </p>
          <p>
            <span className="text-muted-foreground">Databases:</span> MongoDB, PostgreSQL, Redis
          </p>
          <p>
            <span className="text-muted-foreground">Design:</span> Figma (wireframes, prototypes)
          </p>
        </div>
      </div>

      {/* About */}
      <div id="about" className="mt-12 scroll-mt-28">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Who is Om?
        </h2>
        <div className="mt-2 space-y-2 leading-relaxed text-foreground text-sm">
          <p>
            Hi! I’m <em className="font-serif font-normal">Omprakash Pawar</em>, an <em className="font-serif font-normal">AI Backend Engineer & Product Builder</em> building production-ready AI applications, backend systems, and scalable products.
          </p>
          <p>
            I started with frontend development and grew into full-stack and backend engineering, working with <em className="font-serif font-normal">Node.js, Python, FastAPI, PostgreSQL, Redis, Docker, and AWS</em>. Today, I focus on <em className="font-serif font-normal">LLMs, AI agents, voice AI, LangGraph, LangChain, and AI infrastructure</em>.
          </p>
        </div>
      </div>

      {/* What is Om doing */}
      <div id="doing" className="mt-10 scroll-mt-28">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          What is Om doing?
        </h2>
        <div className="mt-2 space-y-2 leading-relaxed text-foreground text-sm">
          <p>
            Currently, I’m building{" "}
            <LinkPreview
              href="https://getstay.in"
              className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              GetStay.in
            </LinkPreview>{" "}
            and{" "}
            <LinkPreview
              href="https://www.godigiweb.site/"
              className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              GoDigiWeb
            </LinkPreview>
            , working across AI, backend engineering, product development, and cloud infrastructure.
          </p>
          <p>
            I’m focused on building <em className="font-serif font-normal">AI agents and production-grade AI systems</em>, while exploring new ideas across AI, software, and startups.
          </p>
        </div>
      </div>

      {/* Connect */}
      <div id="connect" className="mt-12 border-t border-border pt-8 scroll-mt-28">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Connect
        </h2>
        <p className="mt-2 leading-relaxed text-foreground text-sm">
          Reach me at{" "}
          <LinkPreview
            href="https://www.linkedin.com/in/ompawar15/"
            className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            @ompawar15
          </LinkPreview>{" "}
          ·{" "}
          <a
            href="mailto:ompawar.work@gmail.com"
            className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            ompawar.work@gmail.com
          </a>{" "}
          ·{" "}
          <a
            href="tel:+919522557828"
            className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            +91 9522557828
          </a>
        </p>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-xs text-muted-foreground">
        Full Stack Web Developer & Designer
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <CanvasTransitionProvider>
      <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
        <PixelTrail />
        <FloatingDock />
        <LiveClock />
        <CanvasViewport homeContent={<IndexContent />} />
      </div>
    </CanvasTransitionProvider>
  );
};

export default Index;
