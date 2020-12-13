import React from 'react';
import './Heading.css';

type Props = {
  text: string;
};

const Heading = ({ text }: Props) => {
  return (
    <div className="heading">
      <h1>{text}</h1>
    </div>
  );
};

export default Heading;
