import React from 'react';
import image from '../../assets/images/toolbar.jpg';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <div className={classes.Toolbar}>
    <img src={image} alt="bg" />
    <h1>BATTLESHIP</h1>
  </div>
);

export default toolbar;
