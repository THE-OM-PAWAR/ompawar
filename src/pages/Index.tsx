import FloatingDock from "@/components/FloatingDock";
import LiveClock from "@/components/LiveClock";
import SocialPill from "@/components/SocialPill";
import { SectionGroup } from "@/components/SectionCard";
import PixelTrail from "@/components/PixelTrail";
import LinkPreview from "@/components/LinkPreview";
import SectionNav, { SectionItem } from "@/components/SectionNav";
import { CanvasTransitionProvider } from "@/context/CanvasTransitionContext";
import CanvasViewport from "@/components/CanvasViewport";

const sections: SectionItem[] = [
  { id: "hero", label: "Intro" },
  { id: "building", label: "Building" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "Who is Om?" },
  { id: "doing", label: "What is Om doing?" },
  { id: "skills", label: "Skills" },
  { id: "connect", label: "Connect" },
];

const IndexContent = () => {
  return (
    <div className="relative z-[2] mx-auto max-w-2xl px-8 sm:px-10 pb-20 pt-20 md:pt-40">
      {/* Hero */}
      <div id="hero" className="scroll-mt-28">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Omprakash Pawar
        </h1>
        <p className="mt-0.5 text-sm sm:text-base font-serif italic font-normal text-muted-foreground">
          Full Stack Web Developer & Designer
        </p>
      </div>

      <div className="mt-5">
        <p className="leading-relaxed text-foreground text-sm">
          <em className="font-serif font-normal">Building scalable web applications</em>, making the digital
          experience powerful and user-friendly.
        </p>
        <p className="mt-2 leading-relaxed text-foreground text-sm">
          Currently freelancing and building{" "}
          <LinkPreview
            href="https://www.godigiweb.site/"
            className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            GoDigiWeb
          </LinkPreview>{" "}
          and{" "}
          <LinkPreview
            href="https://getstay.in"
            className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            GetStay.in
          </LinkPreview>
          .
        </p>
        <p className="mt-2 leading-relaxed text-foreground text-sm">
          In the past I've worked as a Backend Developer at{" "}
          <LinkPreview
            href="#"
            className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            Plixipy
          </LinkPreview>{" "}
          and Frontend Developer at{" "}
          <LinkPreview
            href="https://atlyr.in"
            className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            Atlyr.in
          </LinkPreview>
          .
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

      {/* Three Column Grid */}
      <div className="mt-8 md:mt-10 grid grid-cols-3 gap-4 sm:gap-6">
        <SectionGroup
          id="building"
          heading="Building"
          items={[
            {
              title: "Oplus AI",
              subtitle: "Tiktok for games — I am co-founder here.",
              href: "https://playoplus.in",
              aiEnabled: true,
            },
            {
              title: "GoDigiWeb",
              subtitle: "Helping businesses scale with custom web & cloud solutions.",
              href: "https://www.godigiweb.site/",
            },
            {
              title: "GetStay.in",
              subtitle: "Hostel & PG management software plus directory.",
              href: "https://getstay.in",
            },
          ]}
        />
        <SectionGroup
          id="work"
          heading="Work"
          items={[
            {
              title: "Freelancing",
              subtitle: "Web solutions for gym owners with membership & payment features.",
            },
            {
              title: "Plixipy",
              subtitle: "Backend Developer — APIs, DB optimization, server-side features.",
            },
            {
              title: "Atlyr.in",
              subtitle: "Frontend Developer — website UI & functionalities alongside IITians.",
              href: "https://atlyr.in",
            },
            {
              title: "1:1 Mentorship",
              subtitle: "Get 1:1 webdev & AIML mentorship on Unstop.",
              href: "https://unstop.com/mentor/Ompawar?ref=OTLpd6kI",
            },
          ]}
        />
        <SectionGroup
          id="projects"
          heading="Projects"
          items={[
            {
              title: "Real-time Chat App",
              subtitle: "Socket.io, Node.js, React",
            },
            {
              title: "Hospital Management System",
              subtitle: "Real-time with LLM integration & custom Figma UI/UX.",
            },
            {
              title: "ERPNext on AWS",
              subtitle: "Independently deployed large-scale ERP on cloud infrastructure.",
            },
          ]}
        />
      </div>

      {/* About */}
      <div id="about" className="mt-12 scroll-mt-28">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Who is Om?
        </h2>
        <div className="mt-2 space-y-2 leading-relaxed text-foreground text-sm">
          <p>
            Hi! <em className="font-serif font-normal">I am Omprakash Pawar</em>, a Full-Stack Developer with 3
            years of experience building and deploying scalable web, real-time,
            and cloud applications.
          </p>
          <p>
            I started my journey as a frontend developer and expanded to
            full-stack, working with JavaScript, TypeScript, Node.js, React,
            and AWS. Currently growing my expertise in{" "}
            <em className="font-serif font-normal">AI/ML using Python</em>.
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
            Currently I'm building{" "}
            <LinkPreview
              href="https://getstay.in"
              className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              GetStay.in
            </LinkPreview>
            , a hostel & PG management platform, and scaling businesses through{" "}
            <LinkPreview
              href="https://www.godigiweb.site/"
              className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              GoDigiWeb
            </LinkPreview>
            .
          </p>
          <p>
            Participating in hackathons, winning with innovative projects like
            event management software and real-time collaboration tools.
          </p>
          <p>
            Learning Python for AI/ML — exploring machine learning foundations
            and Agentic AI.
          </p>
        </div>
      </div>

      {/* Skills */}
      <div id="skills" className="mt-10 scroll-mt-28">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Skills
        </h2>
        <div className="mt-2 space-y-1 text-xs leading-relaxed text-foreground">
          <p>
            <span className="text-muted-foreground">Frontend:</span> React.js,
            Next.js, Redux, TailwindCSS
          </p>
          <p>
            <span className="text-muted-foreground">Backend:</span> Node.js,
            Express.js, REST APIs, Socket.io
          </p>
          <p>
            <span className="text-muted-foreground">Databases:</span> MongoDB,
            PostgreSQL
          </p>
          <p>
            <span className="text-muted-foreground">DevOps:</span> AWS (EC2,
            S3), Docker, GitHub CI/CD, ERPNext
          </p>
          <p>
            <span className="text-muted-foreground">Design:</span> Figma
            (wireframes, prototypes)
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
            href="https://github.com/THE-OM-PAWAR"
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
        <SectionNav sections={sections} />
        <CanvasViewport homeContent={<IndexContent />} />
      </div>
    </CanvasTransitionProvider>
  );
};

export default Index;
