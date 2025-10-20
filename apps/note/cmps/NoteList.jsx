const {  Link } = ReactRouterDOM

import {NotePreview} from './NotePreview.jsx'



export function NoteList({notes, onRemoveNote, saveNote}) {

 if (!notes || !notes.length) return <h2>No notes to show...</h2>







    return (
        <ul className="note-list">
            {notes.map((note,num) => (
                <li key={note.id} className={"note-preview-container" + num}>
                    <NotePreview note={note} noteNum={num} saveNote={saveNote} />
                    <section className="note-actions">
                        <button onClick={() => onRemoveNote(note.id)}>
                            Remove
                        </button>
                        <button >
                            <Link to={`/note/${note.id}`}>Details</Link>
                        </button>
                        <button >
                            <Link to={`/note/${note.id}`}>Edit</Link>
                        </button>
                    </section>
                </li>
            ))}
        </ul>
    )
}
