import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice/operations.contacts';
import { getContacts } from 'redux/contactsSlice/selector.contacts';
// import PropTypes from 'prop-types'
import s from './ContactForm.module.scss'

export const ContactForm = () => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const formFields = { name: setName, phone: setPhone };
  const { items } = useSelector(getContacts);
  const dispatch = useDispatch();
  const onInputChange = evt => {
    const { name, value } = evt.currentTarget;
    formFields[name](value);
  }

  const onSubmitForm = evt => {
    evt.preventDefault();
    const searchingName = name.toLowerCase();
    if (items.some(item => item.name.toLowerCase() === searchingName)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name, phone }));
    Object.values(formFields).forEach(setField => setField(''));
  }

  return (
    <form className={s.form} onSubmit={onSubmitForm}>
      <label>Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onInputChange}
        />
      </label>
      <label>Number
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={onInputChange}
        />
      </label>
      <button type='submit'>Add contact</button>
    </form>
  )
}

// ContactForm.propTypes = {}

export default ContactForm
