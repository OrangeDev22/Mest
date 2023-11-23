import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Providers from "./Providers";
import { ApolloWrapper } from "./ApolloWrapper";
const inter = Inter({ subsets: ["latin"] });
inter.className;
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background-primary text-white ">
        <ApolloWrapper>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </ApolloWrapper>
      </body>
    </html>
  );
}
