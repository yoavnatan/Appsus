import { NoteBackground } from "./NoteBackground.jsx"


const { useState, useEffect } = React

export function NoteModal({setBackground, isSelectedNote, background, note, onRemoveNote, selectedNote, onClose, onCloseModal, onChangeBackgroundColor }) {

  const [selectedColor, setSelectedColor] = useState(selectedNote.style.backgroundColor)
  const [isShowPalette, setIsShowPalette] = useState(false)
  const [noteToShow, setNoteToShow] = useState(() => ({
    ...note,
    info: { ...note.info },
    style: { ...note.style }
  }))


  useEffect(() => {
  }, [selectedColor])

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


  console.log(selectedColor)
  return (
    <React.Fragment>
      <div className="overlay-modal roboto" onClick={() => {
        onClose()
      }}
      ></div>
      <div className={`
      ${selectedColor ? selectedColor : selectedNote.style.backgroundColor} 
      ${selectedNote && selectedNote.id === note.id ? 'selected-note ' : ''} 
       note-show-modal `}
        onClick={(ev) => ev.stopPropagation()}
      >
        <form className="form-show-modal"
          onSubmit={(ev) => {
            ev.preventDefault()
            onCloseModal(noteToShow)
          }}>
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
          <span className="material-symbols-outlined" onClick={() => setIsShowPalette(true)}>
            palette
          </span>
          {isShowPalette && <NoteBackground setSelectedColor={setSelectedColor} setBackground={setBackground} note={note} onClose={() => setIsShowPalette(false)} />}
        </section>
      </div>
    </React.Fragment>
  )
}
