import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle, Home, ArrowRight, Loader2 } from "lucide-react";
import { storageImages } from "@/lib/storage";
import { supabase } from "@/integrations/supabase/client";

const ThankYou = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const invoiceId = searchParams.get("invoice_id");
    const [showContent, setShowContent] = useState(false);
    const [donationStatus, setDonationStatus] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(!!invoiceId);

    useEffect(() => {
        // Trigger animation after component mounts
        setTimeout(() => setShowContent(true), 100);

        if (invoiceId) {
            const checkStatus = async () => {
                const { data } = await (supabase.from("donations") as any)
                    .select("status")
                    .eq("invoice_id", invoiceId)
                    .single();

                if (data) {
                    setDonationStatus(data.status);
                }
                setIsLoading(false);
            };
            checkStatus();
        }
    }, [invoiceId]);

    return (
        <div className="min-h-screen">
            <SEO
                title="Thank You | COPA Centre"
                description="Thank you for your generous donation to COPA Centre. Your support helps us transform lives in Kibera through education."
            />
            <Header />
            <main className="py-20 bg-gradient-warm min-h-[80vh] flex items-center">
                <div className="container mx-auto px-4">
                    <div className={`max-w-3xl mx-auto transition-all duration-1000 transform ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}>
                        {/* Success Icon with Animation */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping" />
                                <div className="relative w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-12 h-12 text-secondary-foreground animate-bounce-slow" />
                                </div>
                            </div>
                        </div>

                        {/* Main Content Card */}
                        <Card variant="elevated" className="text-center">
                            <CardContent className="p-8 md:p-12">
                                <Heart className="w-16 h-16 text-destructive mx-auto mb-6 animate-pulse" />

                                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
                                    {donationStatus === 'completed' ? "Payment Successful!" : "Thank You for Your Generosity!"}
                                </h1>

                                <p className="text-lg text-muted-foreground mb-6">
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Verifying your donation status...
                                        </span>
                                    ) : donationStatus === 'completed' ? (
                                        "Your donation has been successfully processed. Thank you for making a difference!"
                                    ) : invoiceId ? (
                                        "We've received your donation and sent an M-Pesa prompt to your phone. It will be confirmed shortly."
                                    ) : (
                                        "Your contribution will make a real difference in the lives of children at COPA Centre."
                                    )}
                                </p>

                                {/* Impact Message */}
                                <div className="bg-secondary/10 rounded-lg p-6 mb-8">
                                    <h2 className="text-xl font-semibold text-foreground mb-3 font-['Poppins',sans-serif]">
                                        Your Impact
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Thanks to donors like you, we can continue providing quality education,
                                        nutritious meals, and a safe learning environment for children in Kibera.
                                        Every contribution brings us closer to our mission of transforming lives through education.
                                    </p>
                                </div>

                                {/* Next Steps */}
                                <div className="bg-background/50 rounded-lg p-6 mb-8 text-left">
                                    <h3 className="text-lg font-semibold text-foreground mb-3 font-['Poppins',sans-serif]">
                                        What Happens Next?
                                    </h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                                            <span>{donationStatus === 'completed' ? "Your receipt has been generated and sent to your email" : "You'll receive a confirmation email once your donation is processed"}</span>
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
                                    <Button
                                        variant="hope"
                                        size="lg"
                                        onClick={() => navigate("/")}
                                    >
                                        <Home className="w-5 h-5" />
                                        Return Home
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => navigate("/about")}
                                    >
                                        Learn More About Us
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Social Sharing (Optional) */}
                        <div className="text-center mt-8">
                            <p className="text-sm text-muted-foreground mb-4">
                                Help us spread the word about COPA Centre
                            </p>
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
