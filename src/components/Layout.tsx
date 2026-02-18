import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer";
import logoFull from "@/assets/canconnect-logo-full.jpg";
import logoIcon from "@/assets/canconnect-icon.png";

const navLinks = [
  { to: "/", label: "Find Services" },
  { to: "/map", label: "Map" },
  { to: "/events", label: "Events" },
  { to: "/how-to", label: "How-To Guides" },
  { to: "/guides", label: "City Guides" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/about", label: "About Us" },
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
          <Link to="/" className="flex items-center gap-2">
            <img src={logoIcon} alt="" className="h-8 w-8" />
            <div className="flex flex-col leading-none">
              <span className="text-xl tracking-tight uppercase text-foreground">
                <span className="font-bold">CAN</span><span className="font-normal">CONNECT</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold">
                Arrive. Connect. Thrive.
              </span>
            </div>
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
      <Footer />
    </div>
  );
}
