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
            <div className="label active" onClick={() => handleFolderChange('main')}>Main</div>
            <div className="label" onClick={() => handleFolderChange('promoted')}>Promoted</div>
            <div className="label" onClick={() => handleFolderChange('social')}>Social Media</div>
            <div className="label" onClick={() => handleFolderChange('updates')}>Updates</div>
        </section>
    )
}