

import { NotePreview } from './NotePreview.jsx'
import { NoteBackground } from './NoteBackground.jsx'

const { useEffect, useRef, useState } = React

export function NoteList({ isSelectedNote,setBackground, selectedNote, onSetIsSelectedNote,  notes, onRemoveNote, saveNote, onSelectNote, onChangeBackgroundColor }) {

    const [notePalette, setNotePalette] = useState(null)
   


    function onClickPalette(note) {
        setNotePalette(note)
    }

    function onSetRef(newNote) {
        openNotesPaletteArrRef.current.push(newNote)
        console.log(openNotesPaletteArrRef.current)
    }

    if (!notes || !notes.length) return <h2>No notes to show...</h2>

    return (
        <div className="note-container">
            <ul className="note-list">
                {notes.map((note) => (
                    <li key={note.id} className={selectedNote && selectedNote.id === note.id ? 'none' : 'note-preview-container'}>
                        <NotePreview isSelectedNote={isSelectedNote} notePalette={notePalette} onClickPalette={onClickPalette} setBackground={setBackground}
                            selectedNote={selectedNote}
                            onSetIsSelectedNote={onSetIsSelectedNote}
                            onChangeBackgroundColor={onChangeBackgroundColor}
                            note={note} onRemoveNote={onRemoveNote}
                            saveNote={saveNote} onSelectNote={onSelectNote} />

                    </li>
                ))}
            </ul>
        </div>
    )
}
