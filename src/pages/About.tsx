import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Target, Eye, Award, Users, Calendar, ArrowRight } from "lucide-react";
import { storageImages } from "@/lib/storage";
import aboutHeroImage from "@/assets/about-hero.jpg";
import { useCountUp } from "@/hooks/useCountUp";

const CountUpStat = ({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) => {
  const { count, ref } = useCountUp({ end, duration: 2000 });
  return (
    <div ref={ref}>
      <div className="text-4xl md:text-5xl font-bold text-secondary font-['Poppins',sans-serif] mb-2">
        {count}{suffix}
      </div>
      <div className="text-white">{label}</div>
    </div>
  );
};

const About = () => {
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
              className="w-full h-full object-cover object-[center_30%] md:object-[center_40%]"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 font-['Poppins',sans-serif]">
                Our Story of Hope and Resilience
              </h1>
              <p className="text-xl text-primary-foreground/85">
                Founded in 2012, COPA Centre emerged from a simple but powerful belief: every child in Kibera deserves access to quality education and a chance to thrive.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                  Our Beginning
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-['Poppins',sans-serif]">
                  From Street Children to Future Leaders
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Community Pillars Alliance (COPA) Centre was established in 2012 by Clement Ombati, who witnessed firsthand the struggles of street children in Kibera, one of Africa's largest informal settlements.
                  </p>
                  <p>
                    What started as a small effort to help a handful of vulnerable children has grown into a comprehensive community center serving over 330 students and their families.
                  </p>
                  <p>
                    Our unique approach integrates technology with traditional education, preparing our students not just for academic success, but for life in the modern world.
                  </p>
                </div>
              </div>
              <div className="relative aspect-[4/3]">
                <img
                  src={storyImage}
                  alt="COPA Centre students"
                  className="rounded-2xl shadow-card w-full h-full object-cover object-[center_30%]"
                />
                <div className="absolute -bottom-6 -left-6 bg-secondary rounded-xl p-6 shadow-hover">
                  <div className="text-3xl font-bold text-secondary-foreground font-['Poppins',sans-serif]">2012</div>
                  <div className="text-secondary-foreground/80">Year Founded</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-gradient-warm">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
                Mission, Vision & Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card variant="elevated" className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To empower vulnerable children through education, nutrition, and community support, creating pathways to a brighter future.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">Our Vision</h3>
                  <p className="text-muted-foreground">
                    A resilient community where every child has access to quality education, proper nutrition, and the opportunity to thrive.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">Our Values</h3>
                  <p className="text-muted-foreground">
                    Compassion, integrity, excellence, community, and innovation guide everything we do at COPA Centre.
                  </p>
                </CardContent>
              </Card>
            </div>
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
              <CountUpStat end={12} suffix="+" label="Years" />
              <CountUpStat end={7} label="Grades" />
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
