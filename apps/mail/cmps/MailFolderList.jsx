const { Link, NavLink } = ReactRouterDOM

export function MailFolderList({ mails, onReadMail }) {

    function countUnreadMails() {
        let count = 0
        mails.forEach(mail => { if (!mail.isRead) count++ })
        return count
    }

    return (
        <section className="mail-folders container">

            <nav>
                <NavLink to="/mail/inbox">Inbox<span>{countUnreadMails()}</span></NavLink>
                <NavLink to="/about">Trash</NavLink>
                <NavLink to="/mail">Sent</NavLink>
            </nav>

        </section>
    )
}