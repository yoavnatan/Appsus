const { useState, useEffect } = React

export function NoteModal({ note, onRemoveNote, saveNote, onClose }) {

  const [selectedColor, setSelectedColor] = useState(note.style.backgroundColor)
  const [noteToShow, setNoteToShow] = useState(() => ({
    ...note,
    info: { ...note.info },
    style: { ...note.style }
  }))


  function handleColorChange({ target }) {
    const newColor = target.value
    setSelectedColor(newColor)
    setNoteToShow(prev => ({
      ...prev,
      style: { ...prev.style, backgroundColor: newColor }
    }))
    saveNote(noteToShow)
  }

  function handleChange({ target }) {
    const field = target.name
    const value =
      target.type === 'checkbox'
        ? target.checked
        : target.type === 'range'
          ? +target.value
          : target.value

    setNoteToShow(prev => ({
      ...prev,
      info: {
        ...prev.info,
        [field]: value
      }
    }))
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    saveNote(noteToShow)
    onClose()
  }

  return (
    <React.Fragment>
      <div className="overlay-modal roboto" onClick={() => onClose()} ></div>
      <div
        className="note-show-modal"
        onClick={(ev) => ev.stopPropagation()}
        style={{ backgroundColor: noteToShow.style.backgroundColor }}
      >
        <form onSubmit={onSaveNote} className="form-show-modal">
          <input
            value={noteToShow.info.title || ''}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Title"
            className="note-title-modal "
            id="note-title"
          />

          <textarea
            value={noteToShow.info.txt || ''}
            onChange={handleChange}
            name="txt"
            placeholder="Add your text..."
            className="note-body-Modal"
            id="note-txt"
          />

          <div className="note-actions-modal">
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>

        <section className="note-actions-modal">
          <span
            className="material-symbols-outlined"
            onClick={(ev) => {
              ev.stopPropagation()
              onRemoveNote(note.id)
              onClose()
            }}
          >
            delete
          </span>

          <input
            onChange={handleColorChange}
            type="color"
            name="backgroundColor"
            className="note-color-input-modal"
            value={selectedColor}
          />
        </section>
      </div>
    </React.Fragment>
  )
}
