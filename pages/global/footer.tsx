import styles from "../../styles/Footer.module.css";

export default function GlobalFooter() {
  return (
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
  );
}
