import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Title, SubTitle, Container } from './ContactForm/ContactForm.styled';

const LS_KEY = 'contacts';
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(LS_KEY));

    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length !== 0) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleSubmit = ({ name, number }) => {
    const isExist = contacts.some(contact => contact.name === name);

    if (isExist) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prev => [...prev, { name, number, id: nanoid() }]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = deleteId => {
    setContacts(prevState => {
      const updatedContacts = prevState.filter(
        contact => contact.id !== deleteId
      );
      localStorage.setItem(LS_KEY, JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
    return visibleContacts;
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm sumbit={handleSubmit} />
      <SubTitle>Contacts</SubTitle>
      <Filter value={filter} changeFilter={changeFilter} />
      <ContactList
        contacts={contacts}
        visibleContacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};

export default App;
