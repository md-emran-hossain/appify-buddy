import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import BootstrapClient from "@/components/BootstrapClient";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/shared/Toast";
import "./globals.scss";

const poppins = Poppins({
  weight: ["100", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Buddy Script",
  description: "Buddy Script Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={poppins.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="data-bs-theme"
          defaultTheme="system"
          enableSystem
        >
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
          <BootstrapClient />
        </ThemeProvider>
      </body>
    </html>
  );
}
