import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Utensils, Users, Trophy, Heart, Target, Star, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const CountUpStat = ({ end, suffix = "", label, icon: Icon, color }: { end: number; suffix?: string; label: string; icon: any; color: string }) => {
  const { count, ref } = useCountUp({ end, duration: 2500 });
  return (
    <div ref={ref} className="text-center group">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow transform group-hover:rotate-12 transition-transform duration-500`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-5xl md:text-6xl font-black text-white font-['Poppins',sans-serif] mb-2 tracking-tighter">
        {count}{suffix}
      </div>
      <div className="text-primary-foreground/90 font-bold uppercase tracking-widest text-xs">
        {label}
      </div>
    </div>
  );
};

const ImpactStats = () => {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 bg-primary-foreground/5 skew-y-3 transform origin-bottom-left" />
      <div className="absolute top-0 right-0 w-[50%] h-full bg-white/5 -skew-x-12 transform origin-top" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-20 text-white">
            <span className="inline-block text-secondary font-extrabold text-sm uppercase tracking-widest mb-4 font-['Poppins',sans-serif]">
              Measured Results
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 font-['Poppins',sans-serif] tracking-tight">
              Our Growing <span className="text-secondary italic">Impact</span>
            </h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          <ScrollReveal animation="fade-up" delay={100}>
            <CountUpStat end={330} suffix="+" label="Students Enrolled" icon={GraduationCap} color="bg-secondary" />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <CountUpStat end={25} label="Dedicated Staff" icon={Users} color="bg-white/20" />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300}>
            <CountUpStat end={8} suffix="+" label="Years of Impact" icon={Star} color="bg-secondary" />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={400}>
            <CountUpStat end={500} suffix="+" label="Daily Meals" icon={Utensils} color="bg-white/20" />
          </ScrollReveal>
        </div>

        {/* Mission Statement High-Impact Card */}
        <ScrollReveal animation="scale-up" delay={600}>
          <div className="mt-24 max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-[3rem] p-10 md:p-16 text-center transform hover:scale-[1.02] transition-transform duration-500">
            <div className="flex items-center justify-center gap-4 mb-8">
              <ShieldCheck className="w-10 h-10 text-secondary" />
              <div className="w-12 h-px bg-white/30" />
              <Heart className="w-10 h-10 text-secondary animate-pulse" />
            </div>
            <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed font-['Poppins',sans-serif] italic mb-8">
              "We are building a resilient community where every child has the safety, nutrition, and education they need to flourish."
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-secondary rounded-full text-white font-bold text-sm uppercase tracking-widest">
              The COPA Mission
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ImpactStats;
