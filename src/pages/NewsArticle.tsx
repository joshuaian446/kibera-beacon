import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { getArticleBySlug, newsArticles } from "@/lib/newsData";
import { Card, CardContent } from "@/components/ui/card";

const NewsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  // Get related articles (exclude current)
  const relatedArticles = newsArticles
    .filter(a => a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      <SEO
        title={`${article.title} | COPA Centre`}
        description={article.excerpt}
        type="article"
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-[center_35%] md:object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to News
              </Link>

              <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                {article.category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 font-['Poppins',sans-serif]">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="text-foreground space-y-4">
                    {article.content.split('\n').map((paragraph, index) => {
                      // Helper to render inline markdown (like bold)
                      const renderInline = (text: string) => {
                        const parts = text.split(/(\*\*[^*]+\*\*)/g);
                        return parts.map((part, i) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i} className="font-black text-foreground">{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        });
                      };

                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4 font-['Poppins',sans-serif]">
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-xl font-bold text-foreground mt-6 mb-3 font-['Poppins',sans-serif]">
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('- ')) {
                        return (
                          <li key={index} className="text-muted-foreground ml-4 mb-2">
                            {renderInline(paragraph.replace('- ', ''))}
                          </li>
                        );
                      }
                      if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                        return (
                          <p key={index} className="italic text-primary mt-6">
                            {paragraph.replace(/\*/g, '')}
                          </p>
                        );
                      }
                      if (paragraph.startsWith('**CTA**:')) {
                        const match = paragraph.match(/\[([^\]]+)\]\(([^)]+)\)/);
                        if (match) {
                          const [_, label, link] = match;
                          return (
                            <div key={index} className="mt-12 p-8 bg-primary/5 border border-primary/10 rounded-3xl text-center">
                              <h4 className="text-lg font-bold text-foreground mb-4 font-['Poppins',sans-serif]">Take Action</h4>
                              <Button size="lg" className="shadow-glow" asChild>
                                <Link to={link}>{label}</Link>
                              </Button>
                            </div>
                          );
                        }
                      }
                      if (paragraph.trim()) {
                        return (
                          <p key={index} className="text-muted-foreground leading-relaxed">
                            {renderInline(paragraph)}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground font-medium">Share this story:</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h3 className="text-lg font-bold text-foreground mb-6 font-['Poppins',sans-serif]">
                    More Stories
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <Card key={related.id} className="overflow-hidden group">
                        <Link to={`/news/${related.slug}`}>
                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={related.image}
                              alt={related.title}
                              className="w-full h-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <CardContent className="p-4">
                            <span className="text-xs text-primary font-medium">
                              {related.category}
                            </span>
                            <h4 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
                              {related.title}
                            </h4>
                            <span className="text-xs text-muted-foreground mt-2 block">
                              {related.date}
                            </span>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>

                  {/* CTA Card */}
                  <Card className="mt-8 bg-primary text-primary-foreground">
                    <CardContent className="p-6 text-center">
                      <h4 className="font-bold text-lg mb-2 font-['Poppins',sans-serif]">
                        Support Our Mission
                      </h4>
                      <p className="text-primary-foreground/80 text-sm mb-4">
                        Help us continue creating stories of hope and impact.
                      </p>
                      <Button variant="heroSolid" asChild>
                        <Link to="/get-involved">Donate Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to News CTA */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                View All News
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsArticle;
