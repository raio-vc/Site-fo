import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

export const metadata: Metadata = {
  title: "Raio — Governança Patrimonial",
  description:
    "Governança patrimonial para grandes fortunas. Raio junta os pedaços.",
  openGraph: {
    title: "Raio — Governança Patrimonial",
    description:
      "Governança patrimonial para grandes fortunas. Raio junta os pedaços.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
