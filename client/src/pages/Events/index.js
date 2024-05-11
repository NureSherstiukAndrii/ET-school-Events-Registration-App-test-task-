import React, { useState, useEffect } from 'react';
import axios from "axios";

import PageWrapper from "../../components/PageWrapper";
import Event from "./Event";

import "./index.scss";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/events/allEvents")
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  });

  return (
    <PageWrapper paragraph="Events">
      <div className="events-container">
        {events.map(({ id, title, description }) => (
          <Event key={id} id={id} title={title} description={description} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Events;