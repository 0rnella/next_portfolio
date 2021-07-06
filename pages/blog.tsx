import { useState, useEffect } from "react";
import day from "dayjs";
import Image from "next/image";

import gridStyles from "../styles/Grid.module.css";
import { PostFields } from "./post/[slug]";
import Page, { PageFields } from "../components/page";

import { makeClient } from "../content";

const client = makeClient();

export async function getStaticProps() {
  const page = await client.getEntry("2ZKJNrbgiB2i31hjBCKQvs");
  const entries = await client.getEntries({ content_type: "blogPost" });

  return {
    props: { page, blogPosts: entries.items },
  };
}

export default function Blog(props: {
  page: PageFields;
  blogPosts: PostFields[];
}) {
  const { page, blogPosts } = props;

  return (
    <Page page={page}>
      <div className={gridStyles.grid}>
        {blogPosts.map((blogPost: PostFields) => {
          const { slug, title, description, heroImage, publishDate } =
            blogPost.fields;
          const date = day(publishDate).format("DD MMMM YYYY");

          return (
            <a key={title} className={gridStyles.card} href={`post/${slug}`}>
              <Image
                width={500}
                height={250}
                src={`https:${heroImage.fields.file.url}`}
                alt={title}
              />

              <h2>{title}</h2>
              <time>{date}</time>
              <p>{description}</p>
            </a>
          );
        })}
      </div>
    </Page>
  );
}
