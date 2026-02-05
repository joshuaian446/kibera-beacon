import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import ProgramsPreview from "@/components/ProgramsPreview";
import ImpactStats from "@/components/ImpactStats";
import NewsPreview from "@/components/NewsPreview";
import PartnersMarquee from "@/components/PartnersMarquee";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Header />
      <main>
        <Hero />
        <ProgramsPreview />
        <ImpactStats />
        <NewsPreview />
        <PartnersMarquee />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
