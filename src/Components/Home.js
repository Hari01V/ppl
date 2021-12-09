import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';

import Navbar from "./Navbar";
import UserCard from "./UserCard";
import Spinner from "./Spinner";
import Filter from "./Filter";

import { getNRandomUsers } from '../api/index';
import firebase from '../Firebase/firebase';
import { app } from "../Firebase/firebase";
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore/lite'

import { Segment, Radio, Header } from 'semantic-ui-react';

import '../styles/Home.css';

const FETCH_SIZE = 20;

const Home = (props) => {
  // const { user } = props;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        if (!isLoading) {
          fetchUsers(FETCH_SIZE);
        }
      } else {
        navigate('/login');
      }
    });
  }, []);

  const fetchUsers = async (n) => {
    setIsLoading(true);
    const usersData = await getNRandomUsers(n, filterParams);
    setUsers(usersData.data.results);
    setIsLoading(false);
  }

  const fetchNMoreUsers = async (n) => {
    const usersData = await getNRandomUsers(n, filterParams);
    const newUsers = [...users, ...usersData.data.results];
    setUsers(newUsers);
    setIsLoading(false);
  }

  const fetchWithFilters = async (n, params) => {
    setFilterParams(params);
    setUsers([]);
    if (!isLoading) {
      setIsLoading(true);
      const usersData = await getNRandomUsers(n, params);
      setUsers(usersData.data.results);
      setIsLoading(false);
    }
  }

  const saveUser = async (data) => {
    try {
      const db = getFirestore(app);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await addDoc(collection(userRef, 'saved'), {
          ...data
        });
        console.log('ADDED TO FIRESTORE');
      }
    } catch (err) {
      console.error(err);
    }
  }

  const checkIfBottom = (e) => {
    var bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    if (bottom > 0) {
      if (!isLoading) {
        setIsLoading(true);
        fetchNMoreUsers(FETCH_SIZE);
      }
    }
  }

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }

  return (
    <Segment className="home" onScroll={checkIfBottom}>
      <Navbar />
      <Filter
        fetchWithFilters={fetchWithFilters}
        parent="home" />
      <Segment className="show-more-container">
        <h4>Show more details</h4>
        <Radio toggle
          checked={showMore}
          onChange={toggleShowMore} />
      </Segment>
      <div className="usercard-container">
        {users && users.map((user, index) => (
          <UserCard key={index}
            data={user}
            saveUser={saveUser}
            showMore={showMore} />
        ))}
      </div>
      {isLoading ? <Spinner /> : <></>}
    </Segment>
  )
}

export default Home;