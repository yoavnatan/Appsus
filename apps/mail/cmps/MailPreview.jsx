import { utilService } from "../../../services/util.service.js"
import { loggedinUser } from "../services/mail.service.js"
export function MailPreview({ mail, onRemoveMail, onStarMail, onClickManualyRead }) {

    const { subject, body, from, to, isRead, id, isStarred, color, sentAt, createdAt } = mail
    let date
    if (sentAt) {
        date = new Date(sentAt)
        const day = 1000 * 24 * 60 * 60
        if (date - day > 1) date = new Intl.DateTimeFormat('en-Us', { month: 'short', day: 'numeric' }).format(date)
        else date = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    if (createdAt) {
        date = new Date(createdAt)
        const day = 1000 * 24 * 60 * 60
        if (date - day > 1) date = new Intl.DateTimeFormat('en-Us', { month: 'short', day: 'numeric' }).format(date)
        else date = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    return (
        <article className={`mail-preview container ${!isRead ? 'unread' : 'read'}`}>
            <span className={`material-symbols-outlined star ${isStarred ? 'starred' : ''}`} onClick={(event) => onStarMail(event, mail)}>
                star
            </span>
            <div className="preview-circle" style={{ backgroundColor: `var(--color${(color)})` }}>{from && from.slice(0, 1)}</div>
            <div className="from">{(mail.to === loggedinUser.email) ? from : `to: ${to}`}</div>
            <div className="body">{subject}<span className="roboto-thin"> - {body}</span></div>
            <div className="time">{date}
            </div>
            <div className="symbols container" >
                <span className="material-symbols-outlined" onClick={(event) => onClickManualyRead(event, mail)}>
                    {!isRead ? 'mark_email_unread' : 'drafts'}
                </span>
                <span className="material-symbols-outlined btn-remove" onClick={(event) => onRemoveMail(event, id, mail)}>
                    delete
                </span>
            </div>
        </article>
    )
}

