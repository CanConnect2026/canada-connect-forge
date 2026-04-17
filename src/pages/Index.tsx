import { MapPin, Users, Briefcase, Home, Scale, BookOpen, Stethoscope, DollarSign, UtensilsCrossed, Landmark, AlertTriangle, ArrowRight, ChevronRight, Calendar, Clock, Info, Leaf, Shield, GraduationCap, Compass, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import CategoryCard from "@/components/CategoryCard";
import ListingCard from "@/components/ListingCard";
import { useFeaturedListings } from "@/hooks/useListings";
import { useEvents } from "@/hooks/useEvents";
import { useFeaturedArticles } from "@/hooks/useArticles";

import heroFood from "@/assets/hero-food.jpg";
import heroImage2 from "@/assets/hero-image-2.jpg";
import mobileAppPreview from "@/assets/mobile-app-preview.png";
import { useState, useEffect, useCallback } from "react";
import NewsletterSignup from "@/components/NewsletterSignup";
import ExploreTorontoSection from "@/components/ExploreTorontoSection";
import IntentPrompt from "@/components/IntentPrompt";
import { format } from "date-fns";

const categoryIcons = [
  { icon: Users, title: "Settlement & Newcomer Services", count: 42, action: "Find" },
  { icon: Scale, title: "Immigration & Legal Support", count: 28, action: "Access" },
  { icon: Home, title: "Housing & Shelter", count: 19, action: "Find" },
  { icon: Briefcase, title: "Employment & Career Support", count: 35, action: "Explore" },
  { icon: BookOpen, title: "Language & Education", count: 22, action: "Learn" },
  { icon: Stethoscope, title: "Health & Wellness", count: 31, action: "Access" },
  { icon: DollarSign, title: "Financial Services & Support", count: 14, action: "Access" },
  { icon: UtensilsCrossed, title: "Food & Clothing Support", count: 17, action: "Find" },
  { icon: Landmark, title: "Community & Cultural Organizations", count: 26, action: "Connect" },
  { icon: AlertTriangle, title: "Crisis & Emergency Help", count: 11, action: "Get help" },
];

export default function Index() {
  const { data: featuredListings = [] } = useFeaturedListings();
  const { data: upcomingEvents = [] } = useEvents();
  const { data: featuredArticles = [] } = useFeaturedArticles(3);

  return (
    <>
      {/* Intent Prompt */}
      <IntentPrompt />

      {/* ─── DUAL-PATHWAY HERO (decision zone) ─────────────────────────── */}
      <section className="relative bg-background">
        <div className="container py-10 md:py-14">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-bold mb-3">
              One platform · Two pathways
            </p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-[1.05]">
              Where would you like to start?
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Pick the path that matches what you need today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto">
            {/* Get Settled — Canada Connect */}
            <Link
              to="/directory"
              className="group relative overflow-hidden rounded-3xl bg-card border border-border/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 min-h-[420px] md:min-h-[480px] flex flex-col"
            >
              <div className="relative h-48 md:h-60 overflow-hidden">
                <img
                  src={heroImage2}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur text-[11px] font-bold uppercase tracking-widest text-primary">
                  <Compass className="w-3.5 h-3.5" /> Canada Connect
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight mb-3">
                  Get Settled in Canada
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Find services, guides, and support to start your life in Canada — verified organizations, step-by-step checklists, and community events.
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/60">
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                    <span>Services</span>
                    <span className="text-border">·</span>
                    <span>Guides</span>
                    <span className="text-border">·</span>
                    <span>Events</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all">
                    Start <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Explore the City — FirstBitesTO */}
            <Link
              to="/restaurants"
              className="group relative overflow-hidden rounded-3xl bg-card border border-border/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 min-h-[420px] md:min-h-[480px] flex flex-col"
            >
              <div className="relative h-48 md:h-60 overflow-hidden">
                <img
                  src={heroFood}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/85 via-accent/40 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur text-[11px] font-bold uppercase tracking-widest text-accent">
                  <Sparkles className="w-3.5 h-3.5" /> FirstBitesTO
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight mb-3">
                  Explore Food & Experiences
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Taste the world right here in Toronto — curated food trails, neighbourhood guides, and authentic flavours from every culture across the GTA.
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/60">
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                    <span>Trails</span>
                    <span className="text-border">·</span>
                    <span>Neighbourhoods</span>
                    <span className="text-border">·</span>
                    <span>Stories</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-accent group-hover:gap-2.5 transition-all">
                    Discover <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* ===== GET SETTLED — Canada Connect cluster ===== */}
      <section className="pt-16 pb-2 bg-section-alt">
        <div className="container text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-3">
            <Users className="w-3.5 h-3.5" /> Get Settled · Canada Connect
          </div>
          <h2 className="text-2xl md:text-3xl font-display text-foreground">Practical help to build your life in Canada</h2>
        </div>
      </section>

      <section className="pt-6 pb-16 bg-section-alt">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl md:text-4xl font-display text-foreground">Featured Support for Newcomers</h2>
                <FeaturedSupportModal />
              </div>
              <p className="text-muted-foreground mt-2 text-base">Trusted organizations offering practical help, professional guidance, and community connection</p>
            </div>
            <Link to="/directory" className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Services & Resources */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display text-foreground text-center mb-3">Services & Resources</h2>
          <p className="text-muted-foreground text-center mb-12 text-base">Browse by category to find exactly what you need</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {categoryIcons.map(cat => (
              <CategoryCard
                key={cat.title}
                icon={cat.icon}
                title={cat.title}
                count={cat.count}
                href={`/directory?category=${encodeURIComponent(cat.title)}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-section-alt">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display text-foreground">Upcoming Events</h2>
              <p className="text-muted-foreground mt-2 text-base">Connect with your community and participate in newcomer-focused events</p>
            </div>
            <Link to="/events" className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              All events <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.filter(e => !e.tags?.includes("food")).slice(0, 3).map(event => (
              <Link key={event.id} to={`/events/${event.id}`} className="group bg-card rounded-xl border border-border/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {event.image_url ? (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-muted-foreground/40" />
                  </div>
                )}
                <div className="p-5">
                  <span className="text-xs font-semibold text-accent uppercase">
                    {format(new Date(event.event_date + "T00:00:00"), "MMM d, yyyy")}
                    {event.start_time && (
                      <span className="text-muted-foreground font-normal normal-case"> · {(() => { const [h, m] = event.start_time.split(":"); const hour = parseInt(h); return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`; })()}</span>
                    )}
                  </span>
                  <h3 className="font-bold mt-1.5 text-foreground group-hover:text-accent transition-colors">{event.title}</h3>
                  {event.location && (
                    <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-accent-secondary" /> {event.location}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newcomer Checklists */}
      <section className="py-8 bg-primary">
        <div className="container text-center">
          <span className="text-xs font-semibold text-accent-gold uppercase tracking-widest">Your First 90 Days</span>
          <h2 className="text-3xl md:text-4xl font-display text-primary-foreground mt-2 mb-3">Newcomer Checklists</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed text-base mb-8">
            Not sure what to do first? Our step-by-step checklists are tailored to how you arrived in Canada. Pick your path and we'll guide you through everything you need to do — with direct links to the services that can help.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, label: "Permanent Resident", desc: "Express Entry, PNP, Family Sponsorship", slug: "permanent-resident" },
              { icon: Shield, label: "Refugee / Asylum", desc: "Refugee claimants & protected persons", slug: "refugee" },
              { icon: GraduationCap, label: "International Student", desc: "Study permit holders & graduates", slug: "international-student" },
              { icon: Briefcase, label: "Temporary Worker", desc: "Work permits & LMIA workers", slug: "temporary-worker" },
            ].map((stream) => (
              <Link key={stream.label} to={`/checklist/${stream.slug}`} className="text-center group">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-3">
                  <stream.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-primary-foreground text-sm group-hover:text-accent transition-colors">{stream.label}</h3>
                <p className="text-primary-foreground/60 text-xs mt-1 mb-2">{stream.desc}</p>
                <span className="text-accent text-xs font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Start checklist <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-display text-foreground">Insights & Stories</h2>
                <p className="text-muted-foreground mt-2 text-base">Learn from real stories, expert advice, and practical guides</p>
              </div>
              <Link to="/how-to" className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                All guides <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map(article => (
                <Link key={article.id} to={`/how-to/${article.slug}`} className="group bg-card rounded-xl border border-border/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {article.featured_image_url ? (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={article.featured_image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-accent uppercase">{article.category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.estimated_read_minutes} min
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">{article.title}</h3>
                    {article.summary && (
                      <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{article.summary}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== EXPLORE THE CITY — FirstBitesTO cluster ===== */}
      <section className="pt-16 pb-2">
        <div className="container text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-bold uppercase tracking-widest mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" /> Explore the City · FirstBitesTO
          </div>
          <h2 className="text-2xl md:text-3xl font-display text-foreground">Curated discovery through food and neighbourhoods</h2>
        </div>
      </section>

      {/* Explore Toronto Cross-Link */}
      <ExploreTorontoSection />

      {/* Mobile App Promo */}
      <section className="py-16 bg-section-alt">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 flex justify-center">
              <img
                src={mobileAppPreview}
                alt="CanConnect mobile app preview"
                className="max-w-[400px] md:max-w-[500px] w-full h-auto drop-shadow-2xl"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-display text-foreground mb-3"><span className="font-bold">Can</span><span className="font-normal">Connect</span> On the Go</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Take <span className="font-semibold">Can</span>Connect with you wherever you are. Browse services, find events, and connect with your community — all from your phone. Download the app and get instant access to trusted newcomer support across Ontario.
              </p>
              <p className="text-sm text-muted-foreground mb-6">Available on both iOS and Android.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-foreground text-background rounded-lg px-5 py-3 hover:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-none">Download on the</div>
                    <div className="text-lg font-semibold leading-tight">App Store</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-foreground text-background rounded-lg px-5 py-3 hover:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.56.69.56 1.19s-.22.92-.56 1.19l-1.97 1.13-2.5-2.5 2.5-2.5 1.97 1.13zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/></svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-none">GET IT ON</div>
                    <div className="text-lg font-semibold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedSupportModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-accent transition-colors" aria-label="How we choose featured support">
          <Info className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">How We Choose Featured Support</DialogTitle>
          <DialogDescription className="sr-only">Information about how we select featured organizations</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            At CanConnect, our goal is to help newcomers across Ontario find legitimate, useful, and trustworthy support — whether they've just arrived or have been in Canada for several years.
          </p>
          <p>
            The organizations featured on our homepage are selected to reflect the different stages of the newcomer journey, from immediate needs to long-term stability and community belonging.
          </p>

          <h4 className="font-semibold text-foreground mt-4">What We Look For</h4>
          <p>We feature organizations that:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Serve newcomers in practical, meaningful ways</li>
            <li>Are known for trust, accessibility, and community impact</li>
            <li>Offer clear services with transparent costs</li>
            <li>Address different needs — not just one type of support</li>
          </ul>

          <h4 className="font-semibold text-foreground mt-4">A Mix of Support Types</h4>
          <p>Featured organizations may include:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Free, community-funded services</li>
            <li>Paid professional services (e.g. legal or career support)</li>
            <li>Cultural and social organizations that help newcomers build belonging</li>
          </ul>
          <p>All organizations are clearly labelled so newcomers can quickly understand whether a service is free or paid.</p>

          <div className="bg-muted/50 rounded-md p-3 mt-4">
            <p className="text-xs">
              <strong className="text-foreground">Important:</strong> Being featured on CanConnect does not mean endorsement, partnership, or sponsorship. It simply means the organization aligns with our mission to help newcomers navigate life in Canada with confidence and clarity.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
