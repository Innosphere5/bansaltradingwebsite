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

const SITE_URL = "https://bansaltradingcompany.store";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Bansal Trading Company — #1 Wholesale Grocery & Karyana Store | Mandi Rate Prices Online",
    template: "%s | Bansal Trading Company — Wholesale Grocery at Mandi Rates",
  },

  description:
    "Bansal Trading Company — Bassi Pathana's #1 wholesale grocery & karyana store. Buy rice, atta, dal, spices, edible oil & household essentials at lowest mandi rates. Free home delivery above ₹500. Order online or call +91 97807 48073. Serving Punjab since years.",

  keywords: [
    // Brand keywords
    "Bansal Trading Company",
    "Bansal Trading",
    "bansaltradingcompany.store",
    "Bansal karyana store",
    "Bansal wholesale grocery",

    // High-volume grocery intent keywords
    "wholesale grocery store near me",
    "wholesale grocery online India",
    "karyana store online order",
    "online karyana store Punjab",
    "bulk grocery order online",
    "grocery at mandi rate",
    "mandi rate grocery online",
    "cheapest grocery online Punjab",

    // Location-specific (local SEO gold)
    "wholesale grocery Bassi Pathana",
    "karyana store Bassi Pathana",
    "grocery delivery Bassi Pathana",
    "grocery store Fatehgarh Sahib",
    "wholesale grocery Fatehgarh Sahib",
    "grocery store Punjab online",
    "grocery delivery Punjab",
    "grocery shop near Bassi Pathana",

    // Product-specific high-search keywords
    "wholesale atta online",
    "wholesale rice online India",
    "wholesale dal pulses online",
    "wholesale spices masala online",
    "wholesale edible oil online",
    "sasta grocery online",
    "bulk atta flour order",
    "basmati rice wholesale price",
    "toor dal wholesale rate",
    "mustard oil wholesale Punjab",
    "refined oil wholesale India",
    "wholesale detergent soap India",

    // Trending & semantic keywords
    "online grocery at wholesale price",
    "direct mandi price grocery",
    "grocery without middleman",
    "cheapest grocery home delivery",
    "free delivery grocery online",
    "grocery under MRP India",
    "trusted grocery store online Punjab",
    "best karyana store Punjab",
  ],

  applicationName: "Bansal Trading Company",
  authors: [{ name: "Bansal Trading Company", url: SITE_URL }],
  creator: "Bansal Trading Company",
  publisher: "Bansal Trading Company",

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
    siteName: "Bansal Trading Company",
    title: "Bansal Trading Company — Wholesale Grocery at Mandi Rates | Free Delivery Punjab",
    description:
      "Punjab's trusted wholesale grocery & karyana store. Premium rice, atta, dal, spices & household essentials at lowest mandi rates. Free home delivery above ₹500 in Bassi Pathana & nearby areas.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bansal Trading Company — Wholesale Grocery Store at Mandi Rates, Bassi Pathana Punjab",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bansal Trading Company — Wholesale Grocery at Mandi Rates",
    description:
      "Buy premium wholesale groceries at mandi rates in Punjab. Rice, atta, dal, spices & more. Free delivery above ₹500. Order now!",
    images: [`${SITE_URL}/og-image.jpg`],
  },

  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },

  alternates: {
    canonical: SITE_URL,
  },

  verification: {
    google: "google-site-verification=HO1md-s4jrBBPVavZeBRaU7W0E1spFERQkwLB333V94", // Replace with real code
  },

  category: "Grocery Store",

  other: {
    "geo.region": "IN-PB",
    "geo.placename": "Bassi Pathana, Fatehgarh Sahib, Punjab, India",
    "geo.position": "30.5833;76.3833",
    ICBM: "30.5833, 76.3833",
    "revisit-after": "1 days",
    "rating": "general",
    "distribution": "global",
    "language": "en-IN",
    "content-language": "en-IN",
    "theme-color": "#16a34a", // Green = trust + grocery
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=yes",
  },
};

