import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

const { useNavigate, useOutletContext } = ReactRouterDOM

const { useState, useEffect } = React

export function MailCompose() {

    const navigate = useNavigate()
    const [onSendMail, filterBy, setSearchParams, searchParams] = useOutletContext()

    const [mailToSend, setMailToSend] = useState(mailService.getEmptyMail())

    useEffect(() => {
        setSearchParams(utilService.cleanObject(filterBy))
    }, [])

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
        console.log('search params: ', searchParams)
        ev.preventDefault()
        onSendMail(mailToSend)
        navigate({
            pathname: '/mail',
            search: `${searchParams.toString()}`
        })

    }


    return (
        <section className="compose-modal container">
            <form className="compose-modal-form" onSubmit={onSubmitCompose}>
                <button type="button" className="close-btn" onClick={closeModal}>X</button>
                <input type="text" className="compose-to" name="to" id="compose-to" placeholder="to" value={mailToSend.to} onChange={handleChange}></input>
                <input type="text" className="compose-subject" name="subject" id="compose-subject" placeholder="subject" value={mailToSend.subject} onChange={handleChange}></input>
                {/* <input type="text" className="compose-message" name="compose-message" id="compose-message" placeholder="message"></input> */}
                <textarea className="compose-body" id="compose-message" name="body" rows="10" cols="30" value={mailToSend.body} onChange={handleChange}></textarea>
                <button className="btn-send">Send</button>
            </form>
        </section>
    )
}