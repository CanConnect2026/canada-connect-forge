import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { to: "/", label: "Find Services" },
  { to: "/map", label: "Map" },
  { to: "/city-guide", label: "City Guide" },
  { to: "/events", label: "Events" },
  { to: "/about", label: "About Us" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/contact", label: "Contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm py-1.5">
        <div className="container flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Serving Ontario — expanding soon
          </span>
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/help" className="hover:underline">Help Centre</Link>
            <span className="opacity-40">|</span>
            <button className="hover:underline">EN</button>
            <button className="hover:underline opacity-60">FR</button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
            Can<span className="text-accent">Connect</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/admin"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <User className="w-4 h-4" /> {user.email?.split("@")[0]}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-1" /> Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to="/get-involved">List Your Business</Link>
                </Button>
              </>
            )}
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-card animate-fade-in">
            <div className="container py-4 flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    location.pathname === link.to ? "bg-secondary text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground">
                  Admin
                </Link>
              )}
              <div className="flex gap-3 mt-3 pt-3 border-t">
                {user ? (
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { signOut(); setMobileOpen(false); }}>
                    <LogOut className="w-4 h-4 mr-1" /> Sign Out
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link to="/login" onClick={() => setMobileOpen(false)}>Log In</Link>
                    </Button>
                    <Button size="sm" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                      <Link to="/get-involved" onClick={() => setMobileOpen(false)}>List Your Business</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display text-xl mb-3">Can<span className="text-accent">Connect</span></h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Created by immigrants, for immigrants. Your trusted guide to settling and thriving in Canada.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 opacity-60">Explore</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/directory" className="hover:opacity-100">Directory</Link></li>
                <li><Link to="/map" className="hover:opacity-100">Map</Link></li>
                <li><Link to="/events" className="hover:opacity-100">Events</Link></li>
                <li><Link to="/about" className="hover:opacity-100">About Us</Link></li>
                <li><Link to="/get-involved" className="hover:opacity-100">Get Involved</Link></li>
                <li><Link to="/suggest" className="hover:opacity-100">Suggest a Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 opacity-60">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/help" className="hover:opacity-100">Help Centre</Link></li>
                <li><Link to="/contact" className="hover:opacity-100">Contact Us</Link></li>
                <li><Link to="/faq" className="hover:opacity-100">FAQ</Link></li>
                <li><Link to="/how-we-verify" className="hover:opacity-100">How We Verify</Link></li>
                <li><Link to="/suggest" className="hover:opacity-100">Suggest a Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 opacity-60">Contact</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>info@canconnect.ca</li>
                <li>+1 647-782-0023</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs opacity-60">
            <span>© 2026 CanConnect.ca — All rights reserved.</span>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:opacity-100">Privacy Policy</Link>
              <Link to="/terms" className="hover:opacity-100">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
