import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

import GlobalHead from "../global/head";
import GlobalHeader from "../global/header";
import GlobalFooter from "../global/footer";
import styles from "../../styles/Projects.module.css";

import { makeClient } from "../../content";

const client = makeClient();

export type ProjectFields = {
  fields: {
    title?: string;
    slug: string;
    shortDescription: Document;
    description: Document;
    githubUrl?: string;
    mainImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    demo?: string;
    technologies?: string[];
  };
};

export default function Project() {
  const router = useRouter();
  const { slug } = router.query;

  const [project, setProject] = useState({ fields: {} } as ProjectFields);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchProject = async (client: Record<string, any>) => {
      try {
        const entries = await client.getEntries({
          "fields.slug": slug,
          content_type: "project",
        });
        setProject(entries.items[0]);
      } catch (err) {
        setError(err);
      }
    };

    fetchProject(client);
  }, [slug, error]);

  const {
    title,
    description,
    shortDescription,
    githubUrl,
    mainImage,
    demo,
    technologies,
  } = project.fields;
  const htmlDesc = documentToReactComponents(description);
  const logo = mainImage && mainImage.fields.file.url;

  return (
    <>
      <GlobalHead
        pageTitle={`Project: ${title}`}
        pageDescription={shortDescription}
      />

      <GlobalHeader />

      <main className={styles.project}>
        <h1>{title}</h1>

        {logo && (
          <Image width={300} height={300} src={`https:${logo}`} alt={logo} />
        )}

        <h4>Technologies used:</h4>
        {technologies?.map((tech: string) => (
          <p className="technology" key={tech}>
            {tech}
          </p>
        ))}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer">
            Visit {title} Website
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            View {title} Code on Github
          </a>
        )}
        {htmlDesc}
      </main>

      <GlobalFooter />
    </>
  );
}
