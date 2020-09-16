import React,{ useEffect, useState, memo } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux'
import { getUserInfo } from '../../actions/user'
import styles from './index.module.scss';
import buttons from '../buttons.module.scss';

import cup from '../style/img/Imgs/cup.svg';
import pen from '../style/img/pen-solid.svg';

const actions = { getUserInfo };

const mapStateToProps = ({ user, dashboard }) => ({
  user,
  dashboard
});

const Restaurants = function({ getUserInfo, user }) {
  const [ifFormVisible, setIsformVisible] = useState(false);
  const [ifChangeNameVisible, setChangeNameVisible] = useState(false);
  const [selectOption, setOption] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [orgNameValue, setOrgNameValue] = useState('');
  const userInfo =  JSON.parse(localStorage.getItem('user'));
  const options = [
    { value: 'coffeShop', label: 'Кофешоп' },
    { value: 'restaurant', label: 'Ресторан' },
    { value: 'fastFood', label: 'Фастфуд' },
  ];

  const handleFormOpen = () => {
    setIsformVisible(!ifFormVisible);
    const id = JSON.parse(localStorage.getItem('user')).organization.length + 1;
    if(orgNameValue !== '' && selectOption !== null && ifFormVisible) {
      const newOrg = {type: selectOption.value, orgName: orgNameValue, id};
      const data = {
        name: userInfo.name,
        email: userInfo.userSettings,
        password: userInfo.password,
        organization: [...userInfo.organization, newOrg],
        isOwner: userInfo.isOwner,
      }
      localStorage.setItem('user', JSON.stringify(data));
      setOrgNameValue('');
      setOption('null');
    }
  }

  const handleChange = selectedOption => {
    setOption(selectedOption);
  };

  const handleChangeName = event => {
    setOrgNameValue(event.target.value);
  };

  const handleEditName = id => {
    setEditCommentId(id);
    getUserInfo();
    setChangeNameVisible(!ifChangeNameVisible);
  }

  const renderBlocks = () => {
  return (
    userInfo && userInfo.organization.map(org => (
      <div key={org.id} className={styles.restaurantBlock}>
        <div>
          <div className={styles.organization}>
            <img src={cup} alt="icon"/>
            <div>
              {
                ifChangeNameVisible && editCommentId === org.id ?
                <input type="text" />
                :
                <h5>{org.orgName}</h5>
              }
              <span>{org.type}</span>
            </div>
            <img onClick={() => handleEditName(org.id)} className={styles.editButton} src={pen} alt="edit"/>
          </div>
        </div>
      </div>
    ))
  )
  };

  return(
      <>
      <div className={styles.addItem}>
        <button 
        className={buttons.buttonSignUp}
        onClick={handleFormOpen}
        >
          Add new
        </button>
       { ifFormVisible &&
        (<div>
          <Select
            placeholder="Тип заведения"
            value={selectOption}
            onChange={handleChange}
            options={options}
          />
          <input 
            value={orgNameValue} 
            onChange={handleChangeName}
            placeholder="Название..." 
            type="text"
            maxLength="42"
          />
        </div>)}
      </div>
      {renderBlocks()}
      </>
    )
}

export default memo(connect(mapStateToProps, actions)(Restaurants));