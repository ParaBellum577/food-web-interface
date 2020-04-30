import React,{ useEffect, useState, memo } from 'react';
import { connect } from 'react-redux'
import styles from './index.module.scss';
import cup from '../style/img/Imgs/cup.svg';

const mapStateToProps = ({ user, dashboard }) => ({
  user,
  dashboard
});

const Restaurants = function({ user, children }) {
const [ifFormVisible, setIsformVisible] = useState(false);
const userInfo =  JSON.parse(localStorage.getItem('user'));
console.log("Restaurants -> userInfo", userInfo)

  return(
      <>
      {/* <div>
        <button>Add new</button>
        <div>
          <input type="text"/>
          <input type="text"/>
        </div>
      </div> */}
      <div id="restaurants">
        <div>
          <div className={styles.organization}>
            <img src={cup} alt="icon"/>
            <div>
              <h5>{userInfo.organizationName}</h5>
              <span>{userInfo.organization}</span>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default memo(connect(mapStateToProps)(Restaurants));