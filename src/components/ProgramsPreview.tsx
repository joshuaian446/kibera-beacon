import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Utensils, Music, Users, Briefcase } from "lucide-react";
import { storageImages } from "@/lib/storage";
import educationStudentImage from "@/assets/education-student.jpg";
import feedingProgramImage from "@/assets/feeding-program-new.jpg";
import ScrollReveal from "./ScrollReveal";

const programs = [
  {
    id: "education",
    title: "Education",
    description: "Award-winning primary school from Play Group to Grade 6, following Kenya's CBC curriculum with tutoring support.",
    icon: BookOpen,
    image: educationStudentImage,
    imagePosition: "object-[center_15%]", // Focus on face at top
    color: "bg-primary",
  },
  {
    id: "feeding",
    title: "Feeding Program",
    description: "Daily nutritious meals ensuring our students stay healthy, focused, and ready to learn.",
    icon: Utensils,
    image: feedingProgramImage,
    imagePosition: "object-[center_35%]", // Focus on faces in group
    color: "bg-secondary",
  },
  {
    id: "co-curricular",
    title: "Co-Curricular Activities",
    description: "Music, chess, sports, and arts programs nurturing creativity and holistic development.",
    icon: Music,
    image: storageImages.coCurricular,
    imagePosition: "object-center",
    color: "bg-primary",
  },
  {
    id: "community",
    title: "Community Engagement",
    description: "Workshops and events supporting families and strengthening community bonds.",
    icon: Users,
    image: storageImages.community,
    imagePosition: "object-center",
    color: "bg-secondary",
  },
  {
    id: "vocational",
    title: "Vocational Training",
    description: "Life skills and entrepreneurship programs preparing youth for economic independence.",
    icon: Briefcase,
    image: storageImages.vocational,
    imagePosition: "object-center",
    color: "bg-primary",
  },
];

const ProgramsPreview = () => {
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
              Our Programs
            </h2>
            <p className="text-muted-foreground">
              Comprehensive programs designed to nurture, educate, and empower every child in our community.
            </p>
          </div>
        </ScrollReveal>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.slice(0, 3).map((program, index) => (
            <Card key={program.id} variant="program" className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${program.imagePosition}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className={`absolute top-4 left-4 w-12 h-12 ${program.color} rounded-lg flex items-center justify-center shadow-card`}>
                  <program.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 font-['Poppins',sans-serif]">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {program.description}
                </p>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {programs.slice(3).map((program, index) => (
            <Card key={program.id} variant="program" className="animate-fade-in-up" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
              <div className="flex flex-col sm:flex-row">
                <div className="relative sm:w-1/3 h-32 sm:h-auto overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${program.imagePosition}`}
                  />
                </div>
                <CardContent className="p-6 sm:w-2/3">
                  <div className={`w-10 h-10 ${program.color} rounded-lg flex items-center justify-center shadow-soft mb-3`}>
                    <program.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-['Poppins',sans-serif]">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {program.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal animation="fade-in" delay={400} className="text-center mt-12">
          <Button variant="cta" size="lg" asChild>
            <Link to="/programs">
              View All Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProgramsPreview;
