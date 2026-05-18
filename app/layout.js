import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import OrderStatusTracker from "./components/OrderStatusTracker";
import { UIProvider } from "./context/UIContext";
import CategoryDrawer from "./components/CategoryDrawer";

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
  description: "Bulk ordering panel for Bansal Trading Wholesale customers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning={true}>
        <CartProvider>
          <UIProvider>
            <Toaster position="top-right" />
            <OrderStatusTracker />
            <CategoryDrawer />
            {children}
          </UIProvider>
        </CartProvider>
      </body>
    </html>
  );
}
