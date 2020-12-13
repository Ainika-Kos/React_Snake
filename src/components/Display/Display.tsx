import React from 'react';
import './Display.css';

type Props = {
  text: string;
  gameOver: boolean;
};

const Display = ({ text, gameOver }: Props) => {
  return (
    <div>
      {!gameOver ? (
        <div className="display">{text}</div>
      ) : (
        <div className="display display--gamover">{text}</div>
      )}
    </div>
  );
};

export default Display;
