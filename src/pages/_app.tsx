import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 🌐 Basic Meta */}
        <title>Red and White | AI Job Search | AI Interview</title>
        <meta
          name="description"
          content="Red and White empowers students and educators through innovative learning experiences."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 🧩 Favicon & Icons */}
        <link rel="icon" href="/favicon.webp" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* 🎨 Theme color for mobile browser UI */}
        <meta name="theme-color" content="#8f0500" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
