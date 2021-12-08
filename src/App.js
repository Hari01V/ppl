import React, { useEffect, useState } from 'react';

import { useNavigate, Route, Routes } from 'react-router-dom';

import firebase from './Firebase/firebase';
import { app } from "./Firebase/firebase";
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite'

import './App.css';

import Home from './Components/Home';
import Login from './Components/Login';
import Myppl from './Components/Myppl';

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate('/');

        const db = getFirestore(app);
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid
        });
      } else {
        setUser(null);
        navigate('/login');
      }
    })
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home user={user} />} />
        <Route exact path="/myppl" element={<Myppl user={user} />} />
        <Route exact path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </div>
  )
}

export default App;
