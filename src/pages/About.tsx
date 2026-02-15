import { Heart, Shield, Users, Globe, Star } from "lucide-react";
import aboutImage from "@/assets/about-community.jpg";

export default function About() {
  return (
    <div className="bg-background">
      {/* Hero banner with image */}
      <div className="relative bg-primary py-20 overflow-hidden">
        <img
          src={aboutImage}
          alt="Diverse group of newcomers connecting at a community centre"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="container relative z-10">
          <h1 className="text-4xl font-display text-primary-foreground">About CanConnect</h1>
          <p className="text-primary-foreground/80 mt-2 max-w-2xl text-lg">
            Created by immigrants, for immigrants.
          </p>
        </div>
      </div>

      <div className="container py-16">
        {/* Our Story */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-2xl font-display text-foreground mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At CanConnect, we believe that when immigrants have access to clear information, trusted services, and strong community connections, they are better equipped to build confident and successful lives in Canada.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            CanConnect was created by immigrants who have lived this experience. We understand the uncertainty, urgency, and isolation that can come with starting over — and how powerful the right support can be.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-accent/5 rounded-lg border border-accent/20 p-8">
            <h3 className="text-xl font-display text-accent mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To empower immigrants with trusted information, services, and community connections that support a confident and successful settlement journey in Canada.
            </p>
          </div>
          <div className="bg-accent/5 rounded-lg border border-accent/20 p-8">
            <h3 className="text-xl font-display text-accent mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              A Canada where every newcomer can access the support they need and feel a true sense of belonging.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-display text-foreground mb-6">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Globe, title: "Access & Equity" },
              { icon: Shield, title: "Trust & Transparency" },
              { icon: Users, title: "Community & Belonging" },
              { icon: Heart, title: "Lived Experience" },
              { icon: Star, title: "Respect & Dignity" },
            ].map((v) => (
              <div key={v.title} className="p-5 bg-card rounded-lg border text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <v.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{v.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Our Role */}
        <div className="max-w-3xl mb-8">
          <h2 className="text-2xl font-display text-foreground mb-4">Our Role</h2>
          <p className="text-muted-foreground leading-relaxed">
            CanConnect provides information, visibility, and connections — not professional advice or guaranteed outcomes.
          </p>
        </div>

        <p className="text-muted-foreground italic">Created by immigrants, for immigrants.</p>
      </div>
    </div>
  );
}
