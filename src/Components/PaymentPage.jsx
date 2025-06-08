import React, { useState } from 'react';
import '../Styles/PaymentPage.css';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Betaling sendt! (simulert)');
  };

  return (
    <div className="payment-page">
      <header className="header">
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="/home/1">Home</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="payment-content">
        <h1>Betaling</h1>

        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Kortinformasjon</h2>
            <input
              type="text"
              name="cardNumber"
              placeholder="Kortnummer (16 siffer)"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength="16"
              required
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Utløpsdato (MM/YY)"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              maxLength="3"
              required
            />
          </div>

          <button type="submit" className="pay-button">Betal nå</button>
        </form>
      </main>
    </div>
  );
};

export default PaymentPage;
