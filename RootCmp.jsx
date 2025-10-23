const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { MailCompose } from './apps/mail/cmps/MailCompose.jsx'
import { MailFolderList } from './apps/mail/cmps/MailFolderList.jsx'
import { Inbox } from './apps/mail/cmps/Inbox.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { AddNote } from './apps/note/cmps/AddNote.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/compose" element={<MailCompose />} />
                </Route>
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/add-note" element={<AddNote />} />
                <Route path="/note/:noteId" element={<AddNote />} />
                {/* <Route path="/note//details/:note.id" element={<AddNote />} /> */}

            </Routes>
            <UserMsg />
        </section>
    </Router>
}
