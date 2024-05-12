import React from 'react';

import './index.scss';

const List = ({ className, children }) => {
  return (
    <div className={`list ${className}`}>
      {children}
    </div>
  );
};

export default List;