import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { newsArticles, categories } from "@/lib/newsData";
import newsHeroV4Image from "../assets/news-hero-v4.jpg";

const News = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = activeCategory === "All"
    ? newsArticles
    : newsArticles.filter(article => article.category === activeCategory);

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen">
      <SEO
        title="News & Stories | COPA Centre"
        description="Stay updated with the latest news, success stories, and impact updates from the heart of Kibera, Nairobi."
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={newsHeroV4Image}
              alt="COPA Centre student smiling"
              className="w-full h-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-primary-foreground/90 text-sm font-medium uppercase tracking-wider">
                    News & Stories
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-6 font-['Poppins',sans-serif] leading-tight tracking-tight">
                  Voices of <span className="text-secondary italic">Hope & Impact</span>
                </h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-2xl font-['Open_Sans',sans-serif]">
                  Stay connected with the latest news, success stories, and transformative updates from the heart of Kibera.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Decorative Floaties */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" />
        </section>

        {/* Category Filter */}
        <section className="py-12 bg-background relative z-10 -mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "hope" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-6 py-3 h-auto text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === category ? "shadow-glow" : "hover:border-primary/50 hover:bg-primary/5"
                    }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
          <div className="container mx-auto px-4 relative">
            <ScrollReveal animation="fade-up" key={activeCategory + "-featured"}>
              {featuredArticle ? (
                <Card className="overflow-hidden border-none shadow-2xl max-w-6xl mx-auto rounded-[3rem] group">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-secondary text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-glow">
                          Featured Story
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-10 lg:p-16 flex flex-col justify-center bg-white">
                      <div className="flex items-center gap-4 text-sm font-bold mb-6">
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full uppercase tracking-tighter">
                          {featuredArticle.category}
                        </span>
                        <span className="flex items-center gap-2 text-muted-foreground/80">
                          <Calendar className="w-4 h-4 text-secondary" />
                          {featuredArticle.date}
                        </span>
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-6 font-['Poppins',sans-serif] leading-tight group-hover:text-primary transition-colors">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-lg text-muted-foreground/90 mb-10 leading-relaxed font-['Open_Sans',sans-serif] italic">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-border mt-auto">
                        <div className="flex items-center gap-6 text-sm font-bold text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            {featuredArticle.author}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-secondary" />
                            {featuredArticle.readTime}
                          </span>
                        </div>
                        <Button variant="cta" size="xl" className="group/btn shadow-soft" onClick={() => navigate(`/news/${featuredArticle.slug}`)}>
                          Read The Full Story
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ) : (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-muted-foreground">No articles found in this category.</h3>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-24 md:py-32 bg-primary/5 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
              <div>
                <span className="inline-block text-secondary font-black text-xs uppercase tracking-[0.3em] mb-4">
                  Community Updates
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-foreground font-['Poppins',sans-serif] tracking-tight">
                  Latest From <span className="text-primary italic">Kibera</span>
                </h2>
              </div>
              <div className="w-24 h-1.5 bg-secondary rounded-full hidden md:block" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {gridArticles.map((article, index) => (
                <ScrollReveal key={article.id + "-" + activeCategory} animation="fade-up" delay={index * 100}>
                  <div
                    onClick={() => navigate(`/news/${article.slug}`)}
                    className="group h-full block cursor-pointer"
                  >
                    <Card
                      className="overflow-hidden border-none shadow-soft hover:shadow-glow transition-all duration-500 h-full bg-white rounded-[2rem] flex flex-col"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        <div className="absolute top-5 left-5">
                          <span className="bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-5">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-secondary" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-4 font-['Poppins',sans-serif] group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground/90 text-sm mb-6 line-clamp-3 leading-relaxed font-['Open_Sans',sans-serif] italic">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                          <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                            <User className="w-3.5 h-3.5 text-primary" />
                            {article.author}
                          </span>
                          <span className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                            Explore <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-foreground/5 skew-y-3 transform origin-bottom-left" />
          <div className="container mx-auto px-4 text-center relative">
            <ScrollReveal animation="fade-up">
              <h2 className="text-4xl md:text-5xl font-black text-primary-foreground mb-6 font-['Poppins',sans-serif] tracking-tight">
                Never Miss a <span className="text-white italic">Step Forward</span>
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-12 leading-relaxed font-['Open_Sans',sans-serif]">
                Subscribe to our newsletter to receive the latest impact stories and community updates directly in your inbox.
              </p>
              <form
                action="https://gmail.us14.list-manage.com/subscribe/post?u=9e44f1a94c98e16e85fd9f66f&amp;id=b8159b8725&amp;f_id=002fb4e5f0"
                method="POST"
                target="_blank"
                className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto bg-white/10 p-2 rounded-[2rem] backdrop-blur-md border border-white/20"
              >
                <input
                  type="email"
                  name="EMAIL"
                  id="mce-EMAIL"
                  required
                  placeholder="Your favorite email..."
                  className="flex-1 px-8 py-5 rounded-2xl bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-secondary/50 font-medium"
                />
                {/* hidden field to prevent bots */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                  <input type="text" name="b_9e44f1a94c98e16e85fd9f66f_b8159b8725" tabIndex={-1} value="" readOnly />
                </div>
                <Button variant="hope" size="xl" type="submit" className="shadow-glow px-12 rounded-2xl">
                  Catch the Wave
                </Button>
              </form>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
