import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Utensils, Users, Trophy, Heart, Target } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const stats = [
  {
    number: "330+",
    label: "Students Enrolled",
    description: "From Preschool to Grade 9",
    icon: GraduationCap,
  },
  {
    number: "25",
    label: "Dedicated Staff",
    description: "Passionate educators",
    icon: Users,
  },
  {
    number: "500+",
    label: "Daily Meals Served",
    description: "Nutritious food daily",
    icon: Utensils,
  },
  {
    number: "8+",
    label: "Years of Impact",
    description: "Transforming lives since 2018",
    icon: Trophy,
  },
];

const ImpactStats = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 font-['Poppins',sans-serif]">
              Making a Difference Every Day
            </h2>
            <p className="text-primary-foreground/80">
              Since 2018, COPA Centre has been committed to transforming lives in Kibera through education, nutrition, and community support.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-secondary" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground font-['Poppins',sans-serif] mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-foreground font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-primary-foreground/60 text-sm">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <ScrollReveal animation="fade-in" delay={400} className="mt-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-secondary" />
            <Target className="w-6 h-6 text-secondary" />
          </div>
          <blockquote className="text-xl md:text-2xl text-primary-foreground/90 italic font-light">
            "Our mission is to empower vulnerable children through education, nutrition, and community support — creating a resilient community where every child can thrive."
          </blockquote>
          <div className="mt-4 text-secondary font-semibold">
            — COPA Centre Vision
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ImpactStats;
