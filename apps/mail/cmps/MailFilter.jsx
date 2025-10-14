import { utilService } from "../../../services/util.service.js";

const { useState, useEffect, useRef } = React

export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterByDebounce = useRef(utilService.debounce(onSetFilterBy, 500)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log(value)
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
            case 'radio':
                if (value === 'true') value = true
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, isRead } = filterByToEdit
    console.log(filterBy)

    return (
        <section className="mail-filter container">
            <form onSubmit={onSubmitFilter}>
                <input className="search-bar" onChange={handleChange} value={txt} name='txt' id='txt' type="text" placeholder="search"></input>

                <input type="radio" name="isRead" id="all" value={''} onChange={handleChange} checked={filterBy.isRead === ''} />
                <label htmlFor="all">All</label>

                <input type="radio" name="isRead" id="unread" value={false} onChange={handleChange} checked={filterBy.isRead === false} />
                <label htmlFor="unread">Unread</label>

                <input type="radio" name="isRead" id="read" value={true} onChange={handleChange} checked={filterBy.isRead === true} />
                <label htmlFor="read">read</label>

                {/* <button>Search</button> */}
            </form>
        </section>
    )
}