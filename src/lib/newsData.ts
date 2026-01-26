import { storageImages } from "@/lib/storage";
import paradeImage from "@/assets/parade-new-school-year.jpg";

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
    id: "1",
    slug: "new-school-year-brings-hope",
    title: "New School Year Brings New Sense of Hope",
    excerpt: "As we welcome our students back for another academic year, the excitement and optimism at COPA Centre is palpable. This year marks a new chapter in our journey of transforming lives.",
    content: `
## A Fresh Start Full of Promise

As the gates of COPA Centre opened this January, the air was filled with excitement, laughter, and the unmistakable buzz of new beginnings. Our students, dressed in their fresh uniforms and carrying new school supplies, walked through our doors with bright eyes and even brighter dreams.

### Record Enrollment Numbers

This year, we're proud to welcome over 330 students across all our grade levels. This represents our largest enrollment to date and reflects the growing trust our community places in COPA Centre's mission to provide quality education to Kibera's children.

### New Faces, New Opportunities

Among our returning students, we're excited to welcome 45 new learners to our COPA family. Each child brings their own unique story, challenges, and potential. Our dedicated team of 25 teachers has been working tirelessly to ensure every student feels welcomed and supported.

### Enhanced Curriculum for 2026

This academic year introduces several exciting additions to our program:

- **Expanded Digital Literacy**: More computer lab sessions to prepare students for the modern world
- **Enhanced Arts Program**: New music and visual arts classes
- **Sports Development**: Structured physical education with inter-school competitions
- **Life Skills Training**: Age-appropriate sessions on leadership and personal development

### Community Support

The new school year would not be possible without the generous support of our partners and donors. From new textbooks to refurbished classrooms, every contribution has made a tangible difference in creating an environment where our children can thrive.

### Looking Ahead

As we embark on this new academic journey, our commitment remains unchanged: to empower every child at COPA Centre with the education, nutrition, and support they need to build a brighter future. Together, we are not just teaching students—we are nurturing the future leaders of Kibera and beyond.

*Welcome back, COPA family. Here's to a year of growth, learning, and hope!*
    `,
    image: paradeImage,
    date: "January 20, 2026",
    author: "Clement Ombati",
    category: "School News",
    readTime: "5 min read",
  },
  {
    id: "2",
    slug: "feeding-program-initiative-launches",
    title: "New Feeding Program Initiative Launches",
    excerpt: "COPA Centre launches an expanded nutrition program to ensure every child receives balanced, nutritious meals that support their learning and growth throughout the school day.",
    content: `
## Nourishing Bodies, Nurturing Minds

At COPA Centre, we believe that a hungry child cannot learn effectively. That's why we're thrilled to announce the launch of our enhanced feeding program, designed to provide comprehensive nutritional support to all our students.

### The Challenge We Face

In Kibera, many children come to school having not eaten breakfast. Some may not have had a proper meal since the previous day's lunch at school. Hunger affects concentration, energy levels, and ultimately, academic performance. Our new initiative addresses this challenge head-on.

### What's New in Our Feeding Program

Our expanded program includes several key improvements:

**Morning Porridge Program**
- Every student now receives a nutritious porridge upon arrival
- Made with fortified flour, milk, and essential nutrients
- Ensures children start their learning day with energy

**Balanced Lunch Menu**
- Rotating menu designed by nutrition experts
- Fresh vegetables sourced from local farmers
- Protein-rich meals including beans, eggs, and occasional meat
- Traditional Kenyan dishes like ugali, sukuma wiki, and githeri

**Hydration Stations**
- Clean drinking water available throughout the day
- Teaching children about the importance of staying hydrated

### Impact on Learning

Research shows that proper nutrition can improve:
- Concentration in class by up to 40%
- Memory retention and cognitive function
- School attendance rates
- Overall academic performance

### Community Involvement

Our feeding program wouldn't be possible without the dedicated kitchen staff and parent volunteers who prepare meals daily. Special thanks to our partners who have provided cooking equipment, food supplies, and financial support.

### How You Can Help

The feeding program costs approximately KSh 50,000 per month to operate. You can support this initiative by:
- Sponsoring meals for a week (KSh 500)
- Donating cooking supplies
- Volunteering in our kitchen
- Making a monthly contribution

*Every meal served is a step toward a brighter future for our children.*
    `,
    image: storageImages.feeding,
    date: "January 15, 2026",
    author: "COPA Team",
    category: "Programs",
    readTime: "4 min read",
  },
  {
    id: "3",
    slug: "chess-club-knights-back-in-action",
    title: "Chess Club Knights Are Back in Action at the Kibera Knights Chess League",
    excerpt: "Our talented chess club members return to competitive play as the Kibera Knights Chess League kicks off its new season with exciting matches and promising new players.",
    content: `
## Strategic Minds, Bright Futures

The COPA Centre Chess Club is back with renewed energy and determination as the Kibera Knights Chess League begins its 2026 season. Our young strategists are ready to showcase their skills and represent our school with pride.

### A Partnership That Inspires

Our chess program is made possible through our valued partnership with Kibera Knights, a local organization dedicated to using chess as a tool for youth development. Together, we've created a space where children learn not just the game, but valuable life skills.

### This Season's Highlights

**New Players Join the Ranks**
- 15 new members have joined our chess club this year
- Training sessions run every Tuesday and Thursday
- Mixed age groups learning together

**Returning Champions**
Several of our experienced players are back, including:
- Brian, who placed 3rd in last year's regional tournament
- Faith, our top female player and club captain
- Samuel, known for his creative opening strategies

### More Than Just a Game

Chess teaches our students invaluable skills:

**Critical Thinking**
Every move requires careful analysis and planning. Students learn to think several steps ahead—a skill that transfers to academic work and life decisions.

**Patience and Focus**
In a world of instant gratification, chess teaches children to slow down, concentrate, and make thoughtful decisions.

**Sportsmanship**
Win or lose, our players learn to respect opponents, accept outcomes gracefully, and always shake hands after a match.

**Confidence Building**
As students improve and win matches, they develop self-confidence that carries into other areas of their lives.

### Upcoming Tournaments

Mark your calendars for these exciting events:
- **February 10**: Inter-school friendly matches
- **March 15**: Kibera Knights League Round 1
- **April 22**: Regional Youth Chess Championship

### Support Our Chess Champions

You can help our chess program by:
- Donating chess sets and boards
- Sponsoring tournament participation fees
- Volunteering as a chess mentor
- Attending matches to cheer on our players

*Checkmate poverty through the power of strategic thinking!*
    `,
    image: storageImages.coCurricular,
    date: "January 12, 2026",
    author: "COPA Team",
    category: "Co-curricular",
    readTime: "4 min read",
  },
  {
    id: "4",
    slug: "crossing-thresholds-partner-visit",
    title: "Visit from Our Partners: Crossing Thresholds",
    excerpt: "We were honored to host our long-standing partners from Crossing Thresholds, who spent a week experiencing our programs firsthand and exploring new ways to collaborate.",
    content: `
## Building Bridges, Strengthening Bonds

Last week, COPA Centre had the privilege of hosting a delegation from Crossing Thresholds, one of our most valued international partners. Their visit was a beautiful reminder of the power of global collaboration in creating local impact.

### About Crossing Thresholds

Crossing Thresholds is an organization dedicated to supporting community-based education initiatives in underserved areas. Their partnership with COPA Centre has been instrumental in expanding our programs and reaching more children in Kibera.

### A Week of Connection

**Day 1-2: Classroom Immersion**
Our visitors spent time in various classrooms, observing lessons and interacting with students. They were particularly impressed by our students' enthusiasm for learning and the engaging teaching methods our staff employ.

**Day 3: Community Walk**
A guided tour of Kibera helped our partners understand the environment our students come from. Walking through the narrow pathways, they gained deeper appreciation for the challenges our families face and the resilience they demonstrate daily.

**Day 4: Program Reviews**
Detailed sessions covering:
- Academic performance data
- Feeding program impact assessments
- Co-curricular activity outcomes
- Future expansion plans

**Day 5: Student Performances**
Our students put on a spectacular show featuring:
- Traditional songs and dances
- Recorder ensemble performance
- Poetry recitations
- Drama presentations

### Key Outcomes of the Visit

**Increased Support**
Crossing Thresholds has committed to expanding their support for our programs, including:
- Sponsorship for 20 additional students
- Funding for teacher training workshops
- Support for our computer lab upgrades

**New Initiatives**
Together, we're exploring:
- Student exchange program possibilities
- Virtual pen pal connections with schools abroad
- Joint fundraising campaigns

**Shared Learning**
Our partners shared insights from other programs they support, helping us adopt best practices from around the world.

### Words from Our Visitors

*"Walking into COPA Centre, you immediately feel the love and dedication that goes into every aspect of this school. The children are bright, curious, and full of potential. We're proud to support this incredible work."* — Sarah, Crossing Thresholds Director

### Gratitude and Looking Forward

We extend our heartfelt thanks to the Crossing Thresholds team for their visit and continued partnership. Together, we are proving that when communities across the world unite, we can create lasting change in the lives of children.

*Partnerships like these remind us that hope knows no borders.*
    `,
    image: storageImages.community,
    date: "January 8, 2026",
    author: "Clement Ombati",
    category: "Partnerships",
    readTime: "5 min read",
  },
];

export const categories = ["All", "School News", "Programs", "Co-curricular", "Partnerships"];

export const getArticleBySlug = (slug: string): NewsArticle | undefined => {
  return newsArticles.find(article => article.slug === slug);
};

export const getLatestArticles = (count: number = 3): NewsArticle[] => {
  return newsArticles.slice(0, count);
};
