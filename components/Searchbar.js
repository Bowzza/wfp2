import React, { useEffect, useState } from 'react'
import styles from '../styles/searchBar.module.scss'


const SearchBar = (props) => {

    return (
        <div className="input-group">
            <input onKeyUp={props.searchWithEnter} type="text" className="form-control" placeholder="z.B. notebook..." aria-label="Username" aria-describedby="basic-addon1" />
            <a onClick={props.searchWithClick} className={styles.a}><span className={`input-group-text ${styles.span}`} id="basic-addon1"><i className="bi bi-search"></i></span></a>
        </div>
    )

}

export default SearchBar
