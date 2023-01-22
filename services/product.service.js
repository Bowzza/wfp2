import { Subject } from 'rxjs';
import { useRouter } from 'next/router'
import { fetchWrapper } from '../helpers/fetch-wrapper';


const getWishlist = () => {
    return fetchWrapper.get('http://localhost:3001/api/users/product', localStorage.getItem('token'));
}

const addProduct = (product) => {
    return fetchWrapper.post('http://localhost:3001/api/users/addProduct', {product}, localStorage.getItem('token'));
}

const deleteProduct = (articleNumber) => {
    return fetchWrapper.delete('http://localhost:3001/api/users/'+articleNumber, localStorage.getItem('token'));
}

const getNotifylist = () => {
    return fetchWrapper.get('http://localhost:3001/api/notify/notifyProducts', localStorage.getItem('token'));
}

const addProductToNotifylist = (product) => {
    return fetchWrapper.post('http://localhost:3001/api/notify/addToNotifyProduct', {product}, localStorage.getItem('token'));
}

const deleteProductFromNotifylist = (articleNumber) => {
    return fetchWrapper.delete('http://localhost:3001/api/notify/deleteFromNotifyProduct/'+articleNumber, localStorage.getItem('token'));
}

const loadMoreProducts = (searchName, ebay, shpock) => {
    return fetchWrapper.post('http://localhost:3001/api/search/'+searchName, {ebay, shpock});
}


export const productService = {
    getWishlist,
    addProduct,
    deleteProduct,
    getNotifylist,
    addProductToNotifylist,
    deleteProductFromNotifylist,
    loadMoreProducts
};