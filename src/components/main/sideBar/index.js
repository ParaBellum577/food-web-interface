import React,{ useEffect, useState, memo } from 'react';
import { Link } from 'gatsby';
import styles from './index.module.scss';

import icon from '../../style/img/blog.svg'
const NavBar = function ({ }) {
  const [email, setEmail] = useState('');

  return(
      <>
      <div className={styles.sideBar}>
        <Link className={styles.sideBarElement} to="/onboarding/">
          <div>
            <img src={icon} alt="icon"/>
            <span>Onboarding</span>
          </div>
        </Link>
      </div>
      </>
    )
}

export default memo(NavBar);