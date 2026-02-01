import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Target, Eye, Award, Users, Calendar, ArrowRight, ChevronDown, ChevronUp, BookOpen, Utensils, Zap, Lightbulb, ShieldAlert, GraduationCap, Activity, Users2, Landmark, Rocket, TrendingUp } from "lucide-react";
import { storageImages } from "@/lib/storage";
import aboutHeroImage from "@/assets/about-hero.jpg";
import clementImage from "@/assets/clement-ombati.jpg";
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
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const storyImage = storageImages.hero;
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
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
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-primary-foreground/90 text-sm font-medium uppercase tracking-wider">
                    Our Story
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 font-['Poppins',sans-serif] leading-tight tracking-tight">
                  A Journey of Hope <br className="hidden md:block" /> and Resilience
                </h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-2xl font-['Open_Sans',sans-serif]">
                  Founded in 2018, COPA Centre emerged from a simple but powerful belief: every child in Kibera deserves access to quality education and a chance to thrive.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Decorative Floaties */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" />
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
        <section className="py-24 md:py-32 bg-gradient-warm relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-right" />
          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-20">
                <span className="inline-block text-secondary font-bold text-sm uppercase tracking-widest mb-4 font-['Poppins',sans-serif]">
                  What Drives Us
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-['Poppins',sans-serif] tracking-tight">
                  Mission, Vision & Values
                </h2>
                <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: <Target className="w-8 h-8 text-white" />,
                  title: "Our Mission",
                  color: "bg-primary",
                  desc: "To empower vulnerable children through education and community support, fostering their growth as future leaders and catalysts for positive change."
                },
                {
                  icon: <Eye className="w-8 h-8 text-white" />,
                  title: "Our Vision",
                  color: "bg-secondary",
                  desc: "To build a resilient community where every child has the opportunity to thrive academically, socially, and personally, becoming empowered agents of change."
                },
                {
                  icon: <Heart className="w-8 h-8 text-white" />,
                  title: "Our Values",
                  color: "bg-primary",
                  desc: "Compassion, excellence, and innovation guide us. We believe in the inherent potential of every child and the power of collaborative community."
                }
              ].map((item, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                  <Card className="text-center h-full hover:shadow-hover hover:-translate-y-2 transition-all duration-500 border-none bg-white p-2 group">
                    <CardContent className="p-8">
                      <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-card transform rotate-6 group-hover:rotate-12 transition-transform duration-500`}>
                        <div className="transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed font-['Open_Sans',sans-serif]">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Our Objectives */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden text-center">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-20">
                <span className="inline-block text-secondary font-extrabold text-sm uppercase tracking-widest mb-4 font-['Poppins',sans-serif]">
                  Our Roadmap
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 font-['Poppins',sans-serif] tracking-tight">
                  Core Objectives
                </h2>
                <p className="text-lg text-muted-foreground/90 max-w-xl mx-auto font-['Open_Sans',sans-serif]">
                  Our strategic goals focused on creating lasting positive impact in the heart of the Kibera community.
                </p>
                <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full mt-8" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <GraduationCap className="w-8 h-8" />,
                  title: "Increase Education Access",
                  desc: "Ensuring all children have access to quality education through scholarships and robust school infrastructure."
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Enhance Academic Performance",
                  desc: "Improvement through targeted support programs, specialized tutoring, and mentorship sessions."
                },
                {
                  icon: <Activity className="w-8 h-8" />,
                  title: "Promote Health & Well-being",
                  desc: "Strategic nutrition initiatives ensuring access to clean water, balanced meals, and regular healthcare."
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Empowerment via Life Skills",
                  desc: "Equipping youth with critical thinking, effective communication, and modern problem-solving abilities."
                },
                {
                  icon: <Users2 className="w-8 h-8" />,
                  title: "Community Partnerships",
                  desc: "Fostering strong engagement through parent workshops, local events, and dedicated outreach programs."
                },
                {
                  icon: <Landmark className="w-8 h-8" />,
                  title: "Economic Empowerment",
                  desc: "Providing vocational training and realistic entrepreneurship opportunities to enhance long-term employability."
                },
              ].map((obj, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 50}>
                  <Card className="h-full border-none bg-primary/5 hover:bg-white hover:shadow-hover hover:-translate-y-2 transition-all duration-500 group">
                    <CardContent className="p-10 text-center flex flex-col items-center">
                      <div className="w-20 h-20 bg-white rounded-3xl shadow-soft flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                        {obj.icon}
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">{obj.title}</h4>
                      <p className="text-muted-foreground/90 leading-relaxed font-['Open_Sans',sans-serif] italic">{obj.desc}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Approach */}
        <section className="py-24 md:py-32 bg-primary/5 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <ScrollReveal animation="slide-left">
                <div className="grid grid-cols-2 gap-6 relative">
                  <div className="space-y-6 pt-12">
                    <div className="bg-white p-8 rounded-[2rem] shadow-soft text-center group hover:-translate-y-2 transition-transform duration-500">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Rocket className="w-8 h-8 text-primary" />
                      </div>
                      <span className="font-extrabold text-foreground font-['Poppins',sans-serif] block uppercase tracking-wider text-xs">Tech-Integrated</span>
                    </div>
                    <div className="bg-secondary p-8 rounded-[2rem] shadow-glow text-center group hover:-translate-y-2 transition-all duration-500">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Lightbulb className="w-8 h-8 text-white" />
                      </div>
                      <span className="font-extrabold text-white font-['Poppins',sans-serif] block tracking-widest text-xs uppercase">Talent Focus</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-primary p-10 rounded-[2.5rem] shadow-xl text-center group hover:-translate-y-2 transition-all duration-500">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <BookOpen className="w-10 h-10 text-white" />
                      </div>
                      <span className="font-extrabold text-white font-['Poppins',sans-serif] block text-lg uppercase tracking-widest">C.B.C Curriculum</span>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-soft border border-primary/5 group hover:border-primary/20 transition-all">
                      <div className="text-[10px] font-black text-primary mb-3 uppercase tracking-[0.2em]">Our Secret Sauce</div>
                      <div className="text-sm font-bold text-foreground leading-relaxed italic">"Tailoring world-class education to individual brilliance, from Preschool to Graduation."</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="slide-right">
                <div className="lg:pl-8">
                  <span className="inline-block text-secondary font-extrabold text-sm uppercase tracking-widest mb-4 font-['Poppins',sans-serif]">
                    Our Difference
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-8 font-['Poppins',sans-serif] leading-tight tracking-tight">
                    An Innovative Approach <br /> to <span className="text-primary italic">Kibera Learning</span>
                  </h2>
                  <div className="space-y-6 text-muted-foreground/90 leading-relaxed text-lg font-['Open_Sans',sans-serif]">
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
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                <div>
                  <span className="inline-block text-secondary font-extrabold text-sm uppercase tracking-widest mb-4 font-['Poppins',sans-serif]">
                    The Reality
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-8 font-['Poppins',sans-serif] leading-tight">
                    Overcoming the <br /> <span className="text-secondary underline decoration-primary decoration-4 underline-offset-8">Toughest Barriers</span>
                  </h2>
                  <p className="text-lg text-muted-foreground/90 mb-12 max-w-xl font-['Open_Sans',sans-serif] leading-relaxed">
                    Operating in one of the world's most challenging environments requires resilience, creativity, and unwavering support.
                  </p>

                  <div className="relative p-10 bg-primary rounded-[3rem] shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative flex items-start gap-6">
                      <ShieldAlert className="w-10 h-10 text-white shrink-0 mt-1" />
                      <div>
                        <p className="text-lg text-white font-medium leading-relaxed italic mb-4 font-['Open_Sans',sans-serif]">
                          "We are actively seeking like-minded individuals and organizations who share our passion for empowering vulnerable children to join us in overcoming these barriers."
                        </p>
                        <Button variant="hero" size="sm" className="bg-white text-primary hover:bg-white/90 shadow-soft" asChild>
                          <Link to="/get-involved">Partner With Us</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      id: "01",
                      title: "Financial Sustainability",
                      desc: "Ensuring stable funding for ongoing operations is our primary challenge as we rely heavily on external donations and partnerships."
                    },
                    {
                      id: "02",
                      title: "Resource Constraints",
                      desc: "The scarcity of specialized staff, modern facilities, and updated educational materials limits our potential to serve every child."
                    },
                    {
                      id: "03",
                      title: "Space Constraints",
                      desc: "Living in the heart of Kibera means space is at a premium. Our facilities are often at capacity, limiting our ability to expand."
                    }
                  ].map((challenge, idx) => (
                    <div key={idx} className="flex gap-8 group p-8 rounded-[2.5rem] hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/10">
                      <div className="shrink-0 w-16 h-16 bg-white border border-primary/20 rounded-2xl flex items-center justify-center text-2xl font-black text-primary shadow-soft transform group-hover:-rotate-12 transition-transform duration-500">
                        {challenge.id}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-foreground mb-3 font-['Poppins',sans-serif]">{challenge.title}</h4>
                        <p className="text-muted-foreground leading-relaxed font-['Open_Sans',sans-serif]">{challenge.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-full bg-primary-foreground/5 skew-x-12 transform origin-top" />
          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-20 text-white">
                <span className="inline-block text-secondary font-extrabold text-sm uppercase tracking-widest mb-4 font-['Poppins',sans-serif]">
                  Our Leadership
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 font-['Poppins',sans-serif] tracking-tight">
                  Meet Our Director
                </h2>
                <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
              </div>
            </ScrollReveal>

            <Card className="max-w-5xl mx-auto overflow-hidden border-none bg-white shadow-2xl rounded-[3rem]">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 aspect-[4/5] md:aspect-auto relative group overflow-hidden">
                    <img
                      src={clementImage}
                      alt="Clement Ombati"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60" />
                  </div>
                  <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center">
                    <div className="mb-8">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 font-['Poppins',sans-serif]">Clement Ombati</h3>
                      <div className="inline-block py-2 px-4 bg-secondary/10 rounded-full">
                        <p className="text-secondary font-bold text-sm uppercase tracking-wider">
                          Founder & Managing Director
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6 text-muted-foreground/90 text-lg leading-relaxed font-['Open_Sans',sans-serif]">
                      <p className="font-semibold text-foreground">
                        Born in Western Kenya, Clement Ombati founded COPA in 2018 after witnessing the heartbreaking reality of children in the Kibera Slum unable to attend school due to poverty.
                      </p>

                      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isBioExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="space-y-6 pt-8 border-t border-border mt-8">
                          <p className="italic bg-primary/5 p-6 rounded-2xl border-l-4 border-primary italic">
                            "Growing up in a humble background, I worked hard to excel in my studies. After high school, I moved to Nairobi searching for greener pastures. Since then, I have been a husband, a father, and a Chief with the government of Kenya."
                          </p>
                          <p>
                            "Witnessing children's struggles in Kibera left a deep impression on me, and I resolved to take action. This led to the opening of COPA. Today, I am incredibly proud of the impact we've had. Over 330 children now benefit from our programs, including education, feeding, mentorship, and life skills."
                          </p>
                          <p className="font-bold text-foreground">
                            "Through the generous partnership of Crossing Thresholds, we are growing stronger and making a dramatic difference."
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsBioExpanded(!isBioExpanded)}
                        className="group flex items-center gap-3 text-primary font-black text-xl hover:text-secondary transition-all mt-8"
                      >
                        <span className="underline decoration-2 underline-offset-8">
                          {isBioExpanded ? "Close Biography" : "Read Full Bio"}
                        </span>
                        {isBioExpanded ? (
                          <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                        ) : (
                          <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-foreground/5 skew-y-3 transform origin-bottom-left" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <CountUpStat end={330} suffix="+" label="Students Enrolled" />
              <CountUpStat end={25} label="Dedicated Staff" />
              <CountUpStat end={8} suffix="+" label="Years of Impact" />
              <CountUpStat end={10} label="Curriculum Levels" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />
          <div className="container mx-auto px-4 text-center relative">
            <ScrollReveal animation="fade-up">
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8 font-['Poppins',sans-serif] tracking-tight">
                Be Part of Our <span className="text-primary italic">Story</span>
              </h2>
              <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto mb-12 leading-relaxed font-['Open_Sans',sans-serif]">
                Join us in making a difference. Every contribution, whether time or resources, helps us continue our mission of building a resilient community in Kibera.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button variant="hope" size="xl" className="shadow-glow px-10" asChild>
                  <Link to="/get-involved">
                    <Heart className="w-5 h-5" />
                    Support Our Mission
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="px-10 border-2" asChild>
                  <Link to="/contact">
                    Partner With Us
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
