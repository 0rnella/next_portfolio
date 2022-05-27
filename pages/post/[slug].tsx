import day from "dayjs";
import ornellember from 'ornellember';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";


import GlobalHead from "../../components/global/head";
import GlobalHeader from "../../components/global/header";
import GlobalFooter from "../../components/global/footer";
import RichTextToHtml from "../../components/global/richTextToHtml";

import { makeClient } from "../../content";
import Link from "next/link";

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

  const { title, body, heroImage, publishDate, description } = post.fields;
  const logo = heroImage && heroImage.fields.file.url;
  const date = day(publishDate).format("DD MMMM YYYY");
  const ornellemberDate = ornellember(new Date(publishDate)).format();

  return (
    <>
      <GlobalHead pageTitle={`Post: ${title || "Ornella's Blog"}`} pageDescription={description} />

      <GlobalHeader />

      <main>
        {heroImage && (
          <Image width={1000} height={500} src={`https:${logo}`} alt={logo} />
        )}
        <h1>{title}</h1>
        <time>{date} (gregorian) &nbsp;|&nbsp; {ornellemberDate} <Link href="/project/ornellember">(ornellember)</Link></time>

        <RichTextToHtml body={body} />
      </main>

      <GlobalFooter />
    </>
  );
}
