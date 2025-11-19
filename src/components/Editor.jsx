import React, { forwardRef, useState, useEffect, useRef } from 'react';
import '../styles/Editor.css';

const Editor = forwardRef(({ language, value, onChange, theme }, ref) => {
  const [editorValue, setEditorValue] = useState(value);
  const textareaRef = useRef(null);

  // Sync with parent value
  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setEditorValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    // Tab key support
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      
      // Insert tab at cursor position
      const newValue = editorValue.substring(0, start) + '  ' + editorValue.substring(end);
      setEditorValue(newValue);
      
      // Set cursor position after tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
      
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [editorValue]);

  const getFileExtension = (language) => {
    const extensions = {
      python: 'py',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      javascript: 'js',
      html: 'html',
      css: 'css'
    };
    return extensions[language] || 'txt';
  };

  const getLanguageMode = (language) => {
    const modes = {
      python: 'python',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      javascript: 'javascript',
      html: 'html',
      css: 'css'
    };
    return modes[language] || 'text';
  };

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <div className="editor-info">
          <span className="file-icon">📄</span>
          <span className="file-name">main.{getFileExtension(language)}</span>
          <span className="language-badge">{language.toUpperCase()}</span>
          <span className="editable-badge">✏️ Editable</span>
        </div>
        <div className="editor-stats">
          <span className="stat">Lines: {editorValue.split('\n').length}</span>
          <span className="stat">Chars: {editorValue.length}</span>
          <span className="stat status">✅ Ready</span>
        </div>
      </div>
      
      <div className="editor-wrapper">
        <textarea
          ref={textareaRef}
          className="code-textarea"
          value={editorValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={`Write your ${language} code here...`}
          spellCheck="false"
          style={{
            tabSize: 2,
            MozTabSize: 2,
            OTabSize: 2,
          }}
        />
        
        {/* Editor Help Tips */}
        <div className="editor-help">
          <span>💡 Tip: Press Tab for indentation</span>
        </div>
      </div>
    </div>
  );
});

Editor.displayName = 'Editor';

export default Editor;