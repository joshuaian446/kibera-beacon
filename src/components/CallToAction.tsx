import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar, ArrowRight } from "lucide-react";
import { storageImages } from "@/lib/storage";

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={storageImages.heroAlt}
          alt="COPA Centre children"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
              Join Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 font-['Poppins',sans-serif]">
              Help Us Build a Brighter Future for Kibera's Children
            </h2>
            <p className="text-primary-foreground/85 mb-8 text-lg">
              Every contribution makes a difference. Whether through donations, volunteering, or spreading awareness, you can be part of the change that transforms lives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="heroSolid" size="xl" asChild>
                <Link to="/get-involved">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </Link>
              </Button>
              <Button variant="hero" size="xl" asChild>
                <Link to="/get-involved">
                  <Users className="w-5 h-5" />
                  Volunteer
                </Link>
              </Button>
            </div>
          </div>

          {/* Ways to Help Cards */}
          <div className="space-y-4">
            {[
              {
                icon: Heart,
                title: "Make a Donation",
                description: "Support our programs with a one-time or recurring gift.",
                link: "/get-involved",
              },
              {
                icon: Users,
                title: "Become a Volunteer",
                description: "Share your skills and time to make a direct impact.",
                link: "/get-involved",
              },
              {
                icon: Calendar,
                title: "Sponsor a Child",
                description: "Provide education and meals for a child for a full year.",
                link: "/get-involved",
              },
            ].map((item, index) => (
              <Link
                key={item.title}
                to={item.link}
                className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 hover:bg-primary-foreground/20 transition-smooth group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-primary-foreground font-['Poppins',sans-serif]">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary-foreground/50 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
