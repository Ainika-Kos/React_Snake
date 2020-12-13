import React from 'react';
import './Button.css';

type Props = {
  text: string;
  clickHandler: () => void;
};

const Button = ({ text, clickHandler }: Props) => {
  return (
    <button type="button" onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button;
