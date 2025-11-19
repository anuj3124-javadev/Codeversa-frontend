import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { snippetsAPI } from '../config/api';
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const response = await snippetsAPI.getAll();
      setSnippets(response.data);
    } catch (error) {
      console.error('Failed to fetch snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSnippet = async (snippetId, snippetTitle) => {
    try {
      const response = await snippetsAPI.download(snippetId);
      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${snippetTitle}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download snippet');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLanguageIcon = (language) => {
    const icons = {
      python: '🐍',
      java: '☕',
      c: '🔧',
      cpp: '⚡',
      javascript: '📜',
      html: '🎨'
    };
    return icons[language] || '📝';
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1 className="profile-title">Your Profile</h1>
          <p className="profile-subtitle">Manage your account and code snippets</p>
        </div>

        <div className="profile-layout">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="sidebar-section">
              <div className="user-info">
                <div className="user-avatar-large">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <h3 className="user-name">{user?.name}</h3>
                  <p className="user-email">{user?.email}</p>
                </div>
              </div>
            </div>

            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <span className="nav-icon">👤</span>
                Profile Settings
              </button>
              <button 
                className={`nav-item ${activeTab === 'snippets' ? 'active' : ''}`}
                onClick={() => setActiveTab('snippets')}
              >
                <span className="nav-icon">💾</span>
                My Snippets
                <span className="nav-badge">{snippets.length}</span>
              </button>
              <button 
                className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                <span className="nav-icon">🎨</span>
                Preferences
              </button>
            </nav>

            <div className="sidebar-actions">
              <button onClick={logout} className="btn btn-danger logout-btn">
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="profile-content">
            {activeTab === 'profile' && (
              <div className="content-section">
                <h2 className="section-title">Profile Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label className="info-label">Full Name</label>
                    <div className="info-value">{user?.name}</div>
                  </div>
                  <div className="info-item">
                    <label className="info-label">Email Address</label>
                    <div className="info-value">{user?.email}</div>
                  </div>
                  <div className="info-item">
                    <label className="info-label">Member Since</label>
                    <div className="info-value">
                      {user?.created_at ? formatDate(user.created_at) : 'N/A'}
                    </div>
                  </div>
                  <div className="info-item">
                    <label className="info-label">User ID</label>
                    <div className="info-value code">{user?.id}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'snippets' && (
              <div className="content-section">
                <div className="section-header">
                  <h2 className="section-title">My Code Snippets</h2>
                  <p className="section-description">
                    All your saved code snippets in one place
                  </p>
                </div>

                {loading ? (
                  <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <span>Loading snippets...</span>
                  </div>
                ) : snippets.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">💾</div>
                    <h3>No Snippets Yet</h3>
                    <p>You haven't saved any code snippets yet.</p>
                    <p>Start coding and save your work to see it here!</p>
                  </div>
                ) : (
                  <div className="snippets-grid">
                    {snippets.map((snippet) => (
                      <div key={snippet.id} className="snippet-card">
                        <div className="snippet-header">
                          <div className="snippet-language">
                            <span className="language-icon">
                              {getLanguageIcon(snippet.language)}
                            </span>
                            <span className="language-name">
                              {snippet.language.toUpperCase()}
                            </span>
                          </div>
                          <div className="snippet-actions">
                            <button
                              className="action-btn"
                              onClick={() => handleDownloadSnippet(snippet.id, snippet.title)}
                              title="Download Snippet"
                            >
                              📥
                            </button>
                          </div>
                        </div>
                        <h3 className="snippet-title">{snippet.title}</h3>
                        <p className="snippet-preview">
                          {snippet.content.substring(0, 150)}
                          {snippet.content.length > 150 && '...'}
                        </p>
                        <div className="snippet-footer">
                          <span className="snippet-date">
                            {formatDate(snippet.created_at)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="content-section">
                <h2 className="section-title">Preferences</h2>
                <div className="preferences-grid">
                  <div className="preference-item">
                    <div className="preference-info">
                      <h4 className="preference-title">Theme</h4>
                      <p className="preference-description">
                        Choose between light and dark theme for the editor
                      </p>
                    </div>
                    <div className="preference-control">
                      <button
                        className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
                        onClick={toggleTheme}
                      >
                        <span className="toggle-track">
                          <span className="toggle-thumb">
                            {theme === 'dark' ? '🌙' : '☀️'}
                          </span>
                        </span>
                        <span className="toggle-label">
                          {theme === 'dark' ? 'Dark' : 'Light'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;