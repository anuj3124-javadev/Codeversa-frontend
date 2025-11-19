// Advanced file download utility with better browser support
export const downloadFile = (content, filename, fileType = 'text/plain') => {
  return new Promise((resolve, reject) => {
    try {
      // Method 1: Use File System Access API (modern browsers)
      if ('showSaveFilePicker' in window) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [{
            description: 'Text Files',
            accept: {
              [fileType]: [`.${filename.split('.').pop()}`],
            },
          }],
        });
        
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        resolve();
        return;
      }
      
      // Method 2: Traditional download (fallback)
      const blob = new Blob([content], { type: fileType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        resolve();
      }, 100);
      
    } catch (error) {
      console.error('Download error:', error);
      reject(error);
    }
  });
};

// Enhanced download with multiple fallbacks
export const enhancedDownload = (code, language, customName = '') => {
  const extensions = {
    python: 'py',
    java: 'java', 
    c: 'c',
    cpp: 'cpp',
    javascript: 'js',
    html: 'html',
    css: 'css'
  };
  
  const extension = extensions[language] || 'txt';
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
  const defaultName = customName || `code-${timestamp}.${extension}`;
  const finalName = defaultName.endsWith(`.${extension}`) ? defaultName : `${defaultName}.${extension}`;
  
  const mimeTypes = {
    python: 'text/x-python',
    java: 'text/x-java',
    c: 'text/x-c',
    cpp: 'text/x-c++', 
    javascript: 'application/javascript',
    html: 'text/html',
    css: 'text/css'
  };
  
  return downloadFile(code, finalName, mimeTypes[language] || 'text/plain');
};