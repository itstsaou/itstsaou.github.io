import * as React from "react";
import Layout from "../components/layout";

const AboutPage = () => {
  return (
    <Layout pageTitle="About Us">
      <p>We are an association that aims</p>

      <ul>
        <li>
          To provide support and foster a sense of togetherness among the Thai
          students at Ohio University and strengthen our sense of community
          among ourselves and other members of the larger Ohio University
          community.
        </li>
        <li>
          To serve as cultural ambassadors of Thailand and raise awareness of
          Thailand and Thai culture among the student body at Ohio University
          for the purpose of fostering cross-cultural understanding and
          fellowship.
        </li>
        <li>
          To further development leadership skills, collaboration and
          cross-cultural interaction.
        </li>
      </ul>

      <h2 className="my-2">History</h2>
      <p>
        We are working hard on creating our history! For our past work, our
        research team is still digging through the archive. It will take them a
        hot minute until the result is shining through.
      </p>

      <h2 className="my-2">Contact Us</h2>
      <p>
        Have a big bag of money you want to get rid of? Want to personally make
        a feature request to our developers? Wanting to complain about how hot
        Thailand is?
      </p>
      <p>
        You can reach out to us with your compliments 💖 at info /at/ tsaou
        [dot] page.
      </p>
    </Layout>
  );
};

export const Head = () => <title>About</title>;

export default AboutPage;
