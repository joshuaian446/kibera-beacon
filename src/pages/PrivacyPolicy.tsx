import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Privacy Policy | COPA Centre"
                description="Privacy Policy for Community Pillars Alliance (COPA) Centre. Learn how we handle your data."
            />
            <Header />
            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <ScrollReveal animation="fade-up">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-8 font-['Poppins',sans-serif]">
                                Privacy <span className="text-primary italic">Policy</span>
                            </h1>
                            <div className="prose prose-lg max-w-none text-muted-foreground font-['Open_Sans',sans-serif] space-y-6">
                                <p className="text-xl font-medium text-foreground italic">
                                    Effective Date: February 10, 2026
                                </p>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                                    <p>
                                        Community Pillars Alliance (COPA) Centre ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or interact with our services.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                                    <p>
                                        We may collect personal information that you voluntarily provide to us, such as:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Contact information (email address, phone number) when you subscribe to our newsletter or contact us.</li>
                                        <li>Information provided during donation processes through our partners.</li>
                                        <li>Any other information you choose to provide in communication with us.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                                    <p>
                                        We use the information we collect to:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Send newsletters and updates about COPA Centre.</li>
                                        <li>Respond to inquiries and provide support.</li>
                                        <li>Process donations and acknowledge supporters.</li>
                                        <li>Improve our website and services.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
                                    <p>
                                        We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website or conducting our programs, provided they agree to keep this information confidential.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Security</h2>
                                    <p>
                                        We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Choices</h2>
                                    You can unsubscribe from our mailing list at any time by clicking the "unsubscribe" link in our emails or by contacting us directly at <a href="mailto:admin@copacentre.org" className="text-primary hover:underline font-bold">admin@copacentre.org</a> or <a href="mailto:copacentre21@gmail.com" className="text-primary hover:underline">copacentre21@gmail.com</a>.
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
                                    <p>
                                        If you have any questions about this Privacy Policy, please contact us at:
                                    </p>
                                    <address className="not-italic mt-2 flex flex-col gap-1">
                                        <span>COPA Centre</span>
                                        <span>James Nderi Road, Laini-Saba, Kibera</span>
                                        <span>Nairobi, Kenya</span>
                                        <div className="flex flex-col mt-2">
                                            <span>Email (Primary): <a href="mailto:admin@copacentre.org" className="text-primary hover:underline font-bold">admin@copacentre.org</a></span>
                                            <span>Email (Secondary): <a href="mailto:copacentre21@gmail.com" className="text-primary hover:underline">copacentre21@gmail.com</a></span>
                                        </div>
                                    </address>
                                </section>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
