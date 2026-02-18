import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sections = [
  {
    title: "About CanConnect",
    items: [
      {
        q: "What is CanConnect?",
        a: "CanConnect is a digital platform that helps newcomers find trusted services, community organizations, and businesses that support settlement and integration across Ontario — all in one place.\n\nCanConnect provides access to information, not professional advice or endorsements.",
      },
      {
        q: "Who can use CanConnect?",
        a: "CanConnect is for:\n• Newcomers looking for services and community support\n• Non-profit and community organizations serving newcomers\n• For-profit businesses offering relevant settlement-related services\n\nUse of the platform is subject to our Terms of Service and Privacy Policy.",
      },
      {
        q: "Is CanConnect free to use?",
        a: "Yes.\nCanConnect is always free for newcomers.",
      },
    ],
  },
  {
    title: "Listings & Platform Model",
    items: [
      {
        q: "How are services listed on CanConnect?",
        a: "Services are listed by:\n• Verified non-profit and community organizations (free during the first year)\n• For-profit businesses that meet eligibility requirements and pay an annual listing fee\n\nAll listings are reviewed before appearing on the platform.",
      },
      {
        q: "Why are some non-profit organizations already listed?",
        a: "To ensure newcomers have access to essential information at launch, CanConnect may display publicly available information about verified non-profit and community organizations.\n\nThese listings are informational only until claimed and updated by the organization.",
      },
      {
        q: 'What does "Claim Your Listing" mean?',
        a: '"Claim Your Listing" allows eligible non-profit and community organizations to verify ownership of their listing and manage their profile.\n\nClaiming a listing confirms accuracy and enables updates, but does not imply endorsement by CanConnect.',
      },
      {
        q: "Who can claim a listing?",
        a: "Only verified non-profit and community organizations can claim listings.\n\nFor-profit businesses must create a paid account to be listed on the platform.",
      },
      {
        q: "Do for-profit businesses need to pay?",
        a: "Yes.\nFor-profit businesses pay an annual fee to be listed on CanConnect.\n\nPayment allows a business to appear on the platform, but does not guarantee:\n• Quality of services\n• Outcomes\n• Recommendations or endorsements",
      },
      {
        q: "Why do for-profit businesses pay?",
        a: "Paid memberships help:\n• Maintain platform quality and moderation\n• Support free access for non-profit organizations\n• Ensure accountability and accurate business information",
      },
      {
        q: "Is listing free for non-profits?",
        a: "Yes.\nEligible non-profit and community organizations receive free access during the launch year.\n\nAny future pricing changes will be communicated in advance and will remain significantly lower than for-profit memberships.",
      },
    ],
  },
  {
    title: "Review & Verification",
    items: [
      {
        q: "Are listings verified?",
        a: "Yes.\nListings are reviewed to confirm legitimacy, relevance, and alignment with CanConnect's community standards.\n\nVerification does not replace professional credentials, licensing, or regulatory requirements.\n\nLearn more on our How We Verify Services page.",
      },
      {
        q: "How long does the review process take?",
        a: "Most reviews are completed within 2–5 business days, though timing may vary.",
      },
      {
        q: "Why wasn't my listing approved?",
        a: "Listings may not be approved if:\n• Required information is missing or incomplete\n• Eligibility requirements are not met\n• Credentials or licensing cannot be verified\n• The organization operates as a for-profit business without a paid account\n• The service poses potential risk or misinformation\n\nApplicants are welcome to resubmit with updated information.",
      },
      {
        q: "Can I appeal a listing decision?",
        a: "Yes.\nIf you believe a decision was made in error, contact info@canconnect.ca.",
      },
    ],
  },
  {
    title: "Accuracy, Endorsement & Responsibility",
    items: [
      {
        q: "Does CanConnect recommend or endorse services?",
        a: "No.\nCanConnect does not recommend, certify, or endorse any organization or business.\n\nListings are provided for informational purposes only.",
      },
      {
        q: "Is CanConnect responsible for services provided?",
        a: "No.\nCanConnect is not a party to any relationship or transaction between users and listed organizations or businesses.\n\nUsers are responsible for evaluating services independently.",
      },
      {
        q: "Does CanConnect provide legal, immigration, or professional advice?",
        a: "No.\nCanConnect does not provide legal, immigration, financial, or professional advice.",
      },
    ],
  },
  {
    title: "Suggestions & Updates",
    items: [
      {
        q: "Can I suggest a service that isn't listed?",
        a: "Yes.\nYou can suggest a service through our Suggest a Service page. All suggestions are reviewed before being added.",
      },
      {
        q: "Can I update or remove my information?",
        a: "Yes.\n• Claimed listings can be updated by the organization\n• Requests for corrections or removal can be sent to info@canconnect.ca",
      },
    ],
  },
  {
    title: "Contact & Support",
    items: [
      {
        q: "How can I contact CanConnect?",
        a: "📧 info@canconnect.ca\n📍 250 Yonge St, Suite 2210, Toronto, ON M5B 2L7\n\nWe typically respond within 1–3 business days.",
      },
    ],
  },
];

const microFaqs = [
  { q: "What is CanConnect?", a: "A platform helping newcomers find services, organizations, and businesses that support settlement in Canada." },
  { q: "Is CanConnect free?", a: "Yes — always free for newcomers." },
  { q: "Are listings verified?", a: "Listings are reviewed, but CanConnect does not endorse or guarantee services." },
  { q: "Why is my non-profit already listed?", a: "Some non-profit listings use public information to ensure access at launch." },
  { q: "How do I claim my non-profit listing?", a: "Select Claim Your Listing and complete the verification steps." },
  { q: "Can for-profit businesses claim listings?", a: "No. For-profit businesses must create a paid account to be listed." },
  { q: "Is listing free for non-profits?", a: "Yes — during the launch year." },
  { q: "Why wasn't my listing approved?", a: "Your organization may not meet eligibility requirements or needs more information." },
  { q: "Can I update my listing?", a: "Yes — once your listing is claimed and approved." },
  { q: "Does CanConnect recommend services?", a: "No. Listings are informational only." },
  { q: "How do I contact support?", a: "Email info@canconnect.ca" },
];

export default function FAQ() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Frequently Asked Questions</h1>
          <p className="text-primary-foreground/70 mt-2">Everything you need to know about CanConnect</p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {/* Sidebar nav */}
          <nav className="hidden lg:block space-y-2 sticky top-24 self-start">
            {sections.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5"
              >
                {s.title}
              </a>
            ))}
            <a href="#quick-answers" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5">
              Quick Answers
            </a>
          </nav>

          {/* Content */}
          <div className="space-y-14 max-w-3xl">
            {sections.map((section) => (
              <div key={section.title} id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                <h2 className="text-xl font-display text-foreground mb-4">{section.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, i) => (
                    <AccordionItem key={i} value={`${section.title}-${i}`}>
                      <AccordionTrigger className="text-left text-foreground text-sm">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm whitespace-pre-line">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            {/* Micro FAQs */}
            <div id="quick-answers">
              <h2 className="text-xl font-display text-foreground mb-2">Quick Answers</h2>
              <p className="text-muted-foreground text-sm mb-4">Short answers for common questions.</p>
              <Accordion type="single" collapsible className="w-full">
                {microFaqs.map((item, i) => (
                  <AccordionItem key={i} value={`micro-${i}`}>
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

            <div className="p-6 bg-card rounded-lg border">
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for?{" "}
                <Link to="/contact" className="text-accent hover:underline font-medium">Contact us</Link> or visit our{" "}
                <Link to="/help" className="text-accent hover:underline font-medium">Help Centre</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
