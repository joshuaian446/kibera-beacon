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

const programs = [
  {
    id: "education",
    title: "Education",
    subtitle: "CBC Curriculum Excellence",
    description: "Our award-winning primary school provides quality education from Play Group to Grade 6, following Kenya's Competency-Based Curriculum (CBC). We offer tutoring support and personalized attention to ensure every child succeeds.",
    features: [
      "Play Group to Grade 6 curriculum",
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
        <section className="relative pt-40 pb-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={programsHeroImage}
              alt="COPA Centre children with balloons"
              className="w-full h-full object-cover object-[center_10%] md:object-[center_15%]"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                Our Programs
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 font-['Poppins',sans-serif]">
                Comprehensive Programs for Holistic Development
              </h1>
              <p className="text-xl text-primary-foreground/85">
                From education to nutrition, from arts to vocational training — we provide everything our students need to thrive.
              </p>
            </div>
          </div>
        </section>

        {/* Programs List */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {programs.map((program, index) => (
                <div
                  key={program.id}
                  id={program.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className={`w-14 h-14 ${program.color} rounded-xl flex items-center justify-center mb-6 shadow-card`}>
                      <program.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className="text-secondary font-semibold text-sm uppercase tracking-wider font-['Poppins',sans-serif]">
                      {program.subtitle}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 font-['Poppins',sans-serif]">
                      {program.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {program.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {program.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="cta" asChild>
                      <Link to="/get-involved">
                        Support This Program
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative aspect-[4/3]">
                      <img
                        src={program.image}
                        alt={program.title}
                        className={`rounded-2xl shadow-card w-full h-full object-cover ${program.imagePosition}`}
                      />
                      <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${program.color} rounded-xl shadow-hover`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 font-['Poppins',sans-serif]">
              Help Us Expand Our Programs
            </h2>
            <p className="text-primary-foreground/85 max-w-2xl mx-auto mb-8">
              Your support enables us to reach more children and strengthen our programs. Every contribution makes a difference.
            </p>
            <Button variant="heroSolid" size="xl" asChild>
              <Link to="/get-involved">
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;
