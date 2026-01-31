import { useState } from "react";
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
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "mpesa" | "bank" | "">("paypal");

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    if (!amount) {
      toast.error("Please select or enter a donation amount");
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    // For PayPal, redirect to PayPal donation page
    if (paymentMethod === "paypal") {
      // Open PayPal donation page in new tab
      window.open("https://www.paypal.com/donate/?hosted_button_id=DV8AFXD5XPRLE", "_blank");
      toast.success("Redirecting to PayPal...");
      return;
    }

    // For M-Pesa and Bank Transfer, show instructions
    if (paymentMethod === "mpesa") {
      toast.info("M-Pesa payment instructions will be displayed. (Coming soon)");
      return;
    }

    if (paymentMethod === "bank") {
      toast.info("Bank transfer details will be provided. (Coming soon)");
      return;
    }
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your interest in volunteering! We will be in touch soon.");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={storageImages.heroAlt}
              alt="COPA Centre children"
              className="w-full h-full object-cover object-top md:object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                Get Involved
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 font-['Poppins',sans-serif]">
                Join Us in Making a Difference
              </h1>
              <p className="text-xl text-primary-foreground/85">
                Every contribution, whether financial or through your time and skills, helps transform the lives of children in Kibera.
              </p>
            </div>
          </div>
        </section>

        {/* Ways to Help */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Heart, title: "Donate", description: "Support our programs with a financial contribution" },
                { icon: Users, title: "Volunteer", description: "Share your time and skills with our community" },
                { icon: Calendar, title: "Sponsor", description: "Sponsor a child's education for a full year" },
              ].map((item) => (
                <Card key={item.title} variant="elevated" className="text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <item.icon className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 font-['Poppins',sans-serif]">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-20 bg-gradient-warm" id="donate">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                  Make a Donation
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-['Poppins',sans-serif]">
                  Your Gift Changes Lives
                </h2>
                <p className="text-muted-foreground mb-8">
                  100% of your donation goes directly to supporting our students and programs. Choose a donation amount or enter a custom amount.
                </p>

                <Card variant="elevated">
                  <CardContent className="p-6">
                    <form onSubmit={handleDonationSubmit} className="space-y-6">
                      {/* Preset Amounts */}
                      <div>
                        <Label className="text-sm font-semibold mb-3 block">Select Amount</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {donationOptions.map((option) => (
                            <button
                              key={option.amount}
                              type="button"
                              onClick={() => { setSelectedAmount(option.amount); setCustomAmount(""); }}
                              className={`p-4 rounded-lg border-2 text-left transition-smooth ${selectedAmount === option.amount
                                ? "border-secondary bg-secondary/10"
                                : "border-border hover:border-secondary/50"
                                }`}
                            >
                              <div className="font-bold text-foreground">{option.label}</div>
                              <div className="text-xs text-muted-foreground">{option.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Amount */}
                      <div>
                        <Label htmlFor="customAmount">Or Enter Custom Amount (KSh)</Label>
                        <Input
                          id="customAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(""); }}
                          className="mt-2"
                        />
                      </div>

                      {/* Donor Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="donorName">Your Name *</Label>
                          <Input
                            id="donorName"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            required
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="donorEmail">Your Email *</Label>
                          <Input
                            id="donorEmail"
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            required
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea
                          id="message"
                          placeholder="Share why you're donating..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <Button variant="hope" size="xl" type="submit" className="w-full">
                        <Heart className="w-5 h-5" />
                        Proceed to Donate
                      </Button>
                    </form>

                    {/* Payment Method Selection - Below Button */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <Label className="text-sm font-semibold mb-3 block">Choose Your Payment Method</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("paypal")}
                          className={`p-4 rounded-lg border-2 text-center transition-smooth ${paymentMethod === "paypal"
                              ? "border-secondary bg-secondary/10"
                              : "border-border hover:border-secondary/50"
                            }`}
                        >
                          <div className="font-bold text-foreground mb-1">PayPal</div>
                          <div className="text-xs text-muted-foreground">International</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("mpesa")}
                          className={`p-4 rounded-lg border-2 text-center transition-smooth ${paymentMethod === "mpesa"
                              ? "border-secondary bg-secondary/10"
                              : "border-border hover:border-secondary/50"
                            }`}
                        >
                          <div className="font-bold text-foreground mb-1">M-Pesa</div>
                          <div className="text-xs text-muted-foreground">Kenya</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("bank")}
                          className={`p-4 rounded-lg border-2 text-center transition-smooth ${paymentMethod === "bank"
                              ? "border-secondary bg-secondary/10"
                              : "border-border hover:border-secondary/50"
                            }`}
                        >
                          <div className="font-bold text-foreground mb-1">Bank Transfer</div>
                          <div className="text-xs text-muted-foreground">Direct</div>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Needs List */}
              <div>
                <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                  Our Needs
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-['Poppins',sans-serif]">
                  Where Your Money Goes
                </h2>

                <div className="space-y-4">
                  {needs.map((need) => (
                    <Card key={need.item} variant="elevated">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${need.priority === "Immediate" ? "bg-destructive" : "bg-secondary"
                            }`} />
                          <div>
                            <div className="font-semibold text-foreground">{need.item}</div>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${need.priority === "Immediate"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-secondary/10 text-secondary"
                          }`}>
                          {need.priority}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card variant="impact" className="mt-8">
                  <CardContent className="p-6">
                    <Gift className="w-10 h-10 text-secondary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2 font-['Poppins',sans-serif]">
                      Other Ways to Give
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      We also accept in-kind donations such as books, school supplies, sports equipment, and food items.
                    </p>
                    <Button variant="outline" asChild>
                      <a href="mailto:copacenter21@gmail.com">
                        Contact Us to Arrange
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Form */}
        <section className="py-20 bg-background" id="volunteer">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                Volunteer
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
                Share Your Time & Skills
              </h2>
              <p className="text-muted-foreground">
                Whether you're a teacher, mentor, or simply want to help, we'd love to have you on our team.
              </p>
            </div>

            <Card variant="elevated" className="max-w-xl mx-auto">
              <CardContent className="p-8">
                <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="volunteerName">Full Name *</Label>
                      <Input id="volunteerName" required className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="volunteerEmail">Email *</Label>
                      <Input id="volunteerEmail" type="email" required className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="volunteerPhone">Phone Number</Label>
                    <Input id="volunteerPhone" type="tel" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="volunteerSkills">Your Skills & Interests</Label>
                    <Textarea
                      id="volunteerSkills"
                      placeholder="Tell us about your background and how you'd like to help..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  <Button variant="cta" size="lg" type="submit" className="w-full">
                    <Users className="w-5 h-5" />
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetInvolved;
