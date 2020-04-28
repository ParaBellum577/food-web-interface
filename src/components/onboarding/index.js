import React, { useEffect, useState, memo } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'
import { getUserInfo, setUserInfo } from '../../actions/user'
import FirstStep from './firstStep';
import SecondStep from './secondStep';

import acceptIcon from '../style/img/accept.svg'
import rejectIcon from '../style/img/reject.svg'
import iconCheck from '../style/img/Icon_green.svg';
import dish from '../style/img/Imgs/dish.svg';
import restaurant from '../style/img/Imgs/restaurant.svg';

const mapStateToProps = ({ user, dashboard }) => ({
    user,
    dashboard
});
  
const actions = { getUserInfo, setUserInfo };

const Onboarding = ({ getUserInfo, setUserInfo, user }) => {
    const [userSettings, setUserSettings] = useState({});
    const [step, setNextStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    
    const getData = async () => {
        if(_.isEmpty(user.users)) {
            await getUserInfo();
            setUserInfo(userSettings);
            console.log('user', user)
            }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleUserInput = (e) => {
        setEmail(e.target.value);
    }
    const addUserData = (data) => {
        setUserSettings(data);
    }
    const handleChangeStep = (newStep) => {
        setNextStep(newStep);
    }
    
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
                    iconCheck={iconCheck}
                    dish={dish}
                    restaurant={restaurant}
                    />
                ) : null
            }
            {
                step === 2 ? (
                    <SecondStep
                    handleChangeStep={handleChangeStep}
                    iconCheck={iconCheck}
                    userSettings={userSettings}
                    />
                ) : null
            }
        </>
    )
}

export default memo(connect(mapStateToProps,actions)(Onboarding));
