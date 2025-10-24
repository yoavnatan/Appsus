import { NoteBackground } from "./NoteBackground.jsx"


const { useState, useEffect, useRef } = React


export function NotePreview({ isSelectedNote,notePalette, onClickPalette, saveNote, selectedNote, setBackground, onSetIsSelectedNote, note, onRemoveNote, onSelectNote, }) {

    const [isShowPreviewPalette, setIsShowPreviewPalette] = useState(false)
    const [selectedColorPreview, setSelectedColorPreview] = useState(note.style.backgroundColor)






    useEffect(() => {
        setIsShowPreviewPalette(false)
        setSelectedColorPreview(null)

    }, [])



    function onClickPreview() {
        setIsShowPreviewPalette(false)
        onSelectNote(note)
        onSetIsSelectedNote(true)
    }



    function onSetIsShowPalette() {
        setIsShowPreviewPalette(!isShowPreviewPalette)
    }
   
    return (
        <React.Fragment>
            <div className={`note-preview ${selectedColorPreview ? selectedColorPreview : note.style.backgroundColor}            
            `}
                onClick={onClickPreview}
            >
                <h3>{note.info.title && note.info.title}</h3>
                <p>{note.info.txt && note.info.txt}</p>
                {note.info.img && (
                    <img src={note.info.img} alt="note" className="note-image" />
                )}
                <section className="note-actions-preview">
                    <span className="material-symbols-outlined"
                        onClick={(ev) => {
                            ev.stopPropagation()
                            onRemoveNote(note.id)
                        }}>
                        delete
                    </span>
                    <span className="material-symbols-outlined palette" onClick={(ev) => {
                        ev.stopPropagation()
                        onClickPalette(note)
                        setIsShowPreviewPalette(!isShowPreviewPalette)

                    }}>
                        palette
                    </span>
                    {isShowPreviewPalette  && notePalette.id  === note.id && <NoteBackground onSetIsShowPalette={onSetIsShowPalette} notePalette={notePalette} isShowPreviewPalette={isShowPreviewPalette} saveNote={saveNote} selectedNote={selectedNote} setSelectedColorPreview={setSelectedColorPreview} setBackground={setBackground} onClose={() => setIsShowPreviewPalette(false)} setSelectedColor={setSelectedColorPreview} />}
                </section>
            </div>
        </React.Fragment>
    )
}
