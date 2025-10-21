

// const { useState, useEffect, useRef } = React
// export function NoteTxt({ note, onRemoveNote, saveNote, onClose }) {

//     const [selectedColor, setSelectedColor] = useState(note.style.backgroundColor)

//     function handleColorChange({ target }) {
//         setSelectedColor(target.value)
//         saveNote({
//             ...note,
//             style: { ...note.style, backgroundColor: target.value },
//         })
//     }

//     return (
//         <reactFragment>
//             <div className="overlay" onClick={onClose}></div>
//             <div className="show-note-txt" style={{ backgroundColor: note.style.backgroundColor }}>

//                 <h3>{note.info.title}</h3>
//                 <p>{note.info.txt}</p>
//                 <section className="note-actions">
//                     <span className="material-symbols-outlined">

//                         edit
//                     </span>
//                     <span className="material-symbols-outlined remove" onClick={() => onRemoveNote(note.id)}>
//                         remove
//                     </span>
//                     <input onChange={handleColorChange} type="color" name="backgroundColor" value={selectedColor} ></input>
//                 </section>
//             </div>

//         </reactFragment>

//     )
// }



import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"


const { useNavigate, useParams, Link } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function NoteModal({ note, onClose, saveNote })
{

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [isLoading, setIsLoading] = useState(false)
    
   


    useEffect(() => {
        if (note) loadnote()
    }, [])


    function loadnote() {
        setIsLoading(true)
        noteService.get(note.id)
            .then(note => setNoteToAdd(note))
            .catch(err => console.log('err:', err))
            .finally(() => setIsLoading(false))
    }

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
        saveNote( noteToAdd)
        onSetIsShowDetails()
    }

 
    if (isLoading) return <div> Loading...</div>

    const { title, txt } = noteToAdd.info ? noteToAdd.info : noteToAdd

    return (
        <section className="create-note-modal" >
            <h1>{note && note.id ? 'Edit' : 'Add'} note</h1>
            <form onSubmit={onSaveNote} className="note-form">
                <input
                    value={title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="note-title"
                    id="note-title" 
                />

                <textarea
                    value={txt}
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