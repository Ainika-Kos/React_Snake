import React from 'react';
import './Winner.css';
import won from '../../assets/won.png';

const Winner = () => {
  return (
    <div>
      <img src={won} alt="" className="winner" />
    </div>
  );
};

export default Winner;
