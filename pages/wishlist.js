import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Product from '../components/Product'
import { productService } from '../services/product.service'
import { userService } from '../services/user.service'
import styles from '../styles/wishlist.module.scss'

const Wishlist = () => {

    const[wishlist, setWishlist] = useState([]);
    const[loadingProducts, setLoadingProducts] = useState(false);

    useEffect(() => {
        if(!userService.protectRoute) router.push('/home');
        setLoadingProducts(true);
        productService.getWishlist().then(data => {
            productService.getNotifylist().then(list => {
                data.forEach(dataProduct => {
                    list.forEach(listProduct => {
                        if(dataProduct.articleNumber === listProduct.articleNumber) dataProduct.inNotifyList = true;
                    })
                })
                setWishlist(data);
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err));
    }, [])

    function testNotification() {

    }

    const addProductToList = (product) => {
        productService.addProduct(product).then(res => {console.log(res)}).catch(err => console.log(err));
      }
    
    const deleteProductFromList = (product) => {
        setWishlist(wishlist.filter(item => item.articleNumber !== product.articleNumber));
        productService.deleteProduct(product.articleNumber).then(res => {console.log(res)}).catch(err => console.log(err));
    }

    const addProductToNotify = (product) => {
        updateItem(product.articleNumber, { inNotifyList: true });
        productService.addProductToNotifylist(product).then(res => {console.log(res)}).catch(err => console.log(err));
      }
    
    const removeFromProductNotify = (product) => {
        updateItem(product.articleNumber, { inNotifyList: false });
        productService.deleteProductFromNotifylist(product.articleNumber).then(res => {console.log(res)}).catch(err => console.log(err));
    }

    const updateItem = (articleNumber, updates) => {
        setWishlist(
            wishlist.map(item => {
            if (item.articleNumber === articleNumber) {
              return { ...item, ...updates }
            }
            return item;
          })
        );
      }

    return (
        <section className="container mt-5 d-flex flex-column align-items-center">
            <h2 className="text-center">Meine Wunschliste</h2>
            <div className="d-flex align-items-center gap-2">
                <label className="form-check-label" for="flexSwitchCheckDefault">Notifications:</label>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                </div>
                <button className="btn btn-primary" onClick={testNotification}>Test Notification</button>
            </div>

            <span className="mt-2">Anzahl der Produkte: {wishlist.length}</span>
            <div className={`mt-4 mb-4 ${styles.gridProducts}`}>
                {
                    wishlist.map((product) => (
                        <Product key={product._id} showNotify={true} product={product} 
                            addProduct={addProductToList} deleteProduct={deleteProductFromList}
                            addProductToNotify={addProductToNotify}  removeFromProductNotify={removeFromProductNotify}>
                        </Product>
                    ))
                }
            </div>
        </section>
    )
}

export default Wishlist;