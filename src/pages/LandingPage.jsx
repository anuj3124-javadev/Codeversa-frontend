import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: '🚀',
      title: 'Fast Compilation',
      description: 'Execute code in milliseconds with our optimized Docker containers'
    },
    {
      icon: '🤖',
      title: 'AI Assistant',
      description: 'Get intelligent code explanations and bug fixes powered by AI'
    },
    {
      icon: '🌙',
      title: 'Dark/Light Theme',
      description: 'Code comfortably with beautiful themes that suit your preference'
    },
    {
      icon: '💾',
      title: 'Save & Download',
      description: 'Save your code snippets and download projects as zip files'
    },
    {
      icon: '🔒',
      title: 'Secure Execution',
      description: 'Run code safely in isolated Docker containers with resource limits'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Perfect coding experience on desktop, tablet, and mobile devices'
    }
  ];

  const languages = ['Python', 'Java', 'C', 'C++', 'JavaScript', 'HTML/CSS'];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-glow"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">✨ Next Generation Code Compiler</span>
            </div>
            <h1 className="hero-title">
              Code <span className="gradient-text">Smarter.</span><br />
              Run <span className="gradient-text">Faster.</span>
            </h1>
            <p className="hero-description">
              Experience the future of online coding with our powerful, AI-enhanced compiler. 
              Write, compile, and run code in multiple languages with real-time assistance 
              and beautiful themes.
            </p>
            <div className="hero-actions">
              <Link to="/compiler" className="btn btn-primary hero-btn">
                🚀 Start Coding Now
              </Link>
              <Link to="/features" className="btn btn-secondary hero-btn">
                📚 Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">6+</div>
                <div className="stat-label">Languages</div>
              </div>
              <div className="stat">
                <div className="stat-number">AI</div>
                <div className="stat-label">Powered</div>
              </div>
              <div className="stat">
                <div className="stat-number">⚡</div>
                <div className="stat-label">Fast</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="code-window">
              <div className="window-header">
                <div className="window-controls">
                  <div className="control red"></div>
                  <div className="control yellow"></div>
                  <div className="control green"></div>
                </div>
                <div className="window-title">demo.py</div>
              </div>
              <div className="window-content">
                <pre className="code-preview">
{`# Welcome to CodeVerse!
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print("Fibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-description">
              Everything you need for an exceptional coding experience
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="languages-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Supported Languages</h2>
            <p className="section-description">
              Write code in your favorite programming languages
            </p>
          </div>
          <div className="languages-grid">
            {languages.map((language, index) => (
              <div key={index} className="language-card">
                <div className="language-icon">
                  {language === 'Python' && '🐍'}
                  {language === 'Java' && '☕'}
                  {language === 'C' && '🔧'}
                  {language === 'C++' && '⚡'}
                  {language === 'JavaScript' && '📜'}
                  {language === 'HTML/CSS' && '🎨'}
                </div>
                <span className="language-name">{language}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Coding?</h2>
            <p className="cta-description">
              Join thousands of developers who trust CodeVerse Lite for their coding needs
            </p>
            <Link to="/compiler" className="btn btn-primary cta-btn">
              🚀 Launch Compiler
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;