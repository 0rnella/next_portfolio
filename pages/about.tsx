import Page, { PageFields } from "../components/page";
import { makeClient } from "../content";

const client = makeClient();

export async function getStaticProps() {
  const page = await client.getEntry("2BBzohairthyEWmdSr1EIY");

  return {
    props: { page },
  };
}

export default function About(props: { page: PageFields }) {
  return <Page page={props.page} />;
}
