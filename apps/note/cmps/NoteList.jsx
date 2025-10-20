

import {NotePreview} from './NotePreview.jsx'



export function NoteList({notes, onRemoveNote, saveNote}) {

 if (!notes || !notes.length) return <h2>No notes to show...</h2>







    return (
        <ul className="note-list">
            {notes.map((note,num) => (
                <li key={note.id} className={"note-preview-container" + num}>
                    <NotePreview note={note} noteNum={num} onRemoveNote={onRemoveNote} saveNote={saveNote} />
                </li>
            ))}
        </ul>
    )
}
