import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * Uses next/script with `afterInteractive` rather than a raw <script> tag: the
 * tag then loads after hydration instead of competing with it, which keeps a
 * third-party script off the critical path of a page whose entire job is the
 * hero and the registration form.
 *
 * NOT loaded in development. Without this guard every local page reload and
 * every form test lands in the same property as real traffic, and the first
 * thing you would do with this site's numbers — judge whether the ad spend is
 * working — is exactly what that pollution ruins.
 *
 * The measurement ID is public by design (it ships in the page either way), so
 * it lives in the code rather than a secret. NEXT_PUBLIC_GA_ID overrides it if
 * a second property is ever needed for staging.
 *
 * Client-side navigations: GA4's enhanced measurement includes "page changes
 * based on browser history events", which is on by default and covers Next's
 * client-side route changes. Nothing extra is needed here — and adding a
 * manual page_view listener on top would double-count every navigation.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-KW3PGN36N7";

export function Analytics() {
  if (process.env.NODE_ENV !== "production" || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
