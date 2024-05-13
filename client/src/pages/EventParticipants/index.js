import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import PageWrapper from "../../components/PageWrapper";
import Participant from "./Participant";
import List from "../../components/List";
import BackToEvents from "../../components/BackToEvents";
import Loading from "../../components/Loading";
import LineChart from "./LineBar";
import { https } from "../../api/https";

import './index.scss';

const EventParticipants = () => {
  const [allParticipants, setAllParticipants] = useState([]);
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { eventId } = useParams();

  useEffect(() => {
    getParticipants();
    getEvent();
  }, []);

  const searchField = ({ target }) => {
    setSearchValue(target.value);
  };

  const getParticipants = () => {
    axios.get(`${https}/getParticipants/${eventId}`)
      .then(res => {
        setAllParticipants(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const getEvent = () => {
    axios.get(`${https}/getEvent/${eventId}`)
      .then(res => setEvent(res.data[0]))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const filteredParticipants = useMemo(() => {
    const searcher = searchValue.toLowerCase();
    return allParticipants.filter(({ name, email }) => {
      return name.toLowerCase().includes(searcher) || email.toLowerCase().includes(searcher);
    });

  }, [allParticipants, searchValue]);

  return (
    loading ? <Loading /> :
      <PageWrapper paragraph={`"${event.title}" participants`}>
        <div className="search">
          <span className="search-theme">Find participant by full name or email</span>
          <input type="text" className="search-field" onChange={searchField} />
        </div>
        {allParticipants.length ? (
          <>
            <List className="participants">
              {filteredParticipants.map(({ id, name, email }) => (
                <Participant key={id} name={name} email={email} />
              ))}
            </List>
            <BackToEvents />
            <LineChart eventId={eventId} />
          </>
        ) : (
          <div className="empty-list">
            <span>No one registered</span>
            <BackToEvents />
          </div>
        )}
      </PageWrapper>
  );
};

export default EventParticipants;
