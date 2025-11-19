import React, { useState, useRef, useEffect } from 'react';
import { LANGUAGES } from '../config/constants';
import '../styles/LanguageSelector.css';

const LanguageSelector = ({ language, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Only show these languages
  const languages = [
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'c', name: 'C', icon: '🔧' },
    { id: 'cpp', name: 'C++', icon: '⚡' },
    { id: 'html', name: 'HTML/CSS/JS', icon: '🌐' } // Combined web development
  ];

  const selectedLanguage = languages.find(lang => lang.id === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langId) => {
    onLanguageChange(langId);
    setIsOpen(false);
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button 
        className="selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="selected-language">
          <span className="language-icon">{selectedLanguage.icon}</span>
          <span className="language-name">{selectedLanguage.name}</span>
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <div className="dropdown-header">
            <span>Select Language</span>
          </div>
          <div className="language-list" role="listbox">
            {languages.map((lang) => (
              <button
                key={lang.id}
                className={`language-option ${language === lang.id ? 'selected' : ''}`}
                onClick={() => handleLanguageSelect(lang.id)}
                role="option"
                aria-selected={language === lang.id}
              >
                <span className="option-icon">{lang.icon}</span>
                <span className="option-name">{lang.name}</span>
                {language === lang.id && (
                  <span className="check-mark">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;