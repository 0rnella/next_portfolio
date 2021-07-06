import day from "dayjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import GlobalHead from "../global/head";
import GlobalHeader from "../global/header";
import GlobalFooter from "../global/footer";
import styles from "../../styles/Blog.module.css";

import { makeClient } from "../../content";

const client = makeClient();

export type PostFields = {
  fields: {
    title?: string;
    slug: string;
    description: string;
    body: Document;
    heroImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    publishDate: string;
  };
};

export default function Project() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState({ fields: {} } as PostFields);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchPost = async (client: Record<string, any>) => {
      try {
        const entries = await client.getEntries({
          "fields.slug": slug,
          content_type: "blogPost",
        });
        setPost(entries.items[0]);
      } catch (err) {
        setError(err);
      }
    };

    fetchPost(client);
  }, [slug, error]);

  const { title, body, heroImage, publishDate } = post.fields;
  const htmlBody = documentToReactComponents(body);
  const logo = heroImage && heroImage.fields.file.url;
  const date = day(publishDate).format("DD MMMM YYYY");

  return (
    <>
      <GlobalHead pageTitle={`Post: ${title}`} pageDescription="Project: " />

      <GlobalHeader />

      <main className={styles.post}>
        {heroImage && (
          <Image width={1000} height={500} src={`https:${logo}`} alt={logo} />
        )}
        <h1>{title}</h1>
        <time>{date}</time>

        {htmlBody}
      </main>

      <GlobalFooter />
    </>
  );
}
