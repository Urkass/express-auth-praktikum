import React, { useState } from 'react';
import axios from 'axios';

function Auth() {
  const [form, setForm] = useState({});
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const newForm = {...form};
    const { name, value } = event.target;

    newForm[name] = value;
    setForm(newForm);
    setError('');
  };

  const handleFormSave = () => {
    const { picture, tempValue, ...rest } = form;
    const data = {
      ...rest,
      profilePicDark: `/profile-images/${picture}-dark.png`,
      profilePicLight: `/profile-images/${picture}-light.png`,
    }
    axios.post('http://localhost:3000/auth', data)
      .then(res => {
        if (res.data.token) {
          document.cookie = `parrotToken=${res.data.token}`;
        }
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
        Отправить форму на сервер!
        <button type="button" disabled={!form.password || !form.email} onClick={handleFormSave}>Войти</button>
      </label>
      <span className="form__error">{error}</span>
    </form>
  )
}

export default Auth;
