// Default content for the offer editor at grapevine.ge/offers — the text of
// the Grapevine offer deck (Offer-grapevine.pdf / შეთავაზება-grapevine.pdf),
// one copy per language. Every string here is editable on the page; this is
// what "Reset" goes back to.
//
// Georgian headings are stored as Mtavruli capitals (mtavruli()) because
// Chrome ignores CSS uppercase for Georgian. Obvious typos from the PDFs were
// corrected (COSTUMERS, Developement, მხოლიდ, and ღ/ლ swaps in the KA text).

import { mtavruli } from "@/lib/i18n";

export type OfferLang = "ka" | "en";
export type Tone = "lavender" | "orange" | "purple";

export type ServiceCard = { id: string; tone: Tone; title: string; items: string[] };

export type OfferContent = {
  cover: { label: string; email: string; phone: string; address: string };
  about: {
    title: string;
    leadBefore: string;
    leadBold: string;
    leadAfter: string;
    role: string;
    listIntro: string;
    bullets: string[];
    closing: string;
  };
  values: { title: string; items: string[]; closing: string };
  clients: { title: string; period: string };
  servicesIntro: { title: string };
  servicesA: ServiceCard[];
  servicesB: ServiceCard[];
  projects: { title: string; linkLabel: string; url: string };
  how: { title: string; intro: string; weLabel: string; bullets: string[]; closing: string };
  gets: {
    title: string;
    rationalTitle: string;
    rationalItems: string[];
    emotionalTitle: string;
    emotionalItems: string[];
  };
  sentence: { title: string; text: string };
};

export type OfferState = {
  content: OfferContent;
  hiddenSlides: string[];
  hiddenCards: string[];
  hiddenLogos: number[];
};

// Slide order follows the deck.
export const SLIDES = [
  { id: "cover", name: { en: "Cover", ka: "ყდა" } },
  { id: "about", name: { en: "About us", ka: "ჩვენ შესახებ" } },
  { id: "values", name: { en: "Our values", ka: "ჩვენი ღირებულებები" } },
  { id: "clients1", name: { en: "Customers (1)", ka: "პარტნიორები (1)" } },
  { id: "clients2", name: { en: "Customers (2)", ka: "პარტნიორები (2)" } },
  { id: "servicesIntro", name: { en: "Services intro", ka: "სერვისები — შესავალი" } },
  { id: "servicesA", name: { en: "Services (1)", ka: "სერვისები (1)" } },
  { id: "projects", name: { en: "See our projects", ka: "იხილეთ პროექტები" } },
  { id: "how", name: { en: "How we work", ka: "როგორ ვმუშაობთ" } },
  { id: "servicesB", name: { en: "Services (2)", ka: "სერვისები (2)" } },
  { id: "gets", name: { en: "What the brand gets", ka: "რას იღებს ბრენდი" } },
  { id: "sentence", name: { en: "In one sentence", ka: "ერთი წინადადებით" } },
] as const;

export const LOGO_COUNT = 54; // public/offers/logos/logo-01..54.webp, deck order
export const LOGOS_ON_FIRST_SLIDE = 24;

const BEHANCE = "https://www.behance.net/grapevineagency";

