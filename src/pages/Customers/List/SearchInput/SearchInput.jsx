import React, { Component } from 'react';
import styles from './SearchInput.module.css';

function SearchInput() {
    return (
      <div className={styles.container}>
        <i className='material-icons'>
          search
        </i>
        <input style={searchInputStyle} type='text' placeholder="Search" /> 
      </div>
    )
  }

const searchInputStyle = {
  borderStyle: 'none',
  borderBottom: '2px solid grey'
}

export default SearchInput;