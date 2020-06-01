import React,{ useEffect, useState, memo } from 'react';
import { Link } from 'gatsby';
import styles from './index.module.scss';

import logo from "../../style/img/Imgs/dish.svg";
import icon from '../../style/img/blog.svg'
const NavBar = function () {
  const [email, setEmail] = useState('');

  return(
      <>
      <div className={styles.sideBar}>
        <div className={styles.headerLogo}>
              <Link to='/'><img className={styles.logo} alt='duefocus' src={logo}/></Link>
        </div>
        <Link className={styles.sideBarElement} to="/onboarding/">
          <div>
            <img src={icon} alt="icon"/>
            <span>Onboarding</span>
          </div>
        </Link>
        <Link className={styles.sideBarElement} to="/restaurants/">
          <div>
            <i className="fas fa-utensils"></i>
            <span>Restaurants</span>
          </div>
        </Link>
      </div>
      </>
    )
}

export default memo(NavBar);