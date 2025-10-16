import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"

const { useState, useEffect, useRef } = React
const { Link, useSearchParams, Outlet } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    const sortDir = useRef(1)

    useEffect(() => {
        console.log('filter by:', filterBy)
        setSearchParams(utilService.cleanObject(filterBy))
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('cannot get mails!')
            })
    }

    function onReadMail(mail) {
        mailService.readMail(mail)
            .then(mail => setMails(prevMails => ({ ...prevMails, ...mail })))

    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function countUnreadMails() {
        let count = 0
        mails.forEach(mail => {
            if (!mail.isRead) count++
        })
        return count
    }

    function onSendMail(mail) {
        console.log(mail)
        mailService.sendMail(mail)
            .then(mail => setMails(prevMails => ([...prevMails, mail])))
    }

    function onRemoveMail(ev, mailId) {
        ev.stopPropagation()
        mailService.remove(mailId)
            .then(() => {
                showSuccessMsg('Mail removed')
                setMails(mails => mails.filter(mail => mail.id !== mailId))
            })
            .catch(err => console.log('err', err))
    }

    function onDeleteMail(ev, mailId) {
        ev.stopPropagation()
        mailService.deleteMail(mailId)
            .then(() => {
                showSuccessMsg('Mail deleted')
                loadMails()
            })
    }

    function onSortBy(sort) {
        setFilterBy(prevFilter => ({ ...prevFilter, ['sortBy']: sort, ['sortDir']: sortDir.current }))
        sort === filterBy.sortBy ? sortDir.current *= -1 : sortDir.current = 1
        console.log(filterBy)
    }

    if (!mails) return <div className="loader">Loading...</div>
    console.log(mails)
    return (
        <section className="mail-index roboto-bold">
            <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            <section className="mail-index inner-container flex">
                <div className="aside-bar">
                    <Link to='/mail/compose' className="btn btn-compose">Compose New</Link>
                    <MailFolderList mails={mails} onReadMail={onReadMail} onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
                </div>
                <section className="mails-container">
                    <section className="sorting-container">
                        <button className="btn btn-sort-date" onClick={() => onSortBy('date')}>Date<span class="material-symbols-outlined">
                            {filterBy.sortBy === 'date' && sortDir.current === 1 ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                        </span></button>
                        <button className="btn btn-sort-title" onClick={() => onSortBy('title')}>Title<span class="material-symbols-outlined">
                            {filterBy.sortBy === 'title' && sortDir.current === 1 ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                        </span></button>
                    </section>
                    <MailList mails={mails} onReadMail={onReadMail} onRemoveMail={filterBy.status === 'trash' ? onRemoveMail : onDeleteMail} />
                </section>
            </section>
            <Outlet context={[onSendMail, filterBy, setSearchParams, searchParams]} />
        </section>
    )
}

