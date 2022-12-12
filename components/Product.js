import React from 'react'
import styles from '../styles/product.module.scss'


const Product = ({ product }) => {

  const isAuth = false;

  return (
    <div className={`card ${styles.card}`}>
        <img src={product.img} className={`${styles.cardImgTop} card-img-top`} alt="no img" height="300" width="200" />
        <div className="card-body">
            <div className="d-flex flex-column align-items-center">
            <p className={styles.crop}>{product.productName}</p>
            <div className="d-flex justify-content-end align-items-center gap-3">
                {product.shop == 'Shpock' ? <img className={styles.shopImg} src="shpock.svg" alt="shpock"/> 
                : <img className={styles.shopImg}  src="ebay.webp" alt="ebay"/>}
                <h3 className="card-text">€ {product.price}</h3>
            </div>
            <div className={`${styles.linkSection} d-flex justify-content-center align-items-center`}>
                
                {/* <span className="me-3 icon-absolute" *ngIf="!product.inWishlist && isAuth" (click)="addProduct(product)"><i className="bi bi-bag-check" style="font-size: 25px;"></i></span> */}
                {product.inWishlist && isAuth ? <span className={`${styles.iconAbsolute} me-3`}><i className={`bi bi-bag-check-fill ${styles.bi}`} ></i></span>
                :<span className="me-3 icon-absolute" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className={`bi bi-bag-check ${styles.bi}`}></i></span>}
                
                 {/* <button className="mt-2 ms-3" (click)="openProductInfo(product)" mat-button><i className="bi bi bi-info-circle" style="font-size: 25px;"></i></button>  */}
                {/* <i className="bi bi bi-info-circle mt-1" (click)="openProductInfo(product)" style="font-size: 25px;"></i> */}
                <a href={product.link} target="_blank" className="icon-absolute ms-3"><i className={`bi bi-link ${styles.bi}`}></i></a>
            </div>
            {/* <div *ngIf="showBell" className="mt-5 d-flex justify-content-end">
                <i *ngIf="!product?.notify" (click)="addProductToNotify(product)" className="bi bi-bell position-absolute bell"></i>
                <i *ngIf="product?.notify" (click)="removeProductFromNotify(product)" className="bi-bell-fill position-absolute bell"></i>
            </div> */}
            </div>
        </div>
        {/* <div className="rectangle" *ngIf="product.inWishlist"></div> */}
    </div>
  )
}

export default Product