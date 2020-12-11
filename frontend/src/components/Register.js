import React, { useState } from 'react';
import axios from 'axios';

const isDisabled = (form) => !form.password || !form.email || form.password !== form.passwordRepeat;

function Register() {
  const [form, setForm] = useState({ picture: 'mary', parrotsOwned: [], tempValue: { name: '', toy: '' } });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setError('');
    const newForm = {...form};
    const { name, value } = event.target;

    newForm[name] = value;
    setForm(newForm);
  };

  const handleFormSave = () => {
    const { picture, tempValue, ...rest } = form;
    const data = {
      ...rest,
      profilePicDark: `/profile-images/${picture}-dark.png`,
      profilePicLight: `/profile-images/${picture}-light.png`,
    }
    axios.post('http://localhost:3000/register', data)
      .then(res => {
        console.log(res, 'HERE IS RES FROMM SERVER')
      })
      .catch(err => {
        setError(err.response.data.message);
      });
  };

  return (
    <form className="form" onChange={handleInputChange}>
      <label className="form__label">
        Email
        <input type="text" name="email" className="form__input" />
      </label>
      <label className="form__label">
        Password
        <input type="password" name="password" className="form__input" />
      </label>
      <label className="form__label">
        Password repeat
        <input type="password" name="passwordRepeat" className="form__input" />
      </label>
      <label className="form__label">
        Сохранить форму на сервер!
        <button type="button" disabled={isDisabled(form)} onClick={handleFormSave}>Зарегистрироваться</button>
      </label>
      <span className="form__error">{error}</span>
    </form>
  )
}

export default Register;
