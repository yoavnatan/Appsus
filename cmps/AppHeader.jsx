import { AppMenu } from "./AppMenu.jsx"
const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React


export function AppHeader() {

    const [appMenuOpen, setAppMenuOpen] = useState(false)

    return <header className="app-header">
        <Link to="/">
            <img className="main-logo" src="./assets/img/google.png" />        </Link>
        {/* <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav> */}

        <section className="apps-menu">
            <div onClick={() => setAppMenuOpen(prevState => !prevState)}><span class="material-symbols-outlined">
                apps
            </span></div>
            <div className={`apps-menu-inner ${appMenuOpen ? 'open' : ''}`}>
                {appMenuOpen && <AppMenu setAppMenuOpen={setAppMenuOpen} />}
            </div>
        </section>

    </header>
}

// function AppMenu({ setAppMenuOpen }) {

//     return (
//         <React.Fragment>
//             <NavLink to="/mail" onClick={() => setAppMenuOpen(prevState => !prevState)}><img className="mail-logo" src="./apps/mail/imgs/gmail.png" /></NavLink>
//             <NavLink to="/note" onClick={() => setAppMenuOpen(prevState => !prevState)}><img className="note-logo" src="./apps/mail/imgs/keep.png" /></NavLink>
//         </React.Fragment>
//     )
// }
