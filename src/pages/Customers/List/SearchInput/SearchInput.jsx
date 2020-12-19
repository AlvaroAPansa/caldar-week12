import React, { Component } from 'react';
import styles from './SearchInput.module.css';

function SearchInput() {
    return (
      <div className={styles.container}>
        <i className='material-icons'>
          search
        </i>
        <input className={styles.inputBox} type='text' placeholder="Search" /> 
      </div>
    )
  }

export default SearchInput;