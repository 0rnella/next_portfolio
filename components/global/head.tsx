import Head from "next/head";

export default function GlobalHead(props: Record<string, any>) {
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
    </Head>
  );
}
