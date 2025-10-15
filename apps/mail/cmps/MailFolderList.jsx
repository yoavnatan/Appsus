const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailFolderList({ mails, onReadMail, onSetFilterBy, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        setFilterByToEdit(filterByToEdit)
    }, [filterByToEdit])


    function countUnreadMails() {
        let count = 0
        mails.forEach(mail => { if (!mail.isRead) count++ })
        return count
    }

    const countURmails = countUnreadMails()

    return (
        <section className="mail-folders container">

            <nav>
                <div className={`mail-folder ${countURmails > 0 ? 'roboto-bold' : 'roboto-thin'}`}
                    onClick={() => onSetFilterBy()}>Inbox<span>{countUnreadMails()}</span></div>
                <NavLink to="/mail" className="mail-folder roboto-thin">starred</NavLink>
                <NavLink to="/about" className="mail-folder roboto-thin">Trash</NavLink>
                <NavLink to="/mail" className="mail-folder roboto-thin">Sent</NavLink>
                <NavLink to="/mail" className="mail-folder roboto-thin">draft</NavLink>
            </nav>

        </section>
    )
}