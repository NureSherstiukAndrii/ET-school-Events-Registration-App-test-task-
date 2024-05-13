import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";

import PageWrapper from "../../components/PageWrapper";
import Event from "./Event";
import List from "../../components/List";
import Loading from "../../components/Loading";
import { SORT_MAP, SORTING_OPTIONS } from './constants';
import { https } from "../../api/https";

import "./index.scss";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortingValue, setSortingValue] = useState("sortTitleA-Z");

  useEffect(() => {
    if (!events.length || (events.length < total) && !loading) {
      setLoading(true);

      axios.get(`${https}/allEvents?offset=${offset}&limit=12`)
        .then(res => {
          setEvents(prev => [...prev, ...res.data.events]);
          setTotal(res.data.total);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [offset]);

  useEffect(() => {
    const handleScroll = (e) => {
      const { scrollHeight, scrollTop } = e.target.documentElement;
      const currentHeight = scrollTop + window.innerHeight;

      if ((currentHeight + 1 >= scrollHeight) && !loading && events.length !== total) {
        setOffset(prev => prev + 12);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  },[offset, loading]);

  const sortingList = ({ target }) => {
    setSortingValue(target.value);
  };

  const sortedEvents = useMemo(() => {
    const sortFunc = SORT_MAP[sortingValue];

    return events.sort(sortFunc);
  }, [sortingValue, events]);

  return (
    <PageWrapper paragraph="Events">
      <div className="sorting">
        <span>Sort by </span>
        <select onChange={sortingList}>
          {SORTING_OPTIONS.map(({ value, text }) => (
            <option key={value} value={value}>{text}</option>
          ))}
        </select>
      </div>
      <List>
        {sortedEvents.map(({ id, title, description, event_date, organizer }) => (
          <Event
            key={id}
            id={id}
            title={title}
            description={description}
            event_date={event_date}
            organizer={organizer}
          />
        ))}
        <Loading visibility={loading} />
      </List>
    </PageWrapper>
  );
};

export default Events;