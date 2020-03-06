import * as React from 'react';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import styles from './index.module.scss';
import button from '../buttons.module.scss';
import { Link } from 'gatsby';
import moment from 'moment';
import uuid from 'uuid';
// import axios from 'axios'
// import GoogleButton from 'react-google-button'
// import {
//   GASignUpButton,
//   // GASignUpGoogle,
//   GASignUpGitHub,
//   GASignUpGitLab,
//   GASignUpTrello
//  } from '../GoogleAnalyticsEvents/GAevents';
import close from '../img/Icon_X_gray.svg';
import hidePassword from '../img/icons/Icon_hide_password.svg';
import showPassword from '../img/icons/Icon_show_password.svg';
import icon from '../img/icons/Icon_green.svg';
import acceptIcon from '../img/icons/accept.svg'
import rejectIcon from '../img/icons/reject.svg'
const API_URL ='https://api.duefocus.com/user/rpc';

export default class ModalSignUp extends React.Component {

  state = {
    email: '',
    password: '',
    formErrors: {
      email: '',
      password: '',
      checkbox: ''
    },
    emailValid: false,
    passwordValid: false,
    checkboxValid: false,
    formValid: false
  }

 fetchUser = (e) => {
   GASignUpButton();
   e.preventDefault();
   let TracingID = uuid.v4();
   TracingID = TracingID.replace(TracingID.slice(4, 8), 'dash');
   const now = moment();
   const Context = {
    Token: null,
    Deadline: now.unix() + 60,
    TimeOffset: now.utcOffset() * 60,
    ClientTimeUnix: now.unix(),
    TracingID,
  };
   let params = {
      Context,
      FirstName:'John',
      LastName:'Doe',
      Login:this.state.email,
      Password:this.state.password
    };
   fetch(API_URL,
    {
      headers:
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      method: 'POST',
      body: JSON.stringify({id: uuid.v4(), jsonrpc:'2.0',method:'API.AddUser',params: params})
    })
    .then(response => response.json().then(function(data){
      if(data.error) {
        if(data.error.message === 'LOGIN_EXISTS'){
          document.getElementById('login-exists-message').className += ' show-message'
            setTimeout(function() {
                document.getElementById('login-exists-message').removeAttribute('class')
                }, 2500);
        }
      } else {
        const Token = data.result.Token;
        const contextOTS = {
          Context:{
          Token: Token,
          Deadline: now.unix() + 60,
          TimeOffset: now.utcOffset() * 60,
          ClientTimeUnix: now.unix(),
          TracingID,
        }}
        fetch(API_URL,
        {
          headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          method: 'POST',
          body: JSON.stringify({id: uuid.v4(), jsonrpc:'2.0',method:'API.GetOTS', params: contextOTS})
        }
        )
        .then(response => response.json().then(function(data){
          window.location.href =`https://web.duefocus.com/desktop/login?action=Onboarding&otscode=${data.result.OTS}`;
        }));
      }
    }))
    // if(this.state.checkboxValid != true){
    //   document.getElementById('checkbox-message').className += ' show-message'
    // }
  }

  // componentDidMount() {
  //   document.addEventListener('keydown', this.handleCloseESC);
  // }

  // handleCloseFeatures = () => {
  //   // document.getElementById('drop-down').classList.remove('drop-down-active');
  //   document.getElementById('drop-down-pricing').classList.remove('drop-down-active');
  //   document.getElementById('overlay').removeAttribute('class');
  //   document.body.removeAttribute('class');
  // }
  // closeModal = () => {
  //   const mobileMenu = document.getElementById('mobile-menu');
  //   document.getElementById('modal-sign-up').removeAttribute('class');
  //   document.body.removeAttribute('class');
  //   document.getElementById('nav-icon2').removeAttribute('class');
  //   mobileMenu.classList.remove('menu-open');
  //   document.getElementById('header-wrap').removeAttribute('class');
  // }

  // handleCloseESC = (e) => {
  //   if(!document.getElementById('header-block-blue') && e.keyCode === 27) {
  //     this.closeModal();
  //     // this.handleCloseFeatures();
  //   } else if(document.getElementById('header-block-blue') && e.keyCode === 27){
  //     this.closeModal();
  //     // this.handleCloseFeatures();
  //     document.getElementById('header-block-blue').classList.remove('background-white');
  //     document.getElementById('header-blue').classList.remove('background-white');
  //   }
  // }

