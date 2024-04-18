import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Theme from "~/components/ThemeProvider";
import SubHeader from "~/components/SubHeader";
import Header from "~/components/Header";
import PromoCarousal from "~/components/PromoCarousal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans flex flex-col min-h-screen bg-background antialiased ${inter.variable}`}>
      <Theme>
        {" "}
        {/* <SubHeader /> */}
        <Header />
        {/* <PromoCarousal /> */}
        <Component {...pageProps} />
      </Theme>
    </main>
  );
};

export default api.withTRPC(MyApp);
