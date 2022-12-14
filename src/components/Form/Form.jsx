import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { add, getContacts } from '../../redux/contactSlice';

export default function Form({onSubmit}) {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const nameInputId = nanoid();
    const phoneInputId = nanoid();

    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);

    const pushDataToArr = contact => {
        dispatch(add(contact));
    };

    const handleInputsChange = e => {
        switch (e.currentTarget.name) {
            case 'name':
                setName(e.currentTarget.value);
                break;

            case 'number':
                setNumber(e.currentTarget.value);
                break;

            default:
                return;
        }
    }

    const formSubmitHandler = data => {
        //  check the same contact
        const normalizedName = data.name.toLowerCase();
    
        const isTheSame = contacts.find(
            contact => contact.name.toLowerCase() === normalizedName
        );
    
        if (isTheSame) {
            alert(`${isTheSame.name} is already in contacts`);
            return;
        }
    
        data.id = nanoid();
        pushDataToArr(data);
};

    const handleSubmit = e => {
        e.preventDefault()

        formSubmitHandler({name, number})

        resetForm()
    }

    const resetForm = () => {
        setName('')
        setNumber('')
    }

        return (
            <form onSubmit={handleSubmit}>
                <h1>Phonebook</h1>
                <label htmlFor={nameInputId}>Name
                <input
                    id={nameInputId}
                    value={name}
                    onChange={handleInputsChange}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
                </label>
                <label htmlFor={phoneInputId}>Number
                <input
                    id={phoneInputId}
                    value={number}
                    onChange={handleInputsChange}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
                </label>
                <button type="submit">Add contact</button>
            </form>
        )
}