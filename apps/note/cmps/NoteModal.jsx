import { NoteBackground } from "./NoteBackground.jsx"


const { useState, useEffect } = React

export function NoteModal({ setBackground, onSetIsPinned, note, onRemoveNote, selectedNote, onClose, onCloseModal }) {

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


  return (
    <React.Fragment>
      <div className="overlay-modal roboto" onClick={() => {
        onCloseModal(noteToShow)
      }}
      ></div>
      {noteToShow.type !== 'noteImg' && <div className={`
      ${selectedColor ? selectedColor : selectedNote.style.backgroundColor} 
      ${selectedNote && selectedNote.id === note.id ? 'selected-note ' : ''} 
       note-show-modal `}
        onClick={(ev) => ev.stopPropagation()}
      >
        <span className="material-symbols-outlined pinned-btn"
          onClick={onSetIsPinned(noteToShow)}>
          keep
        </span>
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
      </div>}

      {noteToShow.type === 'noteImg' && <div className={`
      ${selectedColor ? selectedColor : selectedNote.style.backgroundColor} 
      ${selectedNote && selectedNote.id === note.id ? 'selected-note ' : ''} 
       note-show-modal img-modal `}
        onClick={(ev) => ev.stopPropagation()}
      >
        <img src={note.info.img} alt="note" className="note-image-modal" />
        <form className="form-show-modal"
          onSubmit={(ev) => {
            ev.preventDefault()
            onCloseModal(noteToShow)
          }}>

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
      </div >}
    </React.Fragment >
  )
}
