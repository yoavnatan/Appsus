import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(utilService.cleanObject(filterBy))
        loadMails()
    }, [filterBy])

    function loadMails() {
        console.log(filterBy)
        mailService.query(filterBy)
            .then(mails => {
                console.log(mails)
                setMails(mails)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('cannot get mails!')
            })
    }

    function onReadMail(mail) {
        mailService.readMail(mail)
        setMails(mails)
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

    if (!mails) return <div className="loader">Loading...</div>
    return (
        <section className="mail-index">
            <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
            <section className="mail-index inner-container flex">
                <div className="mail-folders container">
                    <div className="roboto-bold mail-folder inbox">Inbox {countUnreadMails()}</div>
                    <div className="roboto-bold mail-folder inbox">trash </div>
                </div>
                <section className="mails-container">
                    <MailList mails={mails} onReadMail={onReadMail} />
                </section>
            </section>
        </section>
    )
}

