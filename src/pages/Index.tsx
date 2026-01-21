import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProgramsPreview from "@/components/ProgramsPreview";
import ImpactStats from "@/components/ImpactStats";
import NewsPreview from "@/components/NewsPreview";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProgramsPreview />
        <ImpactStats />
        <NewsPreview />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
