import { ArrowLeft, ExternalLink, Linkedin } from "lucide-react";
import { useCanvasTransition } from "@/context/CanvasTransitionContext";
import LinkPreview from "@/components/LinkPreview";
import FeaturePosterCard from "@/components/FeaturePosterCard";

interface BuildingItem {
  id: string;
  title: string;
  role: string;
  subtitle: string;
  description: string;
  href?: string;
  linkedin?: string;
}

const BUILDING_ITEMS: BuildingItem[] = [
  {
    id: "getstay",
    title: "GetStay.in",
    role: "Founder & Creator",
    subtitle: "Hostel accommodation marketplace for students & working professionals",
    description:
      "A marketplace for hostels designed for students and working professionals to find accommodation. Selected among the Top 8 Startups of EO-GSEA, currently operating in Bhopal and working with over 50+ hostels in Bhopal.",
    href: "https://getstay.in",
    linkedin: "https://www.linkedin.com/company/getstay",
  },
  {
    id: "godigiweb",
    title: "GoDigiWeb",
    role: "Founder & Lead Solutions Architect",
    subtitle: "Software development & business growth agency",
    description:
      "A software development and business growth agency working with over 15+ businesses, delivering custom software solutions and digital support to them.",
    href: "https://www.godigiweb.site/",
    linkedin: "https://www.linkedin.com/company/godigiweb",
  },
];

const BuildingView = () => {
  const { transitionTo } = useCanvasTransition();

  return (
    <div className="relative min-h-screen w-full bg-background transition-colors duration-500">
      <div className="relative z-[2] mx-auto max-w-2xl px-8 sm:px-10 pb-20 pt-20 md:pt-28">
        {/* Left Bottom Feature Card */}
        <div className="hidden xl:block absolute -left-64 2xl:-left-76 bottom-16 w-60 2xl:w-68 pointer-events-auto">
          <FeaturePosterCard
            imageSrc="/_.jpeg"
            headline="Building Community Cloud Platform"
          >
            <div className="text-[11px] text-muted-foreground leading-relaxed flex flex-col gap-2 mt-1 font-sans">
              <p>
                Converting a bare-metal PC into a full-fledged, high-availability VPS & cloud infrastructure capable of hosting web apps, databases, and microservices.
              </p>
              <div className="pt-2 border-t border-border/40 text-[10px] text-foreground/90 space-y-1">
                <p className="font-semibold text-foreground">Seeking Contributors & Collaborators!</p>
                <p className="text-muted-foreground leading-normal">
                  Want to collaborate or build together? Reach out via{" "}
                  <a
                    href="https://www.linkedin.com/in/ompawar15/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground transition-colors font-serif italic"
                  >
                    LinkedIn
                  </a>
                  ,{" "}
                  <a
                    href="mailto:ompawar.work@gmail.com"
                    className="underline hover:text-foreground transition-colors font-serif italic"
                  >
                    Email
                  </a>
                  , or DM at{" "}
                  <a
                    href="tel:+919522557828"
                    className="underline hover:text-foreground transition-colors font-serif italic"
                  >
                    +91 9522557828
                  </a>
                  .
                </p>
              </div>
            </div>
          </FeaturePosterCard>
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

        {/* Building List */}
        <div className="mt-8 space-y-8">
          {BUILDING_ITEMS.map((item) => (
            <div key={item.id} className="group">
              <div>
                <div className="flex items-center gap-2.5">
                  {item.href ? (
                    <LinkPreview href={item.href}>
                      <h2 className="text-sm sm:text-base font-medium text-foreground hover:underline underline-offset-2 inline-flex items-center gap-1.5">
                        <span>{item.title}</span>
                        <ExternalLink size={13} className="text-muted-foreground" />
                      </h2>
                    </LinkPreview>
                  ) : (
                    <h2 className="text-sm sm:text-base font-medium text-foreground">
                      {item.title}
                    </h2>
                  )}

                  {item.linkedin && (
                    <a
                      href={item.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${item.title} LinkedIn Page`}
                      className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center p-0.5 rounded hover:bg-muted"
                    >
                      <Linkedin size={14} />
                    </a>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{item.role}</p>
              </div>

              <p className="mt-2 text-xs font-serif italic text-foreground font-normal">
                {item.subtitle}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {item.description}
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

export default BuildingView;

