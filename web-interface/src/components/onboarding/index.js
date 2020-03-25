import React, { useEffect, useState } from 'react';
import FirstStep from './firstStep';
import SecondStep from './secondStep';
import uuid from 'uuid';
// import axios from 'axios'

import styles from './index.module.scss';
import acceptIcon from '../style/img/accept.svg'
import rejectIcon from '../style/img/reject.svg'


export default function Onboarding() {
    const [userSettings, setUserSettings] = useState({});
    const [step, setNextStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    
    const handleUserInput = (e) => {
        setEmail(e.target.value);
    }
    const addUserData = (data) => {
        setUserSettings(data);
    }
    const handleChangeStep = (newStep) => {
        setNextStep(newStep);
    }
    
    console.log("Onboarding -> userSettings", userSettings)
    const accept = (
        <img src={acceptIcon} alt="accept" />
    )
    const reject = (
        <img src={rejectIcon} alt="reject" />
    )

    return (
        <>
            {
                step === 1 ? (
                    <FirstStep
                    handleChangeStep={handleChangeStep}
                    addUserData={addUserData}
                    />
                ) : null
            }
            {
                step === 2 ? (
                    <SecondStep
                    handleChangeStep={handleChangeStep}
                    />
                ) : null
            }
        </>
    )
}
