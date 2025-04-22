import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function JoinOurTeam() {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainQuote}>
        "The only way to do great work is to love what you do."
      </h1>
      <h2 className={styles.quoteAuthor}>--Steve Jobs</h2>

      <div className={styles.contentSection}>
        <div className={styles.description}>
          <p>
            At Bene, we strive to create a dynamic and fulfilling work
            environment that empowers our employees to do their best work and
            achieve their professional goals.
          </p>
          <p>
            We believe that diversity is the key to success, and we welcome
            individuals from all backgrounds and walks of life to join us in our
            mission.
          </p>
          <div className={styles.inspirationalQuote}>
            <p>
              "The ultimate measure of a man is not where he stands in moments
              of comfort and convenience, but where he stands at times of
              challenge and controversy."
            </p>
            <p>--Martin Luther King Jr.</p>
          </div>
        </div>

        <div className={styles.joinSection}>
          <Link href="/join-our-team">
            <Image
              src="/images/join2.jpg"
              alt="Join Our Team"
              width={800}
              height={900}
              className={styles.joinImage}
            />
          </Link>
          <p className={styles.joinText}>
            Join us at Bene. Be a part of a dynamic team that is shaping the
            future of the carbon-based products industry. Email:
            jobs@Benellc.com
          </p>
        </div>
      </div>
    </div>
  );
}
