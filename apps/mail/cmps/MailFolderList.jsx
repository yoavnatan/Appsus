const { useState, useEffect } = React

export function MailFolderList({ mails, menuIsOpen, onSetFilterBy, filterBy, mailLabels, onToggleMenu, onToggleMenuFull, menuIsFull, mailCount }) {

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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, ['status']: folder, ['label']: 'main' }))
        setTimeout(() => { if (menuIsOpen) onToggleMenu() }, 0)

    }

    const countURmails = countUnreadMails()

    console.log(filterBy.status)

    return (
        <section className={`mail-folders container ${menuIsFull ? 'full' : ''}`}>
            {!menuIsOpen} <div onClick={onToggleMenuFull}><span className="main-menu material-symbols-outlined">
                menu
            </span></div>
            <nav>
                {menuIsOpen && mailLabels}

                <div className={`mail-folder ${countURmails > 0 ? 'roboto-bold' : 'roboto-thin'} ${filterBy.status === 'inbox' ? 'active' : ''}`}
                    onClick={() => handleFolderChange('inbox')}><span className="material-symbols-outlined inbox">
                        inbox
                    </span>{(menuIsFull || menuIsOpen) && 'Inbox'} {(menuIsFull || menuIsOpen) && <span className="mail-counter">{mailCount}</span>}</div>
                <div className={`mail-folder roboto-thin ${filterBy.status === 'starred' ? 'active' : ''}`} onClick={() => handleFolderChange('starred')}><span className="material-symbols-outlined">
                    star
                </span>{(menuIsFull || menuIsOpen) && 'Starred'}</div>
                <div className={`mail-folder roboto-thin ${filterBy.status === 'trash' ? 'active' : ''}`} onClick={() => handleFolderChange('trash')}><span className="material-symbols-outlined">
                    delete
                </span>{(menuIsFull || menuIsOpen) && 'Trash'}</div>
                <div className={`mail-folder roboto-thin ${filterBy.status === 'sent' ? 'active' : ''}`} onClick={() => handleFolderChange('sent')}><span className="material-symbols-outlined">
                    send
                </span>{(menuIsFull || menuIsOpen) && 'Sent'}</div>
                <div className={`mail-folder roboto-thin ${filterBy.status === 'draft' ? 'active' : ''}`} onClick={() => handleFolderChange('draft')}><span className="material-symbols-outlined">
                    draft
                </span>{(menuIsFull || menuIsOpen) && 'Draft'}</div>
            </nav>

        </section>
    )
}