import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, Input, Button, Label } from '../ContactForm/ContactForm.styled';

const nameId = nanoid();
const numberId = nanoid();

const ContactForm = ({ sumbit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    sumbit({ name, number });

    form.reset();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={nameId}>Name</Label>
      <Input
        type="text"
        name="name"
        id={nameId}
        onChange={handleChange}
        required
      />

      <Label htmlFor={numberId}>Number</Label>
      <Input
        type="tel"
        name="number"
        id={numberId}
        onChange={handleChange}
        required
      />

      <Button type="submit">Add contact</Button>
    </Form>
  );
};

export default ContactForm;
