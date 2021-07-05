import styles from "../styles/About.module.css";
import GlobalHead from "./global/head";
import GlobalHeader from "./global/header";
import GlobalFooter from "./global/footer";

export default function About() {
  return (
    <div className={styles.container}>
        <GlobalHead
            pageTitle="About"
            pageDescription="About: my jobs, hobbies, résumé."
        />

        <GlobalHeader/>

        <h1>About me</h1>
        <h2>Where (do I live/am I from)?</h2>
        <p>
            I currently live in Amsterdam. I am Burkinabè, French, and American, and
            I have lived in a few different places, including New York and Madrid.
        </p>
        <h2>What (do I do)?</h2>
        <p>
            I currently work as a full-stack software engineer at Disney Streaming,
            on the Disney+/Star+ Web team. I consistently dedicate time to helping
            others in the context of tech, through volunteering, mentoring and open
            coffee chats. I also draw and do DIY around the house.
        </p>
        <h2>How (should you refer to me)?</h2>
        <p>
            I, for the most part, identify as a woman. For pronouns, you can use she
            or they.
        </p>
        <h2>Who (let the dogs out)?</h2>
        <p>
            I have a dog named Pixel, who goes by Pixie, and usually alternates
            between being scared and silly.
        </p>

        <GlobalFooter />
    </div>
  );
}
