export function MailPreview({ mail }) {

    const { subject, body, from, isRead } = mail
    return (
        <article className="mail-preview">
            <h1>{subject}</h1>
            <h2>{body}</h2>
        </article>
    )
}