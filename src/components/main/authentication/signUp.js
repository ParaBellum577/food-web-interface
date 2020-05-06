import React,{ useEffect, useState, memo } from 'react';
// import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import styles from './index.module.scss';
import button from '../../buttons.module.scss';
// import close from '../style/img/Icon_X_gray.svg';
// import hidePassword from '../style/img/Icon_hide_password.svg';
// import showPassword from '../style/img/Icon_show_password.svg';

// import acceptIcon from '../style/img/accept.svg'
// import rejectIcon from '../style/img/reject.svg'


const SignUp = function ({ handleChangeStep, addUserData, iconCheck, dish, restaurant }) {
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

//   const accept = (
//     <img src={acceptIcon} alt="accept"/>
//   )
//   const reject = (
//     <img src={rejectIcon} alt="reject"/>
//   )

  return(
      <>

      </>
    )
}

export default memo(SignUp);