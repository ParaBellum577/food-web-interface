import React,{ useEffect, useState, memo } from 'react';
import { UncontrolledPopover, PopoverBody, PopoverHeader } from 'reactstrap';
import validator from 'validator';
import styles from './index.module.scss';
import button from '../../buttons.module.scss';

import acceptIcon from '../../style/img/accept.svg'
import rejectIcon from '../../style/img/reject.svg'
import hidePassword from '../../style/img/Icon_hide_password.svg';
import showPasswordicon from '../../style/img/Icon_show_password.svg';
import img from '../../style/img/20317591.jpg'

const Login = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isCorrectPassword, setIsPSWcorrect] = useState(true);


  const handleUserEmail = (e) => {
    setEmail(e.target.value);
    if (!validator.isEmail(e.target.value)) {
      setIsFormValid(false);
      setEmailValid(false);
    } else {
      setIsFormValid(true);
      setEmailValid(true);
    }
  }

  const handleUserPassword = (e) => {
    setPassword(e.target.value);
  }

  const accept = (
    <img src={acceptIcon} alt="accept"/>
  );

  const reject = (
    <img src={rejectIcon} alt="reject"/>
  );

  const showPassword = () => {
    const pass = document.getElementById('psw');
    if (pass.type === 'text') {
      pass.type = 'password';
      document.getElementById('eye').src = showPasswordicon;
    } else {
      pass.type = 'text'
      document.getElementById('eye').src = hidePassword;
    }
  };
  
  return(
      <>
    <div id='modal-sign-up' className={styles.modal}>
        <div className={styles.modalLeft}>
          <img src={img} alt="img"/>
        </div>
        <div className={styles.modalRight}>
        {/* <div className={styles.closeModal}><span>ESC</span></div> */}
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
                      className={(isEmailValid || email === '') ? '' : 'error-input'}
                      value={email}
                      onChange={handleUserEmail}
                      type="email"
                      name="email"
                      placeholder='name@email.com'
                    />
                   { (!isEmailValid && email !== '') &&
                      <div className={styles.errorBlock}>
                        <span className={styles.errors} className="error-message">Це не схоже на електронну пошту</span>
                      </div>
                    }
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
                    {
                      !isCorrectPassword &&
                        <div className={styles.errorBlock}>
                           <span className={styles.errors} className="error-message">Не верный пароль, попробуйте еще раз...</span>
                        </div>
                    }
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
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default memo(Login);