import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import GlobalHead from "./global/head";
import GlobalHeader from "./global/header";
import GlobalFooter from "./global/footer";
import TrackingScript from "./global/trackingScript";
import { ReactNode } from "react";


export type PageFields = {
  fields: {
    body: Document;
    seoDescription: string;
    title: string;
  };
};

export default function Page(props: {
  page: PageFields;
  children?: ReactNode;
}) {
  const { body, title, seoDescription } = props.page.fields;
  const htmlBody = documentToReactComponents(body);

  return (
    <>
      <GlobalHead pageTitle={title} pageDescription={seoDescription} />

      <GlobalHeader />
      <main>
        <h1>{title}</h1>
        {htmlBody}
        {props.children}
      </main>
      <TrackingScript />
      <GlobalFooter />
    </>
  );
}
