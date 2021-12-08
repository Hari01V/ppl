import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Spinner from "./Spinner";

import { useNavigate } from 'react-router-dom';

import { Segment } from 'semantic-ui-react';

import firebase from '../Firebase/firebase';
import { app } from "../Firebase/firebase";
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore/lite'
import UserCard from "./UserCard";

import '../styles/Myppl.css';

const Myppl = (props) => {
  const { user } = props;
  const navigate = useNavigate();

  const [ppl, setPpl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoading(true);
        let newPpl = [];
        const db = getFirestore(app);
        const userRef = doc(db, 'users', user.uid);
        const pplRef = collection(userRef, 'saved');
        const pplSnap = await getDocs(pplRef);
        pplSnap.docs.map(doc => {
          newPpl.push(doc.data());
        })
        setPpl(newPpl);
        setIsLoading(false);
      } else {
        navigate('/login');
      }
    })
  }, []);

  return (
    <Segment className="myppl">
      <Navbar />
      <div className="usercard-container">
        {ppl.map((user, index) => (
          <UserCard key={index} data={user} saveUser={null} />
        ))}
      </div>
      {isLoading ? <Spinner /> : <></>}
    </Segment>
  )
}

export default Myppl;