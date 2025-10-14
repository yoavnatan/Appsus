import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

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
        navigate('/mail')
    }

    if (isLoading) return <div className="loader">Loading...</div>

    const { subject, body } = mail
    return (

        <section className="mail-details container">

            <div className="mail-subject roboto-bold">{subject}</div>
            <p className="mail-body roboto-thin">{body}</p>
            <span onClick={onBack} className="material-symbols-outlined">
                arrow_back
            </span>
        </section>
    )

}