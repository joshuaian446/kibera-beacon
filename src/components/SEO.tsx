import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    type?: string;
}

const SEO = ({
    title = "COPA Centre | Empowering Kibera Children Through Education",
    description = "Community Pillars Alliance (COPA) Centre empowers vulnerable children in Kibera, Nairobi through quality education, nutrition programs, and community support. Join us in transforming lives.",
    keywords = "COPA Centre, Kibera, education, Kenya, community development, children, school, feeding program, nonprofit",
    canonical,
    type = "website",
}: SEOProps) => {
    const location = useLocation();
    const siteUrl = "https://www.copacentre.org";
    const fullCanonical = canonical || `${siteUrl}${location.pathname}${location.search}`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SEO;
