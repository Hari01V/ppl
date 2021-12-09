import React, { useState } from "react";
import { Header, Checkbox, Form, Button, Container, Input, Label } from "semantic-ui-react";

import '../styles/Filter.css';

const Filter = (props) => {
  const { fetchWithFilters, parent, filterPpl } = props;

  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [loc, setLoc] = useState({});

  const handleGenderChange = (e, { value }) => {
    setGender(value);
  }

  const handleDateChange = (e) => {
    let chosenDate = e.target.value;
    let tmpDate = {
      year: chosenDate.slice(0, 4),
      month: chosenDate.slice(5, 7),
      day: chosenDate.slice(8, 10)
    }
    setDob(tmpDate);
  }

  const applyFilter = () => {
    let params = {};
    if (gender) {
      params = {
        ...params,
        'gender': gender
      }
    }
    if (parent === "home") {
      fetchWithFilters(20, params);
    } else {
      if (dob) {
        params = {
          ...params,
          'dob': dob
        }
      }
      if (loc) {
        params = {
          ...params,
          'loc': loc
        }
      }
      filterPpl(params);
    }
  }

  const handleLocChange = (e) => {
    let newLoc = { ...loc };
    newLoc[e.target.name] = e.target.value;
    setLoc(newLoc);
  }

  const clearFilter = () => {
    if (parent === "home") {
      fetchWithFilters(20, {});
    } else {
      filterPpl({});
    }
    setGender(null);
    setDob(null);
    setLoc({});
  }

  return (
    <Container className="filter">
      <Form>
        <Form.Field className="gender-field">
          <Header as="h3"> Gender:</Header>
          <Form.Field className="gender-checkbox">
            <Checkbox
              radio
              label='Male'
              name='checkboxRadioGroup'
              value='male'
              checked={gender === 'male'}
              onChange={handleGenderChange}
            />
          </Form.Field>
          <Form.Field className="gender-checkbox">
            <Checkbox
              radio
              label='Female'
              name='checkboxRadioGroup'
              value='female'
              checked={gender === 'female'}
              onChange={handleGenderChange}
            />
          </Form.Field>
        </Form.Field>
        {parent === "myppl" &&
          <>
            <Form.Field>
              <input type="date"
                onChange={handleDateChange} />
            </Form.Field>
            <Form.Field>
              <Input label='Latitude:  '
                name="lat"
                placeholder='20.9267'
                onChange={handleLocChange}
                type="number"
                value={Object.entries(loc).length === 0 ? '' : loc.lat} />
              <br></br>
              <br></br>
              <Input label='Longitude:  '
                name="lon"
                placeholder='-7.9310'
                onChange={handleLocChange}
                type="number"
                value={Object.entries(loc).length === 0 ? '' : loc.lon} />
              <Label pointing style={{ letterSpacing: '1px' }}>
                Here, If either the Latitude or Longitude is closer, results will be displayed
              </Label>
            </Form.Field>
          </>
        }
        <Button type='submit' inverted
          color="purple"
          onClick={applyFilter}>Filter</Button>
        <Button inverted
          color="orange"
          onClick={clearFilter}>Clear Filters</Button>
      </Form>
    </Container>
  )
}

export default Filter;