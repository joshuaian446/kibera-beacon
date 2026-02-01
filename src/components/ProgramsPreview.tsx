import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Utensils, Music, Users, Briefcase, GraduationCap, Heart } from "lucide-react";
import { storageImages } from "@/lib/storage";
import educationStudentImage from "@/assets/education-student.jpg";
import feedingProgramImage from "@/assets/feeding-program-new.jpg";
import ScrollReveal from "./ScrollReveal";

const programs = [
  {
    id: "education",
    title: "Primary Education",
    description: "Quality CBC curriculum from Preschool to Grade 6, providing a solid foundation for Kibera's future leaders.",
    icon: GraduationCap,
    image: educationStudentImage,
    imagePosition: "object-[center_15%]",
    color: "bg-primary",
  },
  {
    id: "feeding",
    title: "Nutrition Program",
    description: "Daily nutritious meals that ensure our students remain healthy, focused, and ready to learn every day.",
    icon: Utensils,
    image: feedingProgramImage,
    imagePosition: "object-[center_35%]",
    color: "bg-secondary",
  },
  {
    id: "holistic",
    title: "Holistic Growth",
    description: "Mentorship, life skills, and co-curricular activities like music and sports for all-round development.",
    icon: Heart,
    image: storageImages.coCurricular,
    imagePosition: "object-center",
    color: "bg-primary",
  }
];

const ProgramsPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <span className="inline-block text-secondary font-extrabold text-sm uppercase tracking-widest mb-4 font-['Poppins',sans-serif]">
              Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 font-['Poppins',sans-serif] tracking-tight">
              Transformative <span className="text-primary italic">Programs</span>
            </h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full mb-8" />
            <p className="text-lg text-muted-foreground/90 leading-relaxed font-['Open_Sans',sans-serif] max-w-2xl mx-auto">
              We provide more than just schooling. Our comprehensive approach addresses the physical, emotional, and intellectual needs of every child.
            </p>
          </div>
        </ScrollReveal>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {programs.map((program, index) => (
            <ScrollReveal key={program.id} animation="fade-up" delay={index * 200}>
              <Card className="group overflow-hidden border-none bg-white shadow-soft hover:shadow-hover transition-all duration-500 rounded-[2.5rem] h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${program.imagePosition}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className={`absolute -bottom-6 right-8 w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center shadow-glow transform group-hover:-translate-y-2 transition-transform duration-500`}>
                    <program.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardContent className="p-10 pt-12 flex-grow flex flex-col">
                  <h3 className="text-2xl font-black text-foreground mb-4 font-['Poppins',sans-serif] group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {program.description}
                  </p>
                  <Link
                    to="/programs"
                    className="inline-flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest border-b-2 border-primary/20 pb-1 group-hover:border-primary transition-all w-fit"
                  >
                    Explore Program <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <ScrollReveal animation="fade-up" delay={600}>
          <div className="mt-16 p-1 bg-gradient-to-r from-primary to-secondary rounded-[3rem] max-w-4xl mx-auto shadow-2xl">
            <div className="bg-white rounded-[2.9rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-foreground font-['Poppins',sans-serif]">Looking for more?</h4>
                  <p className="text-muted-foreground">Discover our full range of community initiatives.</p>
                </div>
              </div>
              <Button variant="hope" size="xl" className="shadow-glow whitespace-nowrap" asChild>
                <Link to="/programs" className="flex items-center gap-2">
                  View All Programs <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProgramsPreview;
