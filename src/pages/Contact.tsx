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
import contactHeroImage from "../assets/contact-hero.jpg";

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
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={contactHeroImage}
              alt="Happy children at COPA Centre"
              className="w-full h-full object-cover object-[center_25%]"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-primary-foreground/90 text-sm font-medium uppercase tracking-wider">
                    Connect With Us
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-6 font-['Poppins',sans-serif] leading-tight tracking-tight">
                  Let's Start a <br className="hidden md:block" /> <span className="text-secondary italic">Conversation</span>
                </h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-2xl font-['Open_Sans',sans-serif]">
                  Whether you want to visit, volunteer, or simply learn more about our work — we're here to listen and welcome you to the COPA family.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Decorative Floaties */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" />
        </section>

        {/* Contact Info & Form */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 -z-10" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Contact Information */}
              <div>
                <ScrollReveal animation="slide-right">
                  <span className="inline-block text-secondary font-black text-xs uppercase tracking-[0.3em] mb-4">
                    Direct Lines
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-foreground mb-12 font-['Poppins',sans-serif] tracking-tight">
                    Find Us <span className="text-primary italic">Nearby</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="p-8 border-none bg-primary/5 rounded-[2rem] hover:bg-primary hover:text-white transition-all duration-500 group shadow-soft hover:shadow-glow hover:-translate-y-2">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <MapPin className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-black text-xl mb-3 font-['Poppins',sans-serif]">Our Location</h3>
                      <p className="text-muted-foreground group-hover:text-white/90 font-medium">
                        James Nderi Road, Laini-Saba<br />
                        Kibera, Nairobi, Kenya
                      </p>
                    </Card>

                    <Card className="p-8 border-none bg-secondary/5 rounded-[2rem] hover:bg-secondary hover:text-white transition-all duration-500 group shadow-soft hover:shadow-glow-secondary hover:-translate-y-2">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <Mail className="w-7 h-7 text-secondary" />
                      </div>
                      <h3 className="font-black text-xl mb-3 font-['Poppins',sans-serif]">Email Us</h3>
                      <a href="mailto:copacenter21@gmail.com" className="text-primary group-hover:text-white font-black underline decoration-2 underline-offset-4 decoration-primary/30 group-hover:decoration-white/50 transition-colors">
                        copacenter21@gmail.com
                      </a>
                    </Card>

                    <Card className="p-8 border-none bg-primary/5 rounded-[2rem] hover:bg-primary hover:text-white transition-all duration-500 group shadow-soft hover:shadow-glow hover:-translate-y-2">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <Phone className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-black text-xl mb-3 font-['Poppins',sans-serif]">Call Us</h3>
                      <p className="text-muted-foreground group-hover:text-white/90 font-black text-lg">
                        +254 7 18720630
                      </p>
                    </Card>

                    <Card className="p-8 border-none bg-secondary/5 rounded-[2rem] hover:bg-secondary hover:text-white transition-all duration-500 group shadow-soft hover:shadow-glow-secondary hover:-translate-y-2">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <Clock className="w-7 h-7 text-secondary" />
                      </div>
                      <h3 className="font-black text-xl mb-3 font-['Poppins',sans-serif]">Visiting Hours</h3>
                      <p className="text-muted-foreground group-hover:text-white/90 font-medium">
                        Mon - Fri: 8 AM - 5 PM<br />
                        Sat: 9 AM - 1 PM
                      </p>
                    </Card>
                  </div>

                  {/* Social Links */}
                  <div className="mt-12">
                    <h3 className="font-black text-xl text-foreground mb-6 font-['Poppins',sans-serif]">Community Hubs</h3>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { icon: Facebook, label: "Facebook", bg: "hover:bg-blue-600" },
                        { icon: Twitter, label: "Twitter", bg: "hover:bg-sky-500" },
                        { icon: Instagram, label: "Instagram", bg: "hover:bg-pink-600" },
                        { icon: Youtube, label: "Youtube", bg: "hover:bg-red-600" },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href="#"
                          className={`w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 ${social.bg} hover:shadow-lg hover:-translate-y-1`}
                          aria-label={social.label}
                        >
                          <social.icon className="w-6 h-6" />
                        </a>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Contact Form */}
              <ScrollReveal animation="slide-left">
                <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden group/form bg-white">
                  <div className="h-4 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-x" />
                  <CardContent className="p-10 lg:p-16">
                    <h2 className="text-3xl font-black text-foreground mb-8 font-['Poppins',sans-serif] tracking-tight">
                      Send a <span className="text-primary italic">Message</span>
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name *</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="h-14 rounded-2xl bg-muted/50 border-transparent focus:bg-white focus:border-primary/30 transition-all font-medium px-6"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-14 rounded-2xl bg-muted/50 border-transparent focus:bg-white focus:border-primary/30 transition-all font-medium px-6"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject</Label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="h-14 rounded-2xl bg-muted/50 border-transparent focus:bg-white focus:border-primary/30 transition-all font-medium px-6"
                          placeholder="How can we help?"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Message *</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className="rounded-2xl bg-muted/50 border-transparent focus:bg-white focus:border-primary/30 transition-all font-medium p-6 resize-none"
                          placeholder="Write your heart out..."
                          rows={5}
                        />
                      </div>
                      <Button variant="cta" size="xl" type="submit" className="w-full shadow-glow-primary rounded-2xl h-16 text-lg font-black group/btn" disabled={isSubmitting}>
                        {isSubmitting ? (
                          "Sending Message..."
                        ) : (
                          <>
                            Direct Dispatch
                            <Send className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-24 md:py-32 bg-primary/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -z-10" />
          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-16">
                <span className="inline-block text-secondary font-black text-sm uppercase tracking-[0.3em] mb-4">
                  Open Doors
                </span>
                <h2 className="text-3xl md:text-6xl font-black text-foreground mb-6 font-['Poppins',sans-serif] tracking-tight">
                  Kibera is our <span className="text-primary italic">Canvas</span>
                </h2>
                <p className="text-xl text-muted-foreground/90 max-w-2xl mx-auto italic font-['Open_Sans',sans-serif]">
                  Located on James Nderi Road in Laini-Saba — the beating heart of our community.
                  <span className="block font-black mt-2 text-foreground not-italic">Drop by for a coffee and a tour!</span>
                </p>
              </div>

              <Card className="overflow-hidden p-0 h-[500px] border-none shadow-soft rounded-[3rem] relative group/map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7610!2d36.7950!3d-1.3146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11712918699b%3A0xbfdc29e50d5d7c2d!2zQ29tbXVuaXR5IFBpbGxhcnMgQWxsaWFuY2UgQ2VudHJlIChDT1BBKQ!5e0!3m2!1sen!2ske!4v1706786000000!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - COPA Centre Location"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 group-hover/map:border-white/0 transition-all duration-500 rounded-[3rem]" />
              </Card>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
