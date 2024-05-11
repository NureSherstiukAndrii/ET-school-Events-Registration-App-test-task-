import { Routes, Route } from "react-router-dom";

import Events from "./pages/Events";
import EventRegistration from "./pages/EventRegistration";

import "./styles/global.scss";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/event-registration/:eventId" element={<EventRegistration />} />
    </Routes>
  );
}

export default App;
