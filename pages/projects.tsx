import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

import gridStyles from "../styles/Grid.module.css";
import Page from "../components/page";
import { ProjectFields } from "./project/[slug]";

import { makeClient } from "../content";

const client = makeClient();

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchProjects = async (client: Record<string, any>) => {
      try {
        const entries = await client.getEntries({ content_type: "project" });
        setProjects(entries.items);
      } catch (err) {
        setError(err);
      }
    };

    fetchProjects(client);
  }, [error]);

  return (
    <Page pageId='7mvHFS28HOJUgeYYZKHdWu'>

        <div className={gridStyles.grid}>
          {projects.map((project: ProjectFields) => {
            const { slug, title, shortDescription, mainImage } = project.fields;
            const htmlDesc = documentToReactComponents(shortDescription);

            return (
              <a
                key={title}
                className={gridStyles.card}
                href={`project/${slug}`}
              >
                <Image
                  width={200}
                  height={200}
                  src={`https:${mainImage.fields.file.url}`}
                  alt={`${title} logo`}
                  className={gridStyles.logo}
                />
                <div className="description">
                  <h3>{title}</h3>
                  {htmlDesc}
                </div>
              </a>
            );
          })}
        </div>
      </Page>
  );
}
