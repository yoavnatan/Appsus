const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailFolderList({ mails, onReadMail, onSetFilterBy, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function countUnreadMails() {
        let count = 0
        mails.forEach(mail => { if (!mail.isRead) count++ })
        return count
    }

    function handleFolderChange(folder) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, ['status']: folder }))


    }

    const countURmails = countUnreadMails()

    return (
        <section className="mail-folders container">

            <nav>
                <div className={`mail-folder ${countURmails > 0 ? 'roboto-bold' : 'roboto-thin'}`}
                    onClick={() => handleFolderChange('inbox')}>Inbox<span>{countUnreadMails()}</span></div>
                <div className="mail-folder roboto-thin" onClick={() => handleFolderChange('starred')}>starred</div>
                <div className="mail-folder roboto-thin" onClick={() => handleFolderChange('trash')}>Trash</div>
                <div className="mail-folder roboto-thin" onClick={() => handleFolderChange('sent')}>Sent</div>
                <div className="mail-folder roboto-thin">draft</div>
            </nav>

        </section>
    )
}