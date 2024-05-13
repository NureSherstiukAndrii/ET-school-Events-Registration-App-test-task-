import React from 'react';
import { Link } from "react-router-dom";

import './index.scss';

const BackToEvents = () => {
  return (
    <Link to='/' className="back-home">
      Back to events
    </Link>
  );
};

export default BackToEvents;