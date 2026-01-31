import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import copaLogo from "@/assets/copa-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="bg-secondary/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold font-['Poppins',sans-serif] mb-2">Stay Connected</h3>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for updates on our programs and impact stories.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <Button variant="hope" size="lg" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={copaLogo}
                alt="COPA Centre Logo"
                className="w-14 h-14 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg font-['Poppins',sans-serif]">COPA Centre</span>
                <span className="text-xs text-primary-foreground/70">Nurturing Dreams</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Community Pillars Alliance Centre – Empowering Kibera's future leaders through education, nutrition, and community support since 2018.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth" aria-label="Youtube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg font-['Poppins',sans-serif] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Programs", "News", "Get Involved", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-").replace("us", "")}`}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-lg font-['Poppins',sans-serif] mb-4">Our Programs</h4>
            <ul className="space-y-2">
              {["Education", "Feeding Program", "Co-Curricular Activities", "Community Engagement", "Vocational Training"].map((program) => (
                <li key={program}>
                  <Link
                    to="/programs"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                  >
                    {program}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg font-['Poppins',sans-serif] mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  James Nderi Road, Laini-Saba, Kibera, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 shrink-0" />
                <a href="mailto:copacenter21@gmail.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  copacenter21@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 shrink-0" />
                <span className="text-primary-foreground/80">+254 XXX XXX XXX</span>
              </li>
            </ul>
            <Button variant="hero" className="mt-4 w-full" asChild>
              <Link to="/get-involved">
                <Heart className="w-4 h-4" />
                Donate Now
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2026 COPA Centre. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-primary-foreground transition-smooth">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-smooth">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
