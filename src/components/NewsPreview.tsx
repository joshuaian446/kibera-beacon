import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { getLatestArticles } from "@/lib/newsData";
import ScrollReveal from "./ScrollReveal";

const NewsPreview = () => {
  const latestNews = getLatestArticles(3);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
              Latest News
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
              Stories of Hope & Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news, success stories, and happenings from COPA Centre.
            </p>
          </div>
        </ScrollReveal>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((article, index) => (
            <ScrollReveal key={article.id} animation="fade-up" delay={index * 100}>
              <Link
                to={`/news/${article.slug}`}
                className="group block h-full"
              >
                <Card
                  className="overflow-hidden hover:shadow-hover transition-smooth h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 font-['Poppins',sans-serif] group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal animation="fade-in" delay={300} className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/news">
              View All News <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsPreview;
