import React from 'react';
import './App.css';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Friends from './Friends';
import Friend from './Friend';
import Dashboard from './Dashboard';
import PageNotFound from './PageNotFound';
import Form from './Form';
import Register from './Register';
import Auth from './Auth';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className="header">
          <NavLink to='/' className="header__logo">Parrot Friendship Society</NavLink>
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__list-item"><NavLink className="menu__link" to='/friends'>Друзья</NavLink></li>
              <li className="menu__list-item"><NavLink className="menu__link" to='/create'>Новый друг</NavLink></li>
              <li className="menu__list-item"><NavLink className="menu__link" to='/register'>Зарегистрироваться</NavLink></li>
              <li className="menu__list-item"><NavLink className="menu__link" to='/auth'>Авторизоваться</NavLink></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route exact path={['/', '/index.html']}>
            <Dashboard />
          </Route>
          <Route exact path='/friends'>
            <Friends />
          </Route>
          <Route path='/friends/:id'>
            <Friend />
          </Route>
          <Route path='/create'>
            <Form />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
