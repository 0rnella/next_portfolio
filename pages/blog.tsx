import { useState, useEffect } from "react";
import day from "dayjs";
import Image from "next/image";

import styles from "../styles/Projects.module.css";
import gridStyles from "../styles/Grid.module.css";
import GlobalHead from "./global/head";
import GlobalHeader from "./global/header";
import GlobalFooter from "./global/footer";
import { PostFields } from "./post/[slug]";

import { makeClient } from "../content";

const client = makeClient();

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchBlogPosts = async (client: Record<string, any>) => {
      try {
        const entries = await client.getEntries({ content_type: "blogPost" });
        setBlogPosts(entries.items);
      } catch (err) {
        setError(err);
      }
    };

    fetchBlogPosts(client);
  }, [error]);

  return (
    <>
      <GlobalHead
        pageTitle="Blog"
        pageDescription="Blog posts overview: A tech blog with personal news."
      />

      <GlobalHeader />

      <main className={styles.container}>
        <h1>Blog</h1>
        <p>All my writings in one place.</p>

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
      </main>

      <GlobalFooter />
    </>
  );
}
