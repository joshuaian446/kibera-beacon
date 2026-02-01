import { storageImages } from "@/lib/storage";
import paradeImage from "@/assets/parade-new-school-year.jpg";
import partnerVisitImage from "@/assets/partner-visit-featured.jpg";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "4",
    slug: "crossing-thresholds-partner-visit",
    title: "Visit from Our Partners: Crossing Thresholds",
    excerpt: "Joy, laughter, and transformation filled the air during a week-long visit from our partners at Crossing Thresholds, featuring new facilities and a community sports day.",
    content: `
## Building Bridges, Strengthening Bonds

Last week, COPA Centre was filled with an extraordinary sense of joy as we hosted a delegation from **Crossing Thresholds**. The week-long visit was a beautiful reminder of the power of global connection and the tangible impact of shared vision.

### A Week of Hard Work and Play

The volunteers weren't just here to observe; they were here to build. Together with our local team, they engaged in a range of transformative activities:
- **Construction of a New Children's Play Area**: A vibrant, safe space where our youngest learners can develop physical skills and friendships.
- **School Refresh**: The classrooms received a fresh coat of paint, brightening the learning environment with colors that reflect the hope within.
- **Fun Sports Day**: The week culminated in a massive sports gala. Our students challenged the volunteers in games ranging from football to Sack races, filled with cheers and competitive spirit.

### A Message of Commitment

*"Walking into COPA Centre, you immediately feel the love and dedication that goes into every aspect of this school. We are honored to walk this path with Clement and his team,"* noted **Carter Via**, Director of Crossing Thresholds.

### Join the Celebration
We are deeply grateful for this partnership that continues to push the boundaries of what's possible in Kibera.

**CTA**: [Support our community expansion projects today](/get-involved) and help us keep the momentum going!
    `,
    image: partnerVisitImage,
    date: "January 20, 2026",
    author: "Clement Ombati",
    category: "Partnerships",
    readTime: "5 min read",
  },
  {
    id: "1",
    slug: "new-school-year-brings-hope",
    title: "New School Year: The Journey to Grade 8",
    excerpt: "As we welcome students back for 2026, we celebrate a major milestone: our very first transition to Grade 8 and our renewed commitment to Kibera's future.",
    content: `
## A Historic Leap Forward

As the gates of COPA Centre opened this January, 2026, we didn't just start a new year—we started a new chapter of excellence. This year marks our historic **transition into Grade 8**, a significant step in ensuring our students receive a full cycle of quality education without interruption.

### Commitment to the Mission

Our mission remains clear: to rescue, nurture, and empower. This year, we are doubling down on our commitment to academic rigor and emotional support for our 330+ students. 

Grade 8 represents more than just a higher level of learning; it is a testament to the resilience of our students and the unwavering support of our community. We are preparing these young leaders not just for exams, but for the world beyond Kibera.

### Welcome Back
The classrooms are buzzing, the uniforms are sharp, and the ambition is higher than ever.

**CTA**: [Sponsor a Grade 8 student's journey](/get-involved) and help them reach the finish line of their primary education.
    `,
    image: paradeImage,
    date: "January 20, 2026",
    author: "COPA Team",
    category: "School News",
    readTime: "4 min read",
  },
  {
    id: "2",
    slug: "feeding-program-initiative-launches",
    title: "Feeding Minds: Our Enhanced Nutrition Program",
    excerpt: "Introducing a new, high-nutrition menu at COPA Centre to combat the harsh reality of food insecurity in the heart of Kibera.",
    content: `
## More Than Just a Meal

At COPA Centre, we know that a hungry child cannot focus on their dreams. In Kibera, where most households survive on **less than $2 USD a day**, the food provided at our school is often the only meal a child will have.

### A New, Improved Menu

This month, we are proud to launch an enhanced nutrition program featuring:
- **Diverse Nutritional Profiles**: New menu items specifically targeted to improve iron and protein levels.
- **Improved Ingredients**: Locally sourced, fresh produce that balances traditional Kenyan tastes with modern nutritional needs.
- **Reliability**: Ensuring that no matter how difficult things are at home, every child is guaranteed two warm, balanced meals here.

### Nourishing the Future
Nutrition is the foundation of education. When bodies are fed, minds can soar.

**CTA**: [Donate to our feeding program](/programs) — just $30 provides a month of nutritious meals for a child.
    `,
    image: storageImages.feeding,
    date: "January 20, 2026",
    author: "COPA Team",
    category: "Programs",
    readTime: "4 min read",
  },
  {
    id: "3",
    slug: "chess-club-knights-back-in-action",
    title: "Chess Club: The Knights Take the Lead",
    excerpt: "The COPA Knights kicked off the Kibera Chess League with a decisive victory against Garden of Hope, proving that strategic minds are being built in our halls.",
    content: `
## Strategies for Success

The **COPA Knights** are officially back on the board! This week, our Chess Club played their highly anticipated first round of the season against **Garden of Hope School**.

### A Dominant Start

Our young grandmasters went into the match on the front foot, showing incredible focus and tactical depth. The result was a stunning performance that has placed the Knights in a prime position for the league title.
- **The Match**: Intense focus and creative gambits defined the day.
- **The Goal**: We are fully committed to winning the Kibera Chess League this year, proving that intellectual excellence knows no boundaries.

### Building Young Leaders
Chess at COPA is more than a game—it's training for life. It teaches patience, foresight, and the courage to make bold moves.

**CTA**: [Support our co-curricular activities](/programs) and help us provide the tools for the next generation of strategic thinkers.
    `,
    image: storageImages.coCurricular,
    date: "January 20, 2026",
    author: "COPA Team",
    category: "Co-curricular",
    readTime: "3 min read",
  },
];

export const categories = ["All", "School News", "Programs", "Co-curricular", "Partnerships"];

export const getArticleBySlug = (slug: string): NewsArticle | undefined => {
  return newsArticles.find(article => article.slug === slug);
};

export const getLatestArticles = (count: number = 3): NewsArticle[] => {
  return newsArticles.slice(0, count);
};
