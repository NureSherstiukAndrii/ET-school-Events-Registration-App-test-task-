import React from 'react';
import { Link } from 'react-router-dom';

import "./index.scss";

const Event = ({ id, title, description }) => {
  return (
    <div className="event">
      <p className="event-title">{title}</p>
      <p>{description}</p>

      <div className="event-navigation">
        <Link to={`/event-registration/${id}`}>Register</Link>
        <Link>View</Link>
      </div>
    </div>
  );
};

export default Event;