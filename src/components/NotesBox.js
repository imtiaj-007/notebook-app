import React from 'react';
import Notes from './Notes';

const NotesBox = () => {
    return (
        <>
        <div className="container my-3 w-50">
            <h3>Add new Note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="noteTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="noteDescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="noteDescription" name="description"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

        <Notes/>
        </>
    )
}

export default NotesBox