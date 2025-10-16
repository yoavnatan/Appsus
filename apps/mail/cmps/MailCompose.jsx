import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

const { useNavigate, useOutletContext, useLocation } = ReactRouterDOM

const { useState, useEffect, useRef } = React

export function MailCompose() {

    const location = useLocation();
    console.log(location.state)

    const navigate = useNavigate()
    const [onSendMail, filterBy, setSearchParams, searchParams, onSaveDraft, loadMails, onSetMails] = useOutletContext()
    const [mailToSend, setMailToSend] = useState(location.state ? location.state : mailService.getEmptyMail())
    const intervalIdRef = useRef()
    const mailTosendRef = useRef()

    useEffect(() => {
        if (location.state) setMailToSend(location.state)
        setSearchParams(utilService.cleanObject(filterBy))
        intervalIdRef.current = setInterval(saveDraft, 5000)
        return () => { clearInterval(intervalIdRef.current) }
    }, [])

    useEffect(() => {
        mailTosendRef.current = mailToSend
    }, [mailToSend])

    function closeModal(ev) {
        ev.preventDefault()
        navigate({
            pathname: '/mail',
            search: `${searchParams.toString()}`
        })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setMailToSend(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSubmitCompose(ev) {
        ev.preventDefault()
        onSendMail(mailToSend)
        navigate({
            pathname: '/mail',
            search: `${searchParams.toString()}`
        })
    }

    function saveDraft() {
        onSaveDraft(mailTosendRef.current)
            .then(mail => {
                console.log(mail)
                setMailToSend(mail)
                return mail
            })
            .then(loadMails)
        // .then((mail) => onSetMails(mail))
        // .then(() => navigate({
        //     pathname: '/mail/compose',
        //     search: `${searchParams.toString()}`
        // }))
    }

    return (
        <section className="compose-modal container">
            <form className="compose-modal-form" onSubmit={onSubmitCompose}>
                <button type="button" className="close-btn" onClick={closeModal}>X</button>
                <input type="text" className="compose-to" name="to" id="compose-to" placeholder="to" value={mailToSend.to} onChange={handleChange}></input>
                <input type="text" className="compose-subject" name="subject" id="compose-subject" placeholder="subject" value={mailToSend.subject} onChange={handleChange}></input>
                <textarea className="compose-body" id="compose-message" name="body" rows="10" cols="30" value={mailToSend.body} onChange={handleChange}></textarea>
                <button className="btn-send">Send</button>
            </form>
        </section>
    )
}