import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Rocket, ListChecks, CreditCard, ShieldCheck, Mail } from "lucide-react";

const sections = [
  {
    icon: Rocket,
    title: "Getting Started",
    items: [
      { q: "What is CanConnect?", a: "CanConnect is a platform designed to help newcomers to Canada find trusted services, community support, and resources to help them settle and thrive." },
      { q: "How do I search for services?", a: "Use the search bar on the homepage or browse by category in the directory. You can filter by city, category, and service type." },
      { q: "Is CanConnect free to use?", a: "Yes. Searching and browsing the directory is completely free for newcomers." },
    ],
  },
  {
    icon: ListChecks,
    title: "Listings & Verification",
    items: [
      { q: "Why is my organization listed?", a: "We include organizations identified through publicly available information as potentially serving newcomers. See our FAQ for details." },
      { q: "How do I claim my listing?", a: "Visit your listing page and click the 'Claim This Listing' button, or contact us directly." },
      { q: "How does verification work?", a: "We review legitimacy, relevance to newcomers, transparency, and community reputation. Visit our How We Verify page for more details." },
      { q: "How long does verification take?", a: "Most listings are reviewed within 1–3 business days." },
    ],
  },
  {
    icon: CreditCard,
    title: "Memberships & Pricing",
    items: [
      { q: "Is it free for non-profits?", a: "Yes. Non-profit organizations are listed free for the first year as part of our launch." },
      { q: "What about for-profit services?", a: "We plan to offer affordable pricing tiers. All costs are clearly communicated in advance." },
      { q: "Will pricing change?", a: "We'll communicate any changes well in advance, with a focus on keeping the platform accessible and sustainable." },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Privacy, Trust & Safety",
    items: [
      { q: "What data do you collect?", a: "We collect only publicly available information for listings and standard analytics data. See our Privacy Policy for full details." },
      { q: "How do you protect my data?", a: "We use industry-standard security practices to protect user data and do not sell personal information to third parties." },
      { q: "How do I report a concern?", a: "Contact us at info@canconnect.ca and we'll review your concern promptly." },
    ],
  },
  {
    icon: Mail,
    title: "Contact & Support",
    items: [
      { q: "How do I contact CanConnect?", a: "Email us at info@canconnect.ca or visit our Contact page." },
      { q: "What is the response time?", a: "We aim to respond within 1–2 business days." },
      { q: "Can I request removal of my listing?", a: "Yes. Contact info@canconnect.ca and we'll promptly review and action your request." },
    ],
  },
];

export default function HelpCentre() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Help Centre</h1>
          <p className="text-primary-foreground/70 mt-2">Find answers to common questions about CanConnect</p>
        </div>
      </div>
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
          {/* Sidebar nav */}
          <nav className="hidden lg:block space-y-2 sticky top-24 self-start">
            {sections.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5"
              >
                <s.icon className="w-4 h-4 text-accent" />
                {s.title}
              </a>
            ))}
          </nav>

          {/* Content */}
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.title} id={section.title.toLowerCase().replace(/[^a-z]+/g, "-")}>
                <h2 className="text-xl font-display text-foreground mb-4 flex items-center gap-2">
                  <section.icon className="w-5 h-5 text-accent" />
                  {section.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, i) => (
                    <AccordionItem key={i} value={`${section.title}-${i}`}>
                      <AccordionTrigger className="text-left text-foreground text-sm">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            <div className="p-6 bg-card rounded-lg border">
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for?{" "}
                <Link to="/contact" className="text-accent hover:underline font-medium">Contact us</Link> and we'll be happy to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
