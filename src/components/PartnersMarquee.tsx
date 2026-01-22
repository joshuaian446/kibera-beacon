import chezaChezaLogo from "@/assets/partners/cheza-cheza.png";
import crossingThresholdsLogo from "@/assets/partners/crossing-thresholds.png";
import kiberaKnightsLogo from "@/assets/partners/kibera-knights.jpg";
import scoolSoundsLogo from "@/assets/partners/scool-sounds.webp";

const partners = [
  { name: "Cheza Cheza", logo: chezaChezaLogo },
  { name: "Crossing Thresholds", logo: crossingThresholdsLogo },
  { name: "Kibera Knights", logo: kiberaKnightsLogo },
  { name: "S'Cool Sounds", logo: scoolSoundsLogo },
];

const PartnersMarquee = () => {
  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
            Stronger Together
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
            Our Trusted Partners
          </h2>
          <p className="text-muted-foreground">
            Together with our partners, we're building a brighter future for the children of Kibera.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex animate-marquee">
          {/* First set of logos */}
          {partners.map((partner, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {partners.map((partner, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            </div>
          ))}
          {/* Third set for extra smoothness */}
          {partners.map((partner, index) => (
            <div
              key={`third-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
