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
    previous: "წინა სერვისი",
    next: "შემდეგი სერვისი",
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
      "web-development": { name: "ვებ", sub: "დეველოპმენტი" },
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
    // Callout on the SEO-related service cards, linking to /seo-audit.
    auditTool: {
      text: "გინდათ, ახლავე ნახოთ, სად დგას თქვენი საიტი? გაუშვით უფასო ავტომატური SEO შემოწმება — დაახლოებით 30 წამში.",
      button: "უფასო SEO შემოწმება",
    },
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
    previous: "წინა პროექტი",
    next: "შემდეგი პროექტი",
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
    cookieSettings: "ქუქი-ფაილების პარამეტრები",
    privacy: "კონფიდენციალურობის პოლიტიკა",
  },
  cookieConsent: {
    title: "ქუქი-ფაილები",
    text: "ვიყენებთ ანალიტიკურ ქუქი-ფაილებს (Google Analytics), რომ გავიგოთ, როგორ იყენებენ ვიზიტორები საიტს, და გავაუმჯობესოთ ის. ისინი მხოლოდ თქვენი თანხმობით ჩაირთვება.",
    accept: "თანხმობა",
    reject: "უარყოფა",
    learnMore: "კონფიდენციალურობის პოლიტიკა",
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
  // /seo-audit. `{name}` placeholders are filled in by components/SeoAudit.tsx.
  // Check sentences are keyed by status, or `status_variant` for alternatives.
  seoAudit: {
    eyebrow: "Grapevine — SEO აუდიტი",
    heading: "უფასო SEO აუდიტი",
    intro:
      "შეიყვანეთ ვებსაიტის მისამართი და დაახლოებით 30 წამში მიიღეთ ტექნიკური SEO-ს, სისწრაფისა და საქართველოს ბაზრის სპეციფიკის შემოწმება.",
    urlLabel: "ვებსაიტის მისამართი",
    urlPlaceholder: "example.ge",
    submit: "აუდიტის დაწყება",
    running: "მოწმდება...",
    note: "ვამოწმებთ ერთ გვერდს. სრული აუდიტისთვის ჩვენი გუნდი მთელ საიტს ხელით გადახედავს.",
    audited: "შემოწმდა:",
    steps: {
      page: "გვერდის შემოწმება",
      mobile: "მობილური სისწრაფის გაზომვა",
      desktop: "დესკტოპ სისწრაფის გაზომვა",
    },
    scores: {
      overall: "საერთო ქულა",
      onPage: "On-page SEO",
      performance: "სისწრაფე (მობილური)",
      seo: "Google SEO შემოწმება",
      accessibility: "ხელმისაწვდომობა",
    },
    groups: {
      fail: "პირველ რიგში გასასწორებელი",
      warn: "გასაუმჯობესებელი",
      info: "შენიშვნები",
      pass: "გავლილი შემოწმებები: {n}",
    },
    howToFix: "როგორ გავასწოროთ",
    clientRendered:
      "ეს საიტი კონტენტს JavaScript-ით ქმნის. ქვემოთ მოცემული შემოწმებები საწყის HTML-ს ეყრდნობა — ამას ხედავენ Facebook-ი და ბევრი ბოტი. Google-ი JavaScript-ს ამუშავებს, ასე რომ, მისთვის ნაწილი შედეგებისა შესაძლოა უკეთ გამოიყურებოდეს.",
    speed: {
      heading: "სისწრაფე",
      mobile: "მობილური",
      desktop: "დესკტოპი",
      lab: "ლაბორატორიული ტესტი",
      field: "რეალური ვიზიტორები (ბოლო 28 დღე)",
      fieldOrigin: "რეალური ვიზიტორები, მთელ საიტი (ბოლო 28 დღე)",
      noField: "Google-ს ამ საიტისთვის რეალური ვიზიტორების საკმარისი მონაცემები ჯერ არ აქვს.",
      opportunities: "ტექნიკური დეტალები (Google Lighthouse, ინგლისურად)",
      source: "სისწრაფის მონაცემები: Google PageSpeed Insights",
      metrics: {
        "first-contentful-paint": "პირველი კონტენტი",
        "largest-contentful-paint": "ყველაზე დიდი ელემენტი",
        "total-blocking-time": "ბლოკირების დრო",
        "cumulative-layout-shift": "განლაგების წანაცვლება",
        "speed-index": "სისწრაფის ინდექსი",
        lcp: "ყველაზე დიდი ელემენტი",
        inp: "რეაგირების სისწრაფე",
        cls: "განლაგების წანაცვლება",
      },
      ratings: { FAST: "კარგი", AVERAGE: "გასაუმჯობესებელი", SLOW: "ცუდი" },
    },
    errors: {
      invalid_url: "ეს ვებსაიტის მისამართი არასწორია.",
      blocked_host: "ამ მისამართის შემოწმება შეუძლებელია.",
      dns_failed: "ვებსაიტი ვერ მოიძებნა. გადაამოწმეთ მისამართი.",
      timeout: "ვებსაიტი ძალიან დიდ ხანს არ პასუხობს.",
      fetch_failed: "გვერდის ჩამოტვირთვა ვერ მოხერხდა. შესაძლოა, საიტი მიუწვდომელია ან ბლოკავს ავტომატურ შემოწმებას.",
      tls_invalid:
        "ამ მისამართის SSL სერტიფიკატი არავალიდურია — ბრაუზერები ვიზიტორებს უსაფრთხოების გაფრთხილებას აჩვენებენ, Google-ი კი გვერდს შესაძლოა, არ ინდექსირდეს. ეს გასასწორებელი პრობლემაა; სცადოთ ასევე www. ვერსია.",
      bot_blocked:
        "საიტი ავტომატურ შემოწმებებს ბლოკავს (მაგ. Cloudflare-ის დაცვა), ასე რომ, გვერდის შიგთავსის წაკითხვა ვერ მოხერხდა. Google-ის სისწრაფის ტესტი ქვემოთ შესაძლოა, მაინც შედგეს.",
      not_html: "ეს მისამართი ვებგვერდი არ არის.",
      too_many_redirects: "გვერდი ძალიან ბევრჯერ გადამისამართდება.",
      rate_limited: "მოკლე დროში ძალიან ბევრი აუდიტი. გთხოვთ, სცადოთ რამდენიმე წუთში.",
      captcha: "ვერიფიკაცია ვერ მოხერხდა. გთხოვთ, სცადოთ თავიდან.",
      generic: "დაფიქსირდა შეცდომა. გთხოვთ, სცადოთ თავიდან.",
    },
    psiErrors: {
      quota: "სისწრაფის ტესტი ამ ეტაპზე მიუწვდომელია (დღიური ლიმიტი შეივსა).",
      failed: "Google-მ ამ გვერდზე სისწრაფის ტესტი ვერ ჩაატარა.",
    },
    cta: {
      heading: "გინდათ სრული სურათი?",
      body: "ეს ერთი გვერდის ავტომატური შემოწმებაა. ჩვენი გუნდის უფასო აუდიტი მოიცავს მთელ საიტს, საკვანძო სიტყვებს, კონკურენტებსა და სოციალურ მედიას — კონკრეტული გეგმით, თუ რა უნდა გასწორდეს.",
      button: "უფასო აუდიტის მოთხოვნა",
    },
    checks: {
      https: {
        label: "HTTPS",
        pass: "გვერდი უსაფრთხოდ, HTTPS-ით მიეწოდება.",
        fail: "გვერდი HTTPS-ით არ მიეწოდება.",
        fix: "დააყენეთ SSL სერტიფიკატი და ყველა http:// მისამართი გადაამისამართეთ https://-ზე. ბრაუზერები http გვერდებს „არაუსაფრთხოდ“ მონიშნავენ, Google-ი კი HTTPS-ს რეიტინგის ფაქტორად იყენებს.",
      },
      status: {
        label: "გვერდის პასუხი",
        pass: "გვერდი ნორმალურად პასუხობს (სტატუსი {code}).",
        warn: "გვერდი პასუხობს, მაგრამ {redirects} გადამისამართების შემდეგ.",
        fail: "გვერდმა 200-ის ნაცვლად {code} სტატუსი დააბრუნა.",
        fix: "საძიებო სისტემები ინდექსირებენ გვერდებს, რომლებიც პირდაპირ 200 სტატუსით იხსნება. ბმულებში გამიყენეთ საბოლოო მისამართი და გაასწორეთ სერვერის შეცდომები.",
      },
      indexable: {
        label: "ინდექსირება",
        pass: "საძიებო სისტემებს ამ გვერდის ინდექსირება ნებადართული აქვთ.",
        fail: "გვერდი საძიებო სისტემებს ინდექსირებას უკრძალავს (noindex).",
        fix: "მოაშორეთ noindex robots მეტა თეგიდან ან X-Robots-Tag ჰედერიდან — თუ გვერდის დამალვა განზრახ არ არის.",
      },
      title: {
        label: "გვერდის სათაური (title)",
        pass: "„{value}“ — {length} სიმბოლო, კარგი სიგრძე.",
        warn: "„{value}“ — {length} სიმბოლო. სასურველია 30–60, რომ Google-ში არ წაიჭრას და ზედმეტად ზოგადი არ იყოს.",
        fail: "გვერდს სათაური არ აქვს.",
        fix: "დაწერეთ უნიკალური, 30–60 სიმბოლოს სათაური, რომელიც მთავარი საკვანძო სიტყვით იწყება.",
      },
      metaDescription: {
        label: "მეტა აღწერა",
        pass: "{length} სიმბოლო — კარგი სიგრძე.",
        warn: "{length} სიმბოლო. სასურველია 70–160.",
        fail: "მეტა აღწერა არ არის — Google-ი ძიების შედეგებში გვერდიდან შემთხვევით ტექსტს აჩვენებს.",
        fix: "დაწერეთ 70–160 სიმბოლოს აღწერა, რომელიც დაკლიკებისკენ უბიძგებს — ეს თქვენი რეკლამის ტექსტია ძიების შედეგებში.",
      },
      h1: {
        label: "H1 სათაური",
        pass: "ერთი H1: „{value}“.",
        warn: "მოიძებნა {count} H1 სათაური. უმჯობესია ერთი, მკაფიო მთავარი სათაური.",
        fail: "H1 სათაური არ მოიძებნა.",
        fix: "ყველა გვერდს ჰქონდეს ზუსტად ერთი H1, რომელიც ამბობს, რაზე არის გვერდი — სასურველია მთავარი საკვანძო სიტყვით.",
      },
      viewport: {
        label: "მობილური viewport",
        pass: "გვერდი მობილური ეკრანებისთვის მორგებულია.",
        fail: "viewport თეგი არ არის — ტელეფონზე გვერდი დაპატარავებული დესკტოპ ვერსიასავით გამოჩნდება.",
        fix: 'დაამატეთ <meta name="viewport" content="width=device-width, initial-scale=1">.',
      },
      lang: {
        label: "გვერდის ენა",
        pass: "ენა მითითებულია, როგორც „{value}“.",
        fail: "გვერდზე ენა მითითებული არ არის (<html lang>).",
        fail_ge: "ენა მითითებულია, როგორც „{value}“. „ge“ საქართველოს ქვეყნის კოდია — ქართული ენის კოდი არის „ka“.",
        fix: 'ქართულ გვერდებზე მიუთითეთ <html lang="ka">, ინგლისურზე — <html lang="en">.',
      },
      georgianContent: {
        label: "ქართული კონტენტი",
        pass: "გვერდი ქართულია, ენის მითითება და სათაური მას შეესაბამება.",
        warn_lang: "კონტენტი ძირითადად ქართულია, მაგრამ ენა მითითებულია, როგორც „{value}“.",
        warn_title: "კონტენტი ქართულია, მაგრამ სათაურში ქართული სიტყვა არ არის — საქართველოში ბევრი ადამიანი ქართულად ეძებს.",
        info: "გვერდი ძირითადად სხვა ენაზეა (ქართული ტექსტი: {percent}%).",
        info_empty: "გვერდზე ენის დასადგენად საკმარისი ტექსტი არ არის.",
        fix: "ენის მითითება კონტენტს უნდა შეესაბამოდეს, სათაურებში კი გამიყენეთ ის ქართული სიტყვები, რომლებიც თქვენი მომხმარებლები Google-ში რეალურად წერენ.",
      },
      hreflang: {
        label: "ენობრივი ვერსიები (hreflang)",
        pass: "ენობრივი ვერსიები დაკავშირებულია: {value}.",
        warn: "ენობრივი ვერსიები დაკავშირებულია ({value}), მაგრამ x-default არ არის.",
        fail_ge: "hreflang-ში გამიყენებულია „ge“, რომელიც ენის კოდი არ არის — ქართულის კოდია „ka“.",
        info: "ენობრივი ალტერნატივები არ მოიძებნა. თუ საიტს სხვა ენობრივი ვერსიებიც აქვს, დააკავშირეთ ისინი hreflang-ით.",
        fix: 'დაამატეთ <link rel="alternate" hreflang="ka"> / "en" / "x-default" თეგები, რომ Google-მ ყველა ვიზიტორს სწორი ენა აჩვენოს.',
      },
      canonical: {
        label: "კანონიკური URL",
        pass: "კანონიკური URL მითითებულია.",
        warn_missing: "კანონიკური URL მითითებული არ არის.",
        warn_other: "კანონიკური URL სხვა მისამართზე მიუთითებს: {value}.",
        fix: 'დაამატეთ <link rel="canonical">, რომელიც გვერდის სასურველ მისამართზე მიუთითებს, რომ დუბლიკატებმა (?utm, www/არა-www) ერთმანეთს არ ეჯიბრონ.',
      },
      openGraph: {
        label: "სოციალური გაზიარების პრევიუ",
        pass: "ბმულის პრევიუსთვის სათაური, აღწერა და სურათი მითითებულია.",
        warn: "ბმულის პრევიუს აკლია: {value}.",
        fail: "Open Graph თეგები არ არის — Facebook-ზე ან Messenger-ში გაზიარებული ბმული სწორი სათაურისა და სურათის გარეშე გამოჩნდება.",
        fix: "დაამატეთ og:title, og:description და og:image. საქართველოში ბმულები ძირითადად Facebook-ზე ზიარდება, ასე რომ, ეს პრევიუ ხშირად მომხმარებლის პირველი შთაბეჭდილებაა.",
      },
      imageAlt: {
        label: "სურათების alt ტექსტი",
        pass: "ყველა ({total}) სურათს alt ტექსტი აქვს.",
        warn: "{total}-დან {missing} სურათს alt ტექსტი არ აქვს.",
        info: "გვერდზე სურათები არ მოიძებნა.",
        fix: "ყველა მნიშვნელოვანი სურათი აღწერეთ alt ატრიბუტში — ეს ეხმარება Google Images-ს და ეკრანის წამკითხველით მოსარგებლეებს.",
      },
      structuredData: {
        label: "სტრუქტურირებული მონაცემები",
        pass: "მოიძებნა: {value}.",
        warn: "სტრუქტურირებული მონაცემები (schema.org) არ მოიძებნა.",
        fix: "დაამატეთ JSON-LD მარკაპი (მაგ. Organization, LocalBusiness, Product), რომ Google-მ ძიების შედეგებში უფრო მდიდარი ინფორმაცია აჩვენოს.",
      },
      robotsTxt: {
        label: "robots.txt",
        pass: "robots.txt მოიძებნა.",
        warn: "robots.txt ფაილი არ მოიძებნა.",
        fail: "robots.txt მთელ საიტს საძიებო სისტემებისთვის ბლოკავს (Disallow: /).",
        fix: "საიტის root-ში განათავსეთ robots.txt, რომელიც სკანირებას უშვებს და sitemap-ზე მიუთითებს.",
      },
      sitemap: {
        label: "XML sitemap",
        pass: "Sitemap მოიძებნა.",
        warn: "XML sitemap სტანდარტულ მისამართებზე არ მოიძებნა.",
        fix: "გამოაქვეყნეთ sitemap.xml, მიუთითეთ ის robots.txt-ში და დაამატეთ Google Search Console-ში.",
      },
      wordCount: {
        label: "კონტენტის მოცულობა",
        pass: "გვერდზე დაახლოებით {count} სიტყვაა.",
        warn: "გვერდზე მხოლოდ დაახლოებით {count} სიტყვაა. მწირი კონტენტის გვერდები ძიებაში იშვიათად ჩნდება.",
        warn_js: "საწყის HTML-ში მხოლოდ დაახლოებით {count} სიტყვაა — კონტენტი, სავარაუდოდ, JavaScript-ით იხატება.",
        fix: "დაამატეთ სასარგებლო, ორიგინალური ტექსტი, რომელიც ვიზიტორების კითხვებს პასუხობს. თუ კონტენტი JavaScript-ით იხატება, გაიხილეთ server-side rendering, რომ საძიებო სისტემებმა ის მაშინვე დაინონ.",
      },
    },
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
    previous: "Previous service",
    next: "Next service",
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
    auditTool: {
      text: "Want to see where your site stands right now? Run our free automatic SEO check — it takes about 30 seconds.",
      button: "Try the free SEO check",
    },
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
    previous: "Previous project",
    next: "Next project",
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
    cookieSettings: "Cookie settings",
    privacy: "Privacy policy",
  },
  cookieConsent: {
    title: "Cookies",
    text: "We use analytics cookies (Google Analytics) to understand how visitors use the site and improve it. They're only turned on if you agree.",
    accept: "Accept",
    reject: "Reject",
    learnMore: "Privacy policy",
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
  seoAudit: {
    eyebrow: "Grapevine — SEO Audit",
    heading: "Free SEO Audit",
    intro:
      "Enter a website address and get an instant check of technical SEO, speed and Georgian-market specifics — in about 30 seconds.",
    urlLabel: "Website address",
    urlPlaceholder: "example.ge",
    submit: "Run audit",
    running: "Auditing...",
    note: "We check one page. For a full audit, our team reviews the whole site by hand.",
    audited: "Audited:",
    steps: {
      page: "Checking the page",
      mobile: "Measuring mobile speed",
      desktop: "Measuring desktop speed",
    },
    scores: {
      overall: "Overall score",
      onPage: "On-page SEO",
      performance: "Speed (mobile)",
      seo: "Google SEO check",
      accessibility: "Accessibility",
    },
    groups: {
      fail: "Fix first",
      warn: "Worth improving",
      info: "Notes",
      pass: "Passed checks: {n}",
    },
    howToFix: "How to fix",
    clientRendered:
      "This site builds its content with JavaScript. The checks below read the initial HTML — what Facebook and many crawlers see. Google does run JavaScript, so some results may look better to Google.",
    speed: {
      heading: "Speed",
      mobile: "Mobile",
      desktop: "Desktop",
      lab: "Lab test",
      field: "Real visitors (last 28 days)",
      fieldOrigin: "Real visitors, whole site (last 28 days)",
      noField: "Google doesn't have enough real-visitor data for this site yet.",
      opportunities: "Technical details (Google Lighthouse)",
      source: "Speed data: Google PageSpeed Insights",
      metrics: {
        "first-contentful-paint": "First content",
        "largest-contentful-paint": "Largest content",
        "total-blocking-time": "Blocking time",
        "cumulative-layout-shift": "Layout shift",
        "speed-index": "Speed index",
        lcp: "Largest content",
        inp: "Responsiveness",
        cls: "Layout shift",
      },
      ratings: { FAST: "Good", AVERAGE: "Needs work", SLOW: "Poor" },
    },
    errors: {
      invalid_url: "That doesn't look like a valid website address.",
      blocked_host: "This address can't be audited.",
      dns_failed: "We couldn't find that website. Check the address.",
      timeout: "The website took too long to respond.",
      fetch_failed: "We couldn't load the page. The site may be down or blocking automated checks.",
      tls_invalid:
        "The SSL certificate for this address is invalid — browsers show visitors a security warning and Google may not index the page. That's a real problem worth fixing; also try the www. version.",
      bot_blocked:
        "The site blocks automated checks (for example Cloudflare bot protection), so we couldn't read the page. Google's speed test below may still work.",
      not_html: "That address isn't a web page.",
      too_many_redirects: "The page redirects too many times.",
      rate_limited: "Too many audits in a short time. Please try again in a few minutes.",
      captcha: "Verification failed. Please try again.",
      generic: "Something went wrong. Please try again.",
    },
    psiErrors: {
      quota: "The speed test is unavailable right now (daily limit reached).",
      failed: "Google couldn't run a speed test on this page.",
    },
    cta: {
      heading: "Want the full picture?",
      body: "This is an automatic check of one page. Our team's free audit covers the whole site, your keywords, competitors and social media — with a concrete plan for what to fix.",
      button: "Request a free audit",
    },
    checks: {
      https: {
        label: "HTTPS",
        pass: "The page is served securely over HTTPS.",
        fail: "The page is not served over HTTPS.",
        fix: "Install an SSL certificate and redirect all http:// traffic to https://. Browsers mark http pages as “Not secure”, and Google uses HTTPS as a ranking signal.",
      },
      status: {
        label: "Page response",
        pass: "The page responds normally (status {code}).",
        warn: "The page responds, but only after {redirects} redirects.",
        fail: "The page returned status {code} instead of 200.",
        fix: "Search engines index pages that load directly with a 200 status. Link to the final address and fix any server errors.",
      },
      indexable: {
        label: "Indexing allowed",
        pass: "Search engines are allowed to index this page.",
        fail: "The page tells search engines not to index it (noindex).",
        fix: "Remove noindex from the robots meta tag or X-Robots-Tag header — unless hiding this page is intentional.",
      },
      title: {
        label: "Page title",
        pass: "“{value}” — {length} characters, a good length.",
        warn: "“{value}” — {length} characters. Aim for 30–60 so it isn't cut off in Google or too vague.",
        fail: "The page has no title.",
        fix: "Write a unique title of 30–60 characters that starts with the main keyword people search for.",
      },
      metaDescription: {
        label: "Meta description",
        pass: "{length} characters — a good length.",
        warn: "{length} characters. Aim for 70–160.",
        fail: "No meta description — Google will show random text from the page in search results.",
        fix: "Write a 70–160 character summary that makes people want to click — it's your ad copy in search results.",
      },
      h1: {
        label: "H1 heading",
        pass: "One H1: “{value}”.",
        warn: "{count} H1 headings found. One clear main heading is best.",
        fail: "No H1 heading found.",
        fix: "Give every page exactly one H1 that says what the page is about, ideally including the main keyword.",
      },
      viewport: {
        label: "Mobile viewport",
        pass: "The page is set up for mobile screens.",
        fail: "No viewport tag — on phones the page will look like a shrunken desktop site.",
        fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
      },
      lang: {
        label: "Page language",
        pass: "Language declared as “{value}”.",
        fail: "The page doesn't declare its language (<html lang>).",
        fail_ge: "Language declared as “{value}”. “ge” is Georgia's country code — the language code for Georgian is “ka”.",
        fix: 'Set <html lang="ka"> on Georgian pages and <html lang="en"> on English ones.',
      },
      georgianContent: {
        label: "Georgian content",
        pass: "The page is in Georgian, and its declared language and title match.",
        warn_lang: "The content is mostly Georgian, but the page declares its language as “{value}”.",
        warn_title: "The content is Georgian, but the title has no Georgian words — many people in Georgia search in Georgian.",
        info: "The page is mainly in another language ({percent}% Georgian text).",
        info_empty: "Not enough text on the page to tell its language.",
        fix: "Match the declared language to the content, and use the Georgian words your customers actually type into Google in titles and headings.",
      },
      hreflang: {
        label: "Language versions (hreflang)",
        pass: "Language versions are linked: {value}.",
        warn: "Language versions are linked ({value}), but there's no x-default.",
        fail_ge: "hreflang uses “ge”, which isn't a language code — Georgian is “ka”.",
        info: "No language alternates found. If the site has other language versions, link them with hreflang.",
        fix: 'Add <link rel="alternate" hreflang="ka"> / "en" / "x-default" tags so Google shows each visitor the right language.',
      },
      canonical: {
        label: "Canonical URL",
        pass: "Canonical URL is set.",
        warn_missing: "No canonical URL.",
        warn_other: "The canonical URL points to a different address: {value}.",
        fix: 'Add a <link rel="canonical"> pointing to the page\'s preferred address, so duplicates (?utm, www/non-www) don\'t compete with each other.',
      },
      openGraph: {
        label: "Social sharing preview",
        pass: "Title, description and image are set for link previews.",
        warn: "Missing for link previews: {value}.",
        fail: "No Open Graph tags — links shared on Facebook or Messenger will show without a proper title or image.",
        fix: "Add og:title, og:description and og:image. In Georgia most links get shared on Facebook, so this preview is often a customer's first impression.",
      },
      imageAlt: {
        label: "Image alt text",
        pass: "All {total} images have alt text.",
        warn: "{missing} of {total} images have no alt text.",
        info: "No images found on the page.",
        fix: "Describe every meaningful image in its alt attribute — it helps Google Images and screen-reader users.",
      },
      structuredData: {
        label: "Structured data",
        pass: "Found: {value}.",
        warn: "No structured data (schema.org) found.",
        fix: "Add JSON-LD markup (e.g. Organization, LocalBusiness, Product) so Google can show richer search results.",
      },
      robotsTxt: {
        label: "robots.txt",
        pass: "robots.txt found.",
        warn: "No robots.txt file found.",
        fail: "robots.txt blocks the entire site from search engines (Disallow: /).",
        fix: "Serve a robots.txt at the site root that allows crawling and points to your sitemap.",
      },
      sitemap: {
        label: "XML sitemap",
        pass: "Sitemap found.",
        warn: "No XML sitemap found at the usual locations.",
        fix: "Publish a sitemap.xml, reference it in robots.txt and submit it in Google Search Console.",
      },
      wordCount: {
        label: "Amount of content",
        pass: "About {count} words of text on the page.",
        warn: "Only about {count} words of text. Thin pages rarely rank.",
        warn_js: "Only about {count} words in the initial HTML — the content seems to be rendered with JavaScript.",
        fix: "Add useful, original text that answers what visitors are looking for. If content is rendered with JavaScript, consider server-side rendering so search engines see it straight away.",
      },
    },
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
