import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle, Home, ArrowRight, Loader2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import mpesaLogo from "@/assets/mpesa-logo.png";

type PaymentState = "processing" | "completed" | "failed" | "no-invoice";

const ThankYou = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const invoiceId = searchParams.get("invoice_id");
    const [showContent, setShowContent] = useState(false);
    const [paymentState, setPaymentState] = useState<PaymentState>(
        invoiceId ? "processing" : "no-invoice"
    );
    const [pollMessage, setPollMessage] = useState("Verifying your payment...");

    useEffect(() => {
        setTimeout(() => setShowContent(true), 100);

        if (!invoiceId) return;

        let pollCount = 0;
        const maxPolls = 24; // 2 minutes

        const checkStatus = async (): Promise<boolean> => {
            const { data, error } = await supabase.functions.invoke("mpesa-stk-push", {
                body: { action: "check-status", invoice_id: invoiceId },
            });

            if (data && !error) {
                if (data.status === "completed") {
                    setPaymentState("completed");
                    return true;
                }
                if (data.status === "failed") {
                    setPaymentState("failed");
                    return true;
                }
            }
            return false;
        };

        // Update messages as we poll
        const updateMessage = () => {
            pollCount++;
            if (pollCount <= 3) setPollMessage("Waiting for M-Pesa confirmation...");
            else if (pollCount <= 8) setPollMessage("Still waiting for your payment...");
            else if (pollCount <= 16) setPollMessage("This is taking a bit longer than usual...");
            else setPollMessage("Almost there, hang tight...");
        };

        checkStatus();

        const interval = setInterval(async () => {
            updateMessage();
            const done = await checkStatus();
            if (done || pollCount >= maxPolls) {
                clearInterval(interval);
                if (pollCount >= maxPolls && paymentState === "processing") {
                    setPaymentState("failed");
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [invoiceId]);

    // ── Processing Screen ──
    if (paymentState === "processing") {
        return (
            <div className="min-h-screen">
                <SEO title="Processing Payment | COPA Centre" description="Your payment is being processed." />
                <Header />
                <main className="py-20 bg-gradient-warm min-h-[80vh] flex items-center">
                    <div className="container mx-auto px-4">
                        <div className={`max-w-md mx-auto transition-all duration-1000 transform ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                            <Card className="text-center shadow-2xl rounded-[2.5rem] overflow-hidden border-2 border-secondary/10">
                                <div className="bg-secondary p-6 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/5 animate-pulse" />
                                    <div className="relative z-10">
                                        <h2 className="text-xl font-black text-white font-['Poppins',sans-serif] uppercase tracking-wider">
                                            Processing Payment
                                        </h2>
                                    </div>
                                </div>
                                <CardContent className="p-8 md:p-10">
                                    {/* M-Pesa Logo with radar animation */}
                                    <div className="flex justify-center mb-8">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-[#4baa24]/20 rounded-full animate-ping" />
                                            <div className="absolute inset-0 bg-[#4baa24]/10 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
                                            <div className="relative w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#4baa24]/10">
                                                <img src={mpesaLogo} alt="M-Pesa" className="w-16 h-auto object-contain animate-bounce-slow" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spinner + message */}
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin text-secondary" />
                                            <span className="text-sm font-bold text-secondary uppercase tracking-widest animate-pulse">
                                                {pollMessage}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm">
                                            Please enter your M-Pesa PIN on your phone to complete the donation.
                                        </p>
                                    </div>

                                    {/* Progress bar animation */}
                                    <div className="w-full bg-muted/30 rounded-full h-2 mb-6 overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-[#4baa24] via-secondary to-[#4baa24] rounded-full animate-shimmer-fast" style={{ width: "100%" }} />
                                    </div>

                                    <div className="flex items-center gap-2 justify-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                        Secure Transaction
                                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // ── Failed Screen ──
    if (paymentState === "failed") {
        return (
            <div className="min-h-screen">
                <SEO title="Payment Failed | COPA Centre" description="Your payment could not be processed." />
                <Header />
                <main className="py-20 bg-gradient-warm min-h-[80vh] flex items-center">
                    <div className="container mx-auto px-4">
                        <div className={`max-w-3xl mx-auto transition-all duration-1000 transform ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                            <div className="flex justify-center mb-8">
                                <div className="relative w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
                                    <XCircle className="w-12 h-12 text-destructive" />
                                </div>
                            </div>
                            <Card className="text-center shadow-2xl rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8 md:p-12">
                                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
                                        Payment Failed
                                    </h1>
                                    <p className="text-lg text-muted-foreground mb-8">
                                        Unfortunately your payment could not be processed. This could be due to insufficient funds, a timeout, or a cancelled transaction. Please try again.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button variant="hope" size="lg" onClick={() => navigate("/get-involved#donate")}>
                                            Try Again <ArrowRight className="w-5 h-5" />
                                        </Button>
                                        <Button variant="outline" size="lg" onClick={() => navigate("/")}>
                                            <Home className="w-5 h-5" /> Return Home
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // ── Success / No-Invoice Thank You Screen ──
    return (
        <div className="min-h-screen">
            <SEO
                title="Thank You | COPA Centre"
                description="Thank you for your generous donation to COPA Centre."
            />
            <Header />
            <main className="py-20 bg-gradient-warm min-h-[80vh] flex items-center">
                <div className="container mx-auto px-4">
                    <div className={`max-w-3xl mx-auto transition-all duration-1000 transform ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        {/* Success Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping" />
                                <div className="relative w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-12 h-12 text-secondary-foreground animate-bounce-slow" />
                                </div>
                            </div>
                        </div>

                        <Card className="text-center shadow-2xl rounded-[2.5rem] overflow-hidden">
                            <CardContent className="p-8 md:p-12">
                                <Heart className="w-16 h-16 text-destructive mx-auto mb-6 animate-pulse" />

                                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
                                    Thank You for Your Generosity!
                                </h1>

                                <p className="text-lg text-muted-foreground mb-6">
                                    {paymentState === "completed"
                                        ? "Your donation has been successfully processed. Thank you for making a difference!"
                                        : "Your contribution will make a real difference in the lives of children at COPA Centre."}
                                </p>

                                {/* Impact Message */}
                                <div className="bg-secondary/10 rounded-lg p-6 mb-8">
                                    <h2 className="text-xl font-semibold text-foreground mb-3 font-['Poppins',sans-serif]">Your Impact</h2>
                                    <p className="text-muted-foreground">
                                        Thanks to donors like you, we can continue providing quality education,
                                        nutritious meals, and a safe learning environment for children in Kibera.
                                    </p>
                                </div>

                                {/* Next Steps */}
                                <div className="bg-background/50 rounded-lg p-6 mb-8 text-left">
                                    <h3 className="text-lg font-semibold text-foreground mb-3 font-['Poppins',sans-serif]">What Happens Next?</h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                                            <span>{paymentState === "completed" ? "Your receipt has been generated" : "You'll receive confirmation once your donation is processed"}</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                                            <span>Your contribution will be put to work immediately supporting our programs</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                                            <span>We'll keep you updated on the impact of your donation</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button variant="hope" size="lg" onClick={() => navigate("/")}>
                                        <Home className="w-5 h-5" /> Return Home
                                    </Button>
                                    <Button variant="outline" size="lg" onClick={() => navigate("/about")}>
                                        Learn More About Us <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-center mt-8">
                            <p className="text-sm text-muted-foreground mb-4">Help us spread the word about COPA Centre</p>
                            <div className="flex gap-4 justify-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => window.open(`mailto:?subject=Support COPA Centre&body=I just donated to COPA Centre, an amazing organization helping children in Kibera. Check them out: ${window.location.origin}`, '_blank')}
                                >
                                    Share via Email
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ThankYou;
