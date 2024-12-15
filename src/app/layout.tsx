import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import PageContent from "@/components/PageContent";
import Footer from "@/components/Footer";
import { Ubuntu } from "next/font/google"
import { createClient } from "@/lib/utils/supabase/supabase-ssr";
import { getProfile } from "@/lib/helpers/getProfile";
import { Suspense } from "react";

const globalfont = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Omah Diksi App ",
  description: "Platform penukaran voucher Omah Diksi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // is user logged in
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const profile = user ? await getProfile(user) : null;
  const isLoggedIn = user ? true : false;


  return (
    <html lang="en">
      <body
        className={`${globalfont.className} antialiased`}
      >
        <div className="flex flex-col min-h-dvh">
          <Header
            isLoggedIn={isLoggedIn}
            profile={profile}
          />

          {/* Main Content */}
          <PageContent>
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </PageContent>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
