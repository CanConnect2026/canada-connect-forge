import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MapPin, LogOut, User, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer";
import logoFull from "@/assets/canconnect-logo-full.jpg";
import logoIcon from "@/assets/canconnect-icon.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/directory", label: "Find Services" },
  { to: "/events", label: "Events" },
  { to: "/how-to", label: "How-To Guides" },
  { to: "/guides", label: "City Guides" },
];

const secondaryNavLinks: { to: string; label: string }[] = [];


function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/directory?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
      </button>
      {open && (
        <form onSubmit={handleSubmit} className="absolute left-0 right-0 top-full bg-card border-b shadow-md z-50 animate-fade-in">
          <div className="container flex items-center gap-3 py-3">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search services, events, guides..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </>
  );
}

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
      <header className="bg-card border-b sticky top-0 z-50 relative">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoIcon} alt="" className="h-9 w-9" />
            <span className="text-2xl font-heading tracking-tight uppercase">
              <span className="font-extrabold text-foreground">CAN</span><span className="font-semibold text-accent">CONNECT</span>
            </span>
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
            
            {secondaryNavLinks.map(link => (
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

          <div className="hidden lg:flex items-center gap-2">
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
                  <Link to="/partners">List Your Business</Link>
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
              {/* Mobile search */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const q = (formData.get("q") as string)?.trim();
                  if (q) {
                    window.location.href = `/directory?search=${encodeURIComponent(q)}`;
                    setMobileOpen(false);
                  }
                }}
                className="flex items-center gap-2 bg-background rounded-md px-3 py-2 mb-2"
              >
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  name="q"
                  type="text"
                  placeholder="Search services..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </form>

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


              {secondaryNavLinks.map(link => (
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

              {/* Help Centre in mobile */}
              <Link
                to="/help"
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                  location.pathname === "/help" ? "bg-secondary text-foreground" : "text-muted-foreground"
                }`}
              >
                Help Centre
              </Link>

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
                      <Link to="/partners" onClick={() => setMobileOpen(false)}>List Your Business</Link>
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
