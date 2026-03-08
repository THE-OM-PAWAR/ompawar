import { motion } from "framer-motion";
import LiveClock from "@/components/LiveClock";
import SocialPill from "@/components/SocialPill";
import { SectionGroup } from "@/components/SectionCard";
import ThemeToggle from "@/components/ThemeToggle";
import MusicPlayer from "@/components/MusicPlayer";
import PixelTrail from "@/components/PixelTrail";
import LinkPreview from "@/components/LinkPreview";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Index = () => {
  return (
    <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
      <PixelTrail />
      <ThemeToggle />
      <MusicPlayer />
      <LiveClock />

      <div className="relative z-[2] mx-auto max-w-2xl px-8 sm:px-10 pb-20 pt-20 md:pt-40">
        {/* Hero */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Omprakash Pawar
          </h1>
          <p className="mt-0.5 text-sm sm:text-base font-serif italic font-normal text-muted-foreground">
            Full Stack Web Developer & Designer
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-5">
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
              href="https://github.com/THE-OM-PAWAR"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif italic font-normal underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              @ompawar15
            </a>{" "}
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
