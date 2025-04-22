export default function FAQ() {
  return (
    <div className="FAQ-PAGE">
      <div className="contact-page">
        <p>Help center</p>
        <h1>
          Frequently Asked <span>Questions</span>
        </h1>
      </div>
      <div className="faq-main-box">
        <div className="Right-faq-heading">
          <div>
            <div
              className={showBene ? "vertical-line active" : "vertical-line"}
            />
            <h3 className={showBene ? "active" : ""} onClick={handleBeneClick}>
              <span>About</span> Bene
            </h3>
          </div>
          <div>
            <div
              className={
                showProducts ? "vertical-line active" : "vertical-line"
              }
            />
            <h3
              className={showProducts ? "active" : ""}
              onClick={handleProductsClick}
            >
              <span>About</span> Products
            </h3>
          </div>
        </div>
        <div className="left-faq-heading">
          {showBene && <AboutBene />}
          {showProducts && <AboutProducts />}
        </div>
      </div>
      <div className="bottam-help-line">
        <h3 onClick={contactform}>
          Have a <span>Question?</span> Get an <span>Answer.</span>
        </h3>
        <div
          className={showfeedbackform ? "Feedbackfrom active" : "Feebackform"}
        />
        <div
          className={showfeedbackform ? "contactform active" : "contactform"}
        >
          <HelpCenterForm onClick={contactform} />
        </div>
      </div>
    </div>
  );
}
