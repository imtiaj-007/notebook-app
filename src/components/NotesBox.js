import React, { useContext, useState } from 'react';
import Notes from './Notes';
import noteContext from '../context/notes/NoteState'

const NotesBox = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNotes] = useState({title: "", description: ""})
    const handleOnChange = (e)=>{
        setNotes({...note, [e.target.name]: e.target.value });
    }
    const handleOnClick = (e)=>{
        e.preventDefault();
        addNote(note)
    }
    return (
        <>
        <div className="container my-3 w-50">
            <h3>Add new Note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" onChange={handleOnChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handleOnChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
            </form>
        </div>

        <Notes/>
        </>
    )
}

export default NotesBox