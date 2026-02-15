import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Privacy Policy</h1>
          <p className="text-primary-foreground/70 mt-2">How we collect, use, and protect your information</p>
        </div>
      </div>
      <div className="container py-16">
        <div className="max-w-3xl prose prose-sm text-muted-foreground">
          <p className="text-sm text-muted-foreground mb-8">
            <em>This is a placeholder privacy policy. The final version will be published before launch and will comply with all applicable Canadian privacy legislation.</em>
          </p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Information We Collect</h2>
          <p>We collect information you provide directly, such as when you fill out a contact form, submit an event, or suggest a service. We also collect standard analytics data to improve the platform.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">How We Use Your Information</h2>
          <p>Information is used to operate, maintain, and improve CanConnect, respond to your requests, and communicate updates about the platform.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Data Protection</h2>
          <p>We use industry-standard security practices to protect user data. We do not sell personal information to third parties.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Publicly Available Information</h2>
          <p>Listings on CanConnect are created using publicly available information. Organizations can request updates or removal at any time.</p>

          <h2 className="text-lg font-display text-foreground mt-8 mb-3">Contact</h2>
          <p>
            For questions about this policy, contact us at{" "}
            <a href="mailto:info@canconnect.ca" className="text-accent hover:underline">info@canconnect.ca</a>.
          </p>

          <div className="mt-10 pt-6 border-t">
            <Link to="/terms" className="text-accent hover:underline text-sm font-medium">View Terms of Service →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