  // componentWillUnmount() {
//   document.removeEventListener('keydown', this.handleCloseESC);
// }
  checkboxIsChecked = () => {
   this.setState({checkboxValid: !this.state.checkboxValid})
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    const correctEmail = document.getElementById('correct-mail');
    const correctPassword = document.getElementById('psw');

    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let checkboxValid = this.state.checkboxValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([a-z0-9_.!#$%^&*-+()])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,6}$/i);
        fieldValidationErrors.email = emailValid
        ? (correctEmail.removeAttribute('class'),
           document.getElementById('email-error-message').removeAttribute('class'))
        : (correctEmail.className ='show-error-email',
           document.getElementById('email-error-message').className += ' show-message')
        && this.state.email === ''
        ? (correctEmail.removeAttribute('class'),
           document.getElementById('email-error-message').removeAttribute('class'))
        : null
        break;
      case 'password':
        // passwordValid = value.match(/^(?=.*[0-9])(?=.*[a-zа-я])[a-zA-Z0-9а-яА-я!“#$%&‘()*+,-.\/:;<=>?@\[\\\]`^_{|}~]]{8,64}$/)
        // || value.match(/^(?=.*[A-ZА-Я])(?=.*[a-zа-я])[[a-zA-Z0-9а-яА-я!“#$%&‘()*+,-.\/:;<=>?@\[\\\]`^_{|}~]]{8,64}$/);
        passwordValid = (/[A-Z|А-Я|Ё]+/.test(value) || /\d+/.test(value)) && (/[a-z|а-я|ё]+/.test(value)) && (/.{8,64}/.test(value))

        fieldValidationErrors.password = passwordValid
        ? (correctPassword.removeAttribute('class'),
           document.getElementById('password-error-message').removeAttribute('class'))
        : (correctPassword.className ='show-error-pass',
           document.getElementById('password-error-message').className += ' show-message')
        && this.state.password === ''
        ? (correctPassword.removeAttribute('class'),
           document.getElementById('password-error-message').removeAttribute('class'))
        : null
        break;
        case 'checkbox':
        checkboxValid = this.state.checkboxValid === !false;
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    checkboxValid: checkboxValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.checkboxValid});
  }

