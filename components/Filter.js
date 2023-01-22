import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../styles/filter.module.scss'
import { filterService } from '../services/filter.service'

const Filter = (props) => {

    const[filterEbay, setFilterEbay] = useState(false);
    const[filterShpock, setFilterShpock] = useState(false);

    useEffect(() => {
        console.log(props)
        filterService.getEbayListener().subscribe(value => setFilterEbay(value));
        filterService.getShpockListener().subscribe(value => setFilterShpock(value));
    }, [])

    return (
        <div className={`card d-flex flex-column justify-content-center align-items-center gap-3 ${styles.cardWidth}`}>
            <h3 >Filter</h3>
            <div className="form-check">
                <input onChange={props.filterEbay} checked={filterEbay} className="form-check-input" type="radio" name="filterEbay" id="filterEbay" />
                <label className="form-check-label" for="filterEbay" >
                    Ebay Produkte
                </label>
            </div>
            <div className="form-check">
                <input onChange={props.filterShpock} checked={filterShpock} className="form-check-input" type="radio" name="filterShpock" id="filterShpock"/>
                <label className="form-check-label" for="filterShpock">
                    Shpock Produkte
                </label>
            </div>
            <select onChange={props.sortProductByPrice} className={`form-select select-width me-2 ${styles.selectWidth}`} aria-label="Default select example">
                <option value="asc" selected={props.asc}>Aufsteigend</option>
                <option value="desc" selected={props.desc}>Absteigend</option>
            </select>
            <button onClick={props.removeFilter} id="removeFilterBtn" className="btn btn-primary">Filter entfernen</button>
        </div>
    )
}

export default Filter