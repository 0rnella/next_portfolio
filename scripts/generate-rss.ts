import fs from "fs";
// import path from "path";
import RSS from "rss";
import { PostFields } from "../pages/post/[slug]";
import {client} from "./content";

function dateSortDesc(a: PostFields, b: PostFields) {
  const date1 = new Date(a.fields.publishDate);
  const date2 = new Date(b.fields.publishDate);
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
}

export async function generate() {
  const entries = await client.getEntries({ content_type: "blogPost" })
  // @ts-ignore
  const items : PostFields[] = entries.items;
  const rootUrl = process.env.URL || "https://localhost:3000";

  const feed = new RSS({
    title: "Ornella's personal site",
    site_url: rootUrl,
    feed_url: `${rootUrl}/feed.xml`,
  });

  items.sort(dateSortDesc).map(({fields}) => {
    feed.item({
      title: fields.title,
      guid: fields.slug,
      url: `${rootUrl}/blog/${fields.slug}`,
      date: fields.publishDate,
      description: fields.description,
      author: 'Ornella K. Friggit-Konaté',
    });
  });


  const xml = feed.xml();
  
  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", xml);    
}

// generate();