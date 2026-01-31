import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { newsArticles, categories } from "@/lib/newsData";
import newsHeroNewImage from "../assets/news-hero-new.jpg";

const News = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={newsHeroNewImage}
              alt="COPA Centre student smiling"
              className="w-full h-full object-cover object-[center_20%] md:object-[center_25%]"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3 font-['Poppins',sans-serif]">
                News & Updates
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 font-['Poppins',sans-serif]">
                Stories of Hope & Impact
              </h1>
              <p className="text-xl text-primary-foreground/85">
                Stay connected with the latest news, success stories, and updates from COPA Centre and our community.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-muted/50 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden border-0 shadow-card">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-full overflow-hidden">
                  <img
                    src={newsArticles[0].image}
                    alt={newsArticles[0].title}
                    className="w-full h-full object-cover object-[center_25%]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {newsArticles[0].category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {newsArticles[0].date}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-['Poppins',sans-serif]">
                    {newsArticles[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {newsArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {newsArticles[0].author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {newsArticles[0].readTime}
                      </span>
                    </div>
                    <Button variant="ghost" className="text-primary font-semibold" asChild>
                      <Link to={`/news/${newsArticles[0].slug}`}>
                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-foreground font-['Poppins',sans-serif]">
                Latest Updates
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.slice(1).map((article, index) => (
                <Link
                  key={article.id}
                  to={`/news/${article.slug}`}
                  className="group"
                >
                  <Card
                    className="overflow-hidden hover:shadow-hover transition-smooth animate-fade-in h-full"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-110"
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
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          {article.author}
                        </span>
                        <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4 font-['Poppins',sans-serif]">
              Never Miss an Update
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news, impact stories, and updates directly in your inbox.
            </p>
            <form
              action="https://gmail.us14.list-manage.com/subscribe/post?u=9e44f1a94c98e16e85fd9f66f&amp;id=b8159b8725&amp;f_id=002fb4e5f0"
              method="POST"
              target="_blank"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                required
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              {/* hidden field to prevent bots */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                <input type="text" name="b_9e44f1a94c98e16e85fd9f66f_b8159b8725" tabIndex={-1} value="" readOnly />
              </div>
              <Button variant="hope" size="lg" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
