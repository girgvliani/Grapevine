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

const ka = {
  nav: {
    services: "სერვისები",
    portfolio: "პორტფოლიო",
    cta: "ერთად გავიზარდოთ",
  },
  hero: {
    label: "მარკეტინგ სააგენტო — 2014 წლიდან",
    description:
      "Grapevine პოულობს თქვენი ბრენდის მთავარ ძაფს და გეხმარებათ მის ზრდაში — ქაოსის გარეშე, მიმართულებით სავსე.",
    scroll: "გადაახვიეთ ქვემოთ",
  },
  marquee: [
    "სტრატეგია",
    "ბრენდინგი",
    "სოციალური მედია",
    "სოციალური მედიის აუდიტი",
    "ციფრული რეკლამა",
    "ვებ დეველოპმენტი",
    "მობილური აპლიკაცია",
  ],
  about: {
    eyebrow: "ვინ ვართ ჩვენ",
    heading: "ჩვენ შესახებ",
    bodyMid:
      "არის სტრატეგიული და ციფრული პარტნიორი ბრენდებისთვის, რომელსაც სურთ ზრდა იყოს",
    bodyHighlight: "სტრუქტურირებული გრძელვადიანი და ლოგიკური",
    para1:
      "ჩვენთვის მარკეტინგი არ არის ცალკეული აქტივობების ნაკრები, ეს არის სისტემა, რომელშიც ყველაფერი ერთმანეთთანაა დაკავშირებული.",
    para2:
      "ვფიქრობთ, გამოწვევა არ არის ის, რომ ბრენდი საკმარის „აქტივობას“ არ აკეთებს. პრობლემა არის, რომ სტრატეგია, კრეატივი და შესრულება ერთმანეთისგან სრულიად განცალკევებულია, რის გამოც არათანმიმდევრული ხდება.",
    para3:
      "ზუსტად ამ ქაოსში ჩნდება Grapevine, არა იმისთვის, რომ გავაძლიეროთ მეტი, არამედ იმისთვის, რომ ვმოქმედოთ სწორად.",
    seeMore: "მეტის ნახვა",
    seeLess: "ნაკლების ნახვა",
  },
  services: {
    heading: "სერვისები",
    cards: {
      "social-media-audit": { name: "სოციალური მედია", sub: "აუდიტი" },
      seo: { name: "SEO", sub: "ოპტიმიზაცია" },
      "social-media": { name: "სოციალური", sub: "მედია" },
      strategy: { name: "სტრატეგია", sub: "" },
      campaigns: { name: "კამპანიები", sub: "" },
      production: { name: "პროდაქშენი", sub: "" },
      "pr-services": { name: "PR სერვისები", sub: "" },
      "crm-systems": { name: "CRM სისტემები", sub: "" },
      branding: { name: "ბრენდინგი", sub: "" },
      "mobile-app": { name: "მობილური აპი", sub: "" },
      "digital-advertising": { name: "ციფრული", sub: "რეკლამა" },
      "web-development": { name: "ვები", sub: "დეველოპმენტი" },
    },
  },
  servicesPage: {
    eyebrow: "Grapevine — სერვისები",
    tagline: "ყველაფერი, რასაც ვაკეთებთ თქვენი ბრენდის ქაოსის მოსაგვარებლად — და მის გასაზრდელად.",
    intro:
      "სტრატეგიიდან შესრულებამდე, ყველა სერვისი ერთ ძაფზეა აკინძული. ჩვენ არ ვყიდით ცალკეულ აქტივობებს — ვქმნით სისტემას, სადაც თითოეული ნაწილი წინ სწევს თქვენს ბრენდს.",
    clickToOpen: "დააჭირეთ გასახსნელად",
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
    bandAccent: "ქაოსის ამოსახსნელად?",
    bandDesc:
      "გვითხარით, სად არის თქვენი ბრენდი აღრეული. ჩვენ ვიპოვით ძაფს და გეგმას მის გასასწორებლად.",
    bandCta: "მოდი ვისაუბროთ ქაოსზე",
  },
  process: {
    titleLine1: "როგორ",
    titleLine2: "ვმუშაობთ?",
    steps: [
      {
        num: "01",
        title: "ანალიზი",
        sub: "პირველ ეტაპზე",
        desc: "პირველ ეტაპზე ვიგებთ, რა სჭირდება რეალურად ბიზნესს, პრობლემებს განვსაზღვრავთ და ამოცანებს სივრცეს მივცემთ.",
      },
      {
        num: "02",
        title: "სტრუქტურა",
        sub: "დიზაინი",
        desc: "შევქმნით სტრუქტურას: რა არის მნიშვნელოვანი, რა არის და როგორ უკავშირდება ყველაფერი ერთმანეთს.",
      },
      {
        num: "03",
        title: "შესრულება",
        sub: "დიზაინი",
        desc: "მხოლოდ ამის შემდეგ გადავდგებით შესრულებაზე. რადგან სრულად გვაქვს ამოცანები განსაზღვრელი და ყველა ქმედება ელოდება სივრცეს.",
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
    desc: "ზრდის წინაპირობები; ახალი შესაძლებლობებისა და ღონისძიებების გახსნა.",
    projects: {
      1: "Fino-ს 13 წლის კამპანია",
      2: "Fino-ს 13 წლის კამპანია",
      3: "Fino-ს 13 წლის კამპანია",
      4: "ბრენდის იდენტობა",
      5: "ციფრული კამპანია",
      6: "სოციალური მედიის სტრატეგია",
      7: "SEO ოპტიმიზაცია",
      8: "ვებ დეველოპმენტი",
      9: "ვიზუალური იდენტობა",
      10: "ბრენდის კამპანია",
      11: "კრეატიული მიმართულება",
      12: "მარკეტინგული სტრატეგია",
    },
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
    or: "ან",
    contact: { email: "ელ.ფოსტა", phone: "ტელეფონის ნომერი", social: "სოციალური მედია" },
  },
  footer: {
    taglineLine1: "ბრენდებისთვის, რომელთაც",
    taglineLine2: "სურთ ზრდა.",
    quickLinks: "სწრაფი ბმულები",
    links: { services: "სერვისები", portfolio: "პორტფოლიო", contact: "კონტაქტი" },
    button: "ამოხსენი ქაოსი",
    copyright: "საავტორო უფლებები © 2026 | ყველა უფლება დაცულია",
  },
};

const en: typeof ka = {
  nav: {
    services: "Services",
    portfolio: "Portfolio",
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
      "For us, marketing is not a set of separate activities — it is a system in which everything is connected to one another.",
    para2:
      "We believe the challenge isn't that a brand doesn't do enough “activity”. The problem is that strategy, creative and execution are completely separated from each other, which makes it inconsistent.",
    para3:
      "It's exactly in this chaos that Grapevine appears — not to do more, but to act correctly.",
    seeMore: "See more",
    seeLess: "See less",
  },
  services: {
    heading: "Services",
    cards: {
      "social-media-audit": { name: "Social Media", sub: "Audit" },
      seo: { name: "SEO", sub: "Optimisation" },
      "social-media": { name: "Social", sub: "Media" },
      strategy: { name: "Strategy", sub: "" },
      campaigns: { name: "Campaigns", sub: "" },
      production: { name: "Production", sub: "" },
      "pr-services": { name: "PR Services", sub: "" },
      "crm-systems": { name: "CRM Systems", sub: "" },
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
        desc: "In the first stage we understand what the business really needs, define the problems and give the tasks room.",
      },
      {
        num: "02",
        title: "Structure",
        sub: "Design",
        desc: "We build the structure: what matters, what exists and how everything connects to one another.",
      },
      {
        num: "03",
        title: "Execution",
        sub: "Design",
        desc: "Only after that do we move to execution — because the tasks are fully defined and every action has its space.",
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
    desc: "The prerequisites for growth; the opening of new opportunities and events.",
    projects: {
      1: "Fino 13 Years Campaign",
      2: "Fino 13 Years Campaign",
      3: "Fino 13 Years Campaign",
      4: "Brand Identity",
      5: "Digital Campaign",
      6: "Social Media Strategy",
      7: "SEO Optimisation",
      8: "Web Development",
      9: "Visual Identity",
      10: "Brand Campaign",
      11: "Creative Direction",
      12: "Marketing Strategy",
    },
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
    or: "or",
    contact: { email: "Email", phone: "Phone Number", social: "Social Media" },
  },
  footer: {
    taglineLine1: "For Brands That",
    taglineLine2: "Want To Grow.",
    quickLinks: "Quick Links",
    links: { services: "Services", portfolio: "Portfolio", contact: "Contact" },
    button: "Untangle Your Mess",
    copyright: "Copyright © 2026 | All Rights Reserved",
  },
};

export const translations: Record<Lang, typeof ka> = { ka, en };

export type Translation = typeof ka;
