import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const API_URL = "http://localhost:5000/api/notes";

  // Get notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note
  const addNote = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        title: title,
        content: content,
      });

      setNotes([...notes, response.data]);

      setTitle("");
      setContent("");
      setShowForm(false);

    } catch (error) {
      console.error("Error adding note:", error);
      alert("Unable to add note. Please check whether the backend is running.");
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="notes-container">

      <div className="notes-header">
        <h2>My Notes</h2>

        <button
          className="add-note-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "×" : "+"}
        </button>
      </div>

      {showForm && (
        <form className="note-form" onSubmit={addNote}>

          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit" className="save-note-btn">
            Save Note
          </button>

        </form>
      )}

      <div className="notes-list">

        {notes.length === 0 ? (
          <p className="no-notes">No notes available</p>
        ) : (
          notes.map((note) => (
            <div className="note-card" key={note._id}>

              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <button
                className="delete-note-btn"
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Notes;