  showPassword = () => {
    const pass = document.getElementById('psw');
    if (pass.type === 'text') {
      pass.type = 'password';
      document.getElementById('eye').src = hidePassword;
    } else {
      pass.type = 'text'
      document.getElementById('eye').src = showPassword;
    }
  }
  goToDashboard = () => {
    return window.location.href = 'https://web.duefocus.com/login';
 }
  handleBack = () => {
     window.history.back()
  }
  render() {
    const accept = (
      <img src={acceptIcon} alt="accept"/>
    )
    const reject = (
      <img src={rejectIcon} alt="reject"/>
    )
    return (
      <div id='modal-sign-up' className={styles.modal}>
        <div className={styles.modalLeft}>
            <div className={styles.imgIntegrations}>
              <img draggable={false} src={integration} alt="integration"/>
              <img draggable={false} src={hand} alt="hand"/>
            </div>
            <div className={styles.list}>
                    <div><img src={icon} alt="icon"/><span>Get All Features for Free</span></div>
                    <div><img src={icon} alt="icon"/><span>Set up in 1 minute</span></div>
            </div>
        </div>
        <div className={styles.modalRight}>
        <div onClick={this.handleBack} className={styles.closeModal}><img src={close} alt="close"/><span>ESC</span></div>
            <div>
              {/* <div className={styles.tip}>
                <div>We are 100% free for all Beta Users</div>
                <img src={tip} alt='tip'/>
              </div> */}
              <h4>Create DueFocus Account</h4>
              <span onClick={this.goToDashboard} className={styles.haveAccount}>Already have an Account? Sign In</span>
              <div>
               <form onSubmit={this.handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <span>Email</span>
                    <input
                      autoFocus
                      maxLength='76'
                      id='correct-mail'
                      value={this.state.email}
                      onChange={this.handleUserInput}
                      type="email"
                      name="email"
                      placeholder='name@email.com'
                    />
                   <div className={styles.errorBlock}>
                   <span className={styles.errors} id='email-error-message'>It doesn't looks like an e-mail</span>
                   <span className={styles.errors} id='login-exists-message'>This email is already registered</span>
                   </div>
                  </div>

                  <div className={styles.formGroup}>
                    <span>Password</span>
                    <input
                      maxLength='64'
                      id='psw'
                      value={this.state.password}
                      onChange={this.handleUserInput}
                      type="password"
                      name="password"
                      placeholder='8+ Characters'
                    />
                      <UncontrolledPopover
                        trigger="focus"
                        placement='top'
                        target="psw">
                        {/* <PopoverHeader>Your password must have:</PopoverHeader> */}
                        <PopoverBody className={styles.popover}>
                          <li className={styles.li}> {((/.{8,64}/).test(this.state.password)) ? accept : reject} {'8-64 characters'}</li>
                          <li className={styles.li}> {((/[A-Z|А-Я|Ё]+/).test(this.state.password) || (/\d+/).test(this.state.password)) ? accept : reject} {'numbers or UPPER case letter '}</li>
                          <li className={styles.li}> {((/[a-z|а-я|ё]+/).test(this.state.password)) ? accept : reject} {'lower case letter'}</li>
                        </PopoverBody>
                      </UncontrolledPopover>
                      <img
                      id='eye'
                      onClick={this.showPassword}
                      src={hidePassword}
                      className={styles.hidePsw}
                      alt="eye"
                    />
                    <div className={styles.errorBlock}>
                    <span className={styles.errors} id='password-error-message'>Please select a strong password</span>
                    </div>
                  </div>

                    <div
                      onChange={this.checkboxIsChecked}
                      className={styles.checkbox}
                    >
                    <input
                      checked={this.state.checkboxValid}
                      onChange={this.handleUserInput}
                      type="checkbox"
                      name="checkbox"
                      id="checkbox"
                    />
                    <label htmlFor="checkbox"><div>I agree to the <Link onClick={this.closeModal} to='/terms-of-use/'>Terms Of Use</Link> and <Link onClick={this.closeModal} to='/privacy-policy/'>Privacy Policy</Link>, and <Link onClick={this.closeModal} to='/cookies-policy/'>Cookie Use</Link>.</div></label>
                  </div>
                    {/* <span className={styles.errors} id='checkbox-message'>Please read and accept the Terms of Use</span> */}
                    <button
                      onClick={this.fetchUser}
                      disabled={!this.state.formValid}
                      className={button.buttonSignUp}>
                      Create Free Account
                    </button>

               </form>
                <div className={styles.line}><div /><span className={styles.text}>Or Sign Up With</span></div>
                <div className={styles.trackers}>
              </div>
              <div className={styles.signInWsGoogle}>
                {/* <GoogleButton
                  type="light"
                  onClick={() => {
                  window.location.href = 'https://web.duefocus.com/redirect_oauth/GCALENDAR';
                  GASignUpButton();
                }}
                /> */}
              <div className={styles.trackers}>
                <div onClick={() => GASignUpTrello()}>
                  <a title='Redirect DueFocus Time Tracker Trello' href="https://web.duefocus.com/redirect_oauth/TRELLO" target="_blank" rel="noopener noreferrer">
                    <img src={img4} alt='Trello' />
                  </a>
                </div>
                <div onClick={() => GASignUpGitHub()}>
                  <a title='Redirect DueFocus Time Tracking App Github' href="https://web.duefocus.com/redirect_oauth/GITHUB" target="_blank" rel="noopener noreferrer">
                    <img src={img3} alt='Github' />
                  </a>
                </div>
                <div onClick={() => GASignUpGitLab()}>
                  <a title='Redirect DueFocus Time Tracking Tool Gitlab' href="https://web.duefocus.com/redirect_oauth/GITLAB" target="_blank" rel="noopener noreferrer">
                    <img src={img1} alt='GitLab' />
                  </a>
                </div>
                {/* <div onClick={() => GASignUpGoogle()}>
                  <a title='Redirect DueFocus Time Tracking Software Google Calendar' href="https://web.duefocus.com/redirect_oauth/GCALENDAR" target="_blank" rel="noopener noreferrer">
                    <img src={img2} alt='Google' />
                    </a>
                </div> */}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
