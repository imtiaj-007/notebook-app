import React, { useState } from "react"
import NoteContext from "./NoteState"

const NoteSate = (props)=>{
    const notesInitial = [
        {
          "_id": "65ccd236699c5c7187c6976a",
          "userId": "65ccb7e1427f8b579444f19c",
          "title": "My First Note",
          "description": "Hey, I'm Imtiaj",
          "createdAt": "2024-02-14T14:46:14.618Z",
          "updatedAt": "2024-02-14T14:46:14.618Z",
          "__v": 0
        },
        {
          "_id": "65ccd256699c5c7187c6976d",
          "userId": "65ccb7e1427f8b579444f19c",
          "title": "My Second Note",
          "description": "I'm a MERN Stack Developer",
          "createdAt": "2024-02-14T14:46:46.893Z",
          "updatedAt": "2024-02-14T14:46:46.893Z",
          "__v": 0
        },
        {
          "_id": "65ccd282699c5c7187c69770",
          "userId": "65ccb7e1427f8b579444f19c",
          "title": "My Third Note",
          "description": "Welcome to My Project",
          "createdAt": "2024-02-14T14:47:30.301Z",
          "updatedAt": "2024-02-14T14:47:30.301Z",
          "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);

    return <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>
}

export default NoteSate;