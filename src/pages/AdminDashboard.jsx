import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../config/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [executions, setExecutions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      switch (activeTab) {
        case 'dashboard':
          const dashboardResponse = await adminAPI.getDashboard();
          setStats(dashboardResponse.data);
          break;
        case 'users':
          const usersResponse = await adminAPI.getUsers();
          setUsers(usersResponse.data.users);
          break;
        case 'snippets':
          const snippetsResponse = await adminAPI.getSnippets();
          setSnippets(snippetsResponse.data.snippets);
          break;
        case 'executions':
          const executionsResponse = await adminAPI.getExecutions();
          setExecutions(executionsResponse.data.runs);
          break;
        case 'contacts':
          const contactsResponse = await adminAPI.getContacts();
          setContacts(contactsResponse.data.contacts);
          break;
      }
    } catch (err) {
      setError('Failed to fetch data: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await adminAPI.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully');
    } catch (err) {
      alert('Failed to delete user: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteSnippet = async (snippetId) => {
    if (!window.confirm('Are you sure you want to delete this snippet?')) return;
    
    try {
      await adminAPI.deleteSnippet(snippetId);
      setSnippets(snippets.filter(snippet => snippet.id !== snippetId));
      alert('Snippet deleted successfully');
    } catch (err) {
      alert('Failed to delete snippet: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading && !stats) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <span>Loading Admin Panel...</span>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>⚙️ Admin Dashboard</h1>
          <p>Manage your CodeVerse application</p>
        </div>
        <div className="admin-header-right">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="admin-nav">
        <button 
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button 
          className={`nav-btn ${activeTab === 'snippets' ? 'active' : ''}`}
          onClick={() => setActiveTab('snippets')}
        >
          💾 Snippets
        </button>
        <button 
          className={`nav-btn ${activeTab === 'executions' ? 'active' : ''}`}
          onClick={() => setActiveTab('executions')}
        >
          ⚡ Executions
        </button>
        <button 
          className={`nav-btn ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          📧 Contacts
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">
        {error && (
          <div className="admin-error">
            ⚠️ {error}
          </div>
        )}

        {activeTab === 'dashboard' && stats && (
          <div className="dashboard-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>{stats.stats.totalUsers}</h3>
                <p>Total Users</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💾</div>
              <div className="stat-info">
                <h3>{stats.stats.totalSnippets}</h3>
                <p>Code Snippets</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-info">
                <h3>{stats.stats.totalRuns}</h3>
                <p>Code Executions</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📧</div>
              <div className="stat-info">
                <h3>{stats.stats.totalContacts}</h3>
                <p>Contact Messages</p>
              </div>
            </div>

            {/* Recent Users */}
            <div className="recent-section">
              <h3>Recent Users</h3>
              <div className="recent-list">
                {stats.recentUsers.map(user => (
                  <div key={user.id} className="recent-item">
                    <span className="user-avatar">{user.name.charAt(0)}</span>
                    <div className="user-info">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                    <span className="time-ago">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Languages */}
            <div className="recent-section">
              <h3>Popular Languages</h3>
              <div className="languages-list">
                {stats.popularLanguages.map(lang => (
                  <div key={lang.language} className="language-item">
                    <span className="lang-name">{lang.language}</span>
                    <span className="lang-count">{lang.count} snippets</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="table-container">
            <h2>User Management</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.id === 1}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'snippets' && (
          <div className="table-container">
            <h2>Code Snippets</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Language</th>
                    <th>User</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {snippets.map(snippet => (
                    <tr key={snippet.id}>
                      <td>{snippet.id}</td>
                      <td className="snippet-title">{snippet.title}</td>
                      <td>
                        <span className="language-badge">{snippet.language}</span>
                      </td>
                      <td>{snippet.user?.name || 'Unknown'}</td>
                      <td>{new Date(snippet.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteSnippet(snippet.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'executions' && (
          <div className="table-container">
            <h2>Code Executions</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Language</th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Executed</th>
                  </tr>
                </thead>
                <tbody>
                  {executions.map(run => (
                    <tr key={run.id}>
                      <td>{run.id}</td>
                      <td>
                        <span className="language-badge">{run.language}</span>
                      </td>
                      <td>{run.user?.name || 'Unknown'}</td>
                      <td>
                        <span className={`status-badge ${run.status}`}>
                          {run.status}
                        </span>
                      </td>
                      <td>{new Date(run.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="table-container">
            <h2>Contact Messages</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact.id}>
                      <td>{contact.id}</td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td className="message-preview">
                        {contact.message.length > 50 
                          ? contact.message.substring(0, 50) + '...' 
                          : contact.message
                        }
                      </td>
                      <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;