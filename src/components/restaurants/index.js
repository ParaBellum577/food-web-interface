import React,{ useEffect, useState, memo } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux'
import styles from './index.module.scss';
import buttons from '../buttons.module.scss';
import cup from '../style/img/Imgs/cup.svg';

const mapStateToProps = ({ user, dashboard }) => ({
  user,
  dashboard
});

const Restaurants = function() {
  const [ifFormVisible, setIsformVisible] = useState(false);
  const [selectOption, setOption] = useState(null);
  const [orgNameValue, setOrgNameValue] = useState('');
  const userInfo =  JSON.parse(localStorage.getItem('user'));
  const options = [
    { value: 'coffeShop', label: 'Кофешоп' },
    { value: 'restaurant', label: 'Ресторан' },
    { value: 'fastFood', label: 'Фастфуд' },
  ];

  const handleFormOpen = () => {
    setIsformVisible(!ifFormVisible);
    if(orgNameValue !== '' && selectOption !== null && ifFormVisible) {
      const newOrg = {type: selectOption.value, orgName: orgNameValue};
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

  const renderBlocks = () => {
  return (
    userInfo && userInfo.organization.map(org => (
      <div key={org.orgName} className={styles.restaurantBlock}>
        <div>
          <div className={styles.organization}>
            <img src={cup} alt="icon"/>
            <div>
              <h5>{org.orgName}</h5>
              <span>{org.type}</span>
            </div>
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

export default memo(connect(mapStateToProps)(Restaurants));