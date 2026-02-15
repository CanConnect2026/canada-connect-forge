import { Heart, Shield, Users, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">About CanConnect</h1>
          <p className="text-primary-foreground/70 mt-2 max-w-2xl">
            Created by immigrants, for immigrants. We're building the most trusted resource platform for newcomers to Canada.
          </p>
        </div>
      </div>
      <div className="container py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Starting a new life in Canada is exciting — and overwhelming. CanConnect exists to make the journey easier by connecting newcomers with trusted services, community support, and the resources they need to feel at home.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            We believe that every newcomer deserves access to clear, honest, and easily navigable information — without confusion, hidden costs, or misinformation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, title: "Newcomer-First", desc: "Every feature is designed with the newcomer experience in mind." },
            { icon: Shield, title: "Trust & Transparency", desc: "We verify services so you can make confident decisions." },
            { icon: Users, title: "Community-Driven", desc: "Built on the lived experiences of immigrants across Canada." },
            { icon: Globe, title: "Multilingual", desc: "Breaking language barriers with support in 15+ languages." },
          ].map(v => (
            <div key={v.title} className="p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <v.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">{v.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
