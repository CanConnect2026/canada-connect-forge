import { Shield, CheckCircle, Eye, Users, Tag, RefreshCw, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const criteria = [
  {
    icon: CheckCircle,
    title: "Legitimacy",
    desc: "Registered businesses, non-profits, or community organizations operating in Ontario.",
  },
  {
    icon: Users,
    title: "Relevance to Newcomers",
    desc: "Clear alignment with immigrant or newcomer needs.",
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "Clear service descriptions, pricing (if applicable), and access details.",
  },
  {
    icon: Shield,
    title: "Community Reputation",
    desc: "Public information, feedback, and trusted referrals where available.",
  },
];

export default function HowWeVerify() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">How We Verify Services</h1>
          <p className="text-primary-foreground/70 mt-2 max-w-2xl">
            CanConnect is committed to helping newcomers find services they can trust.
          </p>
        </div>
      </div>
      <div className="container py-16">
        <div className="max-w-3xl mb-12">
          <p className="text-muted-foreground leading-relaxed">
            We understand that choosing the wrong service — especially when navigating immigration, housing, employment, or settlement support — can be costly and stressful. That's why we take a thoughtful approach to the organizations and businesses listed on our platform.
          </p>
        </div>

        <h2 className="text-2xl font-display text-foreground mb-6">What We Look For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {criteria.map((c) => (
            <div key={c.title} className="bg-card rounded-lg border p-6 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Free vs Paid */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl font-display text-foreground mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-accent" /> Free vs Paid Services
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We clearly indicate whether a service is:
          </p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-badge-free" /> Free / Non-Profit
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-badge-paid" /> Paid / For-Profit
            </li>
          </ul>
        </div>

        {/* Ongoing Review */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl font-display text-foreground mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-accent" /> Ongoing Review
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Verification is ongoing. We encourage users and partners to:
          </p>
          <ul className="mt-3 space-y-1.5 text-muted-foreground list-disc list-inside">
            <li>Share feedback</li>
            <li>Report concerns</li>
            <li>Suggest trusted services</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl bg-card rounded-lg border p-6 flex gap-4">
          <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              CanConnect does not provide legal, financial, or immigration advice. We connect users to service providers and encourage informed decision-making.
            </p>
          </div>
        </div>

        <div className="mt-10 text-sm text-muted-foreground">
          Have concerns about a listing?{" "}
          <Link to="/contact" className="text-accent hover:underline font-medium">Contact us</Link> or visit our{" "}
          <Link to="/faq" className="text-accent hover:underline font-medium">FAQ</Link>.
        </div>
      </div>
    </div>
  );
}
