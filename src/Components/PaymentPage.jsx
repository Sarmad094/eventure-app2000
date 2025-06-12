import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/PaymentPage.css';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    } else {
      navigate('/login/1');
      return;
    }

    const eventData = sessionStorage.getItem('selectedEvent');
    if (eventData) {
      setSelectedEvent(JSON.parse(eventData));
    } else {
      navigate('/home/1');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const createBookingAndPayment = async () => {
    try {
      setLoading(true);
      setError('');

      const bookingData = {
        bookDate: new Date().toISOString().split('T')[0],
        paymentStatus: false,
        eventId: selectedEvent.eventId,
        studentId: currentUser.studentId,
      };

      const bookingResponse = await axios.post('http://localhost:8081/api/bookings', bookingData);
      const bookingId = bookingResponse.data;

      const paymentData = {
        amount: selectedEvent.price === 'Free' ? 0.0 :
          selectedEvent.price.toString().includes('NOK') ?
          parseFloat(selectedEvent.price.replace(' NOK', '')) :
          parseFloat(selectedEvent.price),
        paymentDate: new Date().toISOString().split('T')[0],
        cardName: formData.cardName,
        booking: { bookId: bookingId },
      };

      await axios.post('http://localhost:8081/api/payments', paymentData);

      const updateBookingData = {
        ...bookingData,
        paymentStatus: true,
      };

      await axios.put(`http://localhost:8081/api/bookings/${bookingId}`, updateBookingData);

      sessionStorage.removeItem('selectedEvent');

      navigate('/studentconfirm', { state: { bookingId } });

    } catch (error) {
      console.error('Error creating booking/payment:', error);
      setError(error.response?.data?.message || 'Failed to process booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) {
      setError('Please fill in all payment details');
      return;
    }

    if (formData.cardNumber.length !== 16) {
      setError('Card number must be 16 digits');
      return;
    }

    if (formData.cvv.length !== 3) {
      setError('CVV must be 3 digits');
      return;
    }

    createBookingAndPayment();
  };

  if (!selectedEvent || !currentUser) {
    return <div>Loading...</div>;
  }

  const eventPrice = selectedEvent.price === 'Free' ? 0 :
    selectedEvent.price.toString().includes('NOK') ?
    parseInt(selectedEvent.price.replace(' NOK', '')) :
    parseInt(selectedEvent.price);

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
        <h1>Payment</h1>

        <div className="event-summary">
          <h2>Event Details</h2>
          <p><strong>Event:</strong> {selectedEvent.title}</p>
          <p><strong>Date:</strong> {selectedEvent.startDate}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          <p><strong>Price:</strong> {selectedEvent.price === 'Free' ? 'Free' : `${eventPrice} NOK`}</p>
          <p><strong>Student:</strong> {currentUser.name}</p>
        </div>

        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Card Information</h2>
            <input
              type="text"
              name="cardName"
              placeholder="Cardholder name"
              value={formData.cardName}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card number (16 digits)"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength="16"
              required
              disabled={loading}
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry date (MM/YY)"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              maxLength="3"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="pay-button" disabled={loading}>
            {loading ? 'Processing...' : `Pay ${selectedEvent.price === 'Free' ? '(Free)' : selectedEvent.price}`}
          </button>
        </form>
      </main>
    </div>
  );
};

export default PaymentPage;

