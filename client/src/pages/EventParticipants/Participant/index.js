import React from 'react';

import './index.scss';

const Participant = ({ name, email }) => (
  <div className="participant">
    <span>{name}</span>
    <span>{email}</span>
  </div>
);

export default Participant;