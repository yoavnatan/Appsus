import { NoteTxt } from "./NoteTxt.jsx"


const { Link } = ReactRouterDOM
const { useState, useEffect, useRef } = React


export function NotePreview({ note, saveNote, onRemoveNote }) {

    const [isShowDetails, setIsShowDetails] = useState(false)
    const [selectedColor, setSelectedColor] = useState(note.style.backgroundColor)

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
            case 'color':
                setSelectedColor(value)
                break

            case 'text':
            case 'textarea':

            default:
                value = target.value
                break

        }

    }

    function onChangeBackgroundColor(color) {
        const noteToUpdate = {
            ...note,
            style: {
                ...note.style,
                backgroundColor: color
            }
        }


        saveNote(noteToUpdate)

    }

    function onBlur() {


        onChangeBackgroundColor(selectedColor)

    }


    return (
        <div className="note-preview" style={{ backgroundColor: note.style.backgroundColor }} onClick={() => setIsShowDetails(!isShowDetails)}>
            <h3>{note.info.title}</h3>
            <p>{note.info.txt}</p>
            <section className="note-actions">
                <span className="material-symbols-outlined">
                    edit
                </span>
                <span className="material-symbols-outlined remove" onClick={() => onRemoveNote(note.id)}>
                    remove
                </span>
                <input onChange={handleChange} type="color" name="backgroundColor" value={selectedColor} onBlur={onBlur} ></input>
            </section>
            {isShowDetails && <NoteTxt note={note} onRemoveNote={onRemoveNote} saveNote={saveNote} onClose={() => setIsShowDetails(false)}/>}
        </div>
    )
}