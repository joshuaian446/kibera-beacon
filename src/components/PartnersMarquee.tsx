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
          {/* Repeat logos 6 times for seamless continuous loop */}
          {[...Array(6)].map((_, setIndex) => (
            partners.map((partner, index) => (
              <div
                key={`set-${setIndex}-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
              >
                <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
