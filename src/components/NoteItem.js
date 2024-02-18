import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteState'

const NoteItem = (props) => {
    const { note, editNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div>
            <div className="card my-3">
                <div className="card-header">
                    <h5>{note.title}</h5>
                    <div className="d-flex" style={{position: "absolute", right: "10px", top: "5px"}}>
                        <button className="btn btn-primary btn-sm mx-1" type="submit" onClick={()=>{ editNote(note) }}>Edit</button>
                        <button className="btn btn-primary btn-sm mx-1" type="submit" onClick={()=>{ deleteNote(note._id) }}>Delete</button>
                    </div>
                </div>
                <div className="card-body">
                    <p>{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
