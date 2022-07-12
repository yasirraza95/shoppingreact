import axios from 'axios';

const API_URL = "https://shoppingnode-yasir.herokuapp.com";

const viewUserCart = (id) => {
    return axios.get(API_URL + "/cart/get/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const addCart = (user_id, prod_id, quantity) => {
    return axios.post(API_URL + "/cart/add", {
        user_id, prod_id, quantity
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const increaseQuantity = (user_id, prod_id, quantity) => {
    return axios.post(API_URL + "/cart/addQuantity/" + prod_id, { }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const decreaseQuantity = (user_id, prod_id, quantity) => {
    return axios.post(API_URL + "/cart/removeQuantity/" + prod_id, { }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


const deleteCartById = (id) => {
    return axios.delete(API_URL + "/cart/delete/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const deleteUserCart = (id) => {
    return axios.delete(API_URL + "/cart/deleteUserCart/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const CartService = {
    viewUserCart, addCart, increaseQuantity, decreaseQuantity, deleteCartById, deleteUserCart
}

export default CartService;