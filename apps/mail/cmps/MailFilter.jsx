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
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, body } = filterByToEdit

    return (
        <section className="mail-filter container">
            <form onSubmit={onSubmitFilter}>
                <input className="search-bar" onChange={handleChange} value={txt} name='txt' id='txt' type="text" placeholder="search"></input>

                {/* <button>Search</button> */}
            </form>
        </section>
    )
}