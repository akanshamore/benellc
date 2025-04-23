"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

import styles from "./page.module.css";
export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.followUs}>
          <h2 className={styles.heading}>Follow us on</h2>
          <hr className={styles.divider} />
          <ul className={styles.socialList}>
            <li>
              <a
                href="https://www.linkedin.com/company/benellc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  className={styles.linkedin}
                  icon={faLinkedin}
                />
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.productInfo}>
          <h2 className={styles.heading}>Products</h2>
          <hr className={styles.divider} />
          <ul className={styles.productList}>
            {[
              "Ferrous",
              "Stainless Steel",
              "Copper",
              "Aluminum",
              "Lead",
              "Gold nuggets",
              "Corn Feed",
              "Coffee",
              "Cocoa",
              "Copra",
            ].map((product, index) => (
              <li key={index} className={styles.customFooterLink}>
                {product}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.learn}>
          <h2 className={styles.heading}>Learn</h2>
          <hr className={styles.divider} />
          <ul className={styles.learnList}>
            <li>
              <Link className={styles.customFooterLink} href="/about-us">
                About Us
              </Link>
            </li>
            <li>
              <Link className={styles.customFooterLink} href="/faqs">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.contactInfo}>
          <h2 className={styles.heading}>Connect</h2>
          <hr className={styles.divider} />
          <ul className={styles.emailList}>
            <li>
              <a
                href="mailto:Sales@Benellc.com"
                className={styles.customFooterLink}
              >
                Sales@Benellc.com
              </a>
            </li>
            <li>
              <a
                href="mailto:Technicalservices@Benellc.com"
                className={styles.customFooterLink}
              >
                Technicalservices@Benellc.com
              </a>
            </li>
            <li>
              <a
                href="mailto:Generalinfo@Benellc.com"
                className={styles.customFooterLink}
              >
                Generalinfo@Benellc.com
              </a>
            </li>
            <li>
              <Link href="/contact" className={styles.customFooterLink}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.careers}>
          <h2 className={styles.heading}>Careers</h2>
          <hr className={styles.divider} />
          <ul className={styles.careerList}>
            <li>
              <Link href="/join-our-team" className={styles.customFooterLink}>
                Join Our Team
              </Link>
            </li>
          </ul>
        </div>
      </footer>

      <div className={styles.footerBottomHeading}>
        <h1>Bene</h1>
      </div>
    </div>
  );
}
