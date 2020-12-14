import React from 'react';
import './Heading.css';

type Props = {
  text: string;
};

const Heading = ({ text }: Props) => {
  return (
    <div>
      <h1 className="heading">{text}</h1>
    </div>
  );
};

export default Heading;
