import React from 'react';
import { ThreeDots } from "react-loader-spinner";

const Loading = ({ visibility }) => {
  return (
    <ThreeDots
      visible={visibility}
      height="80"
      width="80"
      color="lightgray"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{justifyContent: "center"}}
    />
  );
};

export default Loading;