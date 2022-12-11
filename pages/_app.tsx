import Head from "next/head";
import { AppProps } from "next/app";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

import { NotificationsProvider } from "@mantine/notifications";
import Appshell from "../components/common/Appshell";
import '../components/common/style.css'
import { useState } from "react";
import { ColorScheme, ColorSchemeProvider, Loader, MantineProvider } from "@mantine/core";
import { getCookie, setCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import RouteGuard from "../components/common/RouteGuard";







export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  }


  return (

    <>
      <Head>
        <title>Olympus App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>


      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{
          colorScheme,
          colors: {
            gold: ["#ffd43b", "#fab005", "#f08c00"],
            goldBlue: ["#a5d8ff", "#15aabf", "#0b7285"],
          },
          primaryColor: colorScheme === "dark" ? "gold" : "teal",
          primaryShade: { dark: 2 }
        }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <RouteGuard>
              <Appshell>
                <Component {...pageProps} />
              </Appshell>
            </RouteGuard>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>

    </>

  );
}



App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});




