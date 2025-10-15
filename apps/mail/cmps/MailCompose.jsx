const { useNavigate } = ReactRouterDOM

const { useState } = React

export function MailCompose() {

    const navigate = useNavigate()

    function closeModal() {
        navigate('/mail')
    }


    return (
        <section className="compose-modal">
            <form>
                <button className="close-btn" onClick={closeModal}>X</button>
                <input type="text" className="compose-to" name="compose-to" id="compose-to" placeholder="to"></input>
                <input type="text" className="compose-subject" name="compose-subject" id="compose-subject" placeholder="subject"></input>
                <input type="text" className="compose-message" name="compose-message" id="compose-message" placeholder="message"></input>
                <button className="send-btn">Send</button>
            </form>
        </section>
    )
}