import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteModal } from "../cmps/NoteModal.jsx"
import { AddNote } from "../cmps/AddNote.jsx"
import { NoteBackground } from "./NoteBackground.jsx"


const { useState, useEffect, useRef } = React
const { useNavigate, Link, useSearchParams, Outlet } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isAddNote, setIsAddNote] = useState(false)
    const [isChangeNote, setIsChangeNote] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const [lastSelectedNote, setLastSelectedNote] = useState(null)
    const [background, setBackground] = useState(null)
    const [isSelectedNote, setIsSelectedNote] = useState(false)
   
    
    

    useEffect(() => {
        if (!isChangeNote) loadNotes()
            setIsChangeNote(false)
    }, [isChangeNote])

    function loadNotes() {
        noteService.query()
            .then((notes) => {
                setNotes(notes)
                setIsChangeNote(false)
            
            })
            .catch((err) => {
                showErrorMsg('Cannot load notes')
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problem removing note:', err)
                showErrorMsg('Problem removing note!')
            })
    }



    function saveNote(noteToAdd) {
        console.log('save')
        noteService.save(noteToAdd)
            .then((savedNote) => {
                loadNotes()
                showSuccessMsg('note saved successfully!')
            })
            .catch(err => {
                console.log('Cannot save note!:', err)
                showErrorMsg('Cannot save note!')
            })
    }



    function onSetIsAddNote() {
        setIsAddNote(false)
    }

    function onSelectNote(note) {
        setSelectedNote(note)
    }
    function onSetLastSelectedNote(note) {
        setLastSelectedNote(note)
    }

    function onSetIsSelectedNote(isSelected) {
        setIsSelectedNote(isSelected)
    }

   
    function onChangeBackgroundColor(color) {
        const noteToUpdate = {
            ...selectedNote,
            style: {
                ...selectedNote.style,
                backgroundColor: color
            }
        }
        setSelectedNote(noteToUpdate)
    }

    function onCloseModal(selectedNote) {
        if (background) {
            const noteToSave = {
                ...selectedNote,
                style: {
                    ...selectedNote.style,
                    backgroundColor: background
                }
            }
            saveNote(noteToSave)         
        } else {
            saveNote(selectedNote)          
        }
        
        setBackground(null)
        setSelectedNote(null)
        
    }

    return <React.Fragment>
        <section
            className="main-container roboto-thin">
            <section className="note-header">
                <h1>My Notes</h1>
            </section>

            <section className="create-note">
                <AddNote onFocus={() => setIsAddNote(true)} isAddNote={isAddNote} onSetIsAddNote={onSetIsAddNote} saveNote={saveNote} />

            </section>
            <section className="notes-container">
                <NoteList  setBackground={setBackground} selectedNote={selectedNote} onSetIsSelectedNote={onSetIsSelectedNote} onSetLastSelectedNote={onSetLastSelectedNote} lastSelectedNote={lastSelectedNote} onChangeBackgroundColor={onChangeBackgroundColor} notes={notes} onRemoveNote={onRemoveNote} saveNote={saveNote} onSelectNote={onSelectNote} />
            </section>
        </section>
        {selectedNote && <NoteModal  selectedNote={selectedNote} setBackground={setBackground}  isSelectedNote={isSelectedNote} note={selectedNote} onRemoveNote={onRemoveNote} saveNote={saveNote} onCloseModal={onCloseModal} onClose={() => setSelectedNote(null)}  />}
    </React.Fragment>

}
