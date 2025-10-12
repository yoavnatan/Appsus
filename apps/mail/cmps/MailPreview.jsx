export function MailPreview({ mail }) {

    const { subject, body, from, isRead } = mail
    return (
        <article className="mail-preview">
            <span className="material-symbols-outlined">
                star
            </span>
            <div>{subject}</div>
        </article>
    )
}