import Image from "next/image";
import Link from "next/link";

import gridStyles from "../styles/Grid.module.css";
import Page, { PageFields } from "../components/page";
import RichTextToHtml from "../components/global/richTextToHtml";
import { ProjectFields } from "./project/[slug]";

import { makeClient } from "../content";

const client = makeClient();

export async function getStaticProps() {
  const page = await client.getEntry("7mvHFS28HOJUgeYYZKHdWu");
  const entries = await client.getEntries({ content_type: "project" });

  return {
    props: { page, projects: entries.items },
  };
}

export default function Projects(props: {
  page: PageFields;
  projects: ProjectFields[];
}) {
  const { page, projects } = props;

  return (
    <Page page={page}>
      <div className={gridStyles.grid}>
        {projects.map((project: ProjectFields) => {
          const { slug, title, shortDescription, mainImage } = project.fields;

          return (
            <Link key={title} href={`project/${slug}`}>
              <a className={gridStyles.card}>
                { mainImage &&
                  <Image
                    width={200}
                    height={200}
                    src={`https:${mainImage.fields.file.url}`}
                    alt={`${title} logo`}
                    className={gridStyles.logo}
                  />
                }
                <div className="description">
                  <h3>{title}</h3>
                  <RichTextToHtml body={shortDescription}/>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
