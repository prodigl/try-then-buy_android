import Head from "next/head";
import Script from 'next/script'
import manifest from "public/manifest.json";
import { config } from "../../config";

const PageHead = ({ title, description, path = "/" }) => {
  const pageTitle = title
    ? `${title} – ${config.appName}`
    : `${config.appName} – ${config.appTagline}`;

  const pageDescription = description || config.appDescription;

  const thumbnailUrl = undefined;
  // - @sheeresh use url like this for thumbnail - https://dishantagnihotri.com/?url=${config.appUrl}${path.slice(1)}${(path.includes('?') ? '&' : '?')}thumbnail=true`
  const iconUrl = "/images/brand-logo.svg";
  // - also upload favicon in public folder
  const fonts = [["Inter", "300,400,700"]];
  // - Define google fonts like above. For multiple add one more array.

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      <meta charSet="utf-8" />
      <meta
        httpEquiv="content-language"
        content={config.locale.split("_")[0]}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <link rel="manifest" href="/manifest.json" />

      {fonts.map((font) => (
        <link
          key={font[0]}
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css?family=${`${font[0].replace(
            / /g,
            "+"
          )}${font[1] ? ":" + font[1] : ""}`}&display=swap`}
        />
      ))}
      <link rel="stylesheet" href="/app.css" />

      <link rel="shortcut icon" type="image/x-icon" href={iconUrl} />

      <meta property="og:site_name" content={config.appName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:locale" content={config.locale} />

      {thumbnailUrl && (
        <>
          <meta property="og:image" content={thumbnailUrl} />
          <meta name="twitter:image" content={thumbnailUrl} />
        </>
      )}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />

      <meta name="theme-color" content={manifest.theme_color} />
      <link rel="apple-touch-icon" href={iconUrl} />
      {manifest.display === "standalone" ? (
        <meta name="apple-mobile-web-app-capable" content="yes" />
      ) : null}
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content={config.appName} />

      {/* <script src="https://static.saleassist.ai/widgets/widget.js"></script> */}
      {/* <script>EmbeddableWidget.mount({source_key : "ae34e2ff-c390-458a-85cc-d60c573b121a"});</script> */}
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
              ${EmbeddableWidget.mount({source_key : "ae34e2ff-c390-458a-85cc-d60c573b121a"})}
                  `,
        }}
      ></script> */}
      {/* <Script src="https://static.saleassist.ai/widgets/widget.js" />
      <Script>${EmbeddableWidget.mount({source_key : "ae34e2ff-c390-458a-85cc-d60c573b121a"})}</Script> */}

      {/*
        <link rel='apple-touch-startup-image' href='' />

        <link rel='canonical' href={websiteUrl} />
        <meta property='og:url' content={websiteUrl} />

        <meta name='twitter:site' content={`@${config.landingPage.social.twitter}`} />
      */}

      {config.googleSiteVerification ? (
        <meta
          name="google-site-verification"
          content={config.googleSiteVerification}
        />
      ) : null}
    </Head>
  );
};
export default PageHead;
