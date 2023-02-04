import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import Script from "next/script";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Script id="plausible">
        <script defer data-domain="span5h.vercel.app" src="https://plausible.io/js/script.js"></script>
      </Script>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
