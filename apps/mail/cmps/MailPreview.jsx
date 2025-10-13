export function MailPreview({ mail }) {

    const { subject, body, from, isRead } = mail
    return (
        <article className={`mail-preview ${!isRead ? 'unread' : 'read'}`}>
            <span className="material-symbols-outlined">
                star
            </span>
            <div>{from}</div>
            <div>{subject}</div>
            <div>{body}</div>

        </article>
    )
}