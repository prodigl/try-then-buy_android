import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { config } from "../config";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang={config.locale.split("_")[0]}>
        <Head>
          {config.googleAnalyticsId ? (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}; gtag('js', new Date()); gtag('config', '${config.googleAnalyticsId}');`,
                }}
              />
            </>
          ) : null}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossorigin="anonymous"
          />
          
          {/* <link rel="stylesheet" href="owl-carousel/owl.theme.css"></link> */}
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
          
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
