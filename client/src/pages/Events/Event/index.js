import React from 'react';
import { Link } from 'react-router-dom';

import formatDate from "../utils/formatDate";

import "./index.scss";

const Event = ({ id, title, description, event_date, organizer }) => (
  <div className="event">
    <p className="event-title">{title}</p>
    <p>{description}</p>
    <p>Date of event: {formatDate(event_date)}</p>
    <p>Organizer - {organizer}</p>

    <div className="event-navigation">
      <Link to={`/event-registration/${id}`}>Register</Link>
      <Link to={`/event-participants/${id}`}>View</Link>
    </div>
  </div>
);

export default Event;