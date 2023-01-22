import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Product from '../components/Product'
import Filter from '../components/Filter'
import styles from '../styles/searchResults.module.css'
import SearchBar from '../components/SearchBar'
import { filterService } from '../services/filter.service'
import { productService } from '../services/product.service';
import { userAgent } from 'next/server'
import { userService } from '../services/user.service'


const searchResults = ({ query }) => {

    const router = useRouter();
   
    const[searchArrayBeforeFilter, setFilterArray] = useState([]);
    const[loadingProducts, setLoadingProducts] = useState(false);

    const[filterEbay, setFilterEbay] = useState(false);
    const[filterShpock, setFilterShpock] = useState(false);

    const[asc, setAsc] = useState(false);
    const[desc, setDesc] = useState(false);

    const[searchArray, setSearchArray] = useState([]);

    useEffect(() => {
        if(query.searchQuery !== undefined) {
            setLoadingProducts(true);
            fetch('http://localhost:3001/api/search/'+query.searchQuery)
            .then((res) => res.json())
            .then((data) => {
                sortByPriceAsc(data);
                if(userService.protectRoute) {
                    console.log("logged in")
                    productService.getWishlist().then(wishlist => {
                        data.forEach(dataProduct => {
                            wishlist.forEach(product => {
                                if(dataProduct.articleNumber === product.articleNumber) {
                                    console.log('same products: '+dataProduct.articleNumber+' '+product.articleNumber)
                                    dataProduct.inWishlist = true
                                }
                            })
                        })
                        setSearchArray(data);
                        setFilterArray(data);
                        setLoadingProducts(false);
                        console.log(searchArray)
                    });
                } else {
                    setSearchArray(data);
                    setFilterArray(data);
                    setLoadingProducts(false);
                }
            });
        }
    }, [])


    async function searchEnter(e) {
        if(e.key !== 'Enter') return;
        if(!e.target.value) return;
        router.push({
            pathname: '/searchResults',
            query: {searchQuery: e.target.value}
        })

        fetch('http://localhost:3001/api/search/'+e.target.value)
            .then((res) => res.json())
            .then((data) => {
                sortByPriceAsc(data);
                if(userService.protectRoute) {
                    console.log("logged in")
                    productService.getWishlist().then(wishlist => {
                        data.forEach(dataProduct => {
                            wishlist.forEach(product => {
                                if(dataProduct.articleNumber === product.articleNumber) {
                                    console.log('same products: '+dataProduct.articleNumber+' '+product.articleNumber)
                                    dataProduct.inWishlist = true
                                }
                            })
                        })
                        setSearchArray(data);
                        setFilterArray(data);
                        setLoadingProducts(false);
                        console.log(searchArray)
                    });
                } else {
                    setSearchArray(data);
                    setFilterArray(data);
                    setLoadingProducts(false);
                }
        });
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
        setFilterArray(searchArrayBeforeFilter);
        setSearchArray(searchArrayBeforeFilter);
        setFilterShpock(false);
        setFilterEbay(true);
        filterService.emitShpock(false);
        filterService.emitEbay(true);
        setSearchArray(searchArrayBeforeFilter.filter(product => product.shop === 'Ebay'));
        desc ? sortByPriceDesc(searchArrayBeforeFilter) : sortByPriceAsc(searchArrayBeforeFilter);
    }

    function filterByShpock() {
        setFilterArray(searchArrayBeforeFilter);
        setSearchArray(searchArrayBeforeFilter);
        setFilterEbay(false);
        setFilterShpock(true);
        filterService.emitEbay(false);
        filterService.emitShpock(true);
        setSearchArray(searchArrayBeforeFilter.filter(product => product.shop === 'Shpock'));
        desc ? sortByPriceDesc(searchArrayBeforeFilter) : sortByPriceAsc(searchArrayBeforeFilter);
    }
    
    function removeFilter() {
        filterService.emitEbay(false);
        filterService.emitShpock(false);
        setSearchArray(searchArrayBeforeFilter);
        sortByPriceAsc(searchArrayBeforeFilter);
        setAsc(true);
        setDesc(false);
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

    const updateItem = (articleNumber, updates) => {
        setSearchArray(
          searchArray.map(item => {
            if (item.articleNumber === articleNumber) {
              return { ...item, ...updates }
            }
            return item;
          })
        );
      }

    const addProductToList = (product) => {
        updateItem(product.articleNumber, { inWishlist: true });
        productService.addProduct(product).then(res => {console.log(res)}).catch(err => console.log(err));
    }
    
    const deleteProductFromList = (product) => {
        updateItem(product.articleNumber, { inWishlist: false });
        productService.deleteProduct(product.articleNumber).then(res => {console.log(res)}).catch(err => console.log(err));
    }

    const loadMoreProducts = () => {
        removeFilter();
        let ebayProducts = 0;
        let shpockProducts = 0;
        searchArray.forEach(product => { product.shop === 'Ebay' ? ebayProducts++ : shpockProducts++; });
        const searchName = router.query.searchQuery;
        productService.loadMoreProducts(searchName, ebayProducts, shpockProducts).then(data => {
            productService.getWishlist(wishlist => {
                data.forEach(dataProduct => {
                    wishlist.forEach(wishlistProduct => {
                        if(dataProduct.articleNumber === wishlistProduct.articleNumber) dataProduct.inWishlist = true;
                    })
                })
                setSearchArray(searchArray.concat(data));
            })
        }).catch(err => console.log(err))
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
            <div className={` d-flex justify-content-center align-items-center ${styles.filterSize}`} id="filter" >
                <Filter className={`position-fixed ${styles.zIndedx}`} asc={asc} desc={desc} filterByEbay={filterEbay} filterByShpock={filterShpock} filterEbay={filterByEbay} filterShpock={filterByShpock} 
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
                                <Product product={product} addProduct={addProductToList} deleteProduct={deleteProductFromList}></Product>
                            ))}
                        </div>
                        : <></>
                    }
        
                    <button onClick={loadMoreProducts} className="btn btn-primary d-flex align-items-center gap-2 mt-4 mb-3">
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