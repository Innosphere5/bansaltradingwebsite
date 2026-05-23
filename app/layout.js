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

export const metadata = {
  title: "Bansal Trading - Quality You Trust",
  description: "Bulk ordering panel for Bansal Trading Wholesale customers. Shop premium groceries at Mandi rates.",
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  applicationName: 'Bansal Trading',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
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
