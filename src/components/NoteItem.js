import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div>
            <div className="card my-3">
                <div className="card-header">
                    {note.title}
                    <div className="d-flex" style={{position: "absolute", right: "10px", top: "5px"}}>
                        <button className="btn btn-primary btn-sm mx-1" type="submit">Edit</button>
                        <button className="btn btn-primary btn-sm mx-1" type="submit">Delete</button>
                    </div>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{note.description}</p>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
