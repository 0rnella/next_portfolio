import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

import GlobalHead from "../../components/global/head";
import GlobalHeader from "../../components/global/header";
import GlobalFooter from "../../components/global/footer";
import RichTextToHtml from "../../components/global/richTextToHtml";

import { makeClient } from "../../scripts/content";

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
  const logo = mainImage && mainImage.fields.file.url;

  return (
    <>
      <GlobalHead
        pageTitle={`Project: ${title}`}
        pageDescription={shortDescription}
      />

      <GlobalHeader />

      <main>
        <h1>{title}</h1>

        {logo && (
          <div
            style={{
              position: "relative",
              maxHeight: "300px",
              maxWidth: "300px",
            }}
          >
            <Image
              width={300}
              height={300}
              layout="responsive"
              src={`https:${logo}`}
              alt={logo}
            />
          </div>
        )}

        {technologies && (
          <>
            <h4>Technologies used:</h4>
            <ul>
              {technologies.map((tech: string) => (
                <li className="technology" key={tech}>
                  {tech}
                </li>
              ))}
            </ul>
          </>
        )}
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
        <RichTextToHtml body={description} />
      </main>

      <GlobalFooter />
    </>
  );
}
