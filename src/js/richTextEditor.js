import React, { useRef, useEffect } from 'react';
import '../css/Richtexteditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold,faItalic,faUnderline,faAlignLeft,faAlignRight,faAlignCenter, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const RichTextEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content || '';
    }
  }, [content]);

  const handleCommand = (command,msg) => {
    document.execCommand(command, false, msg);
    syncContent();
  };

  const syncContent = () => {
    if (editorRef.current) {
      const updatedContent = editorRef.current.innerHTML;
      onChange(updatedContent);
    }
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={() => handleCommand('bold',null)}><FontAwesomeIcon icon={faBold} /></button>
        <button onClick={() => handleCommand('italic',null)}><FontAwesomeIcon icon={faItalic} /></button>
        <button onClick={() => handleCommand('underline',null)}><FontAwesomeIcon icon={faUnderline} /></button>
        <button onClick={() => handleCommand('justifyLeft',null)}><FontAwesomeIcon icon={faAlignLeft} /></button>
        <button onClick={() => handleCommand('justifyCenter',null)}><FontAwesomeIcon icon={faAlignCenter} /></button>
        <button onClick={() => handleCommand('justifyRight',null)}><FontAwesomeIcon icon={faAlignRight} /></button>
        <button onClick={() => handleCommand('fontSize',5)}><FontAwesomeIcon icon={faPlus} /></button>
        <button onClick={() => handleCommand('fontSize',3)}><FontAwesomeIcon icon={faMinus} /></button>
      </div>
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        onInput={syncContent}
      ></div>
    </div>
  );
};

export default RichTextEditor;
