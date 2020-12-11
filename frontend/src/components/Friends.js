import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link } from 'react-router-dom';
import { getHeaders, getCookie } from '../utils';

import './Friends.css';

function Friends() {
  const { path } = useRouteMatch();
  const [friends, setFriends] = useState([]);
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    if (isFetched) return;

    axios.get('http://localhost:3000/users', {
      headers: getHeaders(),
    })
      .then(res => {
        setFriends(res.data);
      });
    setFetched(true);
  },[friends, isFetched, setFetched, setFriends]);

  const renderFriends = () => {
    if (!getCookie()) return null;

    return friends.map((friend) => {
      return (
        <li className="friend-preview" key={friend._id} >
          <Link to={`${path}/${friend.id}`}>
            <img className="friend-preview__image" src={friend.profilePicDark} alt=""/>
            <span className="friend-preview__name">{friend.name}</span>
          </Link>
        </li>
      )
    })
  }

  return (
      <div className="friends">
        <ul className="friends__list">
        {renderFriends()}
        </ul>
      </div>
  );
}

export default Friends;
