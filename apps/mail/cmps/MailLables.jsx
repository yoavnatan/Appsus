const { useState, useEffect, useRef } = React

export function MailLabels({ filterBy, onSetFilterBy, menuIsOpen, onToggleMenu }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleFolderChange(label) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, ['label']: label }))
        setTimeout(() => { if (menuIsOpen) onToggleMenu() }, 0)

    }

    return (
        <section className="labels-container flex">
            <div className={`label ${filterByToEdit.label === 'main' ? 'roboto-bold active' : ''}`} onClick={() => handleFolderChange('main')}><span class="material-symbols-outlined">
                inbox
            </span> Main</div>
            <div className={`label ${filterByToEdit.label === 'promoted' ? 'roboto-bold active' : ''}`} onClick={() => handleFolderChange('promoted')}><span class="material-symbols-outlined">
                shoppingmode
            </span> Promoted</div>
            <div className={`label ${filterByToEdit.label === 'social' ? 'roboto-bold active' : ''}`} onClick={() => handleFolderChange('social')}><span class="material-symbols-outlined">
                group
            </span> Social Media</div>
            <div className={`label ${filterByToEdit.label === 'updates' ? 'roboto-bold active' : ''}`} onClick={() => handleFolderChange('updates')}><span class="material-symbols-outlined">
                info
            </span> Updates</div>
        </section>
    )
}