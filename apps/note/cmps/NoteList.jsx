

import { NotePreview } from './NotePreview.jsx'
import { NoteBackground } from './NoteBackground.jsx'



export function NoteList({ setBackground, selectedNote, onSetIsSelectedNote, onSetLastSelectedNote, lastSelectedNote, notes, onRemoveNote, saveNote, onSelectNote, onChangeBackgroundColor }) {

    if (!notes || !notes.length) return <h2>No notes to show...</h2>

    return (
        <div className="note-container">
            <ul className="note-list">
                {notes.map((note) => (
                    <li key={note.id} className={selectedNote && selectedNote.id === note.id ? 'none' : 'note-preview-container'}>
                        <NotePreview  setBackground={setBackground} selectedNote={selectedNote} onSetIsSelectedNote={onSetIsSelectedNote} onSetLastSelectedNote={onSetLastSelectedNote} lastSelectedNote={lastSelectedNote} onChangeBackgroundColor={onChangeBackgroundColor} note={note} onRemoveNote={onRemoveNote} saveNote={saveNote} onSelectNote={onSelectNote} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
