const { useState, useEffect, useRef } = React


export function NoteBackground({ notePalette, isShowPreviewPalette, saveNote, setSelectedColor, setBackground, onClose }) {

    const colors = ['chalk', 'clay', 'rash', 'dusk', 'storm', 'default']



    function onClickColor(color) {
        let newNote = {}
        if (isShowPreviewPalette) {
            newNote = {
                ...notePalette,
                style: {
                    ...notePalette.style,
                    backgroundColor: color
                }
            }
            saveNote(newNote)
        } else {
            setBackground(color)
            setSelectedColor(color)
        }
    }

    return (
        <React.Fragment>
            <div className="overlay-pallete" onClick={() => {
                onClose()
            }}></div>
            <div
                className="color-palette"
                onClick={(ev) => ev.stopPropagation()}
            >
                {colors.map(color => (
                    <div
                        key={color}
                        onClick={() => onClickColor(color)}
                        className={`color ${color}`}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                    ></div>
                ))}
            </div>

        </React.Fragment>
    )
}