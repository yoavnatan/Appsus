const { Link, useNavigate } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onReadMail, onRemoveMail, onReadMailManuely, onStarMail }) {

    const navigate = useNavigate()

    function onClickMail(mail) {
        if (mail.isDraft) {
            console.log('loading draft')
            navigate('/mail/compose', { state: mail })
        }
        else {
            navigate(`/mail/${mail.id}`)
            onReadMail(mail)
        }
    }

    function onClickManualyRead(ev, mail) {
        ev.stopPropagation()
        console.log(mail)
        onReadMailManuely(mail)
    }

    if (!mails.length) return <div>No mails to show...</div>
    return (
        <ul className="mail-list container">
            {mails.map(mail => (
                <li className={`mail-item ${!mail.isRead ? 'roboto-bold unread' : 'roboto-thin read'}`} key={mail.id}>
                    {/* <Link to={`/mail/${mail.id}`} onClick={() => onReadMail(mail)} ><MailPreview mail={mail} onRemoveMail={onRemoveMail} /></Link> */}
                    <div onClick={() => onClickMail(mail)} ><MailPreview mail={mail} onRemoveMail={onRemoveMail} onStarMail={onStarMail} onClickManualyRead={onClickManualyRead} /></div>
                </li>
            ))}
        </ul>
    )
}
