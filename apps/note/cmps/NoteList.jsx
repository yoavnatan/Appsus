

import { NotePreview } from './NotePreview.jsx'
import { NoteBackground } from './NoteBackground.jsx'

const { useEffect, useRef, useState } = React

export function NoteList({ isSelectedNote, setBackground, selectedNote, onSetIsSelectedNote, notes, onRemoveNote, saveNote, onSelectNote, onChangeBackgroundColor }) {

    const [notePalette, setNotePalette] = useState(null)
    const [activeNoteId, setActiveNoteId] = useState(null)

    useEffect(() => {
        if (isSelectedNote) {
            setNotePalette(null)
            setActiveNoteId(null)
        }
    }, [isSelectedNote])


    function onClickPalette(note) {
        setNotePalette(prev => (prev && prev.id === note.id ? null : note))
        setActiveNoteId(prev => (prev === note.id ? null : note.id))
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
