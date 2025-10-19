import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link, useOutletContext } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailDetails({ children }) {

    const [setIsReadMail] = useOutletContext()


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
            .then(mail => setMail(mail))
            .catch(err => console.log('err', err))
            .finally(() => setIsLoading(false))
    }

    function onBack() {
        setIsReadMail(false)
        navigate('/mail')
    }

    function onUnreadManualy() {
        toggleRead.current = toggleRead.current === 'read' ? 'unread' : 'read'
        mailService.get(params.mailId)
            .then(mailService.readManualy)
            .then(mail => setMail(mail))
    }

    if (isLoading) return <div className="loader"></div>

    const { subject, body } = mail
    return (

        <section className="mail-details container">
            {children}
            <div className="mail-subject roboto-bold">{subject}</div>
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