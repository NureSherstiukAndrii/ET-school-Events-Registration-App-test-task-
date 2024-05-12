import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import PageWrapper from "../../components/PageWrapper";
import Participant from "./Participant";
import List from "../../components/List";
import Loading from "../../components/Loading";

import './index.scss';

const EventParticipants = () => {
  const [allParticipants, setAllParticipants] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { eventId } = useParams();

  useEffect(() => {
    getParticipants();
    getEvent();
  }, []);

  const searchField = (e) => {
    const searchText = e.target.value;
    const filteredParticipants = allParticipants.filter(elem => elem.name.includes(searchText) || elem.email.includes(searchText));
    setParticipants(filteredParticipants);
  };

  const getParticipants = () => {
    axios.get(`http://localhost:5000/events/getParticipants/${eventId}`)
      .then(res => {
        setAllParticipants(res.data);
        setParticipants(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const getEvent = () => {
    axios.get(`http://localhost:5000/events/getEvent/${eventId}`)
      .then(res => setEvent(res.data[0]))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    loading ? <Loading /> :
      <PageWrapper paragraph={`"${event.title}" participants`}>
        <div className="search">
          <span className="search-theme">Find participant by full name or email</span>
          <input type="text" className="search-field" onChange={searchField} />
        </div>
        {participants.length ? (
          <List className="participants">
            {participants.map(({ id, name, email }) => (
              <Participant key={id} name={name} email={email} />
            ))}
          </List>
        ) : (
          <div className="empty-list">
            <span>No one registered</span>
            <Link to="/">Back to events</Link>
          </div>
        )}
      </PageWrapper>
  );
};

export default EventParticipants;
