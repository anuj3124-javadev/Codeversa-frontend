import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Editor from '../components/Editor';
import OutputConsole from '../components/OutputConsole';
import PreviewPane from '../components/PreviewPane';
import AIChatbot from '../components/AIChatbot';
import LanguageSelector from '../components/LanguageSelector';
import CompilerControls from '../components/CompilerControls';
import { DEFAULT_CODE, LANGUAGES } from '../config/constants';
import { runAPI, snippetsAPI } from '../config/api';
import '../styles/Compiler.css';

const Compiler = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  const [language, setLanguage] = useState('html');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState({ stdout: '', stderr: '', status: 'idle' });
  const [isRunning, setIsRunning] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [editorKey, setEditorKey] = useState(Date.now());
  
  const editorRef = useRef();
  const outputRef = useRef();

  // All languages use the same 50-50 layout
  const isWebLanguage = ['html', 'css', 'javascript'].includes(language);
  
  // Initialize code when component mounts or language changes
  useEffect(() => {
    const defaultCode = DEFAULT_CODE[language] || '';
    setCode(defaultCode);
    setOutput({ stdout: '', stderr: '', status: 'idle' });
    setInput('');
    setEditorKey(Date.now());
  }, [language]);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current && (output.stdout || output.stderr)) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output.stdout, output.stderr]);

  const handleRunCode = async () => {
    if (!code.trim()) {
      setOutput({
        stdout: '',
        stderr: 'Error: Code cannot be empty',
        status: 'error'
      });
      return;
    }
    
    setIsRunning(true);
    setOutput({ 
      stdout: '🚀 Executing code...\n', 
      stderr: '', 
      status: 'running' 
    });

    try {
      const response = await runAPI.execute(language, code, input);
      const result = response.data;
      
      setOutput({
        stdout: result.stdout || '',
        stderr: result.stderr || '',
        status: result.status || 'done'
      });

    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Failed to execute code. Please check your code and try again.';
      
      setOutput({
        stdout: '',
        stderr: `❌ Error: ${errorMessage}`,
        status: 'error'
      });
    } finally {
      setIsRunning(false);
      setInput('');
    }
  };

  const handleSaveSnippet = async () => {
    if (!user) {
      alert('Please login to save snippets');
      return;
    }

    try {
      const title = prompt('Enter snippet title:', `My ${LANGUAGES[language]?.name || language} Code`);
      if (!title) return;

      await snippetsAPI.save(language, title, code);
      alert('Snippet saved successfully!');
    } catch (error) {
      alert('Failed to save snippet: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  const handleDownload = async () => {
    try {
      // Get file extension and default name
      const extension = LANGUAGES[language].extension;
      const defaultFileName = `my-code.${extension}`;
      
      // Create custom file name with user input
      const userFileName = prompt(
        'Enter file name for download:', 
        defaultFileName
      );
      
      if (!userFileName) {
        return; // User cancelled
      }

      // Ensure file has correct extension
      let finalFileName = userFileName;
      if (!userFileName.toLowerCase().endsWith(`.${extension}`)) {
        finalFileName = `${userFileName}.${extension}`;
      }

      // Create and download file
      const blob = new Blob([code], { 
        type: getMimeType(language) 
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = finalFileName;
      a.style.display = 'none';
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      URL.revokeObjectURL(url);
      
      console.log(`✅ File downloaded as: ${finalFileName}`);
      
    } catch (error) {
      console.error('❌ Download failed:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const getMimeType = (lang) => {
    const mimeTypes = {
      python: 'text/x-python',
      java: 'text/x-java',
      c: 'text/x-c',
      cpp: 'text/x-c++',
      javascript: 'application/javascript',
      html: 'text/html',
      css: 'text/css'
    };
    return mimeTypes[lang] || 'text/plain';
  };

  const handleClear = () => {
    const defaultCode = DEFAULT_CODE[language] || '';
    setCode(defaultCode);
    setInput('');
    setOutput({ stdout: '', stderr: '', status: 'idle' });
  };

  const handleAIAssist = () => {
    setIsAIOpen(true);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <div className="compiler-page">
      {/* Header Section */}
      <div className="compiler-header">
        <div className="header-left">
          <h1 className="compiler-title">
            {isWebLanguage ? 'Web Development' : 'Code Editor'}
          </h1>
          <p className="compiler-subtitle">
            {isWebLanguage 
              ? 'Build and preview web pages in real-time' 
              : `Write, compile, and run ${LANGUAGES[language]?.name || language} code`}
          </p>
        </div>
        <div className="header-right">
          <LanguageSelector 
            language={language} 
            onLanguageChange={handleLanguageChange} 
          />
          <CompilerControls
            isRunning={isRunning}
            onRun={handleRunCode}
            onSave={handleSaveSnippet}
            onDownload={handleDownload}
            onClear={handleClear}
            onAIAssist={handleAIAssist}
            user={user}
            isWebLanguage={isWebLanguage}
          />
        </div>
      </div>

      {/* Main Content Area - SAME 50-50 LAYOUT FOR ALL LANGUAGES */}
      <div className="compiler-main">
        <div className="compiler-layout">
          {/* Editor Panel - 50% width */}
          <div className="editor-panel">
            {/* <div className="panel-header">
              <span className="panel-title">
                <span className="panel-icon">📝</span>
                {isWebLanguage ? 'Web Editor' : 'Code Editor'}
              </span>
              <span className="panel-badge">
                {LANGUAGES[language]?.name || language}
              </span>
            </div> */}
            <div className="editor-container">
              <Editor
                key={editorKey}
                ref={editorRef}
                language={language}
                value={code}
                onChange={handleCodeChange}
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                height="100%"
              />
            </div>
          </div>

          {/* Right Panel - 50% width */}
          <div className="output-panel">
            <div className="panel-header">
              <span className="panel-title">
                <span className="panel-icon">
                  {isWebLanguage ? '👁️' : '📊'}
                </span>
                {isWebLanguage ? 'Live Preview' : 'Output Console'}
                {!isWebLanguage && isRunning && (
                  <span className="running-badge">Running...</span>
                )}
              </span>
              {isWebLanguage && (
                <button 
                  className="refresh-btn"
                  onClick={() => {
                    const event = new Event('refreshPreview');
                    window.dispatchEvent(event);
                  }}
                  title="Refresh Preview"
                >
                  🔄
                </button>
              )}
            </div>
            <div className="output-container">
              {isWebLanguage ? (
                <PreviewPane
                  code={code}
                  language={language}
                  height="100%"
                />
              ) : (
                <OutputConsole
                  ref={outputRef}
                  output={output}
                  input={input}
                  onInputChange={setInput}
                  isRunning={isRunning}
                  height="100%"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        code={code}
        language={language}
        output={output}
        onCodeUpdate={setCode}
      />
    </div>
  );
};

export default Compiler;