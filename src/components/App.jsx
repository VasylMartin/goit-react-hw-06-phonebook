import { useState, useEffect } from "react";
import Form from "./Form/Form";
import { ContactList } from "./ContactList/ContactList";
import { FormFiler } from "./FormFilter/FormFilter";
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) ?? [])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  }

  const pushDataToArr = contact => {
    setContacts(prevState => [contact, ...prevState]);
  };

  const onFormSubmit = data => {
    const isTheSame = contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    )
    if (isTheSame) {
      alert(`${isTheSame.name} is already in contacts`)
      return
    }

    data.id = nanoid();
    pushDataToArr(data)
  }

  const deleteContact = toDeleteId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== toDeleteId)
    );
  };

  
    const normalizedFilter = filter.toLocaleLowerCase()
    const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))

    return (
      <>
        <Form onSubmit={onFormSubmit}/>
        <FormFiler value={filter} onChange={changeFilter}/>
        <ContactList contacts={visibleContacts} onDeleteContact={deleteContact}/>
      </>
    )
};