export function NotePreview({ note }) {
    return (
        <div className="note-preview">
            <h3>{note.info.title}</h3>
            <p>{note.info.txt}</p>
        </div>
    )
}