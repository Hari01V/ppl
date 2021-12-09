import React from "react";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';
import { Segment, Label, Button, Icon, Container, Header } from "semantic-ui-react";

import '../styles/Login.css';

const Login = (props) => {

  const { setUser } = props;

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  }

  return (
    <Segment className="login">
      <div className="circle">
      </div>
      <Container textAlign='center' className="login-content-container">
        <div className="login-content">
          <Icon name="playstation" size="massive" />
          <Header as="h1">PPL</Header>
        </div>
        <Button as='div'
          labelPosition='right'
          size='huge'
          onClick={signInWithGoogle}
          className="login-btn">
          <Button icon className="btn-icon">
            <Icon name='sign-in' />
          </Button>
          <Label as='a' basic className="btn-label">
            SIGN IN WITH GOOGLE
          </Label>
        </Button>
      </Container>
    </Segment>
  )
}

export default Login;