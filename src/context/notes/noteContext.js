import React, { useState } from "react"
import NoteContext from "./NoteState"

const NoteSate = (props) => {
  const host = "http://localhost:5000/api/notes";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Fetch all Notes
  const getAllNotes = async () => {
    try {
      const url = `${host}/allnotes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token'),
        },
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Add new Note
  const addNote = async (newNote) => {
    try {
      const url = `${host}/createnotes`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token'),
        },
        body: JSON.stringify(newNote),
      })

      const data = await response.json();
      setNotes(notes.concat(data));

    } catch (error) {
      console.log(error.message);
    }
  }

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      const url = `${host}/deletenotes/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token'),
        },
        body: JSON.stringify(),
      });
      const data = await response.json();
      console.log(data);

      const remNotes = notes.filter((element) => { return element._id !== id });
      setNotes(remNotes);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Update a Note
  const updateNote = async (id, note) => {
    try {
      const url = `${host}/updatenotes/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token'),
        },
        body: JSON.stringify(note),
      });
      const data = await response.json();
      console.log(data);

      let updatedNotes = JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < updatedNotes.length; index++) {
        const element = updatedNotes[index];
        if (element._id === id) {
          updatedNotes[index].title = note.title;
          updatedNotes[index].description = note.description;
          break;
        }
      }
      setNotes(updatedNotes);
    } catch (error) {
        console.log(error.message);
    }
  }

  return <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getAllNotes }}>
    {props.children}
  </NoteContext.Provider>
}

export default NoteSate;