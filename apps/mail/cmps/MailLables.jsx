const { useState, useEffect, useRef } = React

export function MailLabels({ filterBy, onSetFilterBy, menuIsOpen, onToggleMenu }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {

        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleFolderChange(label) {
        const newFilter = { status: 'inbox', label: label }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, ...newFilter }))
        setTimeout(() => { if (menuIsOpen) onToggleMenu() }, 0)

    }
    return (
        <section className="labels-container flex">
            <div className={`label ${filterBy.label === 'main' ? 'roboto-bold active' : ''}`} onClick={() => handleFolderChange('main')}><span className="material-symbols-outlined">
                inbox
            </span> Main</div>
            <div className={`label ${filterBy.label === 'promoted' ? 'roboto-bold active' : ''}`} onClick={() => handleFolderChange('promoted')}><span className="material-symbols-outlined">
                shoppingmode
            </span> Promoted</div>
            <div className={`label ${filterBy.label === 'social' ? 'roboto-bold active' : ''}`} onClick={() => handleFolderChange('social')}><span className="material-symbols-outlined">
                group
            </span> Social Media</div>
            <div className={`label ${filterBy.label === 'updates' ? 'roboto-bold active' : ''}`} onClick={() => handleFolderChange('updates')}><span className="material-symbols-outlined">
                info
            </span> Updates</div>
        </section>
    )
}