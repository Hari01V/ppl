import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Spinner from "./Spinner";
import Filter from "./Filter";

import { useNavigate } from 'react-router-dom';

import { Segment, Message, Container, Radio } from 'semantic-ui-react';

import firebase from '../Firebase/firebase';
import { app } from "../Firebase/firebase";
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore/lite'
import UserCard from "./UserCard";

import '../styles/Myppl.css';

const RANGE = 10;

const Myppl = (props) => {
  const { user } = props;
  const navigate = useNavigate();

  const [origianlPpl, setOrigianlPpl] = useState([]);
  const [ppl, setPpl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

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
        setOrigianlPpl(newPpl);
        setIsLoading(false);
      } else {
        navigate('/login');
      }
    })
  }, []);

  const filterPpl = (params) => {
    let newPpl = origianlPpl;
    if (params['gender']) {
      newPpl = newPpl.filter(p =>
        p.gender === params['gender']);
    }
    if (params['dob']) {
      newPpl = newPpl.filter(p => {
        const dob = {
          year: (p.dob.date).slice(0, 4),
          month: (p.dob.date).slice(5, 7),
          day: (p.dob.date).slice(8, 10)
        }
        const result = compareDOB(dob, params.dob);
        console.log(result);
        if (result === 1) {
          return p;
        }
      });
    }
    if (params['loc']) {
      const lat = parseFloat(params['loc'].lat);
      const lon = parseFloat(params['loc'].lon);
      if (lat || lon) {
        newPpl = newPpl.filter(p => {
          const loc = {
            lat: parseFloat(p['location']['coordinates']['latitude']),
            lon: parseFloat(p['location']['coordinates']['longitude'])
          }
          if (Math.abs(loc.lat - lat) < RANGE || Math.abs(loc.lon - lon) < RANGE) {
            return p;
          }
        });
      }
    }
    setPpl(newPpl);
  }

  const compareDOB = (dob1, dob2) => {
    if (dob1.year > dob2.year) {
      return 1;
    } else if (dob1.year === dob2.year && dob1.month > dob2.month) {
      return 1;
    } else if (dob1.year === dob2.year && dob1.month === dob2.month && dob1.day > dob2.day) {
      return 1;
    } else {
      return 0;
    }
  }

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }

  return (
    <Segment className="myppl">
      <Navbar />
      <Filter parent="myppl"
        filterPpl={filterPpl} />
      <Segment className="show-more-container">
        <h4>Show more details</h4>
        <Radio toggle
          checked={showMore}
          onChange={toggleShowMore} />
      </Segment>
      {isLoading ? <Spinner />
        :
        ppl.length !== 0 ?
          <div className="usercard-container">
            {ppl.map((user, index) => (
              <UserCard key={index}
                data={user}
                saveUser={null}
                showMore={showMore} />
            ))}
          </div>
          :
          <Container className="myppl-msg">
            <Message color="purple" floating>
              <Message.Header>Your Saved users comes here</Message.Header>
              <p>Add them from People section !</p>
            </Message>
          </Container>
      }
    </Segment>
  )
}

export default Myppl;