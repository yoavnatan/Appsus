
import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function AddNote({ onSetImg, img, isAddNote, onFocus, onSetIsAddNote, saveNote }) {

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
                break
            case 'textarea':
                break
            case 'file':
                handleImageUpload(target)
                return


            default:
                value = target.value
                break
        }

        setNoteToAdd(prevNote => ({
            ...prevNote,
            type: target.type === 'file' ? 'noteImg' : 'noteTxt',
            info: {
                ...(prevNote.info || {}),
                [field]: value
            }
        }))
    }

    function handleImageUpload(target) {
        const file = target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onloadend = () => {
            setNoteToAdd(prevNote => ({
                ...prevNote,
                type: 'noteImg',
                info: {
                    ...(prevNote.info || {}),
                    img: reader.result
                }
            }))
            onSetImg(reader.result)
        }
        reader.readAsDataURL(file)
    }





    function onSaveNote(ev) {
        ev.preventDefault()
        console.log(noteToAdd)
        saveNote(noteToAdd)
        onSetIsAddNote()
        onSetImg(null)

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
                {img && <img src={img} alt="note" className="note-image" />}
                {!img && <input

                    onChange={handleChange}
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="note-title"
                    id="note-title"
                />}

                {!img && <textarea

                    onChange={handleChange}
                    name="txt"
                    placeholder="Add your text..."
                    className="note-body"
                    id="note-txt"
                />}

                <button className="save-btn">Save</button>
            </form>
            <div className="note-actions">
                <label htmlFor="note-image" className="upload-img">
                    <span className="material-symbols-outlined">
                        photo_camera_back
                    </span>
                </label>
                <input
                    className="none"
                    name="img"
                    id="note-image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>
        </section>

    )
}