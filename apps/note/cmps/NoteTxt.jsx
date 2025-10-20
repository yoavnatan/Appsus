

const { useState, useEffect, useRef } = React
export function NoteTxt({ note, onRemoveNote, saveNote, onClose }) {

    const [selectedColor, setSelectedColor] = useState(note.style.backgroundColor)

    function handleColorChange({ target }) {
        setSelectedColor(target.value)
        saveNote({
            ...note,
            style: { ...note.style, backgroundColor: target.value },
        })
    }

    return (
        <reactFragment>
            <div className="overlay" onClick={onClose}></div>
            <div className="show-note-txt" style={{ backgroundColor: note.style.backgroundColor }}>

                <h3>{note.info.title}</h3>
                <p>{note.info.txt}</p>
                <section className="note-actions">
                    <span className="material-symbols-outlined">

                        edit
                    </span>
                    <span className="material-symbols-outlined remove" onClick={() => onRemoveNote(note.id)}>
                        remove
                    </span>
                    <input onChange={handleColorChange} type="color" name="backgroundColor" value={selectedColor} ></input>
                </section>
            </div>

        </reactFragment>

    )
}