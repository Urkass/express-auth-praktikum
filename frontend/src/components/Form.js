import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './Form.css';

const PET_PREFIX = 'parrot_';

function Form() {
  const [form, setForm] = useState({ picture: 'mary', parrotsOwned: [], tempValue: { name: '', toy: '' } });
  const history = useHistory();

  const handleInputChange = (event) => {
    const newForm = {...form};
    const { name, value } = event.target;

    if (name.includes(PET_PREFIX)) {
      newForm.tempValue[name.slice(PET_PREFIX.length)] = value;
    } else {
      newForm[name] = value;
    }
    setForm(newForm);
  };

  const handleAddParrot = () => {
    const newForm = {...form};

    const parrot = {
      name: form.tempValue.name,
      favoriteToys: form.tempValue.toy.split(',')
    };

    newForm.parrotsOwned.push(parrot);
    newForm.tempValue = { name: '', toy: '' };
    setForm(newForm);
  };

  const handleFormSave = () => {
    const { picture, tempValue, ...rest } = form;
    const data = {
      ...rest,
      profilePicDark: `/profile-images/${picture}-dark.png`,
      profilePicLight: `/profile-images/${picture}-light.png`,
    }
    axios.post('http://localhost:3000/users', data)
      .then(res => {
        history.push('/friends');
      });
  };

  return (
    <form className="form" onChange={handleInputChange}>
      <label className="form__label">
        Имя друга
        <input type="text" name="name" className="form__input" />
      </label>
      <label className="form__label">
        Местоположение
        <input type="text" name="location" className="form__input" />
      </label>
      <label className="form__label">
        Любимая цитата про попугов
        <input type="text" name="favBirdQuote" className="form__input" />
      </label>
      <label className="form__label">
        Картинка 1
        <input type="radio" defaultChecked name="picture" value="mary" className="form__input" />
      </label>
      <label className="form__label">
        Картинка 2
        <input type="radio" name="picture" value="bill" className="form__input" />
      </label>
      <hr className="form__divider"/>
      <ul>
        {form.parrotsOwned.map((elem, index) => {
          return <li key={elem.name + index}>{elem.name}</li>
        })}
      </ul>
      <label className="form__label">
        Имя попугая
        <input value={form.tempValue.name} type="text" name="parrot_name" className="form__input" />
      </label>
      <label className="form__label">
        Список любимых игрушек через запятую
        <input value={form.tempValue.toy} type="text" name="parrot_toy" className="form__input" />
      </label>
      <label className="form__label">
        Добавить попугая
        <button name="parrot_add" type="button" onClick={handleAddParrot}>+</button>
      </label>
      <hr className="form__divider" />
      <label className="form__label">
        Сохранить форму на сервер!
        <button type="button" onClick={handleFormSave}>Сохранить</button>
      </label>
    </form>
  );
}

export default Form;
