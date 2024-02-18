import React, { useState } from "react"
import NoteContext from "./NoteState"

const NoteSate = (props) => {
  const host = "http://localhost:5000/api/notes";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX2lkIjoiaW5pdCIsIm5hbWUiOiJpbml0IiwiZW1haWwiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJpbml0Ijp7Il9pZCI6dHJ1ZSwibmFtZSI6dHJ1ZSwiZW1haWwiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJjcmVhdGVkQXQiOnRydWUsInVwZGF0ZWRBdCI6dHJ1ZSwiX192Ijp0cnVlfX19LCJza2lwSWQiOnRydWV9LCIkaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9pZCI6IjY1Y2NiN2UxNDI3ZjhiNTc5NDQ0ZjE5YyIsIm5hbWUiOiJJbXRpYWoiLCJlbWFpbCI6ImFiY0B5YWhvby5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRkS1pWdjFUTld3M2t0Y0p6M283N1cuUWQ0eGJ5RVA0SHZ4STJHdWZDVFUuVlZJV0t5cUNmdSIsImNyZWF0ZWRBdCI6IjIwMjQtMDItMTRUMTI6NTM6NTMuMzUyWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDItMTRUMTI6NTM6NTMuMzUyWiIsIl9fdiI6MH0sImlhdCI6MTcwNzkxNTI3Mn0.nqKsihuTWEkmUBWgSaR2EXrtPSw3wj_TJ2V5ZiSXymQ";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Fetch all Notes
  const getAllNotes = async () => {
    const url = `${host}/allnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const data = await response.json();
    setNotes(data);
  }

  // Add new Note
  const addNote = async (newNote) => {
    const url = `${host}/createnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(newNote),
    });
    const data = await response.json();
    console.log(data);

    const note = newNote;
    setNotes(notes.concat(note));
  }

  // Delete a Note
  const deleteNote = async (id) => {
    const url = `${host}/deletenotes/${id}`;
    console.log(id);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(),
    });
    const data = await response.json();
    console.log(data);

    const remNotes = notes.filter((element) => { return element._id !== id });
    setNotes(remNotes);
  }

  // Update a Note
  const updateNote = async (id, note) => {
    const url = `${host}/updatenotes/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
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
  }

  return <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getAllNotes }}>
    {props.children}
  </NoteContext.Provider>
}

export default NoteSate;