

const { useState, useEffect, useRef } = React


export function NotePreview({ note, saveNote, onRemoveNote, onSelectNote }) {

    // const [isShowDetails, setIsShowDetails] = useState(false)
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
        <div className="note-preview" style={{ backgroundColor: note.style.backgroundColor }} onClick={() => onSelectNote(note) }>
            <h3>{note.info.title}</h3>
            <p>{note.info.txt}</p>
            <section className="note-actions">
                <span className="material-symbols-outlined"
                onClick={(ev) => {
                        ev.stopPropagation()
                        onRemoveNote(note.id)
                    }}>
                    delete
                </span>

                <input
                    onClick={(ev) => ev.stopPropagation()}
                    onChange={handleChange}
                    type="color"
                    name="backgroundColor"
                    value={selectedColor}
                    onBlur={onBlur}
                />

            </section>
        </div>
    )
}