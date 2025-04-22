import styles from "./page.module.css";

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Pioneering Sustainable Solutions in Global Commodities
      </h1>
      <div>
        <h2 className={styles.subHeading}>
          Precision. Performance. Delivery Excellence.
        </h2>
        <div>
          <p className={styles.paragraph}>
            "Our aim is to become the preferred supplier of high-quality
            commodities, offering tailored solutions and comprehensive
            logistical support to meet our customers' diverse needs"
          </p>
          <div style={{ textAlign: "center" }}>
            <button className={styles.button}>Discover More</button>
          </div>

          <div className={styles.cards}>
            {[
              {
                title: "Worldwide Collaborations",
                description:
                  "Bene collaborates with global players to discover new business opportunities and innovative applications for our high-quality Commodities products.",
              },
              {
                title: "Advanced Technology",
                description:
                  "Bene is well-equipped with the Latest Machinery and other plant and machinery such as Conveyor, Cranes, balers, compressors required for bulk handling and packaging.",
              },
              {
                title: "State-of-the-art Machinery",
                description:
                  "Bene is well-equipped with the Latest Machinery and other plant and machinery such as Conveyor, Cranes, balers, compressors required for bulk handling and packaging.",
              },
              {
                title: "Optimized Transportation",
                description:
                  "We ensure efficient and reliable delivery through our optimized transportation network and logistics solutions.",
              },
              {
                title: "Real-time Analytics",
                description:
                  "Our operations improve system efficiency by integrating real-time data analytics for proactive logistics management.",
              },
              {
                title: "Smart Management",
                description:
                  "We Integrate Transportation Management Systems (TMS) software for streamlined freight booking, shipment tracking, and carrier management.",
              },
            ].map((card, index) => (
              <div key={index} className={styles.card}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
