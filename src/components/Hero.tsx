import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-students-recorders.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="COPA Centre students with recorders"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/25 to-transparent" />
        <div className="absolute inset-0 bg-primary/10" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float animation-delay-400" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 pt-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-primary-foreground/90 text-sm font-medium">
              Transforming Lives in Kibera Since 2012
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 font-['Poppins',sans-serif] animate-fade-in-up animation-delay-200">
            Empowering Kibera's{" "}
            <span className="text-secondary">Future Leaders</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-2xl animate-fade-in-up animation-delay-400">
            Education, Nutrition, Hope — Building a resilient community where every child has the opportunity to thrive and reach their full potential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
            <Button variant="heroSolid" size="xl" asChild>
              <Link to="/programs">
                Our Programs
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero" size="xl" className="animate-pulse-glow" asChild>
              <Link to="/get-involved">
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/20 animate-fade-in-up animation-delay-600">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-secondary font-['Poppins',sans-serif]">330+</div>
              <div className="text-primary-foreground/70 text-sm">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-secondary font-['Poppins',sans-serif]">25</div>
              <div className="text-primary-foreground/70 text-sm">Dedicated Staff</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-secondary font-['Poppins',sans-serif]">12+</div>
              <div className="text-primary-foreground/70 text-sm">Years of Impact</div>
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
