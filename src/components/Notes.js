// import '../Styles/notes.css'
import React from 'react'

const Notes = () => {
    return (
        <>
        <div className="container my-3 w-50">
            <h3>Add new Note</h3>
            <form>
                <div class="mb-3">
                    <label for="noteTitle" class="form-label">Title</label>
                    <input type="text" class="form-control" name="title"/>
                </div>
                <div class="mb-3">
                    <label for="noteDescription" class="form-label">Description</label>
                    <input type="text" class="form-control" id="noteDescription" name="description"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>

        <div className="container my-3 w-75">
            <h3>Your Notes</h3>
        </div>
        </>
    )
}

export default Notes