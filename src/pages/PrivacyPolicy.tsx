import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-14 md:py-20">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-display text-primary-foreground">Privacy Policy</h1>
          <p className="text-primary-foreground/60 mt-2 text-sm md:text-base">How we collect, use, and protect your information</p>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
            <span className="font-semibold text-foreground">Effective Date: April 1, 2026</span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="italic">Compliant with PIPEDA and all applicable Canadian privacy legislation.</span>
          </div>

          <div className="space-y-8">
            <Section title="Information We Collect">
              We collect information you provide directly, such as when you fill out a contact form, submit an event, or suggest a service. We also collect standard analytics data to improve the platform.
            </Section>

            <Section title="How We Use Your Information">
              Information is used to operate, maintain, and improve CanConnect, respond to your requests, and communicate updates about the platform.
            </Section>

            <Section title="Data Protection">
              We use industry-standard security practices to protect user data. We do not sell personal information to third parties.
            </Section>

            <Section title="Publicly Available Information">
              Listings on CanConnect are created using publicly available information. Organizations can request updates or removal at any time.
            </Section>

            <Section title="Third-Party Services">
              CanConnect may use third-party services for analytics, authentication, and hosting. These services have their own privacy policies governing the use of your information.
            </Section>

            <Section title="Your Rights">
              You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at the email below.
            </Section>

            <Section title="Contact">
              For questions about this policy, contact us at{" "}
              <a href="mailto:info@canconnect.ca" className="text-accent hover:underline font-medium">info@canconnect.ca</a>.
            </Section>
          </div>

          <div className="mt-12 pt-6 border-t border-border">
            <Link to="/terms" className="text-accent hover:underline text-sm font-medium inline-flex items-center gap-1">
              View Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-display text-foreground mb-2">{title}</h2>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
