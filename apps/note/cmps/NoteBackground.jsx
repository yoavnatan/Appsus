const { useState, useEffect, useRef } = React


export function NoteBackground({ setSelectedColorPreview, setSelectedColor, setBackground, onClose }) {

    const colors = ['chalk', 'clay', 'rash', 'dusk', 'storm', 'default']

   
    return (
        <React.Fragment>
            <div className="overlay-pallete" onClick={() => {
                onClose()
            }}></div>
            <div className="color-palette">
                {colors.map(color => (
                    <div
                        key={color}
                        onClick={() => {
                            setBackground(color)
                            setSelectedColor(color)
                        }}
                        className={`color ${color}`}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                    ></div>
                ))}
            </div>
        </React.Fragment>
    )
}