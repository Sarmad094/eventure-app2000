import React from "react";
import "../Styles/FaqPage.css";

export default function FaqPage() {
  return (
    <div className="faq-container">
      <div className="faq-card">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <div className="faq-item">
          <h2 className="faq-question">What is this app for?</h2>
          <p className="faq-answer">This app is designed to help users connect with relevant services based on their role.</p>
        </div>
        <div className="faq-item">
          <h2 className="faq-question">How do I get started?</h2>
          <p className="faq-answer">Simply choose whether you're a company or a student on the welcome page to proceed.</p>
        </div>
        <div className="faq-item">
          <h2 className="faq-question">Is this service free?</h2>
          <p className="faq-answer">Yes, this service is completely free to use for both companies and students.</p>
        </div>
      </div>
    </div>
  );
}



