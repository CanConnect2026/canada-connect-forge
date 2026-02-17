import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Terms of Service</h1>
          <p className="text-primary-foreground/70 mt-2">Please read these terms carefully before using CanConnect</p>
        </div>
      </div>
      <div className="container py-16">
        <div className="max-w-3xl prose prose-sm text-muted-foreground">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Effective Date: April 1, 2026</strong>
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            <em>These terms comply with all applicable Canadian law.</em>
          </p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Use of the Platform</h2>
          <p>CanConnect provides information, visibility, and connections — not professional advice or guaranteed outcomes. Users are encouraged to make informed decisions when engaging with listed services.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Listings & Content</h2>
          <p>Listings are created using publicly available information. CanConnect does not guarantee the accuracy, completeness, or reliability of any listing. Organizations can claim, update, or request removal of their listing at any time.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">User Submissions</h2>
          <p>By submitting content (events, suggestions, stories), you grant CanConnect permission to use and display that content on the platform.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Account Responsibilities</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Disclaimer</h2>
          <p>CanConnect does not provide legal, financial, or immigration advice. The platform is provided "as is" without warranties of any kind.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Limitation of Liability</h2>
          <p>CanConnect shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Changes to These Terms</h2>
          <p>We may update these terms from time to time. Continued use of the platform constitutes acceptance of the revised terms.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href="mailto:info@canconnect.ca" className="text-accent hover:underline">info@canconnect.ca</a>.
          </p>

          <div className="mt-10 pt-6 border-t">
            <Link to="/privacy" className="text-accent hover:underline text-sm font-medium">View Privacy Policy →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
