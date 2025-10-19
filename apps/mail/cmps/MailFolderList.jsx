const { useState, useEffect, useRef } = React

export function MailFolderList({ mails, menuIsOpen, onSetFilterBy, filterBy, mailLabels, onToggleMenu, mailCount }) {

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
        setTimeout(() => { if (menuIsOpen) onToggleMenu() }, 0)

    }

    const countURmails = countUnreadMails()

    return (
        <section className="mail-folders container">

            <nav>
                {menuIsOpen && mailLabels}
                <div className={`mail-folder ${countURmails > 0 ? 'roboto-bold' : 'roboto-thin'} ${filterByToEdit.status === 'inbox' ? 'active' : ''} `}
                    onClick={() => handleFolderChange('inbox')}><span className="material-symbols-outlined inbox">
                        inbox
                    </span>Inbox<span className="mail-counter">{mailCount}</span></div>
                <div className={`mail-folder roboto-thin ${filterByToEdit.status === 'starred' ? 'active' : ''}`} onClick={() => handleFolderChange('starred')}><span className="material-symbols-outlined">
                    star
                </span>starred</div>
                <div className={`mail-folder roboto-thin ${filterByToEdit.status === 'trash' ? 'active' : ''}`} onClick={() => handleFolderChange('trash')}><span className="material-symbols-outlined">
                    delete
                </span>Trash</div>
                <div className={`mail-folder roboto-thin ${filterByToEdit.status === 'sent' ? 'active' : ''}`} onClick={() => handleFolderChange('sent')}><span className="material-symbols-outlined">
                    send
                </span>Sent</div>
                <div className={`mail-folder roboto-thin ${filterByToEdit.status === 'draft' ? 'active' : ''}`} onClick={() => handleFolderChange('draft')}><span className="material-symbols-outlined">
                    draft
                </span>draft</div>
            </nav>

        </section>
    )
}