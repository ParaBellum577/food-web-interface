import React,{ useEffect, useState, memo } from 'react';
import { UncontrolledPopover, PopoverBody, PopoverHeader } from 'reactstrap';

// import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import styles from './index.module.scss';
import button from '../../buttons.module.scss';
// import close from '../style/img/Icon_X_gray.svg';
// import hidePassword from '../style/img/Icon_hide_password.svg';
// import showPassword from '../style/img/Icon_show_password.svg';

import acceptIcon from '../../style/img/accept.svg'
import rejectIcon from '../../style/img/reject.svg'
import hidePassword from '../../style/img/Icon_hide_password.svg';
import showPasswordicon from '../../style/img/Icon_show_password.svg';

const FirstStep = function ({ handleChangeStep, addUserData, iconCheck, dish, restaurant }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const handleUserEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleUserPassword = (e) => {
    setPassword(e.target.value);
  }

//   const validation = () => {
//     if((isOwner === true || isOwner === false) && email !== '') {
//       setIsFormValid(true);
//     } else {
//       setIsFormValid(false);
//     }
//   }

//   useEffect(() => {
//     validation();
//   }, [email, isOwner]);

  const accept = (
    <img src={acceptIcon} alt="accept"/>
  )
  const reject = (
    <img src={rejectIcon} alt="reject"/>
  )
  const showPassword = () => {
    const pass = document.getElementById('psw');
    if (pass.type === 'text') {
      pass.type = 'password';
      document.getElementById('eye').src = showPasswordicon;
    } else {
      pass.type = 'text'
      document.getElementById('eye').src = hidePassword;
    }
  }
  return(
      <>
    <div id='modal-sign-up' className={styles.modal}>
        <div className={styles.modalLeft}>
        </div>
        <div className={styles.modalRight}>
        <div className={styles.closeModal}><img src="" alt="close"/><span>ESC</span></div>
            <div>
              <h4>Login</h4>
              {/* <span onClick={goToDashboard} className={styles.haveAccount}>Already have an Account? Sign In</span> */}
              <div>
               <form className={styles.form}>
                  <div className={styles.formGroup}>
                    <span>Email</span>
                    <input
                      autoFocus
                      maxLength='76'
                      id='correct-mail'
                      value={email}
                      onChange={handleUserEmail}
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
                      value={password}
                      onChange={handleUserPassword}
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
                          <li className={styles.li}> {((/.{8,64}/).test(password)) ? accept : reject} {'8-64 characters'}</li>
                          <li className={styles.li}> {((/[A-Z|А-Я|Ё]+/).test(password) || (/\d+/).test(password)) ? accept : reject} {'numbers or UPPER case letter '}</li>
                          <li className={styles.li}> {((/[a-z|а-я|ё]+/).test(password)) ? accept : reject} {'lower case letter'}</li>
                        </PopoverBody>
                      </UncontrolledPopover>
                      <img
                      id='eye'
                      onClick={showPassword}
                      src={showPasswordicon}
                      className={styles.hidePsw}
                      alt="eye"
                    />
                    <div className={styles.errorBlock}>
                    <span className={styles.errors} id='password-error-message'>Please select a strong password</span>
                    </div>
                  </div>

                    {/* <div
                      onChange={checkboxIsChecked}
                      className={styles.checkbox}
                    >
                    <input
                      checked={checkboxValid}
                      onChange={handleUserInput}
                      type="checkbox"
                      name="checkbox"
                      id="checkbox"
                    />
                    <label htmlFor="checkbox"><div>I agree to the <Link onClick={closeModal} to='/terms-of-use/'>Terms Of Use</Link> and <Link onClick={closeModal} to='/privacy-policy/'>Privacy Policy</Link>, and <Link onClick={closeModal} to='/cookies-policy/'>Cookie Use</Link>.</div></label>
                  </div> */}
                    {/* <span className={styles.errors} id='checkbox-message'>Please read and accept the Terms of Use</span> */}
                    <button
                    //   onClick={fetchUser}
                    //   disabled={!formValid}
                      className={button.buttonSignUp}>
                      Login
                    </button>

               </form>
                {/* <div className={styles.line}><div /><span className={styles.text}>Or Sign Up With</span></div> */}
                <div className={styles.trackers}>
              </div>
              <div className={styles.signInWsGoogle}>
              {/* <div className={styles.trackers}>
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
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default memo(FirstStep);