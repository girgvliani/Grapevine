// ──────────────────────────────────────────────────────────────────────────
// Grapevine site translations.
//
// Default language is Georgian ("ka"). Edit the text freely — just keep the
// SAME keys/shape in both `ka` and `en` (and the same array lengths), since the
// components read whichever language is active by the same key.
// ──────────────────────────────────────────────────────────────────────────

export type Lang = "ka" | "en";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "ka", label: "ქარ" },
  { code: "en", label: "ENG" },
];

// Canonical service slugs — the order matches the cards on the /services page
// and each has its own detail route at /services/<slug>. Keep in sync with the
// `services.cards` keys below.
export const SERVICE_SLUGS = [
  "digital-advertising",
  "branding",
  "campaigns",
  "strategy",
  "social-media-audit",
  "production",
  "seo",
  "pr-services",
  "crm-systems",
  "mobile-app",
  "web-development",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

const ka = {
  nav: {
    services: "სერვისები",
    portfolio: "პორტფოლიო",
    blog: "ბლოგი",
    cta: "მიზნამდე\nერთი ნაბიჯია!",
  },
  hero: {
    label: "კრეატიული სააგენტო - 2014 წლიდან",
    description:
      "Grapevine პოულობს თქვენი ბრენდის მთავარ კვანძს და გეხმარებათ მის გახსნაში - ყველანაირი ქაოსის გარეშე.",
    scroll: "ჩამოსქროლეთ",
  },
  marquee: [
    "სტრატეგია",
    "ბრენდინგი",
    "სოციალური მედია",
    "სოციალური მედიის აუდიტი",
    "ციფრული მარკეტინგი",
    "ვებ დეველოპმენტი",
    "მობილური აპლიკაცია",
  ],
  about: {
    // `eyebrow` removed entirely at the user's request — see About.tsx,
    // the whole "eyebrow" row above the heading was deleted with it.
    heading: "ჩვენ შესახებ",
    // The component hardcodes a styled "Grapevine" span right before this
    // text (About.tsx), so this must NOT start with "Grapevine" itself —
    // that would render "Grapevine Grapevine არის...".
    bodyMid:
      "არის სტრატეგიული პარტნიორი იმ ბრენდებისთვის, რომლებსაც სურთ",
    bodyHighlight: "სტრუქტურირებული და გრძელვადიანი ზრდა ბაზარზე.",
    para1:
      "ვეხმარებით ბრენდებს, განსაზღვრონ მკაფიო მიმართულება და შექმნან სისტემა, სადაც სტრატეგია, კრეატივი და აღსრულება შეთანხმებულად მუშაობს.",
    para2:
      "ვმუშაობთ როგორც თქვენი გუნდის ნაწილი: ვერთვებით გადაწყვეტილებების მიღებაში, ვგეგმავთ სამომავლო ნაბიჯებს და ვზრუნავთ, რომ თითოეული პროცესი საერთო მიზანს ემსახურებოდეს.",
    para3:
      "2014 წლიდან ვთანამშრომლობთ სხვადასხვა ინდუსტრიის ბრენდებთან, დაწყებული პოზიციონირებიდან - სრულ ციფრულ სერვისამდე. კრეატიული სტრატეგია და მისი სწორად განხორციელება კი სამუშაო პროცესის განუყოფელი ნაწილია.",
    seeMore: "მეტის ნახვა",
    seeLess: "ნაკლების ნახვა",
  },
  services: {
    heading: "სერვისები",
    cards: {
      "social-media-audit": { name: "SEO & სოც. მედია", sub: "აუდიტი" },
      seo: { name: "SEO", sub: "ოპტიმიზაცია" },
      strategy: { name: "სტრატეგია", sub: "" },
      campaigns: { name: "კამპანიები", sub: "" },
      production: { name: "ვიდეო პროდაქშენი", sub: "" },
      "pr-services": { name: "PR სერვისები", sub: "" },
      "crm-systems": { name: "CRM სერვისები", sub: "" },
      branding: { name: "ბრენდინგი", sub: "" },
      "mobile-app": { name: "მობილური აპი", sub: "" },
      "digital-advertising": { name: "ციფრული", sub: "მარკეტინგი" },
      "web-development": { name: "ვები", sub: "დეველოპმენტი" },
    },
  },
  servicesPage: {
    eyebrow: "Grapevine სერვისები",
    tagline: "ყველაფერი, რაც თქვენს ბრენდს ქაოსის დალაგებასა და ზრდაში ეხმარება.",
    intro:
      "ჩვენ მხოლოდ ცალკეულ მომსახურებას არ გთავაზობთ, არამედ ვქმნით ერთიან სისტემას, სადაც თითოეული სერვისი თავის როლს ასრულებს თქვენი ბრენდის განსავითარებლად.",
    clickToOpen: "დააჭირეთ გასახსნელად",
    seeMore: "ნახე მეტი",
    startingFrom: "ფასი იწყება",
    priceValue: "₾0,000",
    priceNote: "პროექტზე · სანიმუშო",
    includedLabel: "რას მოიცავს",
    lorem:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    included: [
      "Lorem ipsum dolor sit",
      "Consectetur adipiscing",
      "Tempor incididunt labore",
      "Quis nostrud exercitation",
      "Ullamco laboris nisi",
      "Dolore magna aliqua",
    ],
    bandPre: "მზად ხართ ",
    bandAccent: "ახალი ეტაპისთვის?",
    bandDesc:
      "გვითხარით, რა არის თქვენი ბრენდის მთავარი კვანძი, ჩვენ კი დავსახავთ გეგმას მის გასახსნელად.",
    bandCta: "მოდი, ვისაუბროთ ქაოსზე",
  },
  process: {
    titleLine1: "როგორ",
    titleLine2: "ვმუშაობთ?",
    steps: [
      {
        num: "01",
        title: "ანალიზი",
        sub: "პირველ ეტაპზე",
        desc: "თავდაპირველად ვაანალიზებთ, საბაზრო ტენდენციებს, პროდუქტს, აუდიტორიასა და არსებულ შედეგებს.",
      },
      {
        num: "02",
        title: "სტრუქტურა",
        sub: "დიზაინი",
        desc: "შემდგომ ვალაგებთ პრიორიტეტებს - რა არის მნიშვნელოვანი, რაზე უნდა გამახვილდეს ყურადღება და როგორ უნდა დაუკავშირდეს თითოეული ნაბიჯი საერთო მიზანს.",
      },
      {
        num: "03",
        title: "შესრულება",
        sub: "დიზაინი",
        desc: "მხოლოდ ამის შემდეგ გადავდივართ შესრულებაზე. თითოეული ნაბიჯი წინასწარ განსაზღვრულ მიზანს ემსახურება, ამიტომ ცალკეული ამოცანების ნაცვლად, ყველაფერი ერთიანი გეგმის მიხედვით ვითარდება.",
      },
    ],
    benefitsHeading: "რას იღებს კლიენტი?",
    benefits: [
      {
        num: "01",
        title: "ბიზნესის მხარეს",
        items: ["მკაფიო პოზიციონირება", "სტრუქტურირებული მარკეტინგი", "პროგნოზირებადი ზრდა"],
      },
      {
        num: "02",
        title: "ოპერაციულ მხარეს",
        items: ["გამართული პროცესები", "შედეგების გამჭვირვალობა", "უწყვეტი ოპტიმიზაცია"],
      },
    ],
  },
  quote: {
    text: "„წარმატება არის ჩვეულებრივი საქმის არაჩვეულებრივად კეთება.“",
    cite: "ჯიმ რონი",
  },
  portfolio: {
    heading: "პორტფოლიო",
    projects: {
      nodi: { name: "NODI", desc: "შევქმენით ბრენდის იდენტობა, საკომუნიკაციო სტრატეგია და მარკეტინგული სისტემა, რომელიც ბრენდს გრანტის მოპოვებაში დაეხმარა." },
      komuna: { name: "კომუნა", desc: "ბრენდის იდეა ვაქციეთ იდენტობად, მკაფიო ვიზუალური ენითა და კომუნიკაციით, რამაც კომპანიის ცნობადობა და ლიდები გაზარდა." },
      dac: { name: "DAC", desc: "ვმართავთ ციფრულ საკომუნიკაციო არხებს, რამაც ბრენდი სწორ აუდიტორიაზე და გაზომვად შედეგებზე გაიყვანა." },
      "blits-dental": { name: "Blits Dental", desc: "დავიწყეთ სოციალური პლატფორმების მართვა ახლიდან, წარმოვაჩინეთ ბრენდი უკეთ და გავაძლიერეთ კომუნიკაცია, რამაც ბრენდის გაყიდვები 3-ჯერ გაზარდა." },
      "american-hospital": { name: "American Hospital Tbilisi", desc: "სამედიცინო თემები გასაგებ და სანდო კონტენტად ვაქციეთ, რამაც ბრენდის მიმართ ნდობა და ცნობადობა უფრო გააძლიერა." },
      diplomat: { name: "Diplomat Georgia", desc: "კონტენტით ბრენდის ღირებულება და უპირატესობები წარმოვაჩინეთ, რამაც სანდო მომხმარებლების ზრდა უზრუნველყო." },
      "tbilisi-book-capital": { name: "თბილისი — მსოფლიო წიგნის დედაქალაქი", desc: "კამპანიით პროექტი ფართო მასშტაბებზე გავიყვანეთ და ქალაქის კულტურულ მოვლენად ვაქციეთ." },
      fino: { name: "Fino", desc: "13-წლიანი ისტორია კამპანიად ვაქციეთ, რამაც ბრენდის კომუნიკაცია და მომხმარებლებთან კავშირი საგრძნობლად გაამყარა." },
      chita: { name: "ჭიტა", desc: "ბრენდს შევუქმენით მარტივად ამოსაცნობი ვიზუალური სახე, რამაც კომპანიის ლოგო და სახელი ერთმანეთს დაუკავშირა." },
      "smart-store": { name: "Smart Store", desc: "ნულიდან შევქმენით კომპანიის ბრენდინგი, რომელმაც ის თანამედროვე აღქმის შესაბამისი გახადა." },
      samery: { name: "Samery Group", desc: "პროდუქტის ხასიათი გადავიტანეთ ბრენდში, რომ ხარისხი და სტილი პირველივე შეხებიდან გამოჩენილიყო." },
      eli: { name: "Eli", desc: "შევქმენით საიტი, რომელიც ბრენდს გამართულად წარმოაჩენს და მომხმარებელს ინფორმაციას მარტივად აწვდის." },
      veronika: { name: "veronikatugo.com", desc: "პერსონალური ბრენდისთვის შევქმენით საიტი, რომელიც პროფესიულ იმიჯს და ინდივიდუალურ სტილს აერთიანებს." },
      geogps: { name: "GeoGps", desc: "ვებგვერდის საშუალებით სერვისი გავხადეთ უფრო გასაგები, სანდო და მომხმარებლისთვის მარტივად ხელმისაწვდომი." },
    },
  },
  portfolioPage: {
    eyebrow: "Grapevine - პორტფოლიო",
    intro:
      "იდეებიდან რეალურ ამბებამდე. კარგი იდეის ღირებულება მაშინ იჩენს თავს, როცა ადამიანებამდე მიდის, რაღაცას ცვლის და გვაძლევს რეალურ შედეგს. ",
    filterAll: "ყველა",
    year: "2024",
    categories: {
      full: "სრული მარკეტინგი",
      digital: "ციფრული",
      content: "კონტენტი",
      campaign: "კამპანია",
      branding: "ბრენდინგი",
      web: "ვები",
    },
    bandPre: "მოდი, ერთად გადავდგათ პირველი ნაბიჯი",
    bandAccent: "რაღაც ახლისკენ.",
    bandDesc:
      "გვითხარით, რა არის თქვენი ბრენდის მთავარი კვანძი, ჩვენ კი დავსახავთ გეგმას მის გასახსნელად.",
    bandCta: "მოდი ვისაუბროთ ქაოსზე",
  },
  partners: {
    heading: "პარტნიორები",
  },
  cta: {
    heading: "მოდი ვისაუბროთ ქაოსზე.",
    fields: { email: "ელ.ფოსტა", subject: "თემა", message: "შეტყობინება" },
    placeholders: {
      email: "შეიყვანეთ ელ.ფოსტა",
      subject: "თემა",
      message: "დაწერეთ თქვენი შეტყობინება...",
    },
    send: "გაგზავნა",
    sending: "იგზავნება...",
    success: "მადლობა! თქვენი შეტყობინება გაიგზავნა.",
    error: "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან, ან დაგვიკავშირდით პირდაპირ.",
    or: "ან",
    contact: { email: "ელ.ფოსტა", phone: "ტელეფონის ნომერი", social: "სოციალური მედია" },
    eyebrow: "Grapevine — კონტაქტი",
  },
  footer: {
    taglineLine1: "ბრენდებისთვის, რომელთაც",
    taglineLine2: "სურთ ზრდა.",
    quickLinks: "სწრაფი ბმულები",
    links: { services: "სერვისები", portfolio: "პორტფოლიო", contact: "კონტაქტი" },
    button: "ამოხსენი ქაოსი",
    copyright: "საავტორო უფლებები © 2026 | ყველა უფლება დაცულია",
  },
  notFound: {
    eyebrow: "შეცდომა 404",
    heading: "ეს კვანძი არსად ქრება.",
    description: "გვერდი, რომელსაც ეძებთ, აღარ არსებობს ან გადატანილია. დაუბრუნდი დასაწყისს.",
    backHome: "მთავარ გვერდზე დაბრუნება",
  },
  blog: {
    eyebrow: "Grapevine — ბლოგი",
    heading: "ბლოგი",
    intro: "აზრები სტრატეგიაზე, ბრენდინგსა და იმაზე, თუ როგორ ვზრდით ბრენდებს.",
    empty: "პოსტები მალე გამოქვეყნდება.",
    readMore: "სრულად ნახვა",
    backToBlog: "ბლოგში დაბრუნება",
  },
};

const en: typeof ka = {
  nav: {
    services: "Services",
    portfolio: "Portfolio",
    blog: "Blog",
    cta: "One Step\nFrom Your Goal!",
  },
  hero: {
    label: "Creative Agency - Since 2014",
    description:
      "Grapevine finds your brand's main knot and helps you untangle it - without any chaos.",
    scroll: "Scroll Down",
  },
  marquee: [
    "Strategy",
    "Branding",
    "Social Media",
    "Social Media Audit",
    "Digital Marketing",
    "Web Development",
    "Mobile Application",
  ],
  about: {
    heading: "About Us",
    bodyMid:
      "is a strategic partner for brands that want",
    bodyHighlight: "structured and long-term growth in the market.",
    para1:
      "We help brands define a clear direction and create a system where strategy, creativity, and execution work in alignment.",
    para2:
      "We work as part of your team: we take part in decision-making, plan future steps, and make sure that each process serves a common goal.",
    para3:
      "Since 2014, we have worked with brands across various industries, from positioning to full digital services. Creative strategy and its proper execution are an integral part of the working process.",
    seeMore: "See More",
    seeLess: "See Less",
  },
  services: {
    heading: "Services",
    cards: {
      "social-media-audit": { name: "SEO & Social Media", sub: "Audit" },
      seo: { name: "SEO", sub: "Optimization" },
      strategy: { name: "Strategy", sub: "" },
      campaigns: { name: "Campaigns", sub: "" },
      production: { name: "Video Production", sub: "" },
      "pr-services": { name: "PR Services", sub: "" },
      "crm-systems": { name: "CRM Services", sub: "" },
      branding: { name: "Branding", sub: "" },
      "mobile-app": { name: "Mobile App", sub: "" },
      "digital-advertising": { name: "Digital", sub: "Marketing" },
      "web-development": { name: "Web", sub: "Development" },
    },
  },
  servicesPage: {
    eyebrow: "Grapevine Services",
    tagline: "Everything that helps your brand organize the chaos and grow.",
    intro:
      "We don't just offer individual services; we create a unified system where each service plays its role in developing your brand.",
    clickToOpen: "Click to Open",
    seeMore: "See More",
    startingFrom: "Price Starts From",
    priceValue: "₾0,000",
    priceNote: "Per Project · Sample",
    includedLabel: "What's Included",
    lorem:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    included: [
      "Lorem ipsum dolor sit",
      "Consectetur adipiscing",
      "Tempor incididunt labore",
      "Quis nostrud exercitation",
      "Ullamco laboris nisi",
      "Dolore magna aliqua",
    ],
    bandPre: "Are You Ready ",
    bandAccent: "For a New Stage?",
    bandDesc:
      "Tell us what your brand's main knot is, and we will create a plan to untangle it.",
    bandCta: "Let's Talk About the Chaos",
  },
  process: {
    titleLine1: "How",
    titleLine2: "Do We Work?",
    steps: [
      {
        num: "01",
        title: "Analysis",
        sub: "At the First Stage",
        desc: "First, we analyze market trends, the product, the audience, and existing results.",
      },
      {
        num: "02",
        title: "Structure",
        sub: "Design",
        desc: "Next, we organize the priorities - what is important, what needs attention, and how each step should connect to the common goal.",
      },
      {
        num: "03",
        title: "Execution",
        sub: "Design",
        desc: "Only then do we move on to execution. Each step serves a predefined goal, so instead of separate tasks, everything develops according to a unified plan.",
      },
    ],
    benefitsHeading: "What Does the Client Get?",
    benefits: [
      {
        num: "01",
        title: "On the Business Side",
        items: ["Clear Positioning", "Structured Marketing", "Predictable Growth"],
      },
      {
        num: "02",
        title: "On the Operational Side",
        items: ["Well-Organized Processes", "Transparency of Results", "Continuous Optimization"],
      },
    ],
  },
  quote: {
    text: "“Success is doing ordinary things extraordinarily well.”",
    cite: "Jim Rohn",
  },
  portfolio: {
    heading: "Portfolio",
    projects: {
      nodi: { name: "NODI", desc: "We created the brand identity, communication strategy, and marketing system that helped the brand win a grant." },
      komuna: { name: "Komuna", desc: "We turned the brand idea into an identity with a clear visual language and communication, which increased the company's awareness and leads." },
      dac: { name: "DAC", desc: "We manage digital communication channels, which has helped the brand reach the right audience and achieve measurable results." },
      "blits-dental": { name: "Blits Dental", desc: "We started managing the social platforms from scratch, presented the brand more effectively, and strengthened its communication, which increased the brand's sales threefold." },
      "american-hospital": { name: "American Hospital Tbilisi", desc: "We turned medical topics into clear and trustworthy content, which further strengthened trust in and awareness of the brand." },
      diplomat: { name: "Diplomat Georgia", desc: "Through content, we presented the brand's value and advantages, which led to an increase in loyal customers." },
      "tbilisi-book-capital": { name: "Tbilisi — World Book Capital", desc: "Through the campaign, we brought the project to a wider audience and turned it into a cultural event for the city." },
      fino: { name: "Fino", desc: "We turned a 13-year history into a campaign, which significantly strengthened the brand's communication and connection with customers." },
      chita: { name: "Chita", desc: "We created an easily recognizable visual identity for the brand, connecting the company's logo with its name." },
      "smart-store": { name: "Smart Store", desc: "We created the company's branding from scratch, giving it a modern and relevant image." },
      samery: { name: "Samery Group", desc: "We transferred the product's character into the brand so that its quality and style would be evident from the very first interaction." },
      eli: { name: "Eli", desc: "We created a website that presents the brand clearly and provides information to users in an easy-to-understand way." },
      veronika: { name: "veronikatugo.com", desc: "We created a website for a personal brand that combines a professional image with an individual style." },
      geogps: { name: "GeoGps", desc: "Through the website, we made the service clearer, more trustworthy, and easily accessible to users." },
    },
  },
  portfolioPage: {
    eyebrow: "Grapevine - Portfolio",
    intro:
      "From ideas to real stories. A good idea reveals its value when it reaches people, changes something, and delivers real results.",
    filterAll: "All",
    year: "2024",
    categories: {
      full: "Full Marketing",
      digital: "Digital",
      content: "Content",
      campaign: "Campaign",
      branding: "Branding",
      web: "Web",
    },
    bandPre: "Let's Take the First Step Together",
    bandAccent: "Towards Something New.",
    bandDesc:
      "Tell us what your brand's main knot is, and we will create a plan to untangle it.",
    bandCta: "Let's Talk Mess",
  },
  partners: {
    heading: "Partners",
  },
  cta: {
    heading: "Let's Talk About the Chaos.",
    fields: { email: "Email", subject: "Subject", message: "Message" },
    placeholders: {
      email: "Enter Your Email",
      subject: "Subject",
      message: "Write Your Message...",
    },
    send: "Send",
    sending: "Sending...",
    success: "Thank you! Your message has been sent.",
    error: "An error occurred. Please try again or contact us directly.",
    or: "or",
    contact: { email: "Email", phone: "Phone Number", social: "Social Media" },
    eyebrow: "Grapevine — Contact",
  },
  footer: {
    taglineLine1: "For Brands That",
    taglineLine2: "Want to Grow.",
    quickLinks: "Quick Links",
    links: { services: "Services", portfolio: "Portfolio", contact: "Contact" },
    button: "Untangle the Chaos",
    copyright: "Copyright © 2026 | All Rights Reserved",
  },
  notFound: {
    eyebrow: "Error 404",
    heading: "This Knot Isn't Going Anywhere.",
    description: "The page you're looking for no longer exists or has been moved. Return to the beginning.",
    backHome: "Back to Home",
  },
  blog: {
    eyebrow: "Grapevine — Blog",
    heading: "Blog",
    intro: "Thoughts on strategy, branding, and how we grow brands.",
    empty: "Posts are coming soon.",
    readMore: "Read more",
    backToBlog: "Back to blog",
  },
};

export const translations: Record<Lang, typeof ka> = { ka, en };

export type Translation = typeof ka;

// Uppercases heading text for both locales. Chrome/Firefox don't apply the
// Mkhedruli→Mtavruli case mapping — not via .toUpperCase(), not via CSS
// text-transform — even though Mersad ships both glyph sets (confirmed
// against its cmap table). So Georgian is converted by hand: the 43
// Mkhedruli letters each sit exactly 0xBC0 below their Mtavruli counterpart
// (U+10D0–U+10FA / U+10FD–U+10FF -> U+1C90–U+1CBA / U+1CBD–U+1CBF).
//
// Callers must NOT also set CSS `text-transform: uppercase` on the same
// element — layered on top of already-Mtavruli text, it visually reverts
// the glyphs back to Mkhedruli in at least one real browser engine (verified
// via textContent vs. innerText disagreeing on the same node).
export function mtavruli(text: string): string {
  return text.toUpperCase().replace(/[ა-ჺჽ-ჿ]/g, (ch) =>
    String.fromCodePoint(ch.codePointAt(0)! + 0xbc0)
  );
}
