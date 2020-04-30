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
  const isConfirmed = localStorage.getItem('userConfirmed');
  console.log("Dashboard -> isConfirmed", isConfirmed)

  // useEffect(() => {
  //   if(isConfirmed === 'true' && window.location.href !== '/dashboard/restaurants/') {
  //     window.location.href = '/dashboard/restaurants/'
  //   } else (
  //     window.location.href = '/onboarding/'
  //   )
  // }, [isConfirmed]);

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