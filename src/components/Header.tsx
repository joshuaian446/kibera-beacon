import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-smooth group-hover:shadow-hover">
              <span className="text-primary-foreground font-bold text-lg font-['Poppins',sans-serif]">C</span>
            </div>
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
                Community Pillars Alliance
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
            "lg:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          )}
        >
          <div className="bg-card rounded-lg shadow-card p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg font-medium transition-smooth font-['Poppins',sans-serif]",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="hope" className="w-full mt-4" asChild>
              <Link to="/get-involved" onClick={() => setIsMobileMenuOpen(false)}>
                <Heart className="w-4 h-4" />
                Donate Now
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
