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

import cup from '../style/img/Imgs/cup.svg';
import restaurantIcon from '../style/img/Imgs/restaurant.svg';
import fastFood from '../style/img/Imgs/fast-food.svg';


export default function SecondStep ({ handleChangeStep, iconCheck, userSettings }) {
  const [step, setNextStep] = useState(1);
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');


  const handleSetName = (e) => {
    setName(e.target.value);
  }

  const handleSetOrgName = (e) => {
    setOrganizationName(e.target.value);
  }  
  
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  }
  
  const handleSetOrganization = (name) => {
    setOrganization(name);
  }

  const handleSubmit = (e) => {
  e.preventDefault();
  const data = {
      name: name,
      email: userSettings.email,
      password: password,
      organization: organization,
      organizationName: organizationName,
      isOwner: userSettings.isOwner
    }
    console.log("handleSubmit -> data", data)
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
              <div className={styles.secondForm}>
                <h1 className={styles.title}>Привет, сейчас настроим все для под тебя</h1>
               <form onSubmit={() => console.log('submit')} className={styles.form}>
                  <div className={`${styles.formGroupSecond}`}>
                    <div className={`${styles.formGroup} ${styles.flexInputs}`}>
                    <span>Имя</span>
                    <input
                      autoFocus
                      maxLength='76'
                      id='correct-mail'
                      value={name}
                      onChange={handleSetName}
                      type="text"
                      name="name"
                      placeholder='Введите своё имя...'
                    />
                    </div>
                    <div className={`${styles.formGroup} ${styles.flexInputs}`}>
                    <span>Пароль</span>
                    <input
                    autoFocus
                    maxLength='76'
                    id='correct-mail'
                    value={password}
                    onChange={handleSetPassword}
                    type="password"
                    name="password"
                    placeholder='Введите пароль'
                  />
                  </div>
                  <div className={`${styles.formGroup} ${styles.flexInputs}`}>
                  <span>как называется твой бренд или организация?</span>
                  <input
                    autoFocus
                    maxLength='76'
                    id='correct-mail'
                    value={organizationName}
                    onChange={handleSetOrgName}
                    type="text"
                    name="Brand name"
                    placeholder='Название бренда'
                  />
                  </div>
                  <h2 className={styles.secondTitle}>Выбери, чем ты управляешь?</h2>
                  <div className={`${styles.buttons} ${styles.trioButtons}`}>
                    <div onClick={() => handleSetOrganization('coffeShop')} className={organization === 'coffeShop' ? 'element-selected' : ''}>
                      <div className={styles.check}>
                        {
                        organization === 'coffeShop' &&
                        <img src={iconCheck} alt="check"/>
                        }
                      </div>
                    <img src={cup} alt="cup"/>
                      <span>Кофешоп</span>
                    </div>
                    <div onClick={() => handleSetOrganization('fastFood')} className={organization === 'fastFood' ? 'element-selected' : ''}>
                    <div className={styles.check}>
                        {
                          organization === 'fastFood' &&
                          <img src={iconCheck} alt="check"/>
                        }
                    </div>
                    <img src={fastFood} alt="fast food"/>
                      <span>Фастфуд</span>
                    </div>
                    <div onClick={() => handleSetOrganization('restaurant')} className={organization === 'restaurant' ? 'element-selected' : ''}>
                    <div className={styles.check}>
                        {
                          organization === 'restaurant' &&
                          <img src={iconCheck} alt="check"/>
                        }
                    </div>
                    <img src={restaurantIcon} alt="restaurant"/>
                      <span>Ресторан</span>
                    </div>
                  </div>
                    <button
                      // disabled={!this.state.formValid}
                      className={button.buttonSignUp}
                      onClick={handleSubmit}
                    >
                      Далі
                    </button>
                  </div>
               </form>
              </div>
            </div>
        </div>
      </div>
      </>
    )
}
