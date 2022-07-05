import Head from "next/head";
import { useEffect } from "react";


export default function GlobalHead(props: Record<string, any>) {
  let rootUrl = '';
  useEffect(() => {
    rootUrl = window.location.origin;
  }, []);

  return (
    <Head>
      <title>{props.pageTitle}</title>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');`}
      </style>
      <meta
        name="description"
        content={`Ornella Friggit - ${props.pageDescription}`}
      />
      <link rel="icon" href="/favicon.ico" />
      <link
              rel="alternate"
              type="application/rss+xml"
              title="RSS for blog posts"
              href={`${rootUrl}/feed.xml`}
            />
    </Head>
  );
}
