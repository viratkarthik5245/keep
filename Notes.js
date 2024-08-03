import React, { useState } from "react";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSaveNote = () => {
    if (title && content) {
      setNotes([...notes, { title, content }]);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="notes">
      <div className="notes__input">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="notes__title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Take a note..."
          className="notes__content"
        />
        <button onClick={handleSaveNote} className="notes__save">
          Save Note
        </button>
      </div>
      <div className="notes__list">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <div className="note__title">{note.title}</div>
            <div className="note__content">{note.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
