import React,{ useEffect, useState, memo } from 'react';
import SideBar from '../sideBar/index';
import Header from '../header/index';
import styles from './index.module.scss';

const Dashboard = function ({ }) {
  const [email, setEmail] = useState('');

  return(
      <>
      <Header />
      </>
    )
}

export default memo(Dashboard);