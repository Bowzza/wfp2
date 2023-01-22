import React from 'react'
import { userService } from '../services/user.service';
import styles from '../styles/product.module.scss'


const Product = (props) => {


  return (
    <div className={`card ${styles.card}`}>
        <img src={props.product.img} className={`${styles.cardImgTop}`} alt="no img" height="300" width="200" />
        <div className="card-body">
            <div className="d-flex flex-column align-items-center">
                <p className={styles.crop}>{props.product.productName}</p>
                <div className="d-flex justify-content-end align-items-center gap-3">
                    {props.product.shop == 'Shpock' ? <img className={styles.shopImg} src="shpock.svg" alt="shpock"/> 
                    : <img className={styles.shopImg}  src="ebay.webp" alt="ebay"/>}
                    <h3 className="card-text">€ {props.product.price}</h3>
                </div>
                <div className={`${styles.linkSection} d-flex justify-content-center align-items-center`}>
                    
                    {props.product.inWishlist && userService.protectRoute ? 
                        <span onClick={() => props.deleteProduct(props.product)} className={`${styles.iconAbsolute} me-3`}><i className={`bi bi-bag-check-fill ${styles.bi}`} ></i></span>
                    :
                        <span className="me-3 icon-absolute" data-bs-toggle="modal" onClick={() => props.addProduct(props.product)} data-bs-target="#exampleModal"><i className={`bi bi-bag-check ${styles.bi}`}></i></span>
                    }
                    
                    {/* <button className="mt-2 ms-3" (click)="openProductInfo(product)" mat-button><i className="bi bi bi-info-circle" style="font-size: 25px;"></i></button>  */}
                    {/* <i className="bi bi bi-info-circle mt-1" (click)="openProductInfo(product)" style="font-size: 25px;"></i> */}
                    {
                    props.showNotify ?
                    <div >
                        {props.product.inNotifyList ? 
                            <i onClick={() => props.removeFromProductNotify(props.product)} className={`bi-bell-fill ${styles.bell}`}></i>
                             :
                             <i onClick={() => props.addProductToNotify(props.product)} className={`bi bi-bell ${styles.bell}`}></i>
                        }
                    </div>
                    : <></>
                }
                    <a href={props.product.link} target="_blank" className="icon-absolute ms-3"><i className={`bi bi-link ${styles.bi}`}></i></a>
                </div>


            </div>
        </div>
        {/* <div className="rectangle" *ngIf="product.inWishlist"></div> */}
    </div>
  )
}

export default Product

