import styles from "../../styles/Header.module.css";
import Link from "next/link";

export default function GlobalHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          {[
            { label: "Home", url: "/" },
            { label: "About", url: "/about" },
            { label: "Projects", url: "/projects" },
            { label: "Blog", url: "/blog" },
          ].map((link) => (
            <Link href={link.url} key={link.label}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/" passHref={true}>
          <a className={styles.logo}>O.F.K.</a>
        </Link>
      </div>
    </header>
  );
}
