import { useState, useEffect } from "react";
import day from "dayjs";
import Image from "next/image";

import gridStyles from "../styles/Grid.module.css";
import { PostFields } from "./post/[slug]";
import Page from "../components/page";

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

      <Page pageId="2ZKJNrbgiB2i31hjBCKQvs">

          <div className={gridStyles.grid}>
            {blogPosts.map((blogPost: PostFields) => {
              const { slug, title, description, heroImage, publishDate } =
                blogPost.fields;
              const date = day(publishDate).format("DD MMMM YYYY");

              return (
                <a
                  key={title}
                  className={gridStyles.card}
                  href={`post/${slug}`}
                >
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
