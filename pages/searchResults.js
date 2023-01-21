import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Product from '../components/Product'
import Filter from '../components/Filter'
import styles from '../styles/searchResults.module.css'
import SearchBar from '../components/SearchBar'

const searchResults = ({ query }) => {

    const router = useRouter();
    const[searchArray, setSearchArray] = useState(null);
    const[loadingProducts, setLoadingProducts] = useState(false);

    const[asc, setAsc] = useState(false);
    const[desc, setDesc] = useState(false);


    useEffect(() => {
        if(query.searchQuery !== undefined) {
            setLoadingProducts(true);
            fetch('http://localhost:3001/api/search/'+query.searchQuery)
            .then((res) => res.json())
            .then((data) => {
                setSearchArray(data);
                setLoadingProducts(false);
            });
        }
    }, [])


    async function searchEnter(e) {
        if(e.key !== 'Enter') return;
        setSearchArray([]);
        setLoadingProducts(true);
        let searchResults = [];
        if(!e.target.value) return;
        router.push({
            pathname: '/searchResults',
            query: {searchQuery: e.target.value}
        })
        const res = await fetch('http://localhost:3001/api/search/'+e.target.value);
        searchResults = await res.json();
        setSearchArray(searchResults);
        setLoadingProducts(false);
    }

    async function searchOnClick(e) {
        let searchResults = [];
        if(!e.target.value) return;
        router.push({
            pathname: '/searchResults',
            query: {searchQuery: e.target.value}
        })
        const res = await fetch('http://localhost:3001/api/search/'+e.target.value);
        searchResults = await res.json();
        setSearchArray(searchResults);
        console.log(searchArray)
    }


    function filterByEbay() {
        console.log('ebay')
    }

    function filterByShpock() {
        console.log('shpock')
        
    }
    
    function removeFilter() {
        console.log('filter')
    }

    function sortByPriceAsc(arr) {
        arr.sort((a, b) => {
            return a.price - b.price;
        });
      }
    
    function sortByPriceDesc(arr) {
        arr.sort((a, b) => {
            return b.price - a.price;
        });
    }

    function sortByPrice(e) {
        console.log('sort '+e.target.value);
        if(e.target.value === 'asc') {
          setDesc(false);
          setAsc(true);
          sortByPriceAsc(searchArray);
          return;
        }
        setDesc(true);
        setAsc(false);
        sortByPriceDesc(searchArray);
      }

  return (

    <section className={styles.section}>
        <div className={`container ${styles.box} sticky-top`} >
            <SearchBar searchWithEnter={searchEnter} searchWithClick={searchOnClick}/>
        </div>
        {loadingProducts ? 
            <div className="spinner-border text-light" role="status"></div> 
            :<></>
            }
        <div className={`mt-5 d-flex justify-content-center ${styles.searchContainerWidth}`} id="search-container">
            <div className={`position-fixed d-flex justify-content-center align-items-center ${styles.filterSize}`} id="filter" >
                <Filter className={styles.zIndex} filterEbay={filterByEbay} filterShpock={filterByShpock} 
                sortProductByPrice={sortByPrice} removeFilter={removeFilter}/>
            </div>
            {searchArray ? 
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h2 className="text-center">Suchergebnisse für: {router.query.searchQuery}</h2>
                    <span  >Anzahl der Suchergebnisse: {searchArray.length}</span>
                    <button className="btn btn-primary mt-1" id="filterBtnResponisve" data-bs-toggle="modal" data-bs-target="#filterModal">Filter einstellen</button>
                    {searchArray !== null ? 
                            <div className={`${styles.gridProducts} mt-4`}>
                            {searchArray.map((product) => (
                                <Product product={product}></Product>
                            ))}
                        </div>
                        : <></>
                    }
        
                    <button className="btn btn-primary d-flex align-items-center gap-2 mt-4 mb-3">
                        Mehr Produkte laden
                        {loadingProducts ? 
                            <div className="spinner-border text-light" role="status"></div>
                            :
                            <></>
                    }

                    </button>
                </div>
                : <></>
            }
            
        </div>

        {/* <section *ngIf="searchResults.length == 0 && !alreadySearched" class="container d-flex align-items-center justify-content-center">
            <img src="assets/nothingSearched.webp" class="no-search-pic" alt="nothing searched">
        </section> */}
  
        {/* <button class="btn btn-primary position-fixed scroll-up" id="scroll-up" (click)="scrollToTop()"><i class="bi bi-arrow-up"></i></button>
        <div id="showCart" *ngIf="isAuth" [routerLink]="['/wishlist']">
        <app-cart></app-cart>
        </div> */}
    </section>
  )
}

searchResults.getInitialProps = async ({ query }) => {
    return { query }
}

export default searchResults