const en: OfferContent = {
  cover: {
    label: "Offer",
    email: "khatuna.murjikneli@gmail.com",
    phone: "599 400 012",
    address: "Address: Zhghenti Lane 10",
  },
  about: {
    title: "ABOUT US",
    leadBefore: "Grapevine is a ",
    leadBold: "strategic partner",
    leadAfter:
      " working at the intersection of logic, strategy, and creativity. We believe that growth doesn’t come from doing more - it comes from making the right decisions - and connecting them.",
    role: "Our role is simple:\nto bring clarity where complexity exists.",
    listIntro: "We work with brands to:",
    bullets: ["Define direction", "Structure decisions", "Build systems that scale"],
    closing:
      "Since 2014, we’ve been helping brands grow through clarity and consistency.\nWe don’t focus on outputs.\nWe focus on how everything connects.\nBecause when logic, strategy, and creativity work together - growth becomes predictable.",
  },
  values: {
    title: "OUR VALUES",
    // Positions on the slide: left, top, centre, right, bottom.
    items: [
      "Strong brands are built on internal logic",
      "Consistency builds trust",
      "Creativity is a form of decision-making",
      "Simplicity requires structure",
      "Strategy and emotion must work together",
    ],
    closing: "We don’t chase fast results.\nWe build sustainable growth.",
  },
  clients: { title: "OUR\nCUSTOMERS:", period: "2014-2026" },
  servicesIntro: { title: "services\nwe offer" },
  servicesA: [
    { id: "strategy", tone: "lavender", title: "Strategy", items: ["Marketing Strategy", "Brand Positioning", "Communication Strategy", "Audience Definition", "Product Positioning"] },
    { id: "branding", tone: "orange", title: "Branding", items: ["Brand Identity", "Brand Guidelines", "Tone of Voice", "Visual & Verbal Systems"] },
    { id: "social", tone: "purple", title: "Social Media", items: ["Content Strategy", "Content Planning", "Content Creation", "Account Management"] },
    { id: "audit", tone: "purple", title: "Social Media Audit", items: ["Performance Analysis", "Content Evaluation", "Channel Review", "Strategic Recommendations"] },
    { id: "ads", tone: "lavender", title: "Digital Advertising", items: ["Meta Ads", "Google Ads", "TikTok & YouTube Ads", "Targeting & Optimization", "Performance Tracking"] },
    { id: "web", tone: "orange", title: "Web Development", items: ["UX/UI Design", "Website Development", "Performance Optimization", "Technical Support"] },
  ],
  servicesB: [
    { id: "mobile", tone: "lavender", title: "Mobile App", items: ["Product Logic", "UX/UI Design", "iOS & Android Development", "System Integration", "Maintenance & Support"] },
    { id: "campaigns", tone: "orange", title: "Campaigns", items: ["Campaign Strategy", "Creative Direction", "Channel Planning", "Full Execution"] },
    { id: "production", tone: "purple", title: "Production", items: ["Video Production", "Photo Production", "Content Assets"] },
    { id: "pr", tone: "purple", title: "PR Services", items: ["Media Relations", "PR Strategy", "Communication Planning", "Reputation Management"] },
    { id: "crm", tone: "lavender", title: "CRM Systems", items: ["CRM Selection & Setup", "Data Structuring", "Automation", "Integration with Digital Channels", "Reporting & Analytics"] },
  ],
  projects: { title: "See Our Projects", linkLabel: "Click here", url: BEHANCE },
  how: {
    title: "HOW WE WORK",
    intro: "We are not a vendor.\nWe are a partner.",
    weLabel: "WE:",
    bullets: ["Define before we design", "Analyze before we act", "Build before we scale"],
    closing: "We take responsibility for outcomes -\nnot just execution.",
  },
  gets: {
    title: "WHAT THE BRAND GETS",
    rationalTitle: "RATIONALLY:",
    rationalItems: ["Clear direction", "Structured decisions", "Consistent execution"],
    emotionalTitle: "EMOTIONALLY:",
    emotionalItems: ["Confidence", "Trust", "Sense of control"],
  },
  sentence: { title: "IN ONE SENTENCE", text: "HERE YOU’LL FIND BALANCE\nBETWEEN LOGIC AND EMOTION." },
};

