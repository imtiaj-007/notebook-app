import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteState'
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, updateNote } = context;

    const modalRef = useRef(null);
    const closeRef = useRef(null);
    const [note, setNotes] = useState({ title: "", description: "" })

    useEffect(() => {
        getAllNotes()
    }, [])

    const editNote = (curNote) => {
        modalRef.current.click();
        setNotes(curNote);
    }

    const handleOnChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value });
    }
    const handleOnClick = (e) => {
        updateNote(note._id, note);
        closeRef.current.click();
        setNotes({ title: "", description: "" });
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={modalRef} data-bs-toggle="modal" data-bs-target="#editModal">Open modal</button>

            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title-name" className="col-form-label">Title:</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="col-form-label">Description:</label>
                                    <textarea className="form-control" id="description" name="description" value={note.description} onChange={handleOnChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleOnClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3 w-75">
                <h3 className="d-flex justify-content-center">Your Notes</h3>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} editNote={editNote} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes;
