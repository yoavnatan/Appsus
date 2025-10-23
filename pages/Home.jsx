import { showSuccessMsg } from '../services/event-bus.service.js'
const { Link, NavLink } = ReactRouterDOM

export function Home() {
    return <section className="container home">

        <div className="home-container">

            <NavLink to="/mail" onClick={() => setAppMenuOpen(prevState => !prevState)}><img className="mail-logo" src="./apps/mail/imgs/gmail.png" /></NavLink>
            <NavLink to="/note" onClick={() => setAppMenuOpen(prevState => !prevState)}><img className="note-logo" src="./apps/mail/imgs/keep.png" /></NavLink>


        </div>
    </section>
}