// ─── JSON-LD Structured Data — Google Rich Results & Local SEO ──────────────
function JsonLdSchema() {

  // 1. GroceryStore (Local Business) — most important schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["GroceryStore", "Store", "LocalBusiness"],
    "@id": `${SITE_URL}/#grocery-store`,
    name: "Bansal Trading Company",
    alternateName: ["Bansal Trading", "Bansal Karyana Store", "Bansal Wholesale Grocery"],
    description:
      "Bansal Trading Company is Bassi Pathana's most trusted wholesale grocery & karyana store. We offer premium rice, atta, dal, pulses, spices, edible oils & household essentials at direct mandi rates with free home delivery.",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-image.jpg`,
    telephone: "+91-97807-48073",
    email: "support@bansaltradingcompany.store",
    priceRange: "₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Google Pay, PhonePe, Paytm, Credit Card, Debit Card, Net Banking",
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
    hasMap: `https://maps.google.com/?q=Bassi+Pathana+Punjab+India`,
    areaServed: [
      { "@type": "City", name: "Bassi Pathana" },
      { "@type": "City", name: "Fatehgarh Sahib" },
      { "@type": "State", name: "Punjab" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wholesale Grocery Products at Mandi Rates",
      itemListElement: [
        { "@type": "OfferCatalog", name: "Rice & Basmati", description: "Premium basmati & non-basmati rice at wholesale mandi rates — direct from source" },
        { "@type": "OfferCatalog", name: "Atta, Flour & Grains", description: "Wheat atta, besan, maida, suji & specialty flours at bulk wholesale prices" },
        { "@type": "OfferCatalog", name: "Dal & Pulses", description: "Toor dal, moong dal, chana dal, masoor dal at direct mandi wholesale rates" },
        { "@type": "OfferCatalog", name: "Spices & Masalas", description: "Pure haldi, lal mirch, dhaniya, garam masala & branded spice mixes in bulk" },
        { "@type": "OfferCatalog", name: "Edible Oils", description: "Mustard oil, refined oil, groundnut oil & vanaspati at wholesale mandi prices" },
        { "@type": "OfferCatalog", name: "Household Essentials", description: "Detergent, soap, shampoo, toothpaste & cleaning supplies at bulk rates" },
        { "@type": "OfferCatalog", name: "Sugar, Salt & Staples", description: "Sugar, salt, tea, coffee & everyday kitchen staples at lowest prices" },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Rajesh Kumar" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Best wholesale grocery store in Bassi Pathana. Genuine mandi rates and fast delivery.",
        datePublished: "2024-11-01",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Simran Kaur" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Quality products at lowest prices. Free delivery is a great bonus!",
        datePublished: "2024-12-15",
      },
    ],
    sameAs: [
      // Add Google Business Profile, Facebook, Instagram URLs here when available
    ],
  };

  // 2. WebSite schema — enables Google Sitelinks Search Box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Bansal Trading Company",
    url: SITE_URL,
    description: "Wholesale grocery & karyana store — order premium groceries online at mandi rates with free delivery in Punjab",
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Bansal Trading Company",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?search={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  // 3. Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Bansal Trading Company",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    foundingDate: "2000", // Update with real year
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bassi Pathana",
      addressRegion: "Punjab",
      postalCode: "140412",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-97807-48073",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["Hindi", "Punjabi", "English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          opens: "08:00",
          closes: "21:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-97807-48073",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["Hindi", "Punjabi"],
      },
    ],
  };

  // 4. FAQPage schema — Google shows this as rich result in search
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does Bansal Trading Company offer free home delivery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Bansal Trading Company offers free home delivery on all orders above ₹500 in Bassi Pathana and nearby areas in Punjab.",
        },
      },
      {
        "@type": "Question",
        name: "What products does Bansal Trading Company sell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We sell wholesale grocery items including rice, atta, dal, pulses, spices, masalas, edible oils, sugar, salt, and household essentials at direct mandi rates.",
        },
      },
      {
        "@type": "Question",
        name: "What are the timings of Bansal Trading Company?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bansal Trading Company is open 7 days a week from 8:00 AM to 9:00 PM including Sundays and public holidays.",
        },
      },
      {
        "@type": "Question",
        name: "How can I order from Bansal Trading Company online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can order online at bansaltradingcompany.store or call/WhatsApp us at +91 97807 48073 to place your order.",
        },
      },
      {
        "@type": "Question",
        name: "Does Bansal Trading Company sell at mandi rates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Bansal Trading Company offers grocery products at direct mandi wholesale rates — no middleman markup, lowest prices guaranteed.",
        },
      },
    ],
  };

  // 5. BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Wholesale Grocery Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: "Exclusive Offers", item: `${SITE_URL}/offers` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <JsonLdSchema />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
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