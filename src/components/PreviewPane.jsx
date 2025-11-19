import React, { useState, useEffect, useRef } from 'react';
import '../styles/PreviewPane.css';

const PreviewPane = ({ code, language }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (language === 'html') {
      renderWebPreview();
    } else {
      setError('Preview only available for HTML/CSS/JS projects');
      setIsLoading(false);
    }
  }, [code, language]);

  const extractCSSFromHTML = (htmlCode) => {
    // Extract CSS from <style> tags
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    const styles = [];
    let match;
    
    while ((match = styleRegex.exec(htmlCode)) !== null) {
      styles.push(match[1]);
    }
    
    return styles.join('\n');
  };

  const extractJSFromHTML = (htmlCode) => {
    // Extract JavaScript from <script> tags
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    const scripts = [];
    let match;
    
    while ((match = scriptRegex.exec(htmlCode)) !== null) {
      // Skip external scripts (src attribute)
      if (!match[0].includes('src=')) {
        scripts.push(match[1]);
      }
    }
    
    return scripts.join('\n');
  };

  const renderWebPreview = () => {
    if (!iframeRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      // Create complete HTML document with error handling
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>CodeVerse Preview</title>
          <style>
            /* Base styles for preview */
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 0;
              background: white;
              color: #333;
              min-height: 100vh;
            }
            
            /* Error boundary styling */
            .preview-error {
              background: #fee;
              border: 1px solid #fcc;
              border-radius: 8px;
              padding: 1rem;
              margin: 1rem;
              color: #c33;
              font-family: monospace;
              font-size: 14px;
            }
            
            .loading-spinner {
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 3px solid #f3f3f3;
              border-top: 3px solid #007bff;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin-right: 10px;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
          
          <!-- Injected CSS from code -->
          <style>
            ${extractCSSFromHTML(code)}
          </style>
        </head>
        <body>
          <!-- HTML Content from code -->
          ${code.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')}
          
          <!-- JavaScript execution with error handling -->
          <script>
            // Error handling for preview
            window.addEventListener('error', (e) => {
              console.error('Preview error:', e.error);
              // Display error in preview
              const errorDiv = document.createElement('div');
              errorDiv.className = 'preview-error';
              errorDiv.innerHTML = '<strong>JavaScript Error:</strong><br>' + e.error.toString();
              document.body.appendChild(errorDiv);
            });
            
            // Catch console errors
            const originalConsoleError = console.error;
            console.error = function(...args) {
              originalConsoleError.apply(console, args);
              // You can display these in the preview if needed
            };
            
            // Execute extracted JavaScript
            try {
              ${extractJSFromHTML(code)}
            } catch (jsError) {
              console.error('JavaScript execution error:', jsError);
              const errorDiv = document.createElement('div');
              errorDiv.className = 'preview-error';
              errorDiv.innerHTML = '<strong>JavaScript Execution Error:</strong><br>' + jsError.toString();
              document.body.appendChild(errorDiv);
            }
            
            // Notify parent that loading is complete
            window.dispatchEvent(new Event('previewReady'));
          </script>
        </body>
        </html>
      `;

      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();

      // Handle iframe load
      iframe.onload = () => {
        setIsLoading(false);
      };

      // Handle iframe errors
      iframe.onerror = () => {
        setError('Failed to load preview');
        setIsLoading(false);
      };

      // Listen for preview ready event
      iframe.contentWindow.addEventListener('previewReady', () => {
        setIsLoading(false);
      });

    } catch (err) {
      console.error('Preview rendering error:', err);
      setError('Error rendering preview: ' + err.message);
      setIsLoading(false);
    }
  };

  const handleReload = () => {
    renderWebPreview();
  };

  if (language !== 'html') {
    return (
      <div className="preview-pane">
        <div className="preview-unavailable">
          <div className="unavailable-icon">🌐</div>
          <h3>Web Preview Only</h3>
          <p>Live preview is only available for HTML/CSS/JS projects.</p>
          <p className="hint">
            Switch to <strong>HTML/CSS/JS</strong> to see your web page render in real-time!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-pane">
      <div className="preview-content">
        {isLoading && (
          <div className="preview-loading">
            <div className="loading-spinner"></div>
            <span>Rendering Web Preview...</span>
            <p>Processing HTML, CSS, and JavaScript</p>
          </div>
        )}

        {error && (
          <div className="preview-error">
            <div className="error-header">
              <span className="error-icon">⚠️</span>
              <span className="error-title">Preview Error</span>
            </div>
            <p className="error-message">{error}</p>
            <button 
              className="btn btn-secondary retry-btn"
              onClick={handleReload}
            >
              Retry
            </button>
          </div>
        )}

        <iframe
          ref={iframeRef}
          className="preview-iframe"
          title="web-preview"
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
          style={{ 
            opacity: isLoading ? 0.5 : 1,
            pointerEvents: isLoading ? 'none' : 'auto'
          }}
        />
      </div>
    </div>
  );
};

export default PreviewPane;