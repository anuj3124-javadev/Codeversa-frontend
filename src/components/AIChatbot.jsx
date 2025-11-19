import React, { useState, useRef, useEffect } from 'react';
import { aiAPI } from '../config/api';
import '../styles/AIChatbot.css';

const AIChatbot = ({ isOpen, onClose, code, language, output, onCodeUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: 1,
          type: 'ai',
          content: `Hello! I'm your CodeVerse AI assistant. I can help you explain, debug, optimize, and improve your code. What would you like me to help you with today?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  const quickActions = [
    {
      label: 'Explain Code',
      prompt: 'Can you explain what this code does in simple terms?',
      icon: '📖'
    },
    {
      label: 'Fix Errors',
      prompt: 'Please help me fix any errors in this code.',
      icon: '🔧'
    },
    {
      label: 'Optimize',
      prompt: 'How can I optimize this code for better performance?',
      icon: '⚡'
    },
    {
      label: 'Add Comments',
      prompt: 'Can you add comprehensive comments to this code?',
      icon: '💬'
    }
  ];

  const handleQuickAction = async (action) => {
    setInput(action.prompt);
    await handleSendMessage(action.prompt);
  };

  const handleSendMessage = async (message = input) => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response;
      const currentCode = code;

      if (message.toLowerCase().includes('fix') || message.toLowerCase().includes('error')) {
        response = await aiAPI.fix(currentCode, language, output.stderr || 'No specific error provided');
      } else if (message.toLowerCase().includes('optimize') || message.toLowerCase().includes('improve')) {
        response = await aiAPI.optimize(currentCode, language);
      } else {
        response = await aiAPI.explain(currentCode, language);
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: formatAIResponse(response.data),
        data: response.data,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        isError: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAIResponse = (data) => {
    if (!data) return 'I analyzed your code but could not generate a response.';

    let response = '';

    if (data.explanation) {
      response += `${data.explanation}\n\n`;
    }

    if (data.fixedCode) {
      response += `**Fixed Code:**\n\`\`\`${language}\n${data.fixedCode}\n\`\`\`\n\n`;
    }

    if (data.optimizedCode) {
      response += `**Optimized Code:**\n\`\`\`${language}\n${data.optimizedCode}\n\`\`\`\n\n`;
    }

    if (data.keyPoints && data.keyPoints.length > 0) {
      response += `**Key Points:**\n${data.keyPoints.map(point => `• ${point}`).join('\n')}\n\n`;
    }

    if (data.improvements && data.improvements.length > 0) {
      response += `**Suggested Improvements:**\n${data.improvements.map(imp => `• ${imp}`).join('\n')}\n\n`;
    }

    if (data.reason) {
      response += `**Reasoning:**\n${data.reason}\n\n`;
    }

    return response || 'I have analyzed your code. Is there anything specific you would like me to explain or help with?';
  };

  const handleApplyCode = (newCode) => {
    if (newCode && onCodeUpdate) {
      onCodeUpdate(newCode);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          type: 'system',
          content: '✅ Code has been applied to the editor!',
          timestamp: new Date()
        }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageContent = (content) => {
    const parts = content.split(/(```[\s\S]*?```|\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeContent = part.slice(3, -3).replace(/^\w+\n/, '');
        return (
          <pre key={index} className="code-block">
            <code>{codeContent}</code>
          </pre>
        );
      } else if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      } else {
        return part.split('\n').map((line, lineIndex) => (
          <React.Fragment key={`${index}-${lineIndex}`}>
            {line}
            {lineIndex < part.split('\n').length - 1 && <br />}
          </React.Fragment>
        ));
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="ai-chatbot-overlay">
      <div className="ai-chatbot">
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-content">
            <div className="ai-icon">🤖</div>
            <div className="header-text">
              <h3 className="chatbot-title">CodeVerse AI</h3>
              <div className="status-dot"></div>
              <span className="status-text">Online</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages Container */}
        <div className="messages-container">
          <div className="messages-scroll">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.type} ${message.isError ? 'error' : ''}`}
              >
                <div className="message-avatar">
                  {message.type === 'ai' ? (
                    <div className="ai-avatar">🤖</div>
                  ) : (
                    <div className="user-avatar">👤</div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <div className="message-text">
                      {formatMessageContent(message.content)}
                    </div>
                    {message.data?.fixedCode && (
                      <div className="message-actions">
                        <button
                          className="action-btn primary"
                          onClick={() => handleApplyCode(message.data.fixedCode)}
                        >
                          <span>Apply Fix</span>
                        </button>
                      </div>
                    )}
                    {message.data?.optimizedCode && (
                      <div className="message-actions">
                        <button
                          className="action-btn primary"
                          onClick={() => handleApplyCode(message.data.optimizedCode)}
                        >
                          <span>Apply Optimization</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message ai">
                <div className="message-avatar">
                  <div className="ai-avatar">🤖</div>
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <div className="typing-indicator">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span className="typing-text">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="quick-actions">
            <div className="actions-title">Quick Actions</div>
            <div className="actions-grid">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="action-card"
                  onClick={() => handleQuickAction(action)}
                  disabled={isLoading}
                >
                  <div className="action-icon">{action.icon}</div>
                  <div className="action-label">{action.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              className="message-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message CodeVerse AI..."
              rows={1}
              disabled={isLoading}
            />
            <button
              className="send-button"
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
          <div className="input-footer">
            <span className="disclaimer">
              CodeVerse AI can make mistakes. Consider checking important information.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;