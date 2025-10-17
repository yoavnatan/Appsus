import { loggedinUser } from "../services/mail.service.js"
export function MailPreview({ mail, onRemoveMail, onStarMail, onClickManualyRead }) {

    const { subject, body, from, to, isRead, id, isStarred } = mail
    return (
        <article className={`mail-preview container ${!isRead ? 'unread' : 'read'}`}>
            <span className={`material-symbols-outlined ${isStarred && 'starred'}`} onClick={(event) => onStarMail(event, mail)}>
                star
            </span>
            <div>{(mail.to === loggedinUser.email) ? from : `to: ${to}`}</div>
            <div className="body">{subject}<span className="roboto-thin"> - {body}</span></div>
            <div className="symbols container" >
                <span className="material-symbols-outlined" onClick={(event) => onClickManualyRead(event, mail)}>
                    {!isRead ? 'mark_email_unread' : 'drafts'}
                </span>
                <span className="material-symbols-outlined btn-remove" onClick={(event) => onRemoveMail(event, id)}>
                    delete
                </span>
            </div>
        </article>
    )
}