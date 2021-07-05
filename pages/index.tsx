import GlobalHead from "./global/head";
import GlobalHeader from "./global/header";
import GlobalFooter from "./global/footer";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <GlobalHead pageTitle="Home" pageDescription="Home" />

      <GlobalHeader/>

      <main className={styles.main}>
        <h1 className={styles.title}>{"Hi, I'm Ornella Friggit-Konaté."}</h1>
      </main>

      <GlobalFooter />
    </div>
  );
}
