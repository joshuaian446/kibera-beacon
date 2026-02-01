import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, Newspaper } from "lucide-react";
import { getLatestArticles } from "@/lib/newsData";
import ScrollReveal from "./ScrollReveal";

const NewsPreview = () => {
  const latestNews = getLatestArticles(3);

  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <span className="inline-block text-primary font-extrabold text-sm uppercase tracking-widest mb-4 font-['Poppins',sans-serif]">
              Latest Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 font-['Poppins',sans-serif] tracking-tight">
              News from <span className="text-primary italic">the Heart</span>
            </h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full mb-8" />
            <p className="text-lg text-muted-foreground/90 leading-relaxed font-['Open_Sans',sans-serif] max-w-2xl mx-auto">
              Stay connected with our community through updates, success stories, and highlights from COPA Centre.
            </p>
          </div>
        </ScrollReveal>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latestNews.map((article, index) => (
            <ScrollReveal key={article.id} animation="fade-up" delay={index * 200}>
              <Link
                to={`/news/${article.slug}`}
                className="group block h-full"
              >
                <Card
                  className="overflow-hidden border-none bg-white shadow-soft hover:shadow-hover transition-all duration-500 rounded-[2.5rem] h-full flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-10 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground/60 mb-6 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {article.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-4 font-['Poppins',sans-serif] group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-2 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest group-hover:gap-3 transition-all border-b border-primary/10 pb-1 w-fit group-hover:border-primary">
                      Read Full Story <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal animation="fade-up" delay={500} className="text-center mt-20">
          <Button variant="outline" size="xl" className="rounded-full px-12 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all group" asChild>
            <Link to="/news">
              Explore All News
              <Newspaper className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsPreview;
