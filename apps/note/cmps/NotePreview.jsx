import { NoteBackground } from "./NoteBackground.jsx"


const { useState, useEffect, useRef } = React


export function NotePreview({ selectedNote,setBackground, onSetIsSelectedNote, onSetLastSelectedNote, note, onRemoveNote, onSelectNote, }) {

    const [isShowPalette, setIsShowPalette] = useState(false)
    const [selectedColorPreview, setSelectedColorPreview] = useState(note.style.backgroundColor)


    useEffect(() => {
        setIsShowPalette(false)
    }, [])
    return (
        <React.Fragment>
            <div className={`note-preview ${note.style.backgroundColor}            
            `}
                onClick={() => {
                    if (isShowPalette) return
                    onSelectNote(note)
                    onSetLastSelectedNote(note)
                    onSetIsSelectedNote(true)
                }
                }
            >
                <h3>{note.info.title}</h3>
                <p>{note.info.txt}</p>
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
                        setIsShowPalette(!isShowPalette)

                    }}>
                        palette
                    </span>
                    {isShowPalette && <NoteBackground selectedNote={selectedNote} setSelectedColorPreview={setSelectedColorPreview} setBackground={setBackground} onClose={() => setIsShowPalette(false)}/>}
                </section>
            </div>
        </React.Fragment>
    )
}
