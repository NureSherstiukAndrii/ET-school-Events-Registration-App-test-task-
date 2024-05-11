import React from 'react';

import "./index.scss";

const PageWrapper = ({ paragraph, children }) => {
  return (
    <div className="page-wrapper">
      <h1 className="page-wrapper-paragraph">{paragraph}</h1>
      {children}
    </div>
  );
};

export default PageWrapper;