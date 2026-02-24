import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users, Calendar, Gift, ArrowRight, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { storageImages } from "@/lib/storage";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import mpesaLogo from "@/assets/mpesa-logo.png";
import bankLogo from "@/assets/bank-logo.png";


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
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Checkout donation form state
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
  const [isProcessingSTK, setIsProcessingSTK] = useState(false);
  const [stkMessage, setStkMessage] = useState("");

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorAmount) {
      toast.error("Please fill in your name and amount");
      return;
    }

    const amount = parseFloat(donorAmount);
    if (isNaN(amount) || amount < 10) {
      toast.error("Please enter a valid amount (minimum KES 10)");
      return;
    }

    setIsSubmittingDonation(true);
    try {
      const redirectUrl = `${window.location.origin}/thank-you`;
      const { data, error } = await supabase.functions.invoke("mpesa-stk-push", {
        body: {
          action: "create-checkout",
          amount: donorAmount,
          donor_name: donorName,
          donor_email: donorEmail || undefined,
          phone_number: donorPhone || undefined,
          message: donorMessage || undefined,
          redirect_url: redirectUrl,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.checkout_url) {
        // Redirect to IntaSend hosted checkout
        window.location.href = data.checkout_url;
      } else {
        throw new Error("No checkout URL returned");
      }
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

  const handleMpesaSTKPush = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseFloat(donorAmount);
    if (isNaN(amount) || amount < 10) {
      toast.error("Please enter a valid amount (minimum KES 10)");
      return;
    }

    if (!donorName || !donorPhone) {
      toast.error("Please provide your name and phone number");
      return;
    }

    setIsProcessingSTK(true);
    setStkMessage("Initiating STK Push...");

    try {
      setStkMessage("Preparing secure connection...");
      const { data, error } = await supabase.functions.invoke("mpesa-stk-push", {
        body: {
          action: "submit-order",
          amount: donorAmount,
          donor_name: donorName,
          donor_email: donorEmail || undefined,
          phone_number: donorPhone,
          message: donorMessage || undefined,
        },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.success && data?.invoice_id) {
        setStkMessage("STK Push sent! Please check your phone...");
        // Wait a small moment for UX before redirecting
        setTimeout(() => {
          navigate(`/thank-you?invoice_id=${data.invoice_id}`);
        }, 3000);
      } else {
        throw new Error("Failed to initiate STK Push");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to initiate M-Pesa payment";
      toast.error(msg);
      setIsProcessingSTK(false);
    }
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
        headers: { "Content-Type": "application/json" },
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
    } catch {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmittingVolunteer(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      {/* M-Pesa STK Processing Overlay */}
      {isProcessingSTK && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-secondary/20 backdrop-blur-xl" />

          <div className="relative w-full max-w-md bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] overflow-hidden p-10 border-4 border-secondary/10">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#4baa24] via-secondary to-[#4baa24] animate-shimmer-fast" />

            <div className="flex flex-col items-center text-center space-y-8">
              {/* Visual Radar Animation */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#4baa24]/20 rounded-full animate-ping" />
                <div className="absolute inset-0 bg-[#4baa24]/10 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#4baa24]/10">
                  <img src={mpesaLogo} alt="M-Pesa" className="w-20 h-auto object-contain animate-bounce-slow" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-foreground font-['Poppins',sans-serif] uppercase tracking-wider">Processing...</h3>
                <div className="space-y-2">
                  <div className="bg-[#4baa24]/10 text-[#4baa24] text-xs font-black px-4 py-2 rounded-full inline-block uppercase tracking-widest animate-pulse">
                    {stkMessage}
                  </div>
                  <p className="text-muted-foreground text-sm max-w-[240px] mx-auto font-['Open_Sans',sans-serif]">
                    An M-Pesa prompt has been sent to <span className="font-black text-foreground">{donorPhone}</span>. Please enter your PIN.
                  </p>
                </div>
              </div>

              <div className="w-full bg-muted/30 p-6 rounded-2xl border border-border">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Amount</span>
                  <span className="text-foreground text-xl">KES {donorAmount}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] animate-pulse">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Secure Transaction
                <span className="w-2 h-2 rounded-full bg-secondary" />
              </div>
            </div>
          </div>
        </div>
      )}
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

          <div className="absolute top-1/4 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" />
        </section>

        {/* Ways to Help Highlights */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">

          <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {[
                { icon: Heart, title: "Donate", description: "Support our programs with a financial contribution that goes 100% to our students.", color: "bg-primary", target: "donate" },
                { icon: Users, title: "Volunteer", description: "Share your time and skills with our community through teaching or mentorship.", color: "bg-secondary", target: "volunteer" },
                { icon: Calendar, title: "Sponsor", description: "Sponsor a child's education for a full year and witness a life transformed.", color: "bg-primary", target: "donate" },
              ].map((item, index) => (
                <ScrollReveal key={item.title} animation="fade-up" delay={index * 100}>
                  <Card
                    className="text-center h-full hover:shadow-hover hover:-translate-y-2 transition-all duration-500 border-none bg-white p-2 group rounded-[2.5rem] overflow-hidden cursor-pointer"
                    onClick={() => scrollToSection(item.target)}
                  >

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

        {/* Donate Section */}
        <section className="py-16 md:py-24 bg-gradient-warm relative overflow-hidden" id="donate">

          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <ScrollReveal animation="slide-left">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
                    <Heart className="w-3 h-3" />
                    Donate Now
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-8 font-['Poppins',sans-serif] leading-tight tracking-tight">
                    Your Support <span className="text-primary italic">Transforms Lives</span>
                  </h2>
                  <p className="text-lg text-muted-foreground/90 mb-10 leading-relaxed font-['Open_Sans',sans-serif]">
                    Fill in your details and choose from multiple secure payment methods — M-Pesa, Card, PesaLink, and more. 100% of your contribution directly supports our 330+ students.
                  </p>

                  <div className="relative">
                    {/* Decorative Blobs */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10 animate-pulse-slow" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />

                    {/* Primary: IntaSend Checkout Form */}
                    <Card className="border-none bg-gradient-to-br from-white to-secondary/5 shadow-[0_30px_60px_rgba(242,153,74,0.2)] rounded-[2.5rem] overflow-hidden group/form border-2 border-secondary/10 scale-[1.02] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(242,153,74,0.25)]">
                      <div className="bg-secondary p-8 text-center relative overflow-hidden">
                        {/* Animated Background Overlay */}
                        <div className="absolute inset-0 bg-white/5 animate-pulse" />

                        {/* Heart Icon Animation (Inspired by ThankYou page) */}
                        <div className="flex justify-center mb-4 relative z-10">
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                            <div className="relative w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                              <Heart className="w-8 h-8 text-white animate-bounce-slow fill-white" />
                            </div>
                          </div>
                        </div>

                        <div className="relative z-10">
                          <h3 className="text-2xl font-black text-white font-['Poppins',sans-serif] uppercase tracking-wider mb-1">Donate Now</h3>
                          <div className="h-1 w-12 bg-white/30 mx-auto rounded-full" />
                        </div>
                      </div>
                      <CardContent className="p-8 md:p-10 pt-10 text-center">
                        <p className="text-muted-foreground text-sm mb-10 font-['Open_Sans',sans-serif] leading-relaxed max-w-[280px] mx-auto">
                          Empower a student in Kibera with a life-changing donation
                        </p>



                        {/* Payment method badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {["M-Pesa", "Visa/Mastercard", "PesaLink", "Bank Transfer"].map((method) => (
                            <span key={method} className="inline-flex items-center px-3 py-1.5 rounded-full bg-muted text-xs font-bold text-muted-foreground border border-border">
                              {method}
                            </span>
                          ))}
                        </div>

                        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label htmlFor="donorName" className="font-bold text-xs">Full Name *</Label>
                              <Input id="donorName" value={donorName} onChange={(e) => setDonorName(e.target.value)} required className="h-11 rounded-xl border-2" placeholder="John Doe" />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="donorEmail" className="font-bold text-xs">Email (optional)</Label>
                              <Input id="donorEmail" type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} className="h-11 rounded-xl border-2" placeholder="john@example.com" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label htmlFor="donorPhone" className="font-bold text-xs">Phone (optional)</Label>
                              <Input id="donorPhone" type="tel" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} className="h-11 rounded-xl border-2" placeholder="0712345678" />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="donorAmount" className="font-bold text-xs">Amount (KES) *</Label>

                              {/* Quick Select Amounts */}
                              <div className="grid grid-cols-4 gap-2 mb-3">
                                {[500, 1000, 2000, 5000].map((val) => (
                                  <button
                                    key={val}
                                    type="button"
                                    onClick={() => setDonorAmount(val.toString())}
                                    className={cn(
                                      "py-2 rounded-xl text-[10px] font-black transition-all duration-300 border-2",
                                      donorAmount === val.toString()
                                        ? "bg-secondary text-white border-secondary shadow-lg scale-105"
                                        : "bg-secondary/5 text-secondary border-secondary/10 hover:border-secondary/30"
                                    )}
                                  >
                                    {val}
                                  </button>
                                ))}
                              </div>

                              <div className="relative group/input">
                                <Input
                                  id="donorAmount"
                                  type="number"
                                  min="10"
                                  value={donorAmount}
                                  onChange={(e) => setDonorAmount(e.target.value)}
                                  required
                                  className="h-12 bg-muted/30 border-2 border-transparent focus:border-secondary/30 transition-all duration-300 rounded-xl font-bold text-lg"
                                  placeholder="Other Amount"
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-500 group-focus-within/input:w-full" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="donorMessage" className="font-bold text-xs">Message (optional)</Label>
                            <Input id="donorMessage" value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} className="h-11 rounded-xl border-2" placeholder="A short note..." />
                          </div>
                          <Button type="submit" variant="cta" size="lg" className="w-full h-14 rounded-xl text-base bg-secondary hover:bg-secondary-dark shadow-glow-secondary animate-pulse-slow hover:animate-none" disabled={isSubmittingDonation}>
                            {isSubmittingDonation ? (
                              <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Processing...</span>
                            ) : (
                              <span className="flex items-center gap-2 font-black"><Heart className="w-5 h-5" /> COMPLETE DONATION</span>
                            )}
                          </Button>

                          <p className="text-center text-xs text-muted-foreground">
                            Secure payment powered by IntaSend. You'll choose your preferred method on the next page.
                          </p>
                        </form>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Secondary Payment Options */}
                  <div className="mt-8">
                    <h3 className="text-sm font-black uppercase tracking-widest text-secondary mb-6 flex items-center gap-2">
                      <span className="w-8 h-px bg-secondary/30" />
                      Other Payment Options
                      <span className="w-8 h-px bg-secondary/30" />
                    </h3>
                    <div className="grid grid-cols-1 gap-4">


                      {/* PayPal */}
                      <div
                        className={cn(
                          "group relative bg-white rounded-2xl p-6 border-2 transition-all duration-500 overflow-hidden cursor-pointer",
                          activeMethod === 'paypal' ? "border-[#0070ba] shadow-lg" : "border-transparent hover:border-[#0070ba]/20 shadow-soft"
                        )}
                        onClick={() => setActiveMethod(activeMethod === 'paypal' ? null : 'paypal')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-12 bg-white rounded-lg border border-border flex items-center justify-center p-1.5 overflow-hidden shadow-sm">
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                alt="PayPal"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-foreground font-['Poppins',sans-serif]">PayPal</h4>
                              <p className="text-muted-foreground text-xs leading-none">Credit Cards & International Donors</p>
                            </div>
                          </div>


                          <div className={cn("transition-transform duration-500", activeMethod === 'paypal' ? "rotate-180" : "")}>
                            <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                          </div>
                        </div>

                        <div className={cn(
                          "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
                          activeMethod === 'paypal' ? "max-h-[100px] opacity-100 mt-4" : "max-h-0 opacity-0"
                        )}>
                          <Button
                            className="bg-[#0070ba] hover:bg-[#005ea6] text-white w-full h-12 rounded-xl font-bold"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open("https://www.paypal.com/donate/?hosted_button_id=DV8AFXD5XPRLE", "_blank");
                            }}
                          >
                            Open PayPal <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>

                      {/* Manual M-Pesa Paybill */}
                      <div
                        className={cn(
                          "group relative bg-white rounded-2xl p-6 border-2 transition-all duration-500 overflow-hidden cursor-pointer",
                          activeMethod === 'mpesa' ? "border-secondary/50 shadow-lg" : "border-transparent hover:border-secondary/10 shadow-soft"
                        )}
                        onClick={() => setActiveMethod(activeMethod === 'mpesa' ? null : 'mpesa')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-12 bg-white rounded-lg border border-border flex items-center justify-center overflow-hidden shadow-sm">
                              <img
                                src={mpesaLogo}
                                alt="M-Pesa"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-foreground font-['Poppins',sans-serif]">Lipa na M-Pesa</h4>
                              <p className="text-muted-foreground text-xs leading-none">Manual payment instructions (Paybill)</p>
                            </div>
                          </div>


                          <div className={cn("transition-transform duration-500", activeMethod === 'mpesa' ? "rotate-180" : "")}>
                            <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                          </div>
                        </div>

                        <div className={cn(
                          "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden space-y-4",
                          activeMethod === 'mpesa' ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                        )}>
                          <div className="bg-secondary/5 p-6 rounded-2xl border border-secondary/10 space-y-4">
                            <div className="text-center space-y-1">
                              <h5 className="font-black text-secondary uppercase tracking-wider text-xs">Automated Secure Payment</h5>
                              <p className="text-[10px] text-muted-foreground">An STK Push request will be sent to your phone</p>
                            </div>

                            <form onSubmit={handleMpesaSTKPush} className="space-y-3">
                              <div className="space-y-1">
                                <Label htmlFor="mpesaName" className="font-bold text-[10px] uppercase text-muted-foreground">Full Name *</Label>
                                <Input
                                  id="mpesaName"
                                  value={donorName}
                                  onChange={(e) => setDonorName(e.target.value)}
                                  required
                                  className="h-10 rounded-xl border-secondary/20 bg-white focus:border-secondary/50 transition-all font-bold"
                                  placeholder="John Doe"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor="mpesaPhone" className="font-bold text-[10px] uppercase text-muted-foreground">M-Pesa Number *</Label>
                                <Input
                                  id="mpesaPhone"
                                  type="tel"
                                  value={donorPhone}
                                  onChange={(e) => setDonorPhone(e.target.value)}
                                  required
                                  className="h-10 rounded-xl border-secondary/20 bg-white focus:border-secondary/50 transition-all font-bold"
                                  placeholder="0712345678"
                                />
                              </div>

                              <div className="space-y-1">
                                <Label className="font-bold text-[10px] uppercase text-muted-foreground">Donation Amount (KES)</Label>
                                <Input
                                  type="number"
                                  value={donorAmount}
                                  onChange={(e) => setDonorAmount(e.target.value)}
                                  required
                                  className="h-10 rounded-xl border-secondary/20 bg-white focus:border-secondary/50 transition-all font-bold text-center"
                                />
                              </div>

                              <Button type="submit" className="w-full bg-[#4baa24] hover:bg-[#3d8b1d] text-white h-12 rounded-xl font-black shadow-lg shadow-green-500/20 mt-2">
                                <span className="flex items-center gap-2">SEND STK PUSH <ArrowRight className="w-4 h-4" /></span>
                              </Button>
                            </form>

                            <div className="pt-4 border-t border-secondary/10">
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setActiveMethod('mpesa-manual'); }}
                                className="text-[10px] font-bold text-secondary/60 hover:text-secondary uppercase tracking-widest block mx-auto underline-offset-4 hover:underline"
                              >
                                View Manual Instructions instead
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Manual M-Pesa Instructions (Hidden by default) */}
                      <div
                        className={cn(
                          "transition-all duration-500 overflow-hidden",
                          activeMethod === 'mpesa-manual' ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-secondary/20 space-y-3">
                          <button
                            type="button"
                            onClick={() => setActiveMethod('mpesa')}
                            className="text-[10px] font-bold text-secondary mb-2 flex items-center gap-1 uppercase tracking-widest"
                          >
                            <ArrowRight className="w-3 h-3 rotate-180" /> Back to Automated
                          </button>
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
                          <div className="text-center">
                            <span className="text-xs font-bold text-secondary">Account Name: COPA</span>
                          </div>
                        </div>
                      </div>

                      {/* Bank Transfer */}
                      <div
                        className={cn(
                          "group relative bg-white rounded-2xl p-6 border-2 transition-all duration-500 overflow-hidden cursor-pointer",
                          activeMethod === 'bank' ? "border-primary shadow-lg" : "border-transparent hover:border-primary/20 shadow-soft"
                        )}
                        onClick={() => setActiveMethod(activeMethod === 'bank' ? null : 'bank')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-12 bg-white rounded-lg border border-border flex items-center justify-center overflow-hidden shadow-sm group-hover:border-[#A32323] transition-colors">
                              <img
                                src={bankLogo}
                                alt="Bank Transfer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-foreground font-['Poppins',sans-serif]">Bank Transfer</h4>
                              <p className="text-muted-foreground text-xs leading-none">Direct wire to Equity Bank</p>
                            </div>
                          </div>


                          <div className={cn("transition-transform duration-500", activeMethod === 'bank' ? "rotate-180" : "")}>
                            <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                          </div>
                        </div>

                        <div className={cn(
                          "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden space-y-3",
                          activeMethod === 'bank' ? "max-h-[350px] opacity-100 mt-4" : "max-h-0 opacity-0"
                        )}>
                          <div className="bg-muted/50 p-5 rounded-xl space-y-3 border border-border text-left">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <div className="text-[10px] font-black uppercase text-muted-foreground">Bank Name</div>
                                <div className="text-xs font-bold text-foreground">Equity Bank</div>
                              </div>
                              <div>
                                <div className="text-[10px] font-black uppercase text-muted-foreground">SWIFT</div>
                                <div className="text-xs font-bold text-foreground">EQBLKENA</div>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-border">
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
                </div>
              </ScrollReveal>

              {/* Needs List & In-kind */}
              <ScrollReveal animation="slide-right">
                <div className="lg:pt-12 flex flex-col">
                  {/* Donations in Kind Card - Now first on mobile */}
                  <Card className="mb-12 bg-primary text-white border-none shadow-glow rounded-[2.5rem] overflow-hidden group order-1 md:order-2">
                    <CardContent className="p-10 relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                      <Gift className="w-12 h-12 text-secondary mb-6 transform group-hover:rotate-12 transition-transform" />
                      <h3 className="text-2xl font-black mb-4 font-['Poppins',sans-serif]">
                        Donations in Kind
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

                  {/* Impact/Needs List */}
                  <div className="order-2 md:order-1 mb-12">
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
                            <div className={`w-3 h-3 rounded-full animate-pulse ${need.priority === "Immediate" ? "bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-secondary shadow-[0_0_10px_rgba(242,153,74,0.5)]"}`} />
                            <div className="font-bold text-foreground group-hover:text-primary transition-colors">{need.item}</div>
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${need.priority === "Immediate" ? "bg-destructive/10 text-destructive" : "bg-secondary/10 text-secondary"}`}>
                            {need.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Volunteer Form Section */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden" id="volunteer">

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
                        <Input id="volunteerName" value={volunteerName} onChange={(e) => setVolunteerName(e.target.value)} required className="h-12 rounded-xl border-2" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="volunteerEmail" className="font-bold">Email *</Label>
                        <Input id="volunteerEmail" type="email" value={volunteerEmail} onChange={(e) => setVolunteerEmail(e.target.value)} required className="h-12 rounded-xl border-2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volunteerPhone" className="font-bold">Phone Number</Label>
                      <Input id="volunteerPhone" type="tel" value={volunteerPhone} onChange={(e) => setVolunteerPhone(e.target.value)} className="h-12 rounded-xl border-2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volunteerSkills" className="font-bold">Your Skills & Interests</Label>
                      <Textarea id="volunteerSkills" value={volunteerSkills} onChange={(e) => setVolunteerSkills(e.target.value)} placeholder="Tell us about your background and how you'd like to help..." className="rounded-xl min-h-[150px] border-2" />
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
