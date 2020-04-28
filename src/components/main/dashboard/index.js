import React,{ useEffect, useState, memo } from 'react';
import { connect } from 'react-redux'
import SideBar from '../sideBar/index';
import Header from '../header/index';
import styles from './index.module.scss';

const mapStateToProps = ({ user, dashboard }) => ({
  user,
  dashboard
});

const Dashboard = function({ user, children }) {
  const [isLoading, setIsLoading] = useState(false);
  console.log("Dashboard -> children", children)
  console.log("user -> user", user)

  return(
      <>
      <SideBar />
      <div id="main">
        <Header />
        {!isLoading &&
          <div className="wrapper">
            {children}
          </div>
        }
      </div>
      </>
    )
}

export default memo(connect(mapStateToProps)(Dashboard));