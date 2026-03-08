import { motion } from "framer-motion";
import LiveClock from "@/components/LiveClock";
import SocialPill from "@/components/SocialPill";
import { SectionGroup } from "@/components/SectionCard";
import ThemeToggle from "@/components/ThemeToggle";
import MusicPlayer from "@/components/MusicPlayer";
import PixelTrail from "@/components/PixelTrail";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Index = () => {
  return (
    <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
      <PixelTrail />
      <ThemeToggle />
      <LiveClock />

      <div className="mx-auto max-w-2xl px-6 pb-16 pt-16 md:pt-24">
        {/* Hero */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Omprakash Pawar
          </h1>
          <p className="mt-0.5 text-base font-serif italic text-muted-foreground">
            Full Stack Web Developer & Designer
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-5">
          <p className="leading-relaxed text-foreground text-sm">
            <em className="font-serif">Building scalable web applications</em>, making the digital
            experience powerful and user-friendly.
          </p>
          <p className="mt-2 leading-relaxed text-foreground text-sm">
            Currently freelancing and building{" "}
            <a
              href="https://www.godigiweb.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif italic underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              GoDigiWeb
            </a>{" "}
            and{" "}
            <a
              href="https://getstay.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif italic underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              GetStay.in
            </a>
            .
          </p>
          <p className="mt-2 leading-relaxed text-foreground text-sm">
            In the past I've worked as a Backend Developer at{" "}
            <a
              href="#"
              className="font-serif italic underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Plixipy
            </a>{" "}
            and Frontend Developer at{" "}
            <a
              href="https://atlyr.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif italic underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Atlyr.in
            </a>
            .
          </p>
        </motion.div>

        {/* Social Pills */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 flex flex-wrap gap-2"
        >
          <SocialPill label="GitHub" href="https://github.com/ompawar15" />
          <SocialPill
            label="LinkedIn"
            href="https://linkedin.com/in/omprakash-pawar"
          />
          <SocialPill
            label="Portfolio"
            href="https://the-om-pawar.github.io/developer/"
          />
          <SocialPill label="Contact" href="mailto:om.pawar1512@gmail.com" />
        </motion.div>

        {/* Three Column Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <SectionGroup
            heading="Building"
            delay={0.3}
            items={[
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
            heading="Work"
            delay={0.4}
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
            ]}
          />
          <SectionGroup
            heading="Projects"
            delay={0.5}
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
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Who is Om?
          </h2>
          <div className="mt-2 space-y-2 leading-relaxed text-foreground text-sm">
            <p>
              Hi! <em className="font-serif">I am Omprakash Pawar</em>, a Full-Stack Developer with 3
              years of experience building and deploying scalable web, real-time,
              and cloud applications.
            </p>
            <p>
              I started my journey as a frontend developer and expanded to
              full-stack, working with JavaScript, TypeScript, Node.js, React,
              and AWS. Currently growing my expertise in{" "}
              <em className="font-serif">AI/ML using Python</em>.
            </p>
          </div>
        </motion.div>

        {/* What is Om doing */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10"
        >
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            What is Om doing?
          </h2>
          <div className="mt-2 space-y-2 leading-relaxed text-foreground text-sm">
            <p>
              Currently I'm building{" "}
              <a
                href="https://getstay.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif italic underline underline-offset-2 hover:text-muted-foreground transition-colors"
              >
                GetStay.in
              </a>
              , a hostel & PG management platform, and scaling businesses through{" "}
              <a
                href="https://www.godigiweb.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif italic underline underline-offset-2 hover:text-muted-foreground transition-colors"
              >
                GoDigiWeb
              </a>
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
        </motion.div>

        {/* Skills */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10"
        >
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
        </motion.div>

        {/* Connect */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 border-t border-border pt-8"
        >
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Connect
          </h2>
          <p className="mt-2 leading-relaxed text-foreground text-sm">
            Reach me at{" "}
            <a
              href="https://github.com/ompawar15"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif italic underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              @ompawar15
            </a>{" "}
            ·{" "}
            <a
              href="mailto:om.pawar1512@gmail.com"
              className="font-serif italic underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              om.pawar1512@gmail.com
            </a>{" "}
            ·{" "}
            <a
              href="tel:+919522557828"
              className="font-serif italic underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              +91 9522557828
            </a>
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-10 text-center text-xs text-muted-foreground"
        >
          Full Stack Web Developer & Designer
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
