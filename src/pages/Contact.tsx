import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone, Clock, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xdazvrkw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      if (response.ok) {
        toast.success("Thank you for your message! We will get back to you soon.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        toast.error("Something went wrong. Please try again or email us directly.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-primary">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl">
                <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                  Contact Us
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 font-['Poppins',sans-serif]">
                  Get in Touch
                </h1>
                <p className="text-xl text-primary-foreground/85">
                  Have questions? Want to visit? We'd love to hear from you. Reach out to us through any of the channels below.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <ScrollReveal animation="slide-left">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-8 font-['Poppins',sans-serif]">
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    <Card variant="elevated">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                          <MapPin className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1 font-['Poppins',sans-serif]">Our Location</h3>
                          <p className="text-muted-foreground">
                            James Nderi Road, Laini-Saba<br />
                            Kibera, Nairobi, Kenya
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card variant="elevated">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                          <Mail className="w-6 h-6 text-secondary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1 font-['Poppins',sans-serif]">Email Us</h3>
                          <a href="mailto:copacenter21@gmail.com" className="text-primary hover:underline">
                            copacenter21@gmail.com
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    <Card variant="elevated">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                          <Phone className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1 font-['Poppins',sans-serif]">Call Us</h3>
                          <p className="text-muted-foreground">
                            +254 7 18720630
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card variant="elevated">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                          <Clock className="w-6 h-6 text-secondary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1 font-['Poppins',sans-serif]">Visiting Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Friday: 8:00 AM - 5:00 PM<br />
                            Saturday: 9:00 AM - 1:00 PM
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8">
                    <h3 className="font-semibold text-foreground mb-4 font-['Poppins',sans-serif]">Follow Us</h3>
                    <div className="flex gap-3">
                      {[
                        { icon: Facebook, label: "Facebook" },
                        { icon: Twitter, label: "Twitter" },
                        { icon: Instagram, label: "Instagram" },
                        { icon: Youtube, label: "Youtube" },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href="#"
                          className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-smooth"
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Contact Form */}
              <div>
                <Card variant="elevated">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6 font-['Poppins',sans-serif]">
                      Send Us a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-2"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-2"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="mt-2"
                          placeholder="How can we help?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className="mt-2"
                          placeholder="Write your message here..."
                          rows={6}
                        />
                      </div>
                      <Button variant="cta" size="lg" type="submit" className="w-full" disabled={isSubmitting}>
                        <Send className="w-5 h-5" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gradient-warm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
                Find Us in Kibera
              </h2>
              <p className="text-muted-foreground">
                Located on James Nderi Road in Laini-Saba, Kibera — the heart of our community.
              </p>
            </div>

            <Card variant="elevated" className="overflow-hidden p-0 h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7610!2d36.7950!3d-1.3146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11712918699b%3A0xbfdc29e50d5d7c2d!2zQ29tbXVuaXR5IFBpbGxhcnMgQWxsaWFuY2UgQ2VudHJlIChDT1BBKQ!5e0!3m2!1sen!2ske!4v1706786000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - COPA Centre Location"
              ></iframe>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
