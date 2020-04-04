import React,{ useEffect, useState } from 'react';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import styles from './index.module.scss';
import button from '../buttons.module.scss';

import close from '../style/img/Icon_X_gray.svg';
import hidePassword from '../style/img/Icon_hide_password.svg';
import showPassword from '../style/img/Icon_show_password.svg';





import acceptIcon from '../style/img/accept.svg'
import rejectIcon from '../style/img/reject.svg'

export default function FirstStep ({ handleChangeStep, addUserData, iconCheck, dish, restaurant }) {
  const [email, setEmail] = useState('');
  const [isOwner, setIsOwner] = useState();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleUserInput = (e) => {
    setEmail(e.target.value);
  }
  const handleCheck = (check) => {
    setIsOwner(check);
  }

  const handleConfirm = () => {
    addUserData({
      email,
      isOwner
    });
    handleChangeStep(2);
  }

  const validation = () => {
    if((isOwner === true || isOwner === false) && email !== '') {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  useEffect(() => {
    validation();
  }, [email, isOwner]);

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
              <div>
                <div>
                  <div className={styles.buttons}>
                    <div className={isOwner === false ? 'element-selected' : ''} onClick={() => setIsOwner(false)}>
                      <div className={styles.check}>{isOwner === false && <img src={iconCheck} alt="check"/>}</div>
                    <img src={dish} alt="dish"/>
                      <span>Хочу їсти</span>
                      <p>клієнт</p>
                    </div>
                    <div className={isOwner ? 'element-selected' : ''} onClick={() => setIsOwner(true)}>
                      <div className={styles.check}>{isOwner && <img src={iconCheck} alt="check"/>}</div>
                    <img src={restaurant} alt="restaurant"/>
                      <span>Смачно Готую</span>
                      <p>керую рестораном</p>
                    </div>
                  </div>
                 <form onSubmit={() => console.log('submit')} className={styles.form}>
                    <div className={styles.formGroup}>
                      <input
                        autoFocus
                        maxLength='76'
                        id='correct-mail'
                        value={email}
                        onChange={handleUserInput}
                        type="email"
                        name="email"
                        placeholder='name@email.com'
                      />
                     <div className={styles.errorBlock}>
                     <span className={styles.errors} id='email-error-message'>Це не схоже на електронну пошту</span>
                     <span className={styles.errors} id='login-exists-message'>This email is already registered</span>
                     </div>
                    </div>
                      <button
                        disabled={!isFormValid}
                        className={button.buttonSignUp}
                        onClick={handleConfirm}
                      >
                        Далі
                      </button>
                 </form>
                </div>
              </div>
          </div>
        </div>
        )
      </>
    )
}
