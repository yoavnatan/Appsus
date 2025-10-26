
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.vendor))
            }
            if (filterBy.minSpeed) {
                notes = notes.filter(note => note.speed >= filterBy.minSpeed)
            }
            // console.log(' cars:', cars)
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    let newNote = ''
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        if (note.type === 'noteImg') {
            const { img } = note.info
            newNote = _createnote('#', '#', img, note.type)
        } else {
            const { txt, title, } = note.info
            newNote = _createnote(title, txt, '#', note.type)
        }
        return storageService.post(NOTE_KEY, newNote)
    }
}


function getEmptyNote(title = '', txt = '') {
    return { title, txt }
}

function getDefaultFilter() {
    return { title: '', txt: '' }
}



function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createnote('Video Ideas', 'Film a short tutorial about STOCKS investing and mix it with real stock clips and chart visuals'),
            _createnote('Sunday Tasks', 'Edit the Plaro video, check client emails, and post daily updates to Discord.'),
            _createnote('Daily Inspiration', 'Don’t wait for motivation — start moving, and motivation will catch up.'),
            _createnote('Daily Inspiration', 'Don’t wait for motivation — start moving, and motivation will catch up.'),
            _createnote('Daily Inspiration', 'Don’t wait for motivation — start moving, and motivation will catch up.'),
            _createnote('Daily Inspiration', 'Don’t wait for motivation — start moving, and motivation will catch up.'),
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createnote(title = 'My Note', txt = 'I am a new note', img = '#', type) {
    let note = {}
    if (type !== 'noteImg') {
        note =
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: type,
            isPinned: false,
            style: {
                backgroundColor: utilService.getRandomColor()
            },
            info: {
                title: title,
                txt: txt,
            }
        }
    } else {
        note =
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: type,
            isPinned: false,
            style: {
                backgroundColor: utilService.getRandomColor()
            },
            info: {
                img: img
            }
        }
    }
    console.log(note)
    return note
}



function getFilterFromSearchParams(searchParams) {
    const title = searchParams.get('title') || ''
    const txt = searchParams.get('txt') || ''
    return {
        title,
        txt
    }
}



function _setNextPrevNoteId(note) {
    return query().then((notes) => {
        const noteIdx = notes.findIndex((currCar) => currCar.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}



