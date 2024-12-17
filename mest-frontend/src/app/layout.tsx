import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Providers from "./Providers";
import { ApolloWrapper } from "../lib/ApolloWrapper";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { getAccessToken } from "@auth0/nextjs-auth0/edge";
import { getSession } from "@auth0/nextjs-auth0";
import { getClient } from "@/lib/client";
import UserAuthProvider from "./providers/UserAuthProvider";
const inter = Inter({ subsets: ["latin"] });
inter.className;
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" className="h-full">
      <body className="bg-background-primary text-white min-h-full">
        <UserProvider>
          <ApolloWrapper
            accessToken={session?.accessToken || ""}
            accessTokenExpiresAt={session?.accessTokenExpiresAt}
          >
            <UserAuthProvider>
              <Providers>
                <Navbar />
                <div className="md:p-10">{children}</div>
              </Providers>
            </UserAuthProvider>
          </ApolloWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
