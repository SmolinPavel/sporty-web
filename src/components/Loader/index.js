import React from 'react';
import PropTypes from 'prop-types';

import ball from '../../assets/ball.svg';

import s from './styles.module.scss';

const Loader = ({ text }) => (
  <div className={s.ballWrapper}>
    <img src={ball} className={s.ball} alt='ball' />
    <h1 className={s.text}>{text}</h1>
  </div>
);

Loader.defaultProps = {
    title: 'Please wait, while the app is loading...',
};

Loader.propTypes = {
    title: PropTypes.string,
};

export default Loader;
