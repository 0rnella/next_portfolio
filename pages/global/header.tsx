import styles from "../../styles/Header.module.css";

export default function GlobalHeader() {
  return (
    <header className={styles.header}>
      <nav>
        {[
          { label: "Home", url: "/" },
          { label: "About", url: "/about" },
          { label: "Projects", url: "/projects" },
        ].map((link) => (
          <a href={link.url} key={link.label}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
