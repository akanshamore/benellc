"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("about");
  const [expandedItem, setExpandedItem] = useState(null);

  const faqData = {
    about: [
      {
        question: "What is Bene LLC?",
        answer:
          "Bene is a global trading company specializing in sourcing and trading commodities, with a focus on supply chain management and logistics solutions.",
      },
      {
        question: "What services does Bene offer?",
        answer: [
          "Trade & Procurement",
          "Supply Chain Management",
          "Aggregator Services",
          "Selling Agent Services",
        ],
      },
      {
        question: "What commodities does Bene trade?",
        answer:
          "Commodities Traded: Metals: Ferrous, Stainless Steel, Copper, Aluminum, Gold Nuggets, and Lead. Agricultural Products: Soyabean, Cashew, Coffee, Cocoa, and Copra.",
      },
      {
        question: "How does Bene handle trade and procurement?",
        answer:
          "We have strategic tie-ups with various producers to procure quality products directly from the source and deliver them efficiently to the consumption point, managing the entire supply chain.",
      },
      {
        question:
          "What is included in Bene's supply chain management services?",
        answer: [
          "Procurement",
          "Distribution",
          "Inventory Management",
          "Streamlined Operations to ensure timely delivery and efficiency",
        ],
      },
    ],
    products: [
      {
        question: "What quality standards do your products meet?",
        answer:
          "All our products meet international quality standards and undergo rigorous quality control processes.",
      },
      {
        question: "Do you offer product customization?",
        answer:
          "Yes, we work closely with clients to meet specific requirements and specifications.",
      },
    ],
  };

  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about Bene LLC and our products</p>
      </section>

      <section className={styles.faqContainer}>
        <div className={styles.faqNav}>
          <button
            className={activeTab === "about" ? styles.activeTab : ""}
            onClick={() => setActiveTab("about")}
          >
            About Bene
          </button>
          <button
            className={activeTab === "products" ? styles.activeTab : ""}
            onClick={() => setActiveTab("products")}
          >
            Our Products
          </button>
        </div>

        <div className={styles.faqContent}>
          {faqData[activeTab].map((item, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${
                expandedItem === index ? styles.expanded : ""
              }`}
              onClick={() => toggleItem(index)}
            >
              <h3>{item.question}</h3>
              <div className={styles.answer}>
                {Array.isArray(item.answer) ? (
                  <ul>
                    {item.answer.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.answer}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contactSection}>
        <h2>Still have questions?</h2>
        <p>Contact our team for personalized assistance</p>
        <button className={styles.contactButton}>Contact Us</button>
      </section>
    </main>
  );
}
