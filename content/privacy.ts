// Privacy & cookie policy copy for /privacy. Kept out of lib/i18n.ts because
// it's long-form legal text that will be edited on its own. Keep the ka and en
// section lists in the same order.
//
// Written to describe what the site actually does (see the components and API
// routes named in each section). If a data flow changes — a new tracking tag
// in GTM, a new form, a different email/AI provider — update this file.
//
// Not legal advice: have it reviewed before relying on it, and fill in the
// company's registered legal name, ID code and address in "Who we are".

import type { Lang } from "@/lib/i18n";

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "cookies" } // renders the cookie table below
  | { type: "settingsButton" }; // reopens the consent banner

export type PolicySection = { heading: string; blocks: PolicyBlock[] };

export type CookieRow = { name: string; provider: string; purpose: string; duration: string; needsConsent: boolean };

type Policy = {
  title: string;
  eyebrow: string;
  updatedLabel: string;
  updated: string;
  intro: string;
  cookieTable: { name: string; provider: string; purpose: string; duration: string; consent: string; yes: string; no: string };
  cookies: CookieRow[];
  settingsButton: string;
  sections: PolicySection[];
};

const ka: Policy = {
  title: "კონფიდენციალურობისა და ქუქი-ფაილების პოლიტიკა",
  eyebrow: "Grapevine — კონფიდენციალურობა",
  updatedLabel: "ბოლო განახლება:",
  updated: "28 სექტემბერი, 2026",
  intro:
    "ეს პოლიტიკა განმარტავს, რა პერსონალურ მონაცემებს ამუშავებს Grapevine ვებსაიტზე grapevine.ge, რა მიზნით, ვის უზიარებს და რა უფლებები გაქვთ.",
  cookieTable: {
    name: "სახელი",
    provider: "მომწოდებელი",
    purpose: "მიზანი",
    duration: "ვადა",
    consent: "საჭიროებს თანხმობას",
    yes: "დიახ",
    no: "არა",
  },
  cookies: [
    {
      name: "gv-cookie-consent-v1",
      provider: "Grapevine (ბრაუზერის local storage)",
      purpose: "იმახსოვრებს, დაეთანხმეთ თუ უარყავით ანალიტიკური ქუქი-ფაილები.",
      duration: "სანამ ბრაუზერის მონაცემებს არ წაშლით",
      needsConsent: false,
    },
    {
      name: "_ga",
      provider: "Google Analytics",
      purpose: "განასხვავებს ვიზიტორებს საიტის სტატისტიკისთვის.",
      duration: "2 წელი",
      needsConsent: true,
    },
    {
      name: "_ga_<ID>",
      provider: "Google Analytics",
      purpose: "ინახავს ვიზიტის (სესიის) მდგომარეობას.",
      duration: "2 წელი",
      needsConsent: true,
    },
  ],
  settingsButton: "ქუქი-ფაილების პარამეტრების შეცვლა",
  sections: [
    {
      heading: "ვინ ვართ",
      blocks: [
        {
          type: "p",
          text: "მონაცემთა დამმუშავებელია Grapevine, კრეატიული სააგენტო საქართველოში. კონფიდენციალურობასთან დაკავშირებულ ნებისმიერ საკითხზე მოგვწერეთ info@grapevine.ge-ზე ან დაგვირეკეთ +995 599 495 574-ზე.",
        },
      ],
    },
    {
      heading: "რა მონაცემებს ვაგროვებთ და რატომ",
      blocks: [
        {
          type: "p",
          text: "საკონტაქტო ფორმა. როცა ფორმას აგზავნით, ვიღებთ თქვენს ელ.ფოსტას, თემასა და შეტყობინებას. მათ ვიყენებთ მხოლოდ თქვენს მოთხოვნაზე საპასუხოდ. შეტყობინება ჩვენს ელ.ფოსტაზე მოდის და ინახება ჩვენს CRM სისტემაში (კლიენტებთან ურთიერთობის სისტემა), როგორც ახალი კონტაქტი.",
        },
        {
          type: "p",
          text: "უფასო SEO აუდიტი. აუდიტისთვის ვიღებთ თქვენ მიერ შეყვანილ ვებსაიტის მისამართს: ვხსნით ამ გვერდს და მისამართს ვუგზავნით Google PageSpeed Insights-ს სისწრაფის გასაზომად. აუდიტის შედეგებს არ ვინახავთ და მათ თქვენს პიროვნებასთან არ ვაკავშირებთ. თქვენი IP მისამართი მოკლე დროით გამოიყენება ბოროტად გამოყენების შესაზღუდად.",
        },
        {
          type: "p",
          text: "დახმარების ჩატი. ჩატში დაწერილი შეტყობინებები პასუხის მოსამზადებლად ეგზავნება Google-ის AI სერვისს (Gemini). საუბრებს არ ვინახავთ. გთხოვთ, ჩატში არ ჩაწეროთ მგრძნობიარე პერსონალური ინფორმაცია.",
        },
        {
          type: "p",
          text: "სპამისგან დაცვა. ფორმების გაგზავნისას Cloudflare Turnstile ამუშავებს ტექნიკურ მონაცემებს (მაგ. IP მისამართს და ბრაუზერის ინფორმაციას), რომ ადამიანი ბოტისგან გაარჩიოს.",
        },
        {
          type: "p",
          text: "ანალიტიკა — მხოლოდ თქვენი თანხმობით. თუ დაეთანხმებით, Google Analytics-ისა და Google Tag Manager-ის მეშვეობით ვაგროვებთ ინფორმაციას იმის შესახებ, თუ რომელ გვერდებს ნახულობთ, რა მოწყობილობას იყენებთ, დაახლოებით საიდან ხართ და როგორ მოხვდით საიტზე. თანხმობის გარეშე ეს სკრიპტები საერთოდ არ იტვირთება.",
        },
        {
          type: "p",
          text: "სერვერის ჟურნალები. ჩვენი ჰოსტინგის პროვაიდერი (Vercel) საიტის მიწოდებისა და დაცვისთვის ამუშავებს IP მისამართებსა და მოთხოვნების ტექნიკურ მონაცემებს.",
        },
      ],
    },
    {
      heading: "სამართლებრივი საფუძველი",
      blocks: [
        {
          type: "list",
          items: [
            "თქვენი თანხმობა — ანალიტიკისთვის. თანხმობის გაუქმება ნებისმიერ დროს შეგიძლიათ.",
            "თქვენი მოთხოვნა — როცა გვწერთ ფორმით, ჩატით ან აუდიტს უშვებთ, მონაცემებს ვამუშავებთ, რომ ეს მოთხოვნა შევასრულოთ.",
            "ჩვენი ლეგიტიმური ინტერესი — საიტის უსაფრთხოების უზრუნველყოფა და სპამისგან დაცვა.",
          ],
        },
      ],
    },
    {
      heading: "ქუქი-ფაილები",
      blocks: [
        {
          type: "p",
          text: "ვიყენებთ ქუქი-ფაილების მინიმალურ რაოდენობას. ანალიტიკური ქუქი-ფაილები მხოლოდ თქვენი თანხმობის შემდეგ ჩნდება. თანხმობის გაუქმების შემთხვევაში მათ ვშლით.",
        },
        { type: "cookies" },
        {
          type: "p",
          text: "არჩევანის შეცვლა ნებისმიერ დროს შეგიძლიათ — ქვემოთ მოცემული ღილაკით ან ყველა გვერდის ქვედა ნაწილში არსებული ბმულით „ქუქი-ფაილების პარამეტრები“.",
        },
        { type: "settingsButton" },
      ],
    },
    {
      heading: "ვის ვუზიარებთ მონაცემებს",
      blocks: [
        {
          type: "p",
          text: "მონაცემებს არ ვყიდით. ვიყენებთ მომსახურების მომწოდებლებს, რომლებიც მონაცემებს ჩვენი დავალებით ამუშავებენ:",
        },
        {
          type: "list",
          items: [
            "Google — Analytics, Tag Manager, PageSpeed Insights და Gemini (დახმარების ჩატი)",
            "Cloudflare — Turnstile (სპამისგან დაცვა)",
            "Vercel — საიტის ჰოსტინგი",
            "Resend — საკონტაქტო ფორმის ელ.წერილების მიწოდება",
            "Railway — ჩვენი CRM სისტემისა და მონაცემთა ბაზის ჰოსტინგი",
          ],
        },
        {
          type: "p",
          text: "ამ მომწოდებელთაგან ზოგიერთი მონაცემებს საქართველოს ფარგლებს გარეთ, მათ შორის აშშ-ში, ამუშავებს. ასეთ შემთხვევაში ვეყრდნობით მათ მიერ გამოყენებულ სახელშეკრულებო დაცვის მექანიზმებს.",
        },
      ],
    },
    {
      heading: "რამდენ ხანს ვინახავთ მონაცემებს",
      blocks: [
        {
          type: "list",
          items: [
            "საკონტაქტო მოთხოვნები — მოთხოვნის დამუშავებამდე, ხოლო თუ თანამშრომლობას დავიწყებთ, იმდენ ხანს, რამდენსაც ეს ურთიერთობა და კანონით დადგენილი ვალდებულებები მოითხოვს.",
            "ანალიტიკის მონაცემები — Google Analytics-ში დაყენებული შენახვის ვადით (არაუმეტეს 14 თვისა).",
            "SEO აუდიტი და დახმარების ჩატი — შედეგებსა და საუბრებს არ ვინახავთ.",
          ],
        },
      ],
    },
    {
      heading: "თქვენი უფლებები",
      blocks: [
        {
          type: "p",
          text: "საქართველოს კანონის „პერსონალურ მონაცემთა დაცვის შესახებ“ და, სადაც მოქმედებს, ევროკავშირის GDPR-ის შესაბამისად, გაქვთ უფლება:",
        },
        {
          type: "list",
          items: [
            "მოითხოვოთ ინფორმაცია და ასლი იმ მონაცემებისა, რომლებსაც თქვენ შესახებ ვამუშავებთ;",
            "მოითხოვოთ მონაცემების გასწორება ან წაშლა;",
            "შეზღუდოთ დამუშავება ან გააპროტესტოთ ის;",
            "ნებისმიერ დროს გააუქმოთ თანხმობა;",
            "მიიღოთ მონაცემები სტრუქტურირებული ფორმით (პორტაბელურობა).",
          ],
        },
        {
          type: "p",
          text: "მოთხოვნისთვის მოგვწერეთ info@grapevine.ge-ზე. თუ ფიქრობთ, რომ თქვენი უფლებები დაირღვა, შეგიძლიათ მიმართოთ პერსონალურ მონაცემთა დაცვის სამსახურს (personaldata.ge).",
        },
      ],
    },
    {
      heading: "ცვლილებები",
      blocks: [
        {
          type: "p",
          text: "ამ პოლიტიკას განვაახლებთ, როცა საიტი ან მონაცემთა დამუშავება შეიცვლება. მიმდინარე ვერსია ყოველთვის ამ გვერდზეა, განახლების თარიღით.",
        },
      ],
    },
  ],
};

