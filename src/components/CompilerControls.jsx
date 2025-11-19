import React from 'react';
import '../styles/CompilerControls.css';

const CompilerControls = ({ 
  isRunning, 
  onRun, 
  onSave, 
  onDownload, 
  onClear, 
  onAIAssist,
  user,
  isWebLanguage = false
}) => {
  const handleDownloadClick = () => {
    if (onDownload) {
      onDownload();
    }
  };

  const controls = [
    {
      id: 'run',
      label: isWebLanguage ? 'Preview' : 'Run',
      icon: isWebLanguage ? '👁️' : '▶️',
      action: onRun,
      variant: 'primary',
      disabled: isRunning,
      tooltip: isWebLanguage ? 'Refresh Preview' : 'Run Code (Ctrl+Enter)'
    },
    {
      id: 'ai',
      label: 'AI Assist',
      icon: '🤖',
      action: onAIAssist,
      variant: 'secondary',
      tooltip: 'Get AI Assistance'
    },
    {
      id: 'save',
      label: 'Save',
      icon: '💾',
      action: onSave,
      variant: 'secondary',
      disabled: !user,
      tooltip: user ? 'Save Snippet' : 'Login to Save'
    },
    {
      id: 'download',
      label: 'Download',
      icon: '📥',
      action: handleDownloadClick,
      variant: 'secondary',
      tooltip: 'Download File (Choose name & location)'
    },
    {
      id: 'clear',
      label: 'Clear',
      icon: '🗑️',
      action: onClear,
      variant: 'danger',
      tooltip: 'Clear Editor'
    }
  ];

  // Add keyboard shortcut for Run (only for code languages)
  React.useEffect(() => {
    if (isWebLanguage) return;

    const handleKeyPress = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        onRun();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onRun, isWebLanguage]);

  return (
    <div className="compiler-controls">
      {controls.map((control) => (
        <button
          key={control.id}
          className={`control-btn ${control.variant} ${isRunning && control.id === 'run' ? 'running' : ''}`}
          onClick={control.action}
          disabled={control.disabled}
          title={control.tooltip}
          aria-label={control.label}
        >
          <span className="control-icon">
            {control.id === 'run' && isRunning ? '⏳' : control.icon}
          </span>
          <span className="control-label">{control.label}</span>
          {control.id === 'run' && !isWebLanguage && (
            <span className="shortcut-hint">Ctrl+Enter</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CompilerControls;