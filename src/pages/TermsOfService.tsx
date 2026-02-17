import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-14 md:py-20">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-display text-primary-foreground">Terms of Service</h1>
          <p className="text-primary-foreground/60 mt-2 text-sm md:text-base">Please read these terms carefully before using CanConnect</p>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
            <span className="font-semibold text-foreground">Effective Date: April 1, 2026</span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="italic">These terms comply with all applicable Canadian law.</span>
          </div>

          <div className="space-y-8">
            <Section title="Use of the Platform">
              CanConnect provides information, visibility, and connections — not professional advice or guaranteed outcomes. Users are encouraged to make informed decisions when engaging with listed services.
            </Section>

            <Section title="Listings & Content">
              Listings are created using publicly available information. CanConnect does not guarantee the accuracy, completeness, or reliability of any listing. Organizations can claim, update, or request removal of their listing at any time.
            </Section>

            <Section title="User Submissions">
              By submitting content (events, suggestions, stories), you grant CanConnect permission to use and display that content on the platform.
            </Section>

            <Section title="Account Responsibilities">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </Section>

            <Section title="Disclaimer">
              CanConnect does not provide legal, financial, or immigration advice. The platform is provided "as is" without warranties of any kind.
            </Section>

            <Section title="Limitation of Liability">
              CanConnect shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.
            </Section>

            <Section title="Changes to These Terms">
              We may update these terms from time to time. Continued use of the platform constitutes acceptance of the revised terms.
            </Section>

            <Section title="Contact">
              For questions about these terms, contact us at{" "}
              <a href="mailto:info@canconnect.ca" className="text-accent hover:underline font-medium">info@canconnect.ca</a>.
            </Section>
          </div>

          <div className="mt-12 pt-6 border-t border-border">
            <Link to="/privacy" className="text-accent hover:underline text-sm font-medium inline-flex items-center gap-1">
              View Privacy Policy →
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
