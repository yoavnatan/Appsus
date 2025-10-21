
import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function AddNote({ isAddNote, onFocus, onSetIsAddNote, saveNote }) {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            case 'text':
            case 'textarea':
            default:
                value = target.value
                break
        }

        setNoteToAdd(prevNote => ({
            ...prevNote,
            info: {
                ...(prevNote.info || {}),
                [field]: value
            }
        }))
    }


    function onSaveNote(ev) {
        ev.preventDefault()
        saveNote(noteToAdd)
        onSetIsAddNote()
    }

    if (!isAddNote) return (
        <section className="create-note-preview">
            <input
                type="text"
                placeholder="add a new note..."
                className="create-note-input"
                onFocus={onFocus}
            />
        </section>


    )

    return (
        <section className="create-note-modal" >
            <h1>note</h1>
            <form onSubmit={onSaveNote} className="note-form">
                <input
                    
                    onChange={handleChange}
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="note-title"
                    id="note-title"
                />

                <textarea
                    
                    onChange={handleChange}
                    name="txt"
                    placeholder="Add your text..."
                    className="note-body"
                    id="note-txt"
                />

                <div className="note-actions">
                    <button className="save-btn">Save</button>
                </div>
            </form>
        </section>

    )
}