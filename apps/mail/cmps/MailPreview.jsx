export function MailPreview({ mail, onRemoveMail }) {

    const { subject, body, from, isRead, id } = mail
    return (
        <article className={`mail-preview ${!isRead ? 'unread' : 'read'}`}>
            <span className="material-symbols-outlined">
                star
            </span>
            <div>{from}</div>
            <div>{subject}</div>
            <div>{body}</div>
            <span className="material-symbols-outlined btn-remove" onClick={(event) => onRemoveMail(event, id)}>
                delete
            </span>
        </article>
    )
}