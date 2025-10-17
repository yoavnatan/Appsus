const { useState, useEffect, useRef } = React

export function MailLabels({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleFolderChange(label) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, ['label']: label }))
    }

    return (
        <section className="labels-container flex">
            <div className={`label ${filterByToEdit.label === 'main' ? 'active' : ''}`} onClick={() => handleFolderChange('main')}>Main</div>
            <div className={`label ${filterByToEdit.label === 'promoted' ? 'active' : ''}`} onClick={() => handleFolderChange('promoted')}>Promoted</div>
            <div className={`label ${filterByToEdit.label === 'social' ? 'active' : ''}`} onClick={() => handleFolderChange('social')}>Social Media</div>
            <div className={`label ${filterByToEdit.label === 'updates' ? 'active' : ''}`} onClick={() => handleFolderChange('updates')}>Updates</div>
        </section>
    )
}