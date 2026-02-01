import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Target, Eye, Award, Users, Calendar, ArrowRight, ChevronDown, ChevronUp, BookOpen, Utensils, Zap, Lightbulb, ShieldAlert, GraduationCap, Activity, Users2, Landmark, Rocket, TrendingUp } from "lucide-react";
import { storageImages } from "@/lib/storage";
import aboutHeroImage from "@/assets/about-hero.jpg";
import { useCountUp } from "@/hooks/useCountUp";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";

const CountUpStat = ({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) => {
  const { count, ref } = useCountUp({ end, duration: 2000 });
  return (
    <div ref={ref}>
      <div className="text-4xl md:text-5xl font-bold text-white font-['Poppins',sans-serif] mb-2">
        {count}{suffix}
      </div>
      <div className="text-white">{label}</div>
    </div>
  );
};

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const storyImage = storageImages.hero;
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={aboutHeroImage}
              alt="COPA Centre students playing sports"
              className="w-full h-full object-cover object-[center_30%] md:object-[center_50%]"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl">
                <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                  About Us
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 font-['Poppins',sans-serif]">
                  Our Story of Hope and Resilience
                </h1>
                <p className="text-xl text-primary-foreground/85">
                  Founded in 2018, COPA Centre emerged from a simple but powerful belief: every child in Kibera deserves access to quality education and a chance to thrive.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal animation="slide-left">
                <div>
                  <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                    Our Beginning
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-['Poppins',sans-serif]">
                    From Street Children to Future Leaders
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Community Pillars Alliance (COPA) Centre was established in January 2018 by Clement Ombati, a dedicated community officer deeply concerned about the plight of street children in the Kibera slums.
                    </p>
                    <p>
                      Recognizing the urgent need for support and stability, Ombati rented a structure to provide children with a safe place to stay and access to quality education. What started as a small effort to help a handful of vulnerable children has grown into a comprehensive community center serving over 330 students.
                    </p>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="space-y-4 pt-4 border-t border-border mt-4">
                        <p>
                          Founded as a Community-Based Organization (CBO), COPA aimed to address the significant challenges faced by children from disadvantaged backgrounds. Over the years, we have grown substantially, expanding our initiatives to include a range of educational and socio-economic programs.
                        </p>
                        <p>
                          Currently, COPA serves approximately 330 students from Play Group to Grade Six. Our dedicated team of 25 staff members ensures a low student-to-teacher ratio, allowing for personalized attention and tailored instruction.
                        </p>
                        <p>
                          The school operates an award-winning primary school within the slums, which follows the Kenyan Competence-Based Curriculum (C.B.C). Our unique approach integrates technology with traditional education, preparing our students not just for academic success, but for life in the modern world.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex items-center gap-2 text-primary font-bold hover:underline transition-all mt-6"
                    >
                      {isExpanded ? (
                        <>Show Less <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>Read Our Whole History <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="slide-right">
                <div className="relative aspect-[4/3]">
                  <img
                    src={storyImage}
                    alt="COPA Centre students"
                    className="rounded-2xl shadow-card w-full h-full object-cover object-[center_30%]"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-secondary rounded-xl p-6 shadow-hover">
                    <div className="text-3xl font-bold text-secondary-foreground font-['Poppins',sans-serif]">2018</div>
                    <div className="text-secondary-foreground/80">Year Founded</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-gradient-warm">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                  What Drives Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
                  Mission, Vision & Values
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal animation="fade-up" delay={0}>
                <Card variant="elevated" className="text-center h-full hover:shadow-hover transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                      <Target className="w-8 h-8 text-primary-foreground transform -rotate-3" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To empower vulnerable children through education and community support, fostering their growth as future leaders and catalysts for positive change.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100}>
                <Card variant="elevated" className="text-center h-full hover:shadow-hover transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                      <Eye className="w-8 h-8 text-secondary-foreground transform rotate-3" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To build a resilient community where every child has the opportunity to thrive academically, socially, and personally, becoming empowered agents of change.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200}>
                <Card variant="elevated" className="text-center h-full hover:shadow-hover transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-6">
                      <Heart className="w-8 h-8 text-primary-foreground transform -rotate-6" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">Our Values</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Compassion, excellence, and innovation guide us. We believe in the inherent potential of every child and the power of collaborative community.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Our Objectives */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                  Our Roadmap
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
                  Core Objectives
                </h2>
                <p className="text-muted-foreground">
                  Our strategic goals focused on creating lasting impact in the Kibera community.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <GraduationCap className="w-6 h-6" />,
                  title: "Increase Education Access",
                  desc: "Ensuring quality education through scholarships, infrastructure, and innovative learning programs."
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Enhance Academic Performance",
                  desc: "Targeted support including tutoring, mentoring, and diverse extracurricular activities."
                },
                {
                  icon: <Activity className="w-6 h-6" />,
                  title: "Promote Health & Well-being",
                  desc: "Health and nutrition initiatives including clean water, balanced meals, and basic healthcare."
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Empowerment via Life Skills",
                  desc: "Equipping children with critical thinking, problem-solving, and leadership abilities."
                },
                {
                  icon: <Users2 className="w-6 h-6" />,
                  title: "Community Engagement",
                  desc: "Fostering strong partnerships through parent workshops and local outreach programs."
                },
                {
                  icon: <Landmark className="w-6 h-6" />,
                  title: "Economic Empowerment",
                  desc: "Vocational training and entrepreneurship opportunities for youth to enhance employability."
                },
              ].map((obj, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 50}>
                  <Card className="h-full border-none bg-primary/5 hover:bg-primary/10 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-4">
                        {obj.icon}
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-2 font-['Poppins',sans-serif]">{obj.title}</h4>
                      <p className="text-sm text-muted-foreground">{obj.desc}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Approach */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal animation="slide-left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-primary/10 p-6 rounded-2xl aspect-square flex flex-col justify-center text-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Rocket className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="font-bold text-foreground font-['Poppins',sans-serif]">Tech Integration</span>
                    </div>
                    <div className="bg-secondary p-6 rounded-2xl aspect-square flex flex-col justify-center text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lightbulb className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-white font-['Poppins',sans-serif]">Individual Talent</span>
                    </div>
                  </div>
                  <div className="pt-8 space-y-4">
                    <div className="bg-primary p-6 rounded-2xl aspect-square flex flex-col justify-center text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-white font-['Poppins',sans-serif]">C.B.C Curriculum</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="slide-right">
                <div>
                  <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                    Our Difference
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-['Poppins',sans-serif]">
                    A Unique Approach to Learning
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      COPA Centre distinguishes itself through an innovative approach that prepares students for the demands of the modern world. We heavily integrate technology into our curriculum, ensuring our students are digitally literate from a young age.
                    </p>
                    <p>
                      Additionally, we emphasize the significance of individual talents. Beyond the standard curriculum, we provide diverse co-curricular opportunities in music, chess, and sports, ensuring every child can excel in areas where they are naturally gifted.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-20 bg-background overflow-hidden relative">
          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl">
                <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                  The Reality
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-['Poppins',sans-serif]">
                  Overcoming Challenges
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">1</div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Financial Sustainability</h4>
                        <p className="text-sm text-muted-foreground">Ensuring stable funding to support ongoing operations and future expansion is an ongoing challenge as we rely heavily on donations.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">2</div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Resource Constraints</h4>
                        <p className="text-sm text-muted-foreground">Limited availability of staff, facilities, and educational materials hinders our ability to provide support to every child in need.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">3</div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Space Constraints</h4>
                        <p className="text-sm text-muted-foreground">The densely populated Kibra slums present space challenges. Overcrowded facilities limit our ability to accommodate more children.</p>
                      </div>
                    </div>
                    <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/20">
                      <div className="flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-secondary shrink-0 mt-1" />
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                          "We are actively seeking like-minded individuals and organizations who share our passion for empowering vulnerable children to join us in overcoming these barriers."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
                Meet Our Director
              </h2>
            </div>

            <Card variant="elevated" className="max-w-3xl mx-auto">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-4xl font-bold text-primary font-['Poppins',sans-serif]">CO</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-['Poppins',sans-serif]">Clement Ombati</h3>
                    <p className="text-secondary font-semibold mb-4">Founder & Director</p>
                    <p className="text-muted-foreground">
                      Clement founded COPA Centre with a vision to transform the lives of vulnerable children in Kibera. His dedication and leadership have built the organization from the ground up, creating a beacon of hope for hundreds of children and their families.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <CountUpStat end={330} suffix="+" label="Students" />
              <CountUpStat end={25} label="Staff" />
              <CountUpStat end={8} suffix="+" label="Years" />
              <CountUpStat end={10} label="Levels" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-['Poppins',sans-serif]">
              Be Part of Our Story
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join us in making a difference. Every contribution, no matter how small, helps us continue our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hope" size="xl" asChild>
                <Link to="/get-involved">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
