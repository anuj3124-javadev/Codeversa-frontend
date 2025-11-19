import React, { forwardRef, useState, useEffect } from 'react';
import '../styles/OutputConsole.css';

const OutputConsole = forwardRef(({ output, input, onInputChange, isRunning }, ref) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Show input field when program needs input
  useEffect(() => {
    if (output.stdout && isRunning) {
      const stdout = output.stdout.toLowerCase();
      const needsInput = stdout.includes('enter') || 
                        stdout.includes('input') || 
                        stdout.includes('please enter') ||
                        stdout.includes('enter input') ||
                        (stdout.includes(':') && !stdout.includes('factorial'));
      
      setShowInput(needsInput);
    }
  }, [output.stdout, isRunning]);

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      onInputChange(inputValue);
      setInputValue('');
      setShowInput(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInputSubmit();
    }
  };

  const getStatusIcon = () => {
    if (isRunning) return '⏳';
    if (output.status === 'error') return '❌';
    if (output.status === 'done') {
      return output.stderr ? '⚠️' : '✅';
    }
    return '💻';
  };

  const getStatusText = () => {
    if (isRunning) {
      return showInput ? 'Waiting for input...' : 'Executing code...';
    }
    if (output.status === 'error') return 'Execution failed';
    if (output.status === 'done') {
      return output.stderr ? 'Completed with warnings' : 'Execution completed';
    }
    return 'Ready to execute';
  };

  const getStatusClass = () => {
    if (isRunning) return 'status-running';
    if (output.status === 'error') return 'status-error';
    if (output.status === 'done') {
      return output.stderr ? 'status-warning' : 'status-success';
    }
    return 'status-idle';
  };

  // Check what to display
  const hasOutput = output.stdout || output.stderr;
  const shouldShowOutput = hasOutput || isRunning || output.status === 'done' || output.status === 'error';

  return (
    <div className="output-console">
      {/* Header */}
      <div className="console-header">
        <div className="status-indicator">
          <span className="status-icon">{getStatusIcon()}</span>
          <span className={`status-text ${getStatusClass()}`}>
            {getStatusText()}
          </span>
          {isRunning && !showInput && (
            <div className="execution-loader">
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
            </div>
          )}
        </div>
        <div className="console-actions">
          <button 
            className="action-btn"
            onClick={() => {
              // This will be handled by parent component
              console.log('Clear requested');
            }}
            title="Clear Console"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="console-content" ref={ref}>
        {/* Show output sections */}
        {shouldShowOutput && (
          <>
            {/* Standard Output */}
            {output.stdout && (
              <div className="output-card">
                <div className="output-header">
                  <span className="output-icon">📤</span>
                  <span>Output</span>
                </div>
                <pre className="output-text stdout">
                  {output.stdout}
                </pre>
              </div>
            )}

            {/* Error Output */}
            {output.stderr && (
              <div className="output-card error">
                <div className="output-header">
                  <span className="output-icon">❌</span>
                  <span>Errors</span>
                </div>
                <pre className="output-text stderr">
                  {output.stderr}
                </pre>
              </div>
            )}

            {/* Running state */}
            {isRunning && !hasOutput && !showInput && (
              <div className="output-card">
                <div className="output-header">
                  <span className="output-icon">⏳</span>
                  <span>Executing Code</span>
                </div>
                <pre className="output-text stdout">
                  Your code is running. Please wait...
                </pre>
              </div>
            )}

            {/* Completed but no output */}
            {output.status === 'done' && !hasOutput && (
              <div className="output-card success">
                <div className="output-header">
                  <span className="output-icon">✅</span>
                  <span>Execution Complete</span>
                </div>
                <pre className="output-text stdout">
                  Program executed successfully. No output was generated.
                </pre>
              </div>
            )}
          </>
        )}

        {/* Input Section */}
        {showInput && (
          <div className="input-card">
            <div className="input-header">
              <span className="input-icon">⌨️</span>
              <span>Program Input Required</span>
            </div>
            <div className="input-container">
              <textarea
                className="input-textarea"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your input here..."
                rows={3}
                autoFocus
              />
              <button 
                className="submit-btn"
                onClick={handleInputSubmit}
                disabled={!inputValue.trim()}
              >
                Submit Input
              </button>
            </div>
            <div className="input-hint">
              Press Enter to submit • Shift+Enter for new line
            </div>
          </div>
        )}

        {/* Empty State */}
        {!shouldShowOutput && !showInput && (
          <div className="empty-state">
            <div className="empty-icon">🚀</div>
            <h3 className="empty-title">Ready to Execute</h3>
            <p className="empty-description">
              Click the "Run Code" button to execute your program and see the output here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

OutputConsole.displayName = 'OutputConsole';

export default OutputConsole;