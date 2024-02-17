import React from "react"
import NoteContext from "./NoteState"

const NoteSate = (props)=>{
    return <NoteContext.Provider value={{}}>
        {props.children}
    </NoteContext.Provider>
}

export default NoteSate;