import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import Head from "next/head";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <main className={nunito.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
