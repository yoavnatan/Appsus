import { mailService } from "../services/mail.service.js"
import { unreadMailsCounter } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailLabels } from "../cmps/MailLables.jsx"


const { useState, useEffect, useRef } = React
const { Link, useSearchParams, Outlet } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [sortIsShow, setSortIsShow] = useState(false)
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const sortDir = useRef(filterBy.sortDir)
    const filtrerRef = useRef()
    let unreadMailsCount = useRef()

    useEffect(() => {
        filtrerRef.current = filterBy
        setSearchParams(utilService.cleanObject(filterBy))
        loadMails()
        unreadMailsCount.current = unreadMailsCounter
    }, [filterBy])

    // useEffect(() => {
    //     filtrerRef.current = filterBy
    //     console.log(filtrerRef.current)
    // },[filterBy])

    function loadMails() {
        mailService.query(filtrerRef.current)
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
            .then(() => loadMails())

    }

    function onReadMailManuely(mail) {
        mailService.readManualy(mail)
            .then(() => loadMails())
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function onSendMail(mail) {
        mailService.sendMail(mail)
            .then(() => loadMails())
    }

    function onSaveDraft(mail) {
        return mailService.saveDraft(mail)
            .then(mail => {
                return mail
            })
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

    function onDeleteMail(ev, mailId, mail) {
        ev.stopPropagation()
        if (!mail.isRead) unreadMailsCount.current--
        mailService.deleteMail(mailId)
            .then(() => {
                showSuccessMsg('Mail deleted')
                loadMails()
            })
    }

    function onStarMail(ev, mail) {
        ev.stopPropagation()
        mailService.starMail(mail)
            .then(() => {
                loadMails()
            })

    }

    function onSortBy(sort) {
        setFilterBy(prevFilter => ({ ...prevFilter, ['sortBy']: sort, ['sortDir']: sortDir.current }))
        sort === filterBy.sortBy ? sortDir.current *= -1 : sortDir.current = 1
        console.log(filterBy)
    }

    function onSetMails(mail) {
        setMails(prevMails => [...prevMails, mail])
    }

    function onToggleSortOptions() {
        setSortIsShow(prevStat => !prevStat)
    }

    function onToggleMenu() {
        setMenuIsOpen(prevState => !prevState)
    }

    if (!mails) return <div className="loader">Loading...</div>
    console.log(mails)
    console.log(unreadMailsCount.current)
    return (
        <section className="mail-index roboto-thin">
            <div className={`main-screen ${menuIsOpen ? 'active' : ''}`} onClick={onToggleMenu}></div>
            <MailFilter onToggleMenu={onToggleMenu} onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            <section className="mail-index inner-container">
                <div className={`aside-bar ${menuIsOpen ? 'open' : ''}`}>
                    <Link to='/mail/compose' className="btn btn-compose roboto-bold"><span class="material-symbols-outlined">
                        edit
                    </span> Compose New</Link>
                    <MailFolderList mailCount={unreadMailsCount.current} menuIsOpen={menuIsOpen} mails={mails} onReadMail={onReadMail} onSetFilterBy={onSetFilterBy} filterBy={filterBy} onToggleMenu={onToggleMenu}
                        mailLabels={<MailLabels mails={mails} onSetFilterBy={onSetFilterBy} filterBy={filterBy} menuIsOpen={menuIsOpen} onToggleMenu={onToggleMenu} />} />
                </div>
                <div className="mails-container">
                    <div className="inner-container flex">
                        <div className="sorting">
                            <span className="material-symbols-outlined btn-sort-toggle" onClick={onToggleSortOptions}>
                                swap_vert
                            </span>
                        </div>
                        <section className={`sorting-container ${sortIsShow ? 'open' : 'close'}`}>
                            <button className="btn btn-sort-date" onClick={() => onSortBy('date')}>Date<span className="material-symbols-outlined">
                                {filterBy.sortBy === 'date' && sortDir.current === 1 ? 'keyboard_arrow_up' : filterBy.sortBy === 'date' && 'keyboard_arrow_down'}
                            </span></button>
                            <button className="btn btn-sort-title" onClick={() => onSortBy('title')}>Title<span className="material-symbols-outlined">
                                {filterBy.sortBy === 'title' && sortDir.current === 1 ? 'keyboard_arrow_up' : filterBy.sortBy === 'title' && 'keyboard_arrow_down'}
                            </span></button>
                            <button className="btn btn-sort-from" onClick={() => onSortBy('from')}>From<span className="material-symbols-outlined">
                                {filterBy.sortBy === 'from' && sortDir.current === 1 ? 'keyboard_arrow_up' : filterBy.sortBy === 'from' && 'keyboard_arrow_down'}
                            </span></button>
                        </section>
                    </div>
                    <section className="labels">
                        <div className="labels-menu"><MailLabels mails={mails} onSetFilterBy={onSetFilterBy} filterBy={filterBy} /></div>
                    </section>
                    <MailList mails={mails}
                        onReadMail={onReadMail}
                        onRemoveMail={filterBy.status === 'trash' ? onRemoveMail : onDeleteMail}
                        onStarMail={onStarMail}
                        onReadMailManuely={onReadMailManuely}
                    />
                </div>
            </section>
            <Outlet context={[onSendMail, filterBy, setSearchParams, searchParams, onSaveDraft, loadMails, onSetMails]} />
        </section>
    )
}

