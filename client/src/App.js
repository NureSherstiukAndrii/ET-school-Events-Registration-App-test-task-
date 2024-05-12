import { Routes, Route } from "react-router-dom";

import Events from "./pages/Events";
import EventRegistration from "./pages/EventRegistration";
import EventParticipants from "./pages/EventParticipants";

import "./styles/global.scss";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/event-registration/:eventId" element={<EventRegistration />} />
      <Route path="/event-participants/:eventId" element={<EventParticipants />} />
    </Routes>
  );
}

export default App;
