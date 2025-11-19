import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Features.css';

const Features = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast Compilation',
      description: 'Execute code in milliseconds with our optimized Docker containers. No more waiting for builds to complete.',
      details: ['Multi-threaded execution', 'Cached environments', 'Optimized containers']
    },
    {
      icon: '🤖',
      title: 'AI-Powered Assistance',
      description: 'Get intelligent code explanations, bug fixes, and optimization suggestions powered by advanced AI.',
      details: ['Code explanation', 'Error debugging', 'Performance optimization']
    },
    {
      icon: '🎨',
      title: 'Beautiful Themes',
      description: 'Code comfortably with carefully crafted dark and light themes that reduce eye strain.',
      details: ['Dark theme', 'Light theme', 'Auto-sync across devices']
    },
    {
      icon: '🔒',
      title: 'Secure Execution',
      description: 'Run code safely in isolated Docker containers with strict resource limits and network restrictions.',
      details: ['Sandboxed environment', 'Resource limits', 'Network isolation']
    },
    {
      icon: '💾',
      title: 'Save & Download',
      description: 'Save your code snippets to your profile and download projects as zip files for offline use.',
      details: ['Cloud storage', 'Project download', 'Version history']
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Perfect coding experience on desktop, tablet, and mobile devices with adaptive layouts.',
      details: ['Mobile optimized', 'Tablet friendly', 'Touch gestures']
    }
  ];

  const stats = [
    { number: '6+', label: 'Programming Languages' },
    { number: '⚡', label: 'Millisecond Execution' },
    { number: '🔒', label: 'Secure Sandbox' },
    { number: '🎯', label: 'AI Powered' }
  ];

  return (
    <div className="features-page">
      {/* Hero Section */}
      <section className="features-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Powerful Features for <span className="gradient-text">Modern Developers</span>
            </h1>
            <p className="hero-description">
              Everything you need to write, compile, and run code efficiently. 
              Built with performance, security, and developer experience in mind.
            </p>
            <div className="hero-actions">
              <Link to="/compiler" className="btn btn-primary">
                🚀 Start Coding Now
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                💬 Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-grid-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-description">
              Comprehensive tools and features to enhance your coding experience
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <ul className="feature-details">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="detail-item">
                      <span className="detail-marker">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="features-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience the Future of Coding?</h2>
            <p className="cta-description">
              Join thousands of developers who are already building amazing projects with CodeVerse Lite.
            </p>
            <div className="cta-actions">
              <Link to="/compiler" className="btn btn-primary">
                🚀 Launch Compiler
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                📝 Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;