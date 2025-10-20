import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteTxt } from "../cmps/NoteTxt.jsx"
import { AddNote } from "../cmps/AddNote.jsx"

const { useState, useEffect, useRef } = React
const { useNavigate, Link, useSearchParams, Outlet } = ReactRouterDOM



export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isAddNote, setIsAddNote] = useState(false)

    useEffect(() => {
        if (!isAddNote) loadNotes()
    }, [isAddNote])

    function loadNotes() {
        noteService.query()
            .then((notes) => {
                setNotes(notes)
                console.log('notes loaded:', notes)
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



    function saveNote( noteToAdd) {

       
    
        
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

    return <section
        className="main-container roboto-thin">
        <section className="note-header">
            <h1>My Notes</h1>
        </section>

        <section className="create-note">
            <AddNote onFocus={() => setIsAddNote(true)} isAddNote={isAddNote} onSetIsAddNote={onSetIsAddNote} saveNote={saveNote}/>

        </section>
        <section className="notes-container">
            <NoteList notes={notes} onRemoveNote={onRemoveNote} saveNote={saveNote}  />
        </section>
    </section>
}
