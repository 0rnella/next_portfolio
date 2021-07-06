import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

import styles from "../styles/Projects.module.css";
import gridStyles from "../styles/Grid.module.css";
import GlobalHead from "./global/head";
import GlobalHeader from "./global/header";
import GlobalFooter from "./global/footer";

import { makeClient } from "../content";

const client = makeClient();

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchProjects = async (client) => {
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
    <div className={styles.container}>
      <GlobalHead
        pageTitle="Things I Built"
        pageDescription="Projects: Code, Painting, Hobbies."
      />

      <GlobalHeader />

      <h1>Things I Built</h1>
      <p>
        This has typically been a page where I post code projects, but I will
        make this iteration of the page more holistic.
      </p>

      <div className={gridStyles.grid}>
        {projects.map((project) => {
          const { slug, title, shortDescription, mainImage } = project.fields;
          const htmlDesc = documentToReactComponents(shortDescription);

          return (
            <div key={title} className={gridStyles.card}>
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
            </div>
          );
        })}
      </div>

      <GlobalFooter />
    </div>
  );
}
