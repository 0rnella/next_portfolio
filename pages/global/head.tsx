import Head from "next/head";

export default function GlobalHead(props: Record<string, any>) {
  return (
    <Head>
      <title>{props.pageTitle}</title>
      <meta
        name="description"
        content={`Ornella Friggit - ${props.pageDescription}`}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
