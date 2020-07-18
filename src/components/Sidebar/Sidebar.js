import React from 'react';
import classes from './Sidebar.module.css';
import mainLeft from '../../assets/images/main1.jpg';
import mainRight from '../../assets/images/main2.jpg';

const sidebar = (props) => {
  let style;
  if (props.left) {
    style = props.show ? classes.LeftOpen : classes.LeftClose;
  } else {
    style = props.show ? classes.RightOpen : classes.RightClose;
  }
  const imageSrc = props.left ? mainLeft : mainRight;
  return (
    <div className={[classes.Sidebar, style].join(' ')}>
      <h2>{props.text ? props.text + ' won!' : null}</h2>
      {props.clicked ? <button onClick={props.clicked}>New Game</button> : null}
      <img src={imageSrc} alt="Left Slide" />
    </div>
  );
};

export default sidebar;
