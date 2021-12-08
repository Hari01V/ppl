import React from "react";

import { Card, Icon, Image, Button } from 'semantic-ui-react';

import '../styles/UserCard.css';

const UserCard = (props) => {
  const { data, saveUser } = props;

  const { picture, name, email, phone, location } = data;

  const getAddress = () => {
    return location ?
      `${location.street.number}, ${location.street.name},
    ${location.city}, ${location.state}, 
    ${location.country}, ${location.postcode}`
      : '';
  }

  const handleSave = () => {
    if (saveUser) {
      saveUser(data);
    }
  }

  return (
    <Card className="usercard">
      <Image src={picture && picture.large} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{`${name.title}. ${name.first} ${name.last}`}</Card.Header>
        <Card.Meta>{email}</Card.Meta>
        <Card.Description>
          {getAddress()}
          <br></br>
          <br></br>
          Contact: {phone}
        </Card.Description>
      </Card.Content>
      {saveUser &&
        <Card.Content extra className="save-btn-container">
          <Button fluid
            onClick={handleSave}
            className="save-btn">
            <Icon name='save' /> Save
          </Button>
        </Card.Content>
      }
    </Card>
  )
}

export default UserCard;