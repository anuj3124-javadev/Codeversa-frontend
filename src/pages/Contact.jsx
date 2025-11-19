import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { contactAPI } from '../config/api';
import '../styles/Contact.css';

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await contactAPI.submit(formData.name, formData.email, formData.message);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: '💬',
      title: 'Community Support',
      description: 'Join our community for help and discussions',
      action: 'Join Discord'
    },
    {
      icon: '📚',
      title: 'Documentation',
      description: 'Check out our comprehensive documentation',
      action: 'Read Docs'
    },
    {
      icon: '🐛',
      title: 'Report Issues',
      description: 'Found a bug? Let us know on GitHub',
      action: 'Open Issue'
    },
    {
      icon: '💡',
      title: 'Feature Requests',
      description: 'Suggest new features and improvements',
      action: 'Suggest Feature'
    }
  ];

  if (submitted) {
    return (
      <div className="contact-page">
        <div className="container">
          <div className="success-state">
            <div className="success-icon">✅</div>
            <h1 className="success-title">Message Sent Successfully!</h1>
            <p className="success-description">
              Thank you for reaching out. We'll get back to you as soon as possible.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => setSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have questions, feedback, or need support? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-layout">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-card">
              <h2 className="form-title">Send us a Message</h2>
              
              {error && (
                <div className="form-error">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Enter your email"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-textarea"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    disabled={loading}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="contact-methods">
            <h3 className="methods-title">Other Ways to Reach Us</h3>
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <div key={index} className="method-card">
                  <div className="method-icon">{method.icon}</div>
                  <h4 className="method-title">{method.title}</h4>
                  <p className="method-description">{method.description}</p>
                  <button className="method-action">
                    {method.action}
                  </button>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h3 className="faq-title">Frequently Asked Questions</h3>
              <div className="faq-list">
                <div className="faq-item">
                  <h4 className="faq-question">Is CodeVerse Lite free to use?</h4>
                  <p className="faq-answer">
                    Yes! CodeVerse Lite is completely free for all users. We believe in making coding education accessible to everyone.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">Which programming languages are supported?</h4>
                  <p className="faq-answer">
                    We currently support Python, Java, C, C++, JavaScript, and HTML/CSS with more languages coming soon.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">How does the AI assistant work?</h4>
                  <p className="faq-answer">
                    Our AI assistant uses advanced language models to provide code explanations, debugging help, and optimization suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;