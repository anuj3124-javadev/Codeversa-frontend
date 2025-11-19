import React, { useEffect } from 'react';
import * as monaco from 'monaco-editor';

const MonacoPreloader = () => {
  useEffect(() => {
    // Preload Monaco editor on app start
    const preloadMonaco = async () => {
      try {
        // This helps Monaco initialize faster when needed
        console.log('Preloading Monaco Editor...');
        
        // Preload common languages
        await Promise.all([
          monaco.languages.typescript.typescriptDefaults.addExtraLib('', ''),
          monaco.languages.html.htmlDefaults.addExtraLib('', ''),
          monaco.languages.css.cssDefaults.addExtraLib('', '')
        ]);
        
        console.log('Monaco Editor preloaded successfully');
      } catch (error) {
        console.warn('Monaco preloading failed:', error);
      }
    };

    preloadMonaco();
  }, []);

  return null; // This component doesn't render anything
};

export default MonacoPreloader;