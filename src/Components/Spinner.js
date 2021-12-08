import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const Spinner = () => {

  return (
    <Loader active
      inline="centered"
      size="big"
      content="Fetching People..."
      style={{ margin: '100px auto' }} />
  )
}

export default Spinner;