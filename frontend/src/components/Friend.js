import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

import './Friend.css';
import {getHeaders} from '../utils';

function Friend() {
  const { id } = useParams();
  const history = useHistory();
  const [isFetched, setIsFetched] = useState(false);
  const [friend, setFriend] = useState({});

  useEffect(()=> {
    if (isFetched) return;
    axios.get(`http://localhost:3000/users/${id}`, {
      headers: getHeaders(),
    })
      .then(res => {
        setFriend(res.data)
      })
    setIsFetched(true)
  },[isFetched, friend, setIsFetched, setFriend])

  return (
      <div className="friend">
        <div className="friend__card">
          <img className="friend__userpic" src={friend.profilePicLight} alt={friend.name}/>
          <div className="friend__details">
            <h3 className="friend__name">{friend.name}</h3>
            <p className="friend__location">Местоположение: {friend.location}</p>
            <p className="friend__quantity">Количество домашних попугаев: {friend.parrotsOwned && friend.parrotsOwned.length}</p>
            <p className="friend__fav-quote">Любимое высказывание о птицах: "{friend.favBirdQuote}"</p>
          </div>
        </div>
        <button className="button button_type_back" onClick={() => history.goBack()} />
      </div>
  );
}

export default Friend;


