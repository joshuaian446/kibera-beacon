import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "COPA Centre gave me hope when I had none. Now I can read, write, and dream of becoming a teacher.",
    name: "Student",
    role: "Grade 5 Student",
  },
  {
    quote: "The feeding program ensures my children focus on learning, not hunger. This school is a blessing to our community.",
    name: "Parent",
    role: "Parent of Two Students",
  },
  {
    quote: "Working here has shown me the true power of community. These children inspire me every single day.",
    name: "Teacher",
    role: "COPA Centre Educator",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
            Stories of Hope
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
            Voices from Our Community
          </h2>
          <p className="text-muted-foreground">
            Hear from the students, parents, and teachers whose lives have been touched by COPA Centre.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              variant="elevated"
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-secondary/30 mb-4" />
                <blockquote className="text-foreground mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold font-['Poppins',sans-serif]">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground font-['Poppins',sans-serif]">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
