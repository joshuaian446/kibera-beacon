import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import copaLogo from "@/assets/copa-logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Programs", path: "/programs" },
  { name: "News", path: "/news" },
  { name: "Get Involved", path: "/get-involved" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-smooth",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={copaLogo}
              alt="COPA Centre Logo"
              className="w-12 h-12 object-contain transition-smooth group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className={cn(
                "font-bold text-lg font-['Poppins',sans-serif] transition-smooth",
                isScrolled ? "text-foreground" : "text-primary-foreground lg:text-primary-foreground text-foreground"
              )}>
                COPA Centre
              </span>
              <span className={cn(
                "text-xs transition-smooth -mt-1",
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/80 lg:text-primary-foreground/80 text-muted-foreground"
              )}>
                Nurturing Dreams
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-smooth relative py-2 font-['Poppins',sans-serif]",
                  location.pathname === link.path
                    ? isScrolled
                      ? "text-primary"
                      : "text-secondary"
                    : isScrolled
                      ? "text-foreground hover:text-primary"
                      : "text-primary-foreground/90 hover:text-primary-foreground",
                  "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full",
                  location.pathname === link.path && "after:w-full"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hope" size="lg" asChild>
              <Link to="/get-involved">
                <Heart className="w-4 h-4" />
                Donate Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-smooth",
              isScrolled
                ? "text-foreground hover:bg-muted"
                : "text-primary-foreground hover:bg-primary-foreground/10"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden fixed inset-x-4 top-20 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-[1.5rem] border border-white/20 shadow-xl p-5 space-y-3 relative overflow-hidden">
            {/* Background Decorative Blob */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-xl" />

            <div className="flex flex-col gap-1 relative">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ transitionDelay: `${index * 40}ms` }}
                  className={cn(
                    "flex items-center justify-between px-5 py-3 rounded-xl font-bold text-base transition-all duration-300 font-['Poppins',sans-serif]",
                    location.pathname === link.path
                      ? "bg-primary text-white shadow-md"
                      : "text-foreground hover:bg-primary/5"
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && <Heart className="w-4 h-4 fill-white" />}
                </Link>
              ))}
              <div className="pt-3 border-t border-border/50 mt-1">
                <Button variant="hope" size="lg" className="w-full shadow-glow py-6 rounded-xl text-base" asChild>
                  <Link to="/get-involved" onClick={() => setIsMobileMenuOpen(false)}>
                    <Heart className="w-4 h-4 mr-2" />
                    Donate Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop for Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
