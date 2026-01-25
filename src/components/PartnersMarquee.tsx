import crossingThresholdsLogo from "@/assets/partners/crossing-thresholds.png";
import kiberaKnightsLogo from "@/assets/partners/kibera-knights.jpg";
import scoolSoundsLogo from "@/assets/partners/scool-sounds.png";
import chezaChezaLogo from "@/assets/partners/cheza-cheza.png";

const partners = [
  { name: "Crossing Thresholds", logo: crossingThresholdsLogo },
  { name: "Kibera Knights", logo: kiberaKnightsLogo },
  { name: "S'Cool Sounds", logo: scoolSoundsLogo },
  { name: "Cheza Cheza", logo: chezaChezaLogo },
];

const PartnersMarquee = () => {
  // Double the partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 md:py-16 bg-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 md:mb-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
            Stronger Together
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
            Our Trusted Partners
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Together with our partners, we're building a brighter future for the children of Kibera.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-primary/5 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-primary/5 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex w-max animate-marquee-scroll">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`partner-${index}`}
              className="flex-shrink-0 px-4 md:px-8 lg:px-12 flex items-center justify-center"
            >
              <div className="w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 flex items-center justify-center group">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
