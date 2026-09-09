import React from 'react'
import './Cards.css'
import axios from 'axios';

function Cards(props) {
  const { fetchNotes, title, id, description } = props;

  async function deleteID(id) {
    const isConfirmed = window.confirm(`Are you sure you want to delete the note: "${title}"?`);
    if (!isConfirmed) return;

    try {
      console.log('Deleting id:', id);
      await axios.delete(`http://localhost:5000/note/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <div className={`card card-color-${Math.abs(Number(id) || 0) % 4}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{id}</p>
      
      <div className="card-buttons">
        <button className="edit-button">Edit</button>
        <button className="delete-button" onClick={() => deleteID(id)}>Delete</button>
      </div>
    </div>
  )
}

export default Cards;