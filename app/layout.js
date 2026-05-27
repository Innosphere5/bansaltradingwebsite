import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import OrderStatusTracker from "./components/OrderStatusTracker";
import { UIProvider } from "./context/UIContext";
import CategoryDrawer from "./components/CategoryDrawer";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const SITE_URL = "https://bansaltrading.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Bansal Trading — Wholesale Grocery Store in Bassi Pathana | Mandi Rate Karyana",
    template: "%s | Bansal Trading — Wholesale Grocery Bassi Pathana",
  },

  description:
    "Bansal Trading is Bassi Pathana's trusted wholesale grocery & karyana store. Buy rice, flour, dal, spices, edible oil & household essentials at mandi rates with free home delivery. Order online or call +91 97807 48073.",

  keywords: [
    "Bansal Trading",
    "wholesale grocery store",
    "karyana store Bassi Pathana",
    "wholesale grocery Bassi Pathana",
    "mandi rate grocery online",
    "buy grocery online Punjab",
    "bulk grocery order",
    "wholesale rice flour dal",
    "cheap grocery near me",
    "Bassi Pathana grocery delivery",
    "grocery store near me",
    "online karyana store Punjab",
    "wholesale atta Bassi Pathana",
    "edible oil wholesale Punjab",
    "spices masala wholesale",
    "household essentials wholesale",
    "free delivery grocery Bassi Pathana",
    "Bansal karyana store",
    "grocery shop Fatehgarh Sahib",
    "Punjab wholesale grocery online",
  ],

  applicationName: "Bansal Trading",
  authors: [{ name: "Bansal Trading", url: SITE_URL }],
  creator: "Bansal Trading",
  publisher: "Bansal Trading",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Bansal Trading",
    title: "Bansal Trading — Wholesale Grocery Store in Bassi Pathana | Buy at Mandi Rates",
    description:
      "Your trusted wholesale grocery & karyana store in Bassi Pathana, Punjab. Premium rice, flour, dal, spices & household essentials at unbeatable mandi rates. Free home delivery on orders above ₹500.",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Bansal Trading — Wholesale Grocery Store Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bansal Trading — Wholesale Grocery at Mandi Rates | Bassi Pathana",
    description:
      "Buy premium wholesale groceries at mandi rates. Rice, flour, dal, spices & more with free delivery in Bassi Pathana. Order online now!",
    images: ["/logo.svg"],
  },

  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },

  alternates: {
    canonical: SITE_URL,
  },

  category: "Grocery Store",

  other: {
    "geo.region": "IN-PB",
    "geo.placename": "Bassi Pathana, Fatehgarh Sahib, Punjab",
    "geo.position": "30.5833;76.3833",
    ICBM: "30.5833, 76.3833",
    "revisit-after": "3 days",
    "rating": "general",
    "distribution": "global",
    "google-site-verification": "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },
};

// JSON-LD Structured Data for Google Rich Results & Local SEO
function JsonLdSchema() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    "@id": `${SITE_URL}/#grocery-store`,
    name: "Bansal Trading",
    alternateName: "Bansal Karyana Store",
    description:
      "Trusted wholesale grocery & karyana store in Bassi Pathana, Punjab. Premium quality rice, flour, dal, pulses, spices, edible oils & household essentials at mandi rates with free home delivery.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}/logo.svg`,
    telephone: "+91-97807-48073",
    email: "support@bansaltrading.com",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Credit Card, Debit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near New Bus Stand",
      addressLocality: "Bassi Pathana",
      addressRegion: "Punjab",
      postalCode: "140412",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.5833,
      longitude: 76.3833,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Bassi Pathana",
      },
      {
        "@type": "State",
        name: "Punjab",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wholesale Grocery Products",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Rice & Grains",
          description: "Premium basmati rice, non-basmati rice, and grains at wholesale mandi rates",
        },
        {
          "@type": "OfferCatalog",
          name: "Flours & Atta",
          description: "Wheat flour, besan, maida, and specialty flours at bulk prices",
        },
        {
          "@type": "OfferCatalog",
          name: "Dals & Pulses",
          description: "Toor dal, moong dal, chana dal, and premium pulses at wholesale rates",
        },
        {
          "@type": "OfferCatalog",
          name: "Spices & Masalas",
          description: "Pure turmeric, red chilli, coriander, and branded spice mixes",
        },
        {
          "@type": "OfferCatalog",
          name: "Edible Oils",
          description: "Refined oil, mustard oil, and cooking oils at mandi wholesale prices",
        },
        {
          "@type": "OfferCatalog",
          name: "Household Essentials",
          description: "Detergent, soap, shampoo, and cleaning supplies at bulk rates",
        },
      ],
    },
    sameAs: [],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Bansal Trading",
    url: SITE_URL,
    description: "Wholesale grocery & karyana store — order premium groceries online at mandi rates",
    publisher: {
      "@type": "Organization",
      name: "Bansal Trading",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Bansal Trading",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-97807-48073",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["Hindi", "Punjabi", "English"],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Exclusive Offers",
        item: `${SITE_URL}/offers`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <JsonLdSchema />
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <CartProvider>
            <UIProvider>
              <Toaster position="top-right" />
              <OrderStatusTracker />
              <CategoryDrawer />
              {children}
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
