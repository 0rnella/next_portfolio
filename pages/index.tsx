import Link from "next/link";

import GlobalHead from "../components/global/head";
import GlobalHeader from "../components/global/header";
import GlobalFooter from "../components/global/footer";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <GlobalHead pageTitle="Home" pageDescription="Home" />

      <GlobalHeader />

      <main className={styles.main}>
        <h1 className={styles.title}>{"Hi, I'm Ornella Friggit-Konaté."}</h1>
        <p>
          Learn <Link href="/about">about me</Link>,{" "}
          <Link href="/projects">my projects</Link>, or{" "}
          <Link href="/blog">read my blog</Link>.
        </p>
      </main>

      <GlobalFooter />
    </div>
  );
}
