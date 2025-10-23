const { Link, NavLink } = ReactRouterDOM

export function AppMenu({ setAppMenuOpen }) {

    return (
        <React.Fragment>
            <NavLink to="/mail" onClick={() => setAppMenuOpen(prevState => !prevState)}><img className="mail-logo" src="./apps/mail/imgs/gmail.png" /></NavLink>
            <NavLink to="/note" onClick={() => setAppMenuOpen(prevState => !prevState)}><img className="note-logo" src="./apps/mail/imgs/keep.png" /></NavLink>
        </React.Fragment>
    )
}