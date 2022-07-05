import day from "dayjs";
import Image from "next/image";
import Link from "next/link";

import gridStyles from "../styles/Grid.module.css";
import { PostFields } from "./post/[slug]";
import Page, { PageFields } from "../components/page";

import { client } from "../scripts/content";
import { generate } from "../scripts/generate-rss";

export async function getStaticProps() {
  const page = await client.getEntry("2ZKJNrbgiB2i31hjBCKQvs");
  const entries = await client.getEntries({ content_type: "blogPost" });

  await generate();

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
            <Link key={title} href={`post/${slug}`}>
              <a className={gridStyles.card}>
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
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
