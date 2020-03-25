import React,{ useEffect, useState } from 'react';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import styles from './index.module.scss';
import button from '../buttons.module.scss';
import { Link } from 'gatsby';
import uuid from 'uuid';
// import axios from 'axios'

import close from '../style/img/Icon_X_gray.svg';
import hidePassword from '../style/img/Icon_hide_password.svg';
import showPassword from '../style/img/Icon_show_password.svg';
import icon from '../style/img/Icon_green.svg';
import acceptIcon from '../style/img/accept.svg'
import rejectIcon from '../style/img/reject.svg'
const API_URL ='https://api.duefocus.com/user/rpc';

export default function SecondStep ({ handleChangeStep }) {
  const [step, setNextStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleUserInput = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = () => {

  }

  const accept = (
    <img src={acceptIcon} alt="accept"/>
  )
  const reject = (
    <img src={rejectIcon} alt="reject"/>
  )

  return(
      <>
      <div id='modal-sign-up' className={styles.modal}>
        <div className={styles.modalLeft}>
            <div className={styles.imgIntegrations}>
            </div>
            <div className={styles.list}>
                    <div><span>Зроби крок до їжі</span></div>
                    {/* <div><img src={icon} alt="icon"/><span>Set up in 1 minute</span></div> */}
            </div>
        </div>
        <div className={styles.modalRight}>
          <div className={styles.closeModal} onClick={() => handleChangeStep(1)}><img src={close} alt="close"/></div>
            <div>
              <div>
               <form onSubmit={() => console.log('submit')} className={styles.form}>
                  <div className={`${styles.formGroupSecond} ${styles.formGroup}`}>
                    <input
                      autoFocus
                      maxLength='76'
                      id='correct-mail'
                    //   value={this.state.email}
                    //   onChange={this.handleUserInput}
                      type="text"
                      name="name"
                      placeholder='Введите своё имя...'
                    />                    
                    <input
                    autoFocus
                    maxLength='76'
                    id='correct-mail'
                  //   value={this.state.email}
                  //   onChange={this.handleUserInput}
                    type="password"
                    name="password"
                    placeholder='Введите пароль'
                  />
                  <input
                    autoFocus
                    maxLength='76'
                    id='correct-mail'
                  //   value={this.state.email}
                  //   onChange={this.handleUserInput}
                    type="password"
                    name="password"
                    placeholder='Название бренда'
                  />
                  </div>
                    <button
                    //   disabled={!this.state.formValid}
                    //   className={button.buttonSignUp}
                    //   onClick={this.handleSubmit}
                    >
                      Далі
                    </button>
               </form>
              </div>
            </div>
        </div>
      </div>
      </>
    )
}
