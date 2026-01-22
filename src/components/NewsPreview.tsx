import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { storageImages } from "@/lib/storage";

const latestNews = [
  {
    id: "1",
    title: "COPA Centre Celebrates 330 Students Milestone",
    excerpt: "Our community school has grown to serve 330 students, marking a significant achievement in our mission.",
    image: storageImages.hero,
    date: "January 15, 2026",
    category: "Milestone",
    readTime: "4 min",
  },
  {
    id: "2",
    title: "New Feeding Program Initiative Launches",
    excerpt: "We're expanding our daily nutrition program to ensure every child receives balanced, nutritious meals.",
    image: storageImages.feeding,
    date: "January 10, 2026",
    category: "Programs",
    readTime: "3 min",
  },
  {
    id: "3",
    title: "Chess Club Wins Regional Competition",
    excerpt: "Our talented chess club members brought home trophies from the regional youth competition.",
    image: storageImages.coCurricular,
    date: "January 5, 2026",
    category: "Achievement",
    readTime: "5 min",
  },
];

const NewsPreview = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((article, index) => (
            <Card 
              key={article.id} 
              className="group overflow-hidden hover:shadow-hover transition-smooth animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                <Link
                  to="/news"
                  className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/news">
              View All News <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;
