import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const TermsOfService = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Terms of Service | COPA Centre"
                description="Terms of Service for Community Pillars Alliance (COPA) Centre."
            />
            <Header />
            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4">
                    <ScrollReveal animation="fade-up">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-8 font-['Poppins',sans-serif]">
                                Terms of <span className="text-secondary italic">Service</span>
                            </h1>
                            <div className="prose prose-lg max-w-none text-muted-foreground font-['Open_Sans',sans-serif] space-y-6">
                                <p className="text-xl font-medium text-foreground italic">
                                    Effective Date: February 10, 2026
                                </p>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                                    <p>
                                        By accessing and using the COPA Centre website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our website.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of Content</h2>
                                    <p>
                                        All content on this website, including text, images, logos, and graphics, is the property of COPA Centre or its partners and is protected by copyright laws. You may view and download content for personal, non-commercial use only.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">3. User Conduct</h2>
                                    <p>
                                        You agree to use the website only for lawful purposes. You are prohibited from using the site to transmit any material that is defamatory, offensive, or otherwise objectionable.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Donations</h2>
                                    <p>
                                        Donations made through our website are processed by third-party services. COPA Centre is not responsible for the security of these third-party platforms. All donations are final unless otherwise required by law.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Limitation of Liability</h2>
                                    <p>
                                        COPA Centre provides this website on an "as is" basis. We make no warranties, expressed or implied, regarding the accuracy or availability of the site. In no event shall COPA Centre be liable for any damages arising from your use of the website.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Changes to Terms</h2>
                                    <p>
                                        We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site constitutes acceptance of the modified terms.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Governing Law</h2>
                                    <p>
                                        These terms are governed by and construed in accordance with the laws of Kenya.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Information</h2>
                                    <p>
                                        If you have questions about these Terms of Service, please contact us at <a href="mailto:copacenter21@gmail.com" className="text-primary hover:underline">copacenter21@gmail.com</a>.
                                    </p>
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

export default TermsOfService;
