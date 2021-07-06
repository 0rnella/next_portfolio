import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import GlobalHead from "../components/global/head";
import GlobalHeader from "../components/global/header";
import GlobalFooter from "../components/global/footer";
import { makeClient } from "../content";
import { ReactNode } from "react";

const client = makeClient();

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
      <GlobalFooter />
    </>
  );
}
