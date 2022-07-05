import Page, { PageFields } from "../components/page";
import { client } from "../scripts/content";

export async function getStaticProps() {
  const page = await client.getEntry("2BBzohairthyEWmdSr1EIY");

  return {
    props: { page },
  };
}

export default function About(props: { page: PageFields }) {
  return <Page page={props.page} />;
}
