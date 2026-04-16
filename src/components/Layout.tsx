import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MapPin, LogOut, User, Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer";
import logoFull from "@/assets/canconnect-logo-full.jpg";
import logoIcon from "@/assets/canconnect-icon.png";
import CrossProjectBar from "@/components/CrossProjectBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/directory", label: "Services" },
  { to: "https://taste-to-trails.lovable.app", label: "Explore Food", external: true },
  { to: "/events", label: "Community" },
  { to: "/partners", label: "For Businesses" },
];

const resourceLinks = [
  { to: "/how-to", label: "How-To Guides" },
  { to: "/guides", label: "City Guides" },
  { to: "/checklist/permanent-resident", label: "Newcomer Checklists" },
];

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
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  // Close resources dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setResourcesOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cross-project ecosystem bar */}
      <CrossProjectBar />
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
            <img src={logoIcon} alt="" className="h-8 w-8" />
            <span className="text-[1.7rem] font-heading tracking-tight uppercase leading-none">
              <span className="font-extrabold text-foreground">CAN</span><span className="font-semibold text-accent">CONNECT</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link =>
              link.external ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  {link.label}
                </a>
              ) : (
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
              )
            )}

            {/* Resources dropdown */}
            <div ref={resourcesRef} className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                  resourceLinks.some(l => location.pathname.startsWith(l.to.split('/').slice(0, 2).join('/')))
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Resources
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-card border rounded-md shadow-lg py-1 z-50 animate-fade-in">
                  {resourceLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        location.pathname.startsWith(link.to.split('/').slice(0, 2).join('/'))
                          ? "bg-secondary text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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


              {/* Resources section */}
              <div className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">Resources</div>
              {resourceLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium ${
                    location.pathname.startsWith(link.to.split('/').slice(0, 2).join('/')) ? "bg-secondary text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
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
