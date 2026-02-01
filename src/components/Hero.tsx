import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-grad-portrait.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="COPA Centre graduate"
          className="w-full h-full object-cover object-[center_25%] md:object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute inset-0 bg-primary/10" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float animation-delay-400" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-secondary/5 to-transparent blur-2xl -z-10" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 pt-24">
        <div className="max-w-4xl">
          <ScrollReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md rounded-full px-5 py-2 mb-6 border border-primary-foreground/20">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-primary-foreground text-xs font-bold uppercase tracking-widest">
                Empowering Kibera Since 2018
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-primary-foreground leading-[1.05] mb-6 font-['Poppins',sans-serif] tracking-tight">
              Building a <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-secondary/80 to-secondary/60 italic">Resilient</span> Community
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={400}>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed font-medium">
              Education, Nutrition, and Hope. We believe every child deserves a dignified future, starting with a quality education in the heart of Kibera.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              <Button variant="heroSolid" size="xl" className="shadow-glow px-8 group" asChild>
                <Link to="/about">
                  Our Story
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="hero" size="xl" className="px-8 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10" asChild>
                <Link to="/get-involved">
                  <Heart className="w-5 h-5 text-secondary" />
                  Support Us
                </Link>
              </Button>
              <Button variant="hero" size="xl" className="px-8 bg-transparent border-white/10 hover:border-secondary/50 group" asChild>
                <Link to="/programs" className="flex items-center gap-2">
                  Our Programs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/20 animate-fade-in-up animation-delay-600">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-secondary font-['Poppins',sans-serif]">330+</div>
              <div className="text-primary-foreground/70 text-xs md:text-sm">Students</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-secondary font-['Poppins',sans-serif]">25</div>
              <div className="text-primary-foreground/70 text-xs md:text-sm">Staff</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-secondary font-['Poppins',sans-serif]">8+</div>
              <div className="text-primary-foreground/70 text-xs md:text-sm">Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
