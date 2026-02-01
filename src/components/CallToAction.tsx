import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { storageImages } from "@/lib/storage";
import ScrollReveal from "./ScrollReveal";

const CallToAction = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background with multiple layers */}
      <div className="absolute inset-0">
        <img
          src={storageImages.heroAlt}
          alt="COPA Centre children"
          className="w-full h-full object-cover object-top md:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/80" />
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
      </div>

      {/* Decorative pulse circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-gradient-radial from-secondary/10 to-transparent blur-3xl -z-10 animate-pulse" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <ScrollReveal animation="slide-left">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20">
                <Sparkles className="w-4 h-4 text-secondary" />
                Get Involved
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 font-['Poppins',sans-serif] tracking-tight leading-[1.1]">
                Help Us Build a <span className="italic underline decoration-white/30 underline-offset-8">Brighter</span> Future
              </h2>
              <p className="text-white/90 mb-10 text-lg md:text-xl leading-relaxed font-medium">
                Every contribution transforms a life. Whether you donate your time or resources, you're helping us provide the education and nutrition Kibera's children deserve.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button variant="heroSolid" size="xl" className="shadow-white/20 px-10 group" asChild>
                  <Link to="/get-involved">
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Support Our Mission
                  </Link>
                </Button>
                <Button variant="hero" size="xl" className="px-10 bg-white/15 backdrop-blur-md border-white/30 hover:bg-white/25 text-white" asChild>
                  <Link to="/contact">
                    Partner With Us
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Ways to Help Cards */}
          <div className="space-y-6">
            {[
              {
                icon: Heart,
                title: "Make a Donation",
                description: "Support our programs with a one-time or recurring gift.",
                link: "/get-involved",
                delay: 200,
              },
              {
                icon: Users,
                title: "Become a Volunteer",
                description: "Share your skills and time to make a direct impact.",
                link: "/get-involved",
                delay: 400,
              },
              {
                icon: Calendar,
                title: "Sponsor a Child",
                description: "Provide education and meals for a child for a full year.",
                link: "/get-involved",
                delay: 600,
              },
            ].map((item, index) => (
              <ScrollReveal key={item.title} animation="slide-right" delay={item.delay}>
                <Link
                  to={item.link}
                  className="flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 group shadow-lg"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg transform group-hover:rotate-6 transition-transform">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-white font-['Poppins',sans-serif] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-all shadow-inner">
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
