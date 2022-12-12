import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Product from '../components/Product'
import styles from '../styles/searchResults.module.css'


const searchResults = ({ searchResults }) => {

  const router = useRouter();
//   console.log(router.query.searchQuery)
//   const searchTerm = router.query.searchQuery
//   const [data, setData] = useState([])
//   useEffect(() => {
//     if(router.query.searchQuery) {
//         console.log('fjiaofoafaif')
//         fetch('http://localhost:3001/api/search/'+router.query.searchQuery)
//         .then((res) => res.json())
//         .then((data) => {
//             setData(data)
//             console.log(data)
//         })
//     }
//    } ,[])
  

  return (

    <section className='section'>
        {/* <div class="container box sticky-top" [class.darkCard]="darkmode" style="z-index: 5;">
            <app-searchbar (searchProduct)="search($event)"></app-searchbar>
        </div> */}
        <div class="mt-5 d-flex justify-content-center" id="search-container">
            <div class="position-fixed d-flex justify-content-center align-items-center" id="filter" >
            {/* <app-filter 
                *ngIf="searchResults.length > 0 || alreadySearched" [asc]="asc" [desc]="desc" [darkmode]="darkmode" 
                (filterEbay)="filterEbay()" (filterShpock)="filterShpock()" 
                (sortByPrice)="sortByPrice($event)" (removeFilter)="removeFilter()">
            </app-filter> */}
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center">
            <h2 class="text-center">Suchergebnisse für: {router.query.searchQuery}</h2>
            <span  >Anzahl der Suchergebnisse: {searchResults.length}</span>
            <button class="btn btn-primary mt-1" id="filterBtnResponisve" data-bs-toggle="modal" data-bs-target="#filterModal">Filter einstellen</button>
            <div className={`${styles.gridProducts} mt-4`}>
                {searchResults.map((product) => (
                    <Product product={product}></Product>
                ))}
            </div>
            <button class="btn btn-primary d-flex align-items-center gap-2 mt-4 mb-3">
                Mehr Produkte laden
                {/* <div *ngIf="loadingProducts" class="spinner-border text-light" role="status" style="width: 1.5rem; height: 1.5rem;"></div> */}
            </button>
            </div>
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

export const getServerSideProps = async (context) => {
    let searchResults = [];
    if(!context.query.searchQuery) return { props: { searchResults } };
    const res = await fetch('http://localhost:3001/api/search/'+context.query.searchQuery);
    searchResults = await res.json();
    
    return {
     props: {
        searchResults
     }
    }
}


export default searchResults