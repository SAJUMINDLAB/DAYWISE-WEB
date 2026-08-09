import React, { useEffect } from 'react';
import MobileMockup from '../components/preview/MobileMockup';
import EditorPanel from '../components/editor/EditorPanel';

const EditorPage = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Ensure Editor Page blocks external scroll
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = 'auto'; // Restore when leaving
    }
  }, []);

  return (
    <div className="main-layout">
      <MobileMockup />
      <EditorPanel />
    </div>
  );
};

export default EditorPage;
