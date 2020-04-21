import { Link } from "gatsby";
import React from "react";
// import DropDownIntegration from './Features'
// import Pricing from './Pricing'
import styles from "./style.module.scss";
import button from '../../../components//buttons.module.scss';

import logo from "../../style/img/Imgs/dish.svg";


export default class Header extends React.Component {

  menuActive = () => {
    const hamburger = document.getElementById('nav-icon2');
    if (hamburger.className === 'open') {
      hamburger.removeAttribute('class');
    } else {
      hamburger.className ='open';
    }
      return false;
  }

  isHeaderFixed = () => {
    if (window.pageYOffset > 70) {
        document.getElementById('header-scroll').className = 'header-fixed';
        document.getElementById('header-scroll-height').className = 'header-fixed-height';
    } else if (window.pageYOffset === 0) {
      document.getElementById('header-scroll').removeAttribute('class');
      document.getElementById('header-scroll-height').removeAttribute('class');
    }
}

  // showModal = () => {
  //   document.body.className = 'modal-active';
  //   const modal = document.getElementById('modal-sign-up');
  //   modal.className ='show-modal';
  // }

//   handleOpenFeatures = () => {
//     this.handleCloseFeatures();
//     if (document.getElementById('overlay').className !== 'overlay-hidden') {
//       document.getElementById('drop-down').className += ' drop-down-active';
//       document.getElementById('overlay').className = 'overlay-hidden';
//       document.body.className = 'modal-active';
//     } 
// }

// handleOpenPricing = () => {
//   this.handleCloseFeatures();
//   if (document.getElementById('overlay').className !== 'overlay-hidden') {
//     document.getElementById('drop-down-pricing').className += ' drop-down-active';
//     document.getElementById('overlay').className = 'overlay-hidden';
//     document.body.className = 'modal-active';
//   }
// }


  handleCloseMenu = () => {
    document.getElementById('mobile-menu').classList.remove('menu-open');
    document.body.removeAttribute('class');
    document.getElementById('nav-icon2').removeAttribute('class');
    document.getElementById('header-wrap').removeAttribute('class');
  }

  handleOpenMenu = () => {
    window.scrollTo(0, 0);
    if (document.getElementById('nav-icon2').className === 'open') {
      document.getElementById('mobile-menu').className += ' menu-open';
      document.getElementById('header-wrap').className = 'header-visible';
      document.body.className = 'modal-active';
    } else {
      document.getElementById('mobile-menu').classList.remove('menu-open');
      document.getElementById('header-wrap').removeAttribute('class');
      document.body.removeAttribute('class');
    }
}

  // handleCloseFeatures = () => {
  //   // document.getElementById('drop-down').classList.remove('drop-down-active');
  //   document.getElementById('overlay').removeAttribute('class');
  //   document.getElementById('drop-down-pricing').classList.remove('drop-down-active');
  //   document.body.removeAttribute('class');
  //   this.linkColor();
  // }
  goToDashboard = () => {
    return window.location.href = 'https://web.duefocus.com/login';
  }
  openSignUp = () => {
    return window.location.href = '/sign-up/';
   }
  componentDidMount() {
    window.addEventListener("scroll", this.isHeaderFixed);
    this.linkColor();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.isHeaderFixed);
  }

  linkColor = () => {
    let location = window.location.href.split("/");
    let cur_url = location[location.length-2];

    if(cur_url === 'integrations') {
      document.getElementById('link_1').className = 'link-active';
    } else if (cur_url === 'faq') {
      document.getElementById('link_2').className = 'link-active';
    } else if (cur_url === 'download') {
      document.getElementById('link_3').className = 'link-active';
    } else if (cur_url === 'pricing') {
      // document.getElementById('link_4').className = 'link-active';
      return
    }
  }
  
  render() {
    return (
      <div  id='header-scroll'>
        <div className={styles.header} id='header-scroll-height'>
        <div className={styles.headerLeft}>
            <Link to='/'><img className={styles.logo} alt='duefocus' onClick={this.handleCloseMenu} src={logo}/></Link>
        </div>
        <div className={styles.headerRight}>
         <div onClick={this.handleOpenMenu} className={styles.mobileMenu}>
              <div onClick={this.menuActive} id="nav-icon2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
           </div>
           <div className={styles.navigation}>
              <ul>
                <li>
                <div>
                    <Link id='link_1' to='/integrations/'>Integrations</Link>
                </div>
                </li>
                <li>
                  <div>
                    <Link id='link_2' to='/faq/'>FAQ</Link>
                  </div> 
                </li>
                <li>
                  <div>
                    <Link id='link_3' to='/download/'>Downloads</Link>
                  </div> 
                </li>
                {/* <li>
                  <div>
                    <Link id='link_4' to='/pricing/'>Pricing</Link>
                  </div>
                </li> */} 
              </ul>
            </div>
            <div className={styles.buttonsHeader}>
              <button onClick={this.goToDashboard} className={styles.buttonSignIn}>Log In</button>
              <button onClick={this.openSignUp} className={button.buttonSignUp}>Sign Up</button>
            </div>
            <div id='header-wrap' className={styles.modalMobile} />
            </div>
        </div>
        {/* <DropDownIntegration /> */}
        {/* <Pricing /> */}
      </div>
    )
  }
}

