import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link, } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailDetails() {

    // const [setIsReadMail] = useOutletContext()


    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    let toggleRead = useRef('read')
    useEffect(() => {
        loadMail()
    }, [params.mailId])


    function loadMail() {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mailService.getMailDate)
            .then(mail => setMail(mail))
            .catch(err => console.log('err', err))
            .finally(() => setIsLoading(false))
    }

    function onBack() {
        // setIsReadMail(false)
        navigate('/mail')
    }

    function onUnreadManualy() {
        toggleRead.current = toggleRead.current === 'read' ? 'unread' : 'read'
        mailService.get(params.mailId)
            .then(mailService.readManualy)
            .then(mail => setMail(mail))
    }

    if (isLoading) return <div className="loader"></div>

    const { subject, body, date, from } = mail
    return (

        <section className="mail-details container roboto-thin">
            <div className="flex">
                <div className="btn-prev"><Link to={`/mail/${mail.prevMailId}`}><span className="material-symbols-outlined">
                    chevron_left
                </span></Link></div>
                <div className="btn-next"><Link to={`/mail/${mail.nextMailId}`}><span className="material-symbols-outlined">
                    chevron_right
                </span></Link></div>
            </div>
            <div className="mail-subject roboto-bold">{subject}</div>
            <div className="mail-sender">from: <span className="roboto-bold">{from}</span></div>
            <div className="mail-date">{date}</div>
            <p className="mail-body roboto-thin">{body}</p>
            <span onClick={onBack} className="btn-back material-symbols-outlined">
                arrow_back
            </span>
            <span className="btn-toggle-read material-symbols-outlined" onClick={onUnreadManualy}>
                {toggleRead.current === 'read' ? 'drafts' : 'mark_email_unread'}
            </span>

        </section>
    )

}