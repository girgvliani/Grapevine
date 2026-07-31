import { type StaticImageData } from "next/image";
import type { ServiceSlug } from "@/lib/i18n";
import iconDigital     from "./assets/servicesIcons/digital.png";
import iconBranding    from "./assets/servicesIcons/branding.png";
import iconCampaigns   from "./assets/servicesIcons/campaigns.png";
import iconStrategy    from "./assets/servicesIcons/strategy.png";
import iconSocMedia    from "./assets/servicesIcons/socmedia.png";
import iconProduction  from "./assets/servicesIcons/production.png";
import iconSeo         from "./assets/servicesIcons/seo.png";
import iconPrServices  from "./assets/servicesIcons/Prservices.png";
import iconCrm         from "./assets/servicesIcons/CRM.png";
import iconMobileApp   from "./assets/servicesIcons/mobileapp.png";
import iconWeb         from "./assets/servicesIcons/web.png";

// Single source of truth for the service card order + icons, shared by the home
// cards (Services.tsx) and the services page (ServicesShowcase.tsx). The `id` is
// also the URL slug of /services/<id>. Names/subtitles come from i18n; the
// expanded copy from content/services.json.
export const SERVICE_ASSETS: { id: ServiceSlug; icon: StaticImageData }[] = [
  { id: "digital-advertising", icon: iconDigital    },
  { id: "branding",            icon: iconBranding   },
  { id: "campaigns",           icon: iconCampaigns  },
  { id: "strategy",            icon: iconStrategy   },
  { id: "social-media-audit",  icon: iconSocMedia   },
  { id: "production",          icon: iconProduction },
  { id: "seo",                 icon: iconSeo        },
  { id: "pr-services",         icon: iconPrServices },
  { id: "crm-systems",         icon: iconCrm        },
  { id: "mobile-app",          icon: iconMobileApp  },
  { id: "web-development",      icon: iconWeb        },
];