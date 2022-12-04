import { useSelector, useDispatch  } from 'react-redux';
import { getContacts, getFilter, remove } from '../../redux/contactSlice';


export const ContactList = () => {

    const contacts = useSelector(getContacts);
    const reduxFilter = useSelector(getFilter);

    const normalizedFilter = reduxFilter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
    );

    const dispatch = useDispatch();

    const deleteContact = toDeleteId => {
        dispatch(remove(toDeleteId));
    };

    return (
        <div>
            <h2>Contacts</h2>
                <ul>
                    {filteredContacts.map(({name, id, number}) => (
                            <li name={name}
                                key={id}
                                >{name}: {number}
                                <button onClick={() => deleteContact(id)}>Delete</button>
                                </li>
                    )
                    )}
                </ul>
        </div>
        
    )
}