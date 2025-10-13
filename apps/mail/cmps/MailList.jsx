const { Link } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {
    if (!mails.length) return <div>No mails to show...</div>


    return (
        <ul className="mail-list container">
            {mails.map(mail => (
                <li className={`mail-item ${!mail.isRead ? 'roboto-bold unread' : 'roboto-thin'}`} key={mail.id}>
                    <MailPreview mail={mail} />
                </li>
            ))}
        </ul>
    )
}
