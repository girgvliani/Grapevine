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
    eyebrow: "ვინ ვართ ჩვენ",
    heading: "ჩვენ შესახებ",
    bodyMid:
      "არის სტრატეგიული და ციფრული პარტნიორი ბრენდებისთვის, რომლებსაც სურთ ზრდა იყოს",
    bodyHighlight: "სტრუქტურირებული, გრძელვადიანი და ლოგიკური.",
    para1:
      "ვეხმარებით ბრენდებს, ჩამოაყალიბონ მკაფიო მიმართულება და ააწყონ სისტემა, სადაც სტრატეგია, კრეატივი და შესრულება მუშაობს ერთად და არა ცალ-ცალკე.",
    para2:
      "ვმუშაობთ როგორც კლიენტის გარე სტრატეგიული გუნდი: ვერთვებით გადაწყვეტილებებში, ვაყალიბებთ ლოგიკას და ვზრუნავთ, რომ პროცესები იყოს თანმიმდევრული.",
    para3:
      "2014 წლიდან ვთანამშრომლობთ სხვადასხვა ინდუსტრიის ბრენდებთან, დაწყებული პოზიციონირებიდან - სრულ ციფრულ სერვისამდე. ჩვენთვის სტრატეგია და აღსრულება ერთი პროცესის ორი ნაწილია.",
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
    eyebrow: "Grapevine — სერვისები",
    tagline: "ყველაფერი, რასაც ვაკეთებთ თქვენი ბრენდის ქაოსის აღმოსაფხვრელად და მის გასაზრდელად.",
    intro:
      "სტრატეგიიდან შესრულებამდე, ყველა სერვისი ერთი ძაფითაა აკინძული. ჩვენ არ ვყიდით ცალკეულ სერვისებს, ჩვენ ვქმნით სისტემას, სადაც თითოეული ნაწილი ზრდის თქვენს ბრენდს.",
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
      "გვითხარით, რა არის თქვენი ბრენდის მთავარი კვანძი ჩვენ კი დავსახავთ გეგმას მის გასახსნელად.",
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
        desc: "პირველ ეტაპზე ვიგებთ, რა ხდება რეალურად ბაზარზე, პროდუქტში, აუდიტორიასა თუ მიმდინარე შედეგებში.",
      },
      {
        num: "02",
        title: "სტრუქტურა",
        sub: "დიზაინი",
        desc: "ვალაგებთ პრიორიტეტებს - რა არის მნიშვნელოვანი, რა არა და როგორ უკავშირდება ყველაფერი ერთმანეთს.",
      },
      {
        num: "03",
        title: "შესრულება",
        sub: "დიზაინი",
        desc: "მხოლოდ ამის შემდეგ გადავდივართ შესრულებაზე. ჩვენ არ ვმუშაობთ ცალკეულ ამოცანებზე იზოლირებულად, ჩვენთან ყველა ქმედება ერთიან სისტემას ეფუძნება.",
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
    text: "ინჟინრები და დიზაინერები ერთდროულად ძალიან ბევრს და ძალიან ცოტას იციან. მათ ძალიან ბევრი იციან ტექნოლოგიების შესახებ და ძალიან ცოტა იმის შესახებ, თუ როგორ ცხოვრობენ სხვა ადამიანები და როგორ აკეთებენ თავიანთ საქმეს.",
    cite: "— დონალდ ნორმანი",
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
      "გვითხარით, რა არის თქვენი ბრენდის მთავარი კვანძი ჩვენ კი დავსახავთ გეგმას მის გასახსნელად.",
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
    description: "გვერდი, რომელსაც ეძებთ, აღარ არსებობს ან გადატანილია. დავუბრუნდეთ დასაწყისს.",
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
    cta: "Grow With Us",
  },
  hero: {
    label: "Marketing Agency — Since 2014",
    description:
      "Grapevine finds the core thread of your brand and helps you grow it — free of chaos, full of direction.",
    scroll: "Scroll to explore",
  },
  marquee: [
    "Strategy",
    "Branding",
    "Social Media",
    "Social Media Audit",
    "Digital Advertising",
    "Web Development",
    "Mobile App",
  ],
  about: {
    eyebrow: "Who We Are",
    heading: "About Us",
    bodyMid:
      "is a strategic and digital partner for brands that want their growth to be",
    bodyHighlight: "structured, long-term and logical",
    para1:
      "We help brands define a clear direction and build a system where strategy, creative and execution work together — not separately.",
    para2:
      "We work as the client's external strategic team: we get involved in the decisions, shape the logic, and make sure execution stays consistent.",
    para3:
      "Since 2014 we've partnered with brands across different industries — from positioning to full digital execution. For us, strategy and execution are two parts of one process.",
    seeMore: "See more",
    seeLess: "See less",
  },
  services: {
    heading: "Services",
    cards: {
      "social-media-audit": { name: "SEO & Social Media", sub: "Audit" },
      seo: { name: "SEO", sub: "Optimisation" },
      strategy: { name: "Strategy", sub: "" },
      campaigns: { name: "Campaigns", sub: "" },
      production: { name: "Video Production", sub: "" },
      "pr-services": { name: "PR Services", sub: "" },
      "crm-systems": { name: "CRM Services", sub: "" },
      branding: { name: "Branding", sub: "" },
      "mobile-app": { name: "Mobile App", sub: "" },
      "digital-advertising": { name: "Digital", sub: "Advertising" },
      "web-development": { name: "Web", sub: "Development" },
    },
  },
  servicesPage: {
    eyebrow: "Grapevine — Services",
    tagline: "Everything we do to untangle your brand — and grow it.",
    intro:
      "From strategy to execution, every service connects to one thread. We don't sell isolated activities — we build a system where each piece moves your brand forward.",
    clickToOpen: "Click to open",
    seeMore: "See more",
    startingFrom: "Starting from",
    priceValue: "₾0,000",
    priceNote: "per project · placeholder",
    includedLabel: "What's included",
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
    bandPre: "Ready to ",
    bandAccent: "untangle the mess?",
    bandDesc:
      "Tell us where your brand is tangled. We'll find the thread and a plan to pull it straight.",
    bandCta: "Let's Talk Mess",
  },
  process: {
    titleLine1: "HOW WE",
    titleLine2: "WORK?",
    steps: [
      {
        num: "01",
        title: "Analysis",
        sub: "First Stage",
        desc: "In the first stage we learn what's really happening — in the market, the product, the audience and the current results.",
      },
      {
        num: "02",
        title: "Structure",
        sub: "Design",
        desc: "We build the structure: what matters, what doesn't, and how everything connects to one another.",
      },
      {
        num: "03",
        title: "Execution",
        sub: "Design",
        desc: "Only then do we move to execution. We don't work on isolated tasks — every action is grounded in one system.",
      },
    ],
    benefitsHeading: "What does the client get?",
    benefits: [
      {
        num: "01",
        title: "On the business side",
        items: ["Clear positioning", "Structured marketing", "Predictable growth"],
      },
      {
        num: "02",
        title: "On the operational side",
        items: ["Streamlined processes", "Transparency of results", "Continuous optimisation"],
      },
    ],
  },
  quote: {
    text: "Engineers and designers simultaneously know too much and too little. They know too much about technology and too little about how other people live their lives and do their activities.",
    cite: "— Donald Norman",
  },
  portfolio: {
    heading: "Portfolio",
    projects: {
      nodi: { name: "NODI", desc: "We created the brand identity, communication strategy and marketing system that helped the brand win a grant." },
      komuna: { name: "Komuna", desc: "We turned the brand idea into an identity with a clear visual language and communication, which grew the company's awareness and leads." },
      dac: { name: "DAC", desc: "We manage the digital communication channels, which brought the brand to the right audience and measurable results." },
      "blits-dental": { name: "Blits Dental", desc: "We restarted social platform management, presented the brand better and strengthened communication, which tripled the brand's sales." },
      "american-hospital": { name: "American Hospital Tbilisi", desc: "We turned medical topics into clear, trustworthy content, which further strengthened trust and awareness of the brand." },
      diplomat: { name: "Diplomat Georgia", desc: "Through content we showcased the brand's value and advantages, which drove growth in loyal customers." },
      "tbilisi-book-capital": { name: "Tbilisi — World Book Capital", desc: "With the campaign we scaled the project widely and turned it into a cultural event for the city." },
      fino: { name: "Fino", desc: "We turned a 13-year history into a campaign, which significantly strengthened the brand's communication and connection with customers." },
      chita: { name: "Chita", desc: "We created an easily recognisable visual identity that connected the company's logo and name." },
      "smart-store": { name: "Smart Store", desc: "We built the company's branding from scratch, making it fit a modern perception." },
      samery: { name: "Samery Group", desc: "We carried the product's character into the brand so that quality and style show from the first touch." },
      eli: { name: "Eli", desc: "We built a website that presents the brand well and delivers information to users easily." },
      veronika: { name: "veronikatugo.com", desc: "For a personal brand we built a website that combines a professional image with individual style." },
      geogps: { name: "GeoGps", desc: "Through the website we made the service clearer, more trustworthy and easily accessible to users." },
    },
  },
  portfolioPage: {
    eyebrow: "Grapevine — Portfolio",
    intro:
      "The prerequisites for growth; the opening of new opportunities and events. A selection of brands we've untangled and grown.",
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
    bandPre: "Want to be our ",
    bandAccent: "next case study?",
    bandDesc:
      "Tell us where your brand is tangled. We'll find the thread and a plan to pull it straight.",
    bandCta: "Let's Talk Mess",
  },
  partners: {
    heading: "Partners",
  },
  cta: {
    heading: "Let's Talk Mess.",
    fields: { email: "Email", subject: "Subject", message: "Message" },
    placeholders: {
      email: "Enter Email",
      subject: "Subject",
      message: "Write your message...",
    },
    send: "Send",
    sending: "Sending...",
    success: "Thanks! Your message has been sent.",
    error: "Something went wrong. Please try again, or reach out directly.",
    or: "or",
    contact: { email: "Email", phone: "Phone Number", social: "Social Media" },
    eyebrow: "Grapevine — Contact",
  },
  footer: {
    taglineLine1: "For Brands That",
    taglineLine2: "Want To Grow.",
    quickLinks: "Quick Links",
    links: { services: "Services", portfolio: "Portfolio", contact: "Contact" },
    button: "Untangle Your Mess",
    copyright: "Copyright © 2026 | All Rights Reserved",
  },
  notFound: {
    eyebrow: "Error 404",
    heading: "This thread leads nowhere.",
    description: "The page you're looking for doesn't exist anymore, or moved. Let's get you back on track.",
    backHome: "Back to homepage",
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
