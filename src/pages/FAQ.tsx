import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    q: "Why is my organization listed on CanConnect?",
    a: "CanConnect includes a directory of organizations that provide services or support relevant to newcomers in Ontario. Your organization was identified using publicly available information as potentially serving this community.",
  },
  {
    q: "Did we sign up for this?",
    a: "No. Your organization has not actively signed up. We created a basic, unclaimed listing to help newcomers discover services at launch.",
  },
  {
    q: "What information is shown?",
    a: "Only basic, publicly available information, such as:\n• Organization name\n• Location\n• Service category\n• Website (if publicly listed)\n\nNo private or sensitive information is included.",
  },
  {
    q: "Is there a cost?",
    a: "No. Non-profit organizations are listed free for the first year as part of our launch.",
  },
  {
    q: "How do we claim or update our listing?",
    a: "You can claim your listing and manage it directly through our platform, or submit updates to our team via the contact page.",
  },
  {
    q: "What if we don't want to be listed?",
    a: "You can request removal at any time by contacting info@canconnect.ca. We will promptly review and action your request.",
  },
  {
    q: "What happens after the first year?",
    a: "We plan to offer affordable non-profit pricing to keep CanConnect sustainable while continuing to prioritize access for organizations serving newcomers. We'll communicate clearly well in advance.",
  },
];

export default function FAQ() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Frequently Asked Questions</h1>
          <p className="text-primary-foreground/70 mt-2">Common questions from organizations and newcomers</p>
        </div>
      </div>
      <div className="container py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display text-foreground mb-2" id="why-listed">
            Why Is My Organization Listed?
          </h2>
          <p className="text-muted-foreground mb-8">
            This section answers common questions from organizations that appear in our directory.
          </p>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground whitespace-pre-line">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-card rounded-lg border">
            <p className="text-sm text-muted-foreground">
              Have more questions?{" "}
              <Link to="/contact" className="text-accent hover:underline font-medium">Contact us</Link> or visit our{" "}
              <Link to="/help" className="text-accent hover:underline font-medium">Help Centre</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
