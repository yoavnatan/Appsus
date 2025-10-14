import { MailList } from "./MailList.jsx"

export function Inbox({ mails, onReadMail }) {
    return (
        <section className="mails-container">
            <MailList mails={mails} onReadMail={onReadMail} />
        </section>
    )
} 