import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users, Calendar, Gift, ArrowRight, Copy, Loader2, Phone } from "lucide-react";
import { toast } from "sonner";
import { storageImages } from "@/lib/storage";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const needs = [
  { item: "Teacher Salaries", priority: "Immediate" },
  { item: "Feeding Program (Monthly)", priority: "Immediate" },
  { item: "Digital Classrooms", priority: "High" },
  { item: "School Library", priority: "Immediate" },
  { item: "Sports Equipment", priority: "Medium" },
  { item: "Music Instruments", priority: "Medium" },
];

const GetInvolved = () => {
  const navigate = useNavigate();
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  // STK Push donation form state
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorAmount, setDonorAmount] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [isSubmittingDonation, setIsSubmittingDonation] = useState(false);

  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerPhone, setVolunteerPhone] = useState("");
  const [volunteerSkills, setVolunteerSkills] = useState("");
  const [isSubmittingVolunteer, setIsSubmittingVolunteer] = useState(false);

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorPhone || !donorAmount) {
      toast.error("Please fill in your name, phone number, and amount");
      return;
    }

    const amount = parseFloat(donorAmount);
    if (isNaN(amount) || amount < 1) {
      toast.error("Please enter a valid amount (minimum KES 1)");
      return;
    }

    setIsSubmittingDonation(true);
    try {
      const { data, error } = await supabase.functions.invoke("mpesa-stk-push", {
        body: {
          action: "submit-order",
          amount: donorAmount,
          donor_name: donorName,
          donor_email: donorEmail,
          phone_number: donorPhone,
          message: donorMessage,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      toast.success("STK Push sent! Check your phone for the M-Pesa prompt.");
      navigate(`/thank-you?invoice_id=${data.invoice_id}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to initiate payment";
      toast.error(msg);
    } finally {
      setIsSubmittingDonation(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerEmail) {
      toast.error("Please fill in name and email");
      return;
    }

    setIsSubmittingVolunteer(true);
    try {
      const response = await fetch("https://formspree.io/f/mjgrdqye", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: volunteerName,
          email: volunteerEmail,
          phone: volunteerPhone,
          skills: volunteerSkills,
        }),
      });

      if (response.ok) {
        toast.success("Thank you for your interest in volunteering! We will be in touch soon.");
        setVolunteerName("");
        setVolunteerEmail("");
        setVolunteerPhone("");
        setVolunteerSkills("");
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmittingVolunteer(false);
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
              src={storageImages.heroAlt}
              alt="COPA Centre children"
              className="w-full h-full object-cover object-top md:object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-primary-foreground/90 text-sm font-medium uppercase tracking-wider">
                    Be the Change
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-6 font-['Poppins',sans-serif] leading-tight tracking-tight">
                  Join Us in <br className="hidden md:block" /> <span className="text-secondary italic">Making a Difference</span>
                </h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-2xl font-['Open_Sans',sans-serif]">
                  Every contribution, whether financial or through your time and skills, helps transform the lives of 330+ children in the heart of Kibera.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Decorative Floaties */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" />
        </section>

        {/* Ways to Help Highlights */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {[
                { icon: Heart, title: "Donate", description: "Support our programs with a financial contribution that goes 100% to our students.", color: "bg-primary" },
                { icon: Users, title: "Volunteer", description: "Share your time and skills with our community through teaching or mentorship.", color: "bg-secondary" },
                { icon: Calendar, title: "Sponsor", description: "Sponsor a child's education for a full year and witness a life transformed.", color: "bg-primary" },
              ].map((item, index) => (
                <ScrollReveal key={item.title} animation="fade-up" delay={index * 100}>
                  <Card className="text-center h-full hover:shadow-hover hover:-translate-y-2 transition-all duration-500 border-none bg-white p-2 group rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-10">
                      <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-card transform rotate-6 group-hover:rotate-12 transition-transform duration-500`}>
                        <div className="transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500">
                          <item.icon className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed font-['Open_Sans',sans-serif]">{item.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Ways to Give Section */}
        <section className="py-24 md:py-32 bg-gradient-warm relative overflow-hidden" id="donate">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <ScrollReveal animation="slide-left">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
                    <Heart className="w-3 h-3" />
                    Ways to Support
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-8 font-['Poppins',sans-serif] leading-tight tracking-tight">
                    Your Support <span className="text-primary italic">Transforms Lives</span>
                  </h2>
                  <p className="text-lg text-muted-foreground/90 mb-10 leading-relaxed font-['Open_Sans',sans-serif]">
                    We now offer direct ways to contribute. Choose a payment method below to reveal our donation details. 100% of your contribution directly supports our 330+ students.
                  </p>

                  <div className="space-y-6">
                    {/* PayPal Card */}
                    <div
                      className={cn(
                        "group relative bg-white rounded-[2rem] p-8 border-2 transition-all duration-500 overflow-hidden cursor-pointer",
                        activeMethod === 'paypal' ? "border-[#0070ba] shadow-xl" : "border-transparent hover:border-[#0070ba]/20 shadow-soft"
                      )}
                      onClick={() => setActiveMethod(activeMethod === 'paypal' ? null : 'paypal')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#0070ba]/10 rounded-2xl flex items-center justify-center">
                            <ArrowRight className="w-6 h-6 text-[#0070ba]" />
                          </div>
                          <h3 className="text-xl font-black text-foreground font-['Poppins',sans-serif]">Pay via PayPal</h3>
                        </div>
                        <div className={cn("transition-transform duration-500", activeMethod === 'paypal' ? "rotate-180" : "")}>
                          <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-0">Best for international donors and credit cards.</p>

                      <div className={cn(
                        "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
                        activeMethod === 'paypal' ? "max-h-[200px] opacity-100 mt-6" : "max-h-0 opacity-0"
                      )}>
                        <Button
                          className="bg-[#0070ba] hover:bg-[#005ea6] text-white w-full h-14 rounded-xl font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open("https://www.paypal.com/donate/?hosted_button_id=DV8AFXD5XPRLE", "_blank");
                          }}
                        >
                          Open PayPal Donation Page
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </div>

                    {/* M-Pesa STK Push Card */}
                    <div
                      className={cn(
                        "group relative bg-white rounded-[2rem] p-8 border-2 transition-all duration-500 overflow-hidden cursor-pointer",
                        activeMethod === 'mpesa-stk' ? "border-secondary shadow-xl" : "border-transparent hover:border-secondary/20 shadow-soft"
                      )}
                      onClick={() => setActiveMethod(activeMethod === 'mpesa-stk' ? null : 'mpesa-stk')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                            <Phone className="w-6 h-6 text-secondary" />
                          </div>
                          <h3 className="text-xl font-black text-foreground font-['Poppins',sans-serif]">M-Pesa STK Push</h3>
                        </div>
                        <div className={cn("transition-transform duration-500", activeMethod === 'mpesa-stk' ? "rotate-180" : "")}>
                          <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-0">Instant payment prompt sent to your phone.</p>

                      <div className={cn(
                        "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
                        activeMethod === 'mpesa-stk' ? "max-h-[600px] opacity-100 mt-6" : "max-h-0 opacity-0"
                      )}>
                        <form onSubmit={handleDonationSubmit} onClick={(e) => e.stopPropagation()} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label htmlFor="donorName" className="font-bold text-xs">Full Name *</Label>
                              <Input id="donorName" value={donorName} onChange={(e) => setDonorName(e.target.value)} required className="h-11 rounded-xl border-2" placeholder="John Doe" />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="donorPhone" className="font-bold text-xs">M-Pesa Phone *</Label>
                              <Input id="donorPhone" type="tel" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} required className="h-11 rounded-xl border-2" placeholder="0712345678" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label htmlFor="donorEmail" className="font-bold text-xs">Email (optional)</Label>
                              <Input id="donorEmail" type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} className="h-11 rounded-xl border-2" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="donorAmount" className="font-bold text-xs">Amount (KES) *</Label>
                              <Input id="donorAmount" type="number" min="1" value={donorAmount} onChange={(e) => setDonorAmount(e.target.value)} required className="h-11 rounded-xl border-2" placeholder="500" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="donorMessage" className="font-bold text-xs">Message (optional)</Label>
                            <Input id="donorMessage" value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} className="h-11 rounded-xl border-2" placeholder="A short note..." />
                          </div>
                          <Button type="submit" className="w-full h-12 rounded-xl font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={isSubmittingDonation}>
                            {isSubmittingDonation ? (
                              <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Sending STK Push...</span>
                            ) : (
                              <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> Send M-Pesa Prompt</span>
                            )}
                          </Button>
                        </form>
                      </div>
                    </div>

                    {/* M-Pesa Manual Paybill Card */}
                    <div
                      className={cn(
                        "group relative bg-white rounded-[2rem] p-8 border-2 transition-all duration-500 overflow-hidden cursor-pointer",
                        activeMethod === 'mpesa' ? "border-secondary/50 shadow-xl" : "border-transparent hover:border-secondary/10 shadow-soft"
                      )}
                      onClick={() => setActiveMethod(activeMethod === 'mpesa' ? null : 'mpesa')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                            <div className="w-5 h-5 bg-secondary rounded-full scale-90" />
                          </div>
                          <h3 className="text-xl font-black text-foreground font-['Poppins',sans-serif]">Lipa na M-Pesa (Manual)</h3>
                        </div>
                        <div className={cn("transition-transform duration-500", activeMethod === 'mpesa' ? "rotate-180" : "")}>
                          <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-0">Use Paybill manually from your M-Pesa menu.</p>

                      <div className={cn(
                        "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden space-y-4",
                        activeMethod === 'mpesa' ? "max-h-[300px] opacity-100 mt-6" : "max-h-0 opacity-0"
                      )}>
                        <div className="flex flex-col gap-3">
                          <div className="bg-muted/50 p-4 rounded-xl flex items-center justify-between border border-border">
                            <div>
                              <div className="text-[10px] font-black uppercase text-muted-foreground">Paybill Number</div>
                              <div className="font-black text-xl text-foreground">247247</div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); copyToClipboard("247247", "Paybill Number"); }}>
                              <Copy className="w-4 h-4 text-secondary" />
                            </Button>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-xl flex items-center justify-between border border-border">
                            <div>
                              <div className="text-[10px] font-black uppercase text-muted-foreground">Account Number</div>
                              <div className="font-black text-xl text-foreground">473337</div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); copyToClipboard("473337", "Account Number"); }}>
                              <Copy className="w-4 h-4 text-secondary" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="text-xs font-bold text-secondary">Account Name: COPA</span>
                        </div>
                      </div>
                    </div>

                    {/* Bank Transfer Card */}
                    <div
                      className={cn(
                        "group relative bg-white rounded-[2rem] p-8 border-2 transition-all duration-500 overflow-hidden cursor-pointer",
                        activeMethod === 'bank' ? "border-primary shadow-xl" : "border-transparent hover:border-primary/20 shadow-soft"
                      )}
                      onClick={() => setActiveMethod(activeMethod === 'bank' ? null : 'bank')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Gift className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-black text-foreground font-['Poppins',sans-serif]">Bank Transfer</h3>
                        </div>
                        <div className={cn("transition-transform duration-500", activeMethod === 'bank' ? "rotate-180" : "")}>
                          <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-0">Direct wire transfer to Equity Bank.</p>

                      <div className={cn(
                        "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden space-y-4",
                        activeMethod === 'bank' ? "max-h-[400px] opacity-100 mt-6" : "max-h-0 opacity-0"
                      )}>
                        <div className="bg-slate-50 p-5 rounded-2xl space-y-4 border border-slate-100 text-left">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-[10px] font-black uppercase text-muted-foreground">Bank Name</div>
                              <div className="text-xs font-bold text-foreground">Equity Bank</div>
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase text-muted-foreground">SWIFT</div>
                              <div className="text-xs font-bold text-foreground">EQBLKENA</div>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-200">
                            <div className="text-[10px] font-black uppercase text-muted-foreground mb-1">Account Number</div>
                            <div className="flex items-center justify-between">
                              <span className="font-black text-lg text-foreground">1280185473337</span>
                              <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); copyToClipboard("1280185473337", "Account Number"); }}>
                                <Copy className="w-4 h-4 text-primary" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black uppercase text-muted-foreground">Acc Name</div>
                            <div className="text-xs font-bold text-foreground">Community Pillars Alliance</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Needs List */}
              <ScrollReveal animation="slide-right">
                <div className="lg:pt-12">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                    Our Needs
                  </span>
                  <h2 className="text-3xl font-bold text-foreground mb-8 font-['Poppins',sans-serif] tracking-tight">
                    Where Your Impact <span className="text-primary italic">Matters Most</span>
                  </h2>

                  <div className="space-y-4">
                    {needs.map((need) => (
                      <div key={need.item} className="p-6 bg-white rounded-2xl shadow-soft border border-transparent hover:border-primary/10 transition-all duration-300 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full animate-pulse ${need.priority === "Immediate" ? "bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-secondary shadow-[0_0_10px_rgba(242,153,74,0.5)]"
                            }`} />
                          <div className="font-bold text-foreground group-hover:text-primary transition-colors">{need.item}</div>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${need.priority === "Immediate"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-secondary/10 text-secondary"
                          }`}>
                          {need.priority}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Card className="mt-12 bg-primary text-white border-none shadow-glow rounded-[2.5rem] overflow-hidden group">
                    <CardContent className="p-10 relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                      <Gift className="w-12 h-12 text-secondary mb-6 transform group-hover:rotate-12 transition-transform" />
                      <h3 className="text-2xl font-black mb-4 font-['Poppins',sans-serif]">
                        Other Ways to Give
                      </h3>
                      <p className="text-primary-foreground/90 text-base mb-8 leading-relaxed italic">
                        "We also accept in-kind donations such as books, school supplies, sports equipment, and food items to directly support the children's daily needs."
                      </p>
                      <Button variant="hero" className="bg-white text-primary hover:bg-white/90" asChild>
                        <Link to="/contact" className="font-bold">
                          Contact Us to Arrange
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Volunteer Form Section */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden" id="volunteer">
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <span className="inline-block text-secondary font-extrabold text-sm uppercase tracking-widest mb-4 font-['Poppins',sans-serif]">
                  Volunteer
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 font-['Poppins',sans-serif] tracking-tight">
                  Share Your <span className="text-secondary italic">Time & Skills</span>
                </h2>
                <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full mb-8" />
                <p className="text-lg text-muted-foreground/90 leading-relaxed font-['Open_Sans',sans-serif]">
                  Whether you're a teacher, mentor, artist, or simply want to help our kids grow, we'd love to have you on our team.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <Card className="max-w-2xl mx-auto border-none bg-white shadow-2xl rounded-[3rem] overflow-hidden">
                <CardContent className="p-10 md:p-12">
                  <form onSubmit={handleVolunteerSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="volunteerName" className="font-bold">Full Name *</Label>
                        <Input
                          id="volunteerName"
                          value={volunteerName}
                          onChange={(e) => setVolunteerName(e.target.value)}
                          required
                          className="h-12 rounded-xl border-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="volunteerEmail" className="font-bold">Email *</Label>
                        <Input
                          id="volunteerEmail"
                          type="email"
                          value={volunteerEmail}
                          onChange={(e) => setVolunteerEmail(e.target.value)}
                          required
                          className="h-12 rounded-xl border-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volunteerPhone" className="font-bold">Phone Number</Label>
                      <Input
                        id="volunteerPhone"
                        type="tel"
                        value={volunteerPhone}
                        onChange={(e) => setVolunteerPhone(e.target.value)}
                        className="h-12 rounded-xl border-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volunteerSkills" className="font-bold">Your Skills & Interests</Label>
                      <Textarea
                        id="volunteerSkills"
                        value={volunteerSkills}
                        onChange={(e) => setVolunteerSkills(e.target.value)}
                        placeholder="Tell us about your background and how you'd like to help..."
                        className="rounded-xl min-h-[150px] border-2"
                      />
                    </div>
                    <Button variant="cta" size="xl" type="submit" className="w-full shadow-glow py-8 text-lg group" disabled={isSubmittingVolunteer}>
                      <Users className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                      {isSubmittingVolunteer ? "Submitting Application..." : "Join Our Community"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetInvolved;
