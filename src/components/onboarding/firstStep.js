import React,{ useState, memo } from 'react';
import validator from 'validator';
import styles from './index.module.scss';
import button from '../buttons.module.scss';
import img from '../style/img/20317591.jpg'

const FirstStep = function ({ handleChangeStep, addUserData, iconCheck, dish, restaurant }) {
  const [email, setEmail] = useState('');
  const [isOwner, setIsOwner] = useState();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleUserInput = (e) => {
    setEmail(e.target.value);
    if (!validator.isEmail(e.target.value)) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
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

  return(
      <>
          <div id='modal-sign-up' className={styles.modal}>
          <div className={styles.modalLeft}>
              <div className={styles.imgIntegrations}>
                <img src={img} alt="img"/>
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
                        className={(isFormValid || email === '') ? '' : 'error-input'}
                        value={email}
                        onChange={handleUserInput}
                        type="email"
                        name="email"
                        placeholder='name@email.com'
                      />
                    </div>
                      <button
                        disabled={!isFormValid}
                        className={button.buttonSignUp}
                        onClick={handleConfirm}
                      >
                        Далі
                      </button>
                 </form>
                   {
                     (!isFormValid && email !== '') &&
                     (
                      <div className={styles.errorBlock}>
                         <span className={styles.errors} className="error-message">Це не схоже на електронну пошту</span>
                         {/* <span className={styles.errors} className="error-message">This email is already registered</span> */}
                      </div> 
                     )
                   }
                </div>
              </div>
          </div>
        </div>
      </>
    )
}

export default memo(FirstStep);