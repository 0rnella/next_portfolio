import GlobalHead from "./global/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <GlobalHead pageTitle="Home" pageDescription="Home" />

      <main className={styles.main}>
        <h1 className={styles.title}>{"Hi, I'm Ornella Friggit-Konaté."}</h1>
      </main>

      <footer className={styles.footer}>
        {[
          { label: "GitHub", url: "https://github.com/0rnella" },
          { label: "LinkedIn", url: "https://www.linkedin.com/mynetwork/" },
          { label: "Polywork", url: "https://www.polywork.com/ornella" },
        ].map((link) => (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            key={link.label}
          >
            {link.label}
          </a>
        ))}
      </footer>
    </div>
  );
}
