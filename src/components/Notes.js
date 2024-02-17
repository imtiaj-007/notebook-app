import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteState'
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;
    return (
        <div className="container my-3 w-75">
            <h3>Your Notes</h3>
            {
                notes.map((note)=>{
                    return <NoteItem note={note}/>
                })
            }
        </div>
    )
}

export default Notes;
