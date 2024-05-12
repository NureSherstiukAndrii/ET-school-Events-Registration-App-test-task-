import React, { useState, useEffect } from 'react';
import axios from "axios";

import PageWrapper from "../../components/PageWrapper";
import Event from "./Event";
import List from "../../components/List";
import Loading from "../../components/Loading";
import sortingOptions from "./sortingOptions";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortingValue, setSortingValue] = useState("");

  useEffect(() => {
    if (events.length % 12 === 0) {
      setLoading(true);
      axios.get(`http://localhost:5000/events/allEvents?offset=${offset}&limit=12`)
        .then(res => setEvents(prev => [...prev, ...res.data]))
        .catch(err => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [offset]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setOffset(prev => prev + 12);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[offset]);

  const sortingList = (e) => {
    const selectedValue = e.target.value;
    setSortingValue(selectedValue);

    let sortedEvents = [...events];
    switch(selectedValue) {
      case "sortTitleA-Z":
        sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "sortTitleZ-A":
        sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "sortDateA-Z":
        sortedEvents.sort((a, b) => a.event_date.localeCompare(b.event_date));
        break;
      case "sortDateZ-A":
        sortedEvents.sort((a, b) => b.event_date.localeCompare(a.event_date));
        break;
      case "sortOrganizerA-Z":
        sortedEvents.sort((a, b) => a.organizer.localeCompare(b.organizer));
        break;
      case "sortOrganizerZ-A":
        sortedEvents.sort((a, b) => b.organizer.localeCompare(a.organizer));
        break;
    }
    setEvents(sortedEvents);
  }

  return (
    <PageWrapper paragraph="Events">
      <div className="sorting">
        <span>Sort by</span>
        <select onChange={sortingList}>
          {sortingOptions.map(({ value, text }) => (
            <option key={value} value={value}>{text}</option>
          ))}
        </select>
      </div>
      <List>
        {events.map(({ id, title, description, event_date, organizer }) => (
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