const en: Policy = {
  title: "Privacy & Cookie Policy",
  eyebrow: "Grapevine — Privacy",
  updatedLabel: "Last updated:",
  updated: "28 September 2026",
  intro:
    "This policy explains what personal data Grapevine processes on grapevine.ge, why, who we share it with, and what rights you have.",
  cookieTable: {
    name: "Name",
    provider: "Provider",
    purpose: "Purpose",
    duration: "Duration",
    consent: "Needs consent",
    yes: "Yes",
    no: "No",
  },
  cookies: [
    {
      name: "gv-cookie-consent-v1",
      provider: "Grapevine (browser local storage)",
      purpose: "Remembers whether you accepted or rejected analytics cookies.",
      duration: "Until you clear your browser data",
      needsConsent: false,
    },
    {
      name: "_ga",
      provider: "Google Analytics",
      purpose: "Distinguishes visitors for site statistics.",
      duration: "2 years",
      needsConsent: true,
    },
    {
      name: "_ga_<ID>",
      provider: "Google Analytics",
      purpose: "Keeps the state of your visit (session).",
      duration: "2 years",
      needsConsent: true,
    },
  ],
  settingsButton: "Change cookie settings",
  sections: [
    {
      heading: "Who we are",
      blocks: [
        {
          type: "p",
          text: "The data controller is Grapevine, a creative agency in Georgia. For any privacy question, email info@grapevine.ge or call +995 599 495 574.",
        },
      ],
    },
    {
      heading: "What we collect and why",
      blocks: [
        {
          type: "p",
          text: "Contact form. When you send the form we receive your email address, subject and message, and use them only to answer your enquiry. The message arrives in our inbox and is saved in our CRM (customer relationship system) as a new contact.",
        },
        {
          type: "p",
          text: "Free SEO audit. We receive the website address you enter: we load that page and send the address to Google PageSpeed Insights to measure its speed. We don't store the audit results or link them to you. Your IP address is used briefly to limit abuse.",
        },
        {
          type: "p",
          text: "Support chat. Messages you type in the chat are sent to Google's AI service (Gemini) to prepare a reply. We don't store the conversations. Please don't enter sensitive personal information in the chat.",
        },
        {
          type: "p",
          text: "Spam protection. When you submit a form, Cloudflare Turnstile processes technical data (such as your IP address and browser details) to tell people from bots.",
        },
        {
          type: "p",
          text: "Analytics — only with your consent. If you agree, we use Google Analytics and Google Tag Manager to learn which pages you view, what device you use, roughly where you are and how you found the site. Without your consent these scripts don't load at all.",
        },
        {
          type: "p",
          text: "Server logs. Our hosting provider (Vercel) processes IP addresses and technical request data to deliver and protect the site.",
        },
      ],
    },
    {
      heading: "Legal basis",
      blocks: [
        {
          type: "list",
          items: [
            "Your consent — for analytics. You can withdraw it at any time.",
            "Your request — when you contact us, use the chat or run an audit, we process data to do what you asked.",
            "Our legitimate interest — keeping the site secure and free of spam.",
          ],
        },
      ],
    },
    {
      heading: "Cookies",
      blocks: [
        {
          type: "p",
          text: "We use as few cookies as possible. Analytics cookies are only set after you consent, and we delete them if you withdraw it.",
        },
        { type: "cookies" },
        {
          type: "p",
          text: "You can change your choice at any time with the button below or the “Cookie settings” link at the bottom of every page.",
        },
        { type: "settingsButton" },
      ],
    },
    {
      heading: "Who we share data with",
      blocks: [
        {
          type: "p",
          text: "We don't sell your data. We use service providers that process data on our behalf:",
        },
        {
          type: "list",
          items: [
            "Google — Analytics, Tag Manager, PageSpeed Insights and Gemini (support chat)",
            "Cloudflare — Turnstile (spam protection)",
            "Vercel — website hosting",
            "Resend — delivering contact-form emails",
            "Railway — hosting our CRM and database",
          ],
        },
        {
          type: "p",
          text: "Some of these providers process data outside Georgia, including in the United States. Where that happens we rely on the contractual safeguards they provide.",
        },
      ],
    },
    {
      heading: "How long we keep data",
      blocks: [
        {
          type: "list",
          items: [
            "Contact enquiries — until your enquiry is handled, and if we start working together, for as long as that relationship and our legal obligations require.",
            "Analytics data — for the retention period set in Google Analytics (no more than 14 months).",
            "SEO audits and support chats — we don't keep the results or conversations.",
          ],
        },
      ],
    },
    {
      heading: "Your rights",
      blocks: [
        {
          type: "p",
          text: "Under the Law of Georgia on Personal Data Protection and, where it applies, the EU GDPR, you have the right to:",
        },
        {
          type: "list",
          items: [
            "ask what data we hold about you and get a copy;",
            "have your data corrected or deleted;",
            "restrict or object to processing;",
            "withdraw your consent at any time;",
            "receive your data in a structured format (portability).",
          ],
        },
        {
          type: "p",
          text: "To make a request, email info@grapevine.ge. If you believe your rights have been violated, you can complain to the Personal Data Protection Service of Georgia (personaldata.ge).",
        },
      ],
    },
    {
      heading: "Changes",
      blocks: [
        {
          type: "p",
          text: "We'll update this policy when the site or how we handle data changes. The current version is always on this page, with its update date.",
        },
      ],
    },
  ],
};

export const PRIVACY: Record<Lang, Policy> = { ka, en };