const ka: OfferContent = {
  cover: {
    label: "შეთავაზება",
    email: "khatuna.murjikneli@gmail.com",
    phone: "599 400 012",
    address: "მისამართი: ჟღენტის ჩიხი #10",
  },
  about: {
    title: mtavruli("ჩვენ შესახებ"),
    leadBefore: "Grapevine არის ",
    leadBold: "სტრატეგიული პარტნიორი",
    leadAfter:
      ", რომელიც მუშაობს ლოგიკის, სტრატეგიისა და კრეატივის ზუსტ გადაკვეთის წერტილში. გვჯერა, რომ ზრდა არ მოდის მეტის კეთებით.\nზრდა მოდის მხოლოდ სწორი გადაწყვეტილებების მიღებითა და მათი ერთმანეთთან დაკავშირებით.",
    role: "ჩვენი როლი მარტივია:\nსიცხადის შეტანა იქ, სადაც სირთულეა",
    listIntro: "ვმუშაობთ ბრენდებთან, რათა:",
    bullets: ["განვსაზღვროთ მიმართულება", "მივანიჭოთ სტრუქტურა გადაწყვეტილებებს", "შევქმნათ სისტემები, რომლებიც მასშტაბირებადია"],
    closing:
      "2014 წლიდან ვეხმარებით ბრენდებს ზრდაში - სიცხადისა და თანმიმდევრულობის მეშვეობით.\nჩვენ არ ვკონცენტრირდებით მხოლოდ შედეგებზე.\nჩვენ ვაკვირდებით, როგორ არის ყველაფერი ერთმანეთთან დაკავშირებული.\nრადგან, როდესაც ლოგიკა, სტრატეგია და კრეატივი ერთად მუშაობს - ზრდა პროგნოზირებადი ხდება.",
  },
  values: {
    title: mtavruli("ჩვენი ღირებულებები"),
    items: [
      "ძლიერი ბრენდები აგებულია შიდა ლოგიკაზე",
      "თანმიმდევრულობა ამყარებს ნდობას",
      "კრეატივი არის გადაწყვეტილების მიღების ფორმა",
      "სიმარტივე მოითხოვს სტრუქტურას",
      "სტრატეგია და ემოცია ერთად უნდა მუშაობდეს",
    ],
    closing: "ჩვენ არ მივდევთ სწრაფ შედეგებს.\nჩვენ ვქმნით მდგრად ზრდას.",
  },
  clients: { title: mtavruli("ჩვენი\nპარტნიორები:"), period: "2014-2026" },
  servicesIntro: { title: "სერვისები" },
  servicesA: [
    { id: "strategy", tone: "lavender", title: "სტრატეგია", items: ["მარკეტინგული სტრატეგია", "ბრენდის პოზიციონირება", "კომუნიკაციის სტრატეგია", "აუდიტორიის განსაზღვრა", "პროდუქტის პოზიციონირება"] },
    { id: "branding", tone: "orange", title: "ბრენდინგი", items: ["ბრენდის იდენტობა", "ბრენდის სახელმძღვანელო", "ტონის განსაზღვრა", "ვიზუალური და ვერბალური სისტემები"] },
    { id: "social", tone: "purple", title: "სოციალური მედია", items: ["კონტენტ სტრატეგია", "კონტენტის დაგეგმვა", "კონტენტის შექმნა", "ანგარიშის მართვა"] },
    { id: "audit", tone: "purple", title: "სოციალური მედიის აუდიტი", items: ["შედეგების ანალიზი", "კონტენტის შეფასება", "არხების მიმოხილვა", "სტრატეგიული რეკომენდაციები"] },
    { id: "ads", tone: "lavender", title: "ციფრული რეკლამა", items: ["Meta Ads", "Google Ads", "TikTok და YouTube რეკლამა", "თარგეთირება და ოპტიმიზაცია", "შედეგების მონიტორინგი"] },
    { id: "web", tone: "orange", title: "ვებ დეველოპმენტი", items: ["UX/UI დიზაინი", "ვებსაიტის განვითარება", "პროდუქტიულობის ოპტიმიზაცია", "ტექნიკური მხარდაჭერა"] },
  ],
  servicesB: [
    { id: "mobile", tone: "lavender", title: "მობილური აპლიკაციები", items: ["პროდუქტის ლოგიკა", "UX/UI დიზაინი", "iOS და Android განვითარება", "სისტემების ინტეგრაცია"] },
    { id: "campaigns", tone: "orange", title: "კამპანიები", items: ["კამპანიის სტრატეგია", "კრეატიული მიმართულება", "არხების დაგეგმვა", "სრული განხორციელება"] },
    { id: "production", tone: "purple", title: "წარმოება", items: ["ვიდეოს წარმოება", "ფოტო წარმოება", "კონტენტ მასალების შექმნა"] },
    { id: "pr", tone: "purple", title: "PR სერვისები", items: ["მედიასთან ურთიერთობა", "PR სტრატეგია", "კომუნიკაციის დაგეგმვა", "რეპუტაციის მართვა"] },
    { id: "crm", tone: "lavender", title: "CRM სისტემა", items: ["CRM-ის შერჩევა და დანერგვა", "მონაცემების სტრუქტურირება", "ავტომატიზაცია", "ციფრულ არხებთან ინტეგრაცია", "ანგარიშგება და ანალიტიკა"] },
  ],
  projects: { title: mtavruli("იხილეთ ჩვენი პროექტები"), linkLabel: "Click here", url: BEHANCE },
  how: {
    title: mtavruli("როგორ ვმუშაობთ"),
    intro: "ჩვენ არ ვართ მიმწოდებელი.\nჩვენ ვართ პარტნიორი.",
    weLabel: mtavruli("ჩვენ:"),
    bullets: ["ჯერ ვაზუსტებთ, შემდეგ ვქმნით", "ვაანალიზებთ, შემდეგ ვმოქმედებთ", "ჯერ ვაშენებთ, შემდეგ ვზრდით"],
    closing: "ჩვენ პასუხისმგებლობას ვიღებთ შედეგზე და არა მხოლოდ შესრულებაზე.",
  },
  gets: {
    title: mtavruli("რას იღებს ბრენდი"),
    rationalTitle: "რაციონალურად:",
    rationalItems: ["მკაფიო მიმართულება", "დალაგებული გადაწყვეტილებები", "თანმიმდევრული შესრულება"],
    emotionalTitle: "ემოციურად:",
    emotionalItems: ["თავდაჯერებულობა", "ნდობა", "კონტროლის განცდა"],
  },
  sentence: { title: mtavruli("ერთი წინადადებით"), text: "აქ იპოვით ბალანსს ლოგიკასა და ემოციას შორის." },
};

export const DEFAULT_CONTENT: Record<OfferLang, OfferContent> = { ka, en };

export function defaultState(lang: OfferLang): OfferState {
  return {
    content: structuredClone(DEFAULT_CONTENT[lang]),
    hiddenSlides: [],
    hiddenCards: [],
    hiddenLogos: [],
  };
}
