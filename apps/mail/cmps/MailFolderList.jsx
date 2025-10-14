const { Link, NavLink } = ReactRouterDOM

export function MailFolderList({ mails, onReadMail, onSetFilterBy, filterBy }) {

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
                <NavLink to="/about" className="mail-folder roboto-thin">Trash</NavLink>
                <NavLink to="/mail" className="mail-folder roboto-thin">Sent</NavLink>
            </nav>

        </section>
    )
}