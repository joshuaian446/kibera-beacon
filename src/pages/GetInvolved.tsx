import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users, Calendar, Gift, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { storageImages } from "@/lib/storage";
import ScrollReveal from "@/components/ScrollReveal";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";

const donationOptions = [
  { amount: "1000", label: "KSh 1,000", description: "Provides meals for a child for one week" },
  { amount: "30000", label: "KSh 30,000", description: "School supplies for one month" },
  { amount: "5000", label: "KSh 5,000", description: "Sponsor a child for one month" },
  { amount: "50000", label: "KSh 50,000", description: "Covers the school's utilities for one month" },
];

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
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerEmail, setVolunteerEmail] = useState("");
  const [volunteerPhone, setVolunteerPhone] = useState("");
  const [volunteerSkills, setVolunteerSkills] = useState("");
  const [isSubmittingVolunteer, setIsSubmittingVolunteer] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    if (!amount) {
      toast.error("Please select or enter a donation amount");
      return;
    }
    setIsModalOpen(true);
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

        {/* Ways to Help */}
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

        {/* Donation Form */}
        <section className="py-24 md:py-32 bg-gradient-warm relative overflow-hidden" id="donate">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <ScrollReveal animation="slide-left">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
                    <Heart className="w-3 h-3" />
                    Make a Donation
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-8 font-['Poppins',sans-serif] leading-tight tracking-tight">
                    Your Gift <span className="text-primary italic">Changes Lives</span>
                  </h2>
                  <p className="text-lg text-muted-foreground/90 mb-10 leading-relaxed font-['Open_Sans',sans-serif]">
                    100% of your donation goes directly to supporting our students and programs. Every shilling counts towards a better future for Kibera.
                  </p>

                  <Card className="border-none bg-white shadow-2xl rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8 md:p-10">
                      <form onSubmit={handleDonationSubmit} className="space-y-8">
                        {/* Preset Amounts */}
                        <div>
                          <Label className="text-sm font-black text-foreground uppercase tracking-widest mb-4 block">Select Amount</Label>
                          <div className="grid grid-cols-2 gap-4">
                            {donationOptions.map((option) => (
                              <button
                                key={option.amount}
                                type="button"
                                onClick={() => { setSelectedAmount(option.amount); setCustomAmount(""); }}
                                className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${selectedAmount === option.amount
                                  ? "border-secondary bg-secondary/10 shadow-soft"
                                  : "border-border hover:border-secondary/50 hover:bg-secondary/5"
                                  }`}
                              >
                                <div className="font-black text-xl text-foreground font-['Poppins',sans-serif]">{option.label}</div>
                                <div className="text-xs font-medium text-muted-foreground mt-1">{option.description}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Custom Amount */}
                        <div>
                          <Label htmlFor="customAmount" className="text-sm font-black text-foreground uppercase tracking-widest mb-3 block">Or Enter Custom Amount (KSh)</Label>
                          <Input
                            id="customAmount"
                            type="number"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(""); }}
                            className="h-14 rounded-xl border-2 focus-visible:ring-secondary"
                          />
                        </div>

                        {/* Donor Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="donorName" className="text-sm font-bold">Your Name *</Label>
                            <Input
                              id="donorName"
                              value={donorName}
                              onChange={(e) => setDonorName(e.target.value)}
                              required
                              className="h-12 rounded-xl"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="donorEmail" className="text-sm font-bold">Your Email *</Label>
                            <Input
                              id="donorEmail"
                              type="email"
                              value={donorEmail}
                              onChange={(e) => setDonorEmail(e.target.value)}
                              required
                              className="h-12 rounded-xl"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-sm font-bold">Message (Optional)</Label>
                          <Textarea
                            id="message"
                            placeholder="Share why you're donating..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="rounded-xl min-h-[100px]"
                          />
                        </div>

                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                          <DialogTrigger asChild>
                            <Button variant="hope" size="xl" type="submit" className="w-full shadow-glow py-8 text-lg">
                              <Heart className="w-6 h-6 mr-2 animate-pulse" />
                              Proceed to Donation
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
                            <DialogHeader className="bg-primary p-10 text-white relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                              <DialogTitle className="text-3xl font-black font-['Poppins',sans-serif] mb-2">Choose Payment Method</DialogTitle>
                              <DialogDescription className="text-primary-foreground/80 text-lg italic">
                                Thank you, {donorName.split(' ')[0]}! Your donation of KSh {(customAmount || selectedAmount).toLocaleString()} will make a massive impact.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="p-8">
                              <Tabs defaultValue="paypal" className="w-full">
                                <TabsList className="grid grid-cols-3 h-14 bg-muted/50 rounded-xl p-1 mb-8">
                                  <TabsTrigger value="paypal" className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">PayPal</TabsTrigger>
                                  <TabsTrigger value="bank" className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Bank</TabsTrigger>
                                  <TabsTrigger value="mpesa" className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">M-Pesa</TabsTrigger>
                                </TabsList>

                                <TabsContent value="paypal" className="animate-fade-in-up">
                                  <div className="group relative bg-[#0070ba]/5 border-2 border-[#0070ba]/10 hover:border-[#0070ba]/30 p-10 rounded-[2rem] transition-all duration-500 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#0070ba]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                    <div className="relative text-center">
                                      <div className="w-16 h-16 bg-[#0070ba] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_10px_30px_rgba(0,112,186,0.3)]">
                                        <ArrowRight className="w-8 h-8 text-white" />
                                      </div>
                                      <h3 className="text-[#0070ba] font-black text-2xl mb-4 font-['Poppins',sans-serif]">International Support</h3>
                                      <p className="text-muted-foreground mb-8 leading-relaxed">
                                        Fast, secure, and supports all major credit cards globally. Best for donors outside Kenya.
                                      </p>
                                      <Button className="bg-[#0070ba] hover:bg-[#005ea6] text-white w-full h-16 rounded-2xl font-black text-lg shadow-xl hover:shadow-[#0070ba]/20 hover:-translate-y-1 transition-all" onClick={() => window.open("https://www.paypal.com/donate/?hosted_button_id=DV8AFXD5XPRLE", "_blank")}>
                                        Donate via PayPal
                                        <ArrowRight className="h-5 h-5 ml-2" />
                                      </Button>
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent value="bank" className="animate-fade-in-up">
                                  <div className="group relative bg-secondary/5 border-2 border-secondary/10 hover:border-secondary/30 p-10 rounded-[2rem] transition-all duration-500 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                    <h3 className="text-secondary font-black text-2xl mb-8 font-['Poppins',sans-serif] text-center">Equity Bank Wire</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                                      <div className="space-y-6">
                                        <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-secondary/10">
                                          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Account Name</div>
                                          <div className="font-bold text-foreground">Community Pillars Alliance</div>
                                        </div>
                                        <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-secondary/10 group/item">
                                          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Account Number</div>
                                          <div className="font-black text-xl text-foreground flex items-center justify-between">
                                            1280185473337
                                            <Button variant="ghost" size="icon" className="h-10 w-10 text-secondary hover:bg-secondary/10 rounded-xl" onClick={() => copyToClipboard("1280185473337", "Account Number")}>
                                              <Copy className="h-5 w-5" />
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="space-y-6">
                                        <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-secondary/10">
                                          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">SWIFT Code</div>
                                          <div className="font-bold text-foreground">EQBLKENA</div>
                                        </div>
                                        <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-secondary/10">
                                          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Branch</div>
                                          <div className="font-bold text-foreground">Nairobi West (Code: 128)</div>
                                        </div>
                                      </div>
                                    </div>
                                    <p className="mt-8 text-center text-xs text-muted-foreground font-medium italic">
                                      Don't forget to include <span className="text-secondary font-bold">COPA Donation</span> in the transfer description.
                                    </p>
                                  </div>
                                </TabsContent>

                                <TabsContent value="mpesa" className="animate-fade-in-up">
                                  <div className="group relative bg-[#00a651]/5 border-2 border-[#00a651]/10 hover:border-[#00a651]/30 p-10 rounded-[2rem] transition-all duration-500 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a651]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                    <div className="relative">
                                      <div className="text-[#00a651] font-black text-2xl mb-8 font-['Poppins',sans-serif] text-center">Lipa na M-Pesa</div>
                                      <div className="flex flex-col gap-6">
                                        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#00a651]/20 flex items-center justify-between group/paybill">
                                          <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Business Number (Paybill)</div>
                                            <div className="text-3xl font-black text-foreground">247247</div>
                                          </div>
                                          <Button variant="ghost" size="icon" className="h-12 w-12 text-[#00a651] hover:bg-[#00a651]/10 rounded-xl" onClick={() => copyToClipboard("247247", "Paybill Number")}>
                                            <Copy className="h-6 w-6" />
                                          </Button>
                                        </div>

                                        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#00a651]/20 flex items-center justify-between group/acc">
                                          <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Account Number</div>
                                            <div className="text-3xl font-black text-foreground">473337</div>
                                          </div>
                                          <Button variant="ghost" size="icon" className="h-12 w-12 text-[#00a651] hover:bg-[#00a651]/10 rounded-xl" onClick={() => copyToClipboard("473337", "Account Number")}>
                                            <Copy className="h-6 w-6" />
                                          </Button>
                                        </div>
                                      </div>
                                      <div className="mt-8 text-center">
                                        <div className="text-sm font-bold text-foreground">Account Name: <span className="text-[#00a651] italic">Community Pillars Alliance (COPA)</span></div>
                                        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                                          1. Go to M-Pesa Menu &gt; Lipa na M-Pesa &gt; Paybill<br />
                                          2. Enter Business No. 247247 &amp; Acc No. 473337
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>

              {/* Needs List */}
              <ScrollReveal animation="slide-right">
                <div className="lg:pt-12">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                    Our Immediate Needs
                  </span>
                  <h2 className="text-3xl font-bold text-foreground mb-8 font-['Poppins',sans-serif] tracking-tight">
                    Where Your Impact <span className="text-primary italic">Matters Most</span>
                  </h2>

                  <div className="space-y-4">
                    {needs.map((need, idx) => (
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

        {/* Volunteer Form */}
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
