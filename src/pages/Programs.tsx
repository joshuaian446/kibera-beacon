import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Utensils, Music, Users, Briefcase, Heart, CheckCircle, ArrowRight } from "lucide-react";
import { storageImages } from "@/lib/storage";
import educationStudentImage from "@/assets/education-student.jpg";
import feedingProgramImage from "@/assets/feeding-program-new.jpg";
import programsHeroImage from "@/assets/programs-hero.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const programs = [
  {
    id: "education",
    title: "Education",
    subtitle: "CBC Curriculum Excellence",
    description: "Our award-winning school provides quality education from Preschool through Grade 9, following Kenya's Competency-Based Curriculum (CBC). We offer tutoring support and personalized attention to ensure every child succeeds.",
    features: [
      "Preschool, Primary (G1-6) & Junior (G7-9)",
      "CBC-aligned learning",
      "Individual tutoring support",
      "Tech-integrated classrooms",
      "Qualified dedicated teachers",
    ],
    icon: BookOpen,
    image: educationStudentImage,
    imagePosition: "object-[center_15%]",
    color: "bg-primary",
  },
  {
    id: "feeding",
    title: "Feeding Program",
    subtitle: "Nourishing Bodies & Minds",
    description: "Proper nutrition is essential for learning. Our daily feeding program ensures every student receives nutritious meals, helping them stay healthy, focused, and ready to learn.",
    features: [
      "Daily nutritious meals",
      "Balanced diet planning",
      "Clean water access",
      "Health monitoring",
      "Food security for families",
    ],
    icon: Utensils,
    image: feedingProgramImage,
    imagePosition: "object-[center_35%]",
    color: "bg-secondary",
  },
  {
    id: "co-curricular",
    title: "Co-Curricular Activities",
    subtitle: "Holistic Development",
    description: "Beyond academics, we nurture creativity and physical development through diverse co-curricular activities including music, chess, sports, and arts programs.",
    features: [
      "Music and choir",
      "Chess club",
      "Sports programs",
      "Arts and crafts",
      "Drama and performance",
    ],
    icon: Music,
    image: storageImages.coCurricular,
    imagePosition: "object-center",
    color: "bg-primary",
  },
  {
    id: "community",
    title: "Community Engagement",
    subtitle: "Strengthening Families",
    description: "We believe in the power of community. Our engagement programs bring families together through workshops, events, and support services that strengthen the entire community.",
    features: [
      "Parent workshops",
      "Community events",
      "Family counseling",
      "Health awareness programs",
      "Support networks",
    ],
    icon: Users,
    image: storageImages.community,
    imagePosition: "object-center",
    color: "bg-secondary",
  },
  {
    id: "vocational",
    title: "Vocational Training",
    subtitle: "Skills for Independence",
    description: "Preparing youth for economic independence through life skills and entrepreneurship training. Our programs equip young people with practical skills for future success.",
    features: [
      "Life skills training",
      "Entrepreneurship basics",
      "Financial literacy",
      "Career guidance",
      "Mentorship programs",
    ],
    icon: Briefcase,
    image: storageImages.vocational,
    imagePosition: "object-center",
    color: "bg-primary",
  },
];

const Programs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={programsHeroImage}
              alt="COPA Centre children with balloons"
              className="w-full h-full object-cover object-[center_50%]"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-primary-foreground/90 text-sm font-medium uppercase tracking-wider">
                    Our Programs
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-6 font-['Poppins',sans-serif] leading-tight tracking-tight">
                  Comprehensive Programs <br className="hidden md:block" /> for <span className="text-secondary italic">Holistic Growth</span>
                </h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-2xl font-['Open_Sans',sans-serif]">
                  From education to nutrition, from arts to vocational training — we provide everything our students need to thrive and become future leaders.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Decorative Floaties */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" />
        </section>

        {/* Programs List */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
          <div className="container mx-auto px-4 relative">
            <div className="space-y-32">
              {programs.map((program, index) => (
                <ScrollReveal
                  key={program.id}
                  animation={index % 2 === 0 ? "slide-left" : "slide-right"}
                >
                  <div
                    id={program.id}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                      }`}
                  >
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className={`w-20 h-20 ${program.color} rounded-3xl flex items-center justify-center mb-8 shadow-card transform -rotate-3 hover:rotate-0 transition-transform duration-500`}>
                        <program.icon className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
                        {program.subtitle}
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mt-2 mb-6 font-['Poppins',sans-serif] leading-tight">
                        {program.title}
                      </h2>
                      <p className="text-lg text-muted-foreground/90 leading-relaxed mb-8 font-['Open_Sans',sans-serif]">
                        {program.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {program.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/50 group hover:border-primary/20 transition-colors">
                            <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                            <span className="text-foreground font-medium text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="hope" size="xl" className="shadow-glow group" asChild>
                        <Link to="/get-involved">
                          Support This Program
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                    <div className={`${index % 2 === 1 ? "lg:order-1" : ""} relative group`}>
                      <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                        <img
                          src={program.image}
                          alt={program.title}
                          className={`w-full h-full object-cover ${program.imagePosition}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className={`absolute -bottom-8 -right-8 w-32 h-32 ${program.color} rounded-[2rem] shadow-hover -z-10 transform rotate-12 animate-pulse opacity-40`} />
                      <div className="absolute -top-8 -left-8 w-24 h-24 bg-secondary/20 rounded-full blur-2xl -z-10" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-foreground/5 skew-y-3 transform origin-bottom-left" />
          <div className="container mx-auto px-4 text-center relative">
            <ScrollReveal animation="fade-up">
              <h2 className="text-4xl md:text-5xl font-black text-primary-foreground mb-8 font-['Poppins',sans-serif] tracking-tight">
                Help Us Expand Our <span className="text-secondary italic">Reach</span>
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-12 leading-relaxed font-['Open_Sans',sans-serif]">
                Your support enables us to reach more children and strengthen our vocational, educational and nutritional programs. Every contribution makes a tangible difference.
              </p>
              <Button variant="heroSolid" size="xl" className="shadow-glow px-12" asChild>
                <Link to="/get-involved">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate & Support Now
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;
