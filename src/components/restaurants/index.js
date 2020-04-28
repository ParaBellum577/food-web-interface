import React,{ useEffect, useState, memo } from 'react';
import { connect } from 'react-redux'
import styles from './index.module.scss';

const mapStateToProps = ({ user, dashboard }) => ({
  user,
  dashboard
});

const Restaurants = function({ user, children }) {

  return(
      <>
      <div id="restaurants">
        <h1>HALLO MFCK</h1>
      </div>
      </>
    )
}

export default memo(connect(mapStateToProps)(Restaurants));