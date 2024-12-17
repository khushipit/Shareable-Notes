import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import '../css/Notelist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faThumbtack,faTrash,faSquareXmark} from '@fortawesome/free-solid-svg-icons';


const NoteList = ({ notes, onSelect, onDelete, onPin }) => {
  const [viewedNote, setViewedNote] = useState(null);
  const [decryptedContent, setDecryptedContent] = useState('');

  const handleView = (note) => {
    if (note.isEncrypted) {
      const password = prompt('Enter the password to view this note:');
      const decrypted = decryptNote(note.content, password);

      if (decrypted) {
        setDecryptedContent(decrypted);
        setViewedNote(note);
      } else {
        alert('Incorrect password!');
      }
    } else {
      setViewedNote(note);
      setDecryptedContent(note.highlightedContent || note.content);
    }
  };

  const closeView = () => {
    setViewedNote(null);
    setDecryptedContent('');
  };

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div key={note.id} className={`note ${note.pinned ? 'pinned' : ''}`}>
          <h3 onClick={() => onSelect(note.id)}>{note.title}</h3>
          <div className="note-buttons">
            <button onClick={() => handleView(note)}><FontAwesomeIcon icon={faEye} /></button>
            <button onClick={() => onPin(note.id)}><FontAwesomeIcon icon={faThumbtack} /></button>
            <button onClick={() => onDelete(note.id)}><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        </div>
      ))}

      {viewedNote && (
        <div className="note-view-modal">
          <div className="modal-content">
          <div className="modal-header">
            <h2>{viewedNote.title}</h2>
            <button onClick={closeView}><FontAwesomeIcon icon={faSquareXmark} /></button>
            </div>
            <div
              className="highlighted-content"
              dangerouslySetInnerHTML={{ __html: decryptedContent || viewedNote.content }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

const decryptNote = (encryptedContent, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedContent, password);
    return bytes.toString(CryptoJS.enc.Utf8); 
  } catch {
    return null; 
  }
};

export default NoteList;
