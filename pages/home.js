import React from 'react'
import styles from '../styles/homepage.module.css'
import { useRouter } from 'next/router'

const home = () => {

    const router = useRouter()
    function search(e) {
        if (e.key === 'Enter') {
            const searchTerm = document.getElementById('searchBar').value;
            router.push({
                pathname: '/searchResults',
                query: {searchQuery: searchTerm}
            })
        }
    }
  return (
      <section className={`${styles.section} d-flex flex-column justify-content-around`}>
        <div className={`${styles.titleMainImg} d-flex justify-content-center flex-column align-items-center flex-wrap gap-5`}>
            <h1 className={styles.darkModeTitle} > Ebay - Shpock <span className="text-success">Scraper</span></h1>
            {/* <!-- <img src="assets/Electronic.png" className="home-main-pic" alt="products" width="500"> --> */}
            <input onKeyDown={search} type="search" id="searchBar" className={styles.homeSearchbar} placeholder="Produktname" name="home_searchbar"/>
        </div>
        <div className={`${styles.mt80} container d-flex justify-content-around align-items-center mb-5 flex-wrap`}>
            <div  id="firstImg" className={`card d-flex align-items-center ${styles.card}`}>
                <img src="fast.png" className="round-img mt-3" width="100" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-center">Schnelle Suchmaschine</h5>
                    <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
            <div  id="secondImg" className={`card d-flex align-items-center ${styles.card}`}>
                <img src="wishlist.png" className="round-img mt-3" width="80" alt="..." />
                <div className="card-body">
                  <h5 className="card-title text-center">Wunschliste</h5>
                  <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
            <div  id="thirdImg" className={`card aua d-flex align-items-center ${styles.card}`}>
                <img src="productsort.png" className="round-img mt-3" width="80" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-center">Produktsortiment von Ebay und Shpock </h5>
                    <p className="card-text text-center">Some quick example text to build on the card title and make up...</p>
                </div>
            </div>
        </div>
      </section>
  )
}



export default home