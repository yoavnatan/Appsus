const { Link, useNavigate } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onReadMail, onRemoveMail }) {

    const navigate = useNavigate()
    function onClickMail(mail) {
        navigate(`/mail/${mail.id}`)
        onReadMail(mail)
    }

    if (!mails.length) return <div>No mails to show...</div>
    return (
        <ul className="mail-list container">
            {mails.map(mail => (
                <li className={`mail-item ${!mail.isRead ? 'roboto-bold unread' : 'roboto-thin'}`} key={mail.id}>
                    {/* <Link to={`/mail/${mail.id}`} onClick={() => onReadMail(mail)} ><MailPreview mail={mail} onRemoveMail={onRemoveMail} /></Link> */}
                    <div onClick={() => onClickMail(mail)} ><MailPreview mail={mail} onRemoveMail={onRemoveMail} /></div>
                </li>
            ))}
        </ul>
    )
}
