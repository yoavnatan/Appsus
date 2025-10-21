

import { NotePreview } from './NotePreview.jsx'



export function NoteList({ notes, onRemoveNote, saveNote ,onSelectNote}) {

    if (!notes || !notes.length) return <h2>No notes to show...</h2>

    return (
        <div className="note-container">
            <ul className="note-list">
                {notes.map((note) => (
                    <li key={note.id} className="note-preview-container">
                        <NotePreview note={note} onRemoveNote={onRemoveNote} saveNote={saveNote} onSelectNote={onSelectNote} />
                    </li>
                ))}
            </ul>

        </div>
    )
}
