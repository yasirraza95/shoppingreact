import axios from 'axios';

const API_URL = "https://shoppingnode-yasir.herokuapp.com";

const viewUserWishlist = (id) => {
    return axios.get(API_URL + "/wishlist/get/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const addWishlist = (user_id, prod_id, quantity) => {
    return axios.post(API_URL + "/wishlist/add", {
        user_id, prod_id, quantity
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const increaseQuantity = (user_id, prod_id, quantity) => {
    return axios.post(API_URL + "/wishlist/addQuantity/" + prod_id, { }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const decreaseQuantity = (user_id, prod_id, quantity) => {
    return axios.post(API_URL + "/wishlist/removeQuantity/" + prod_id, { }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


const deleteWishlistById = (id) => {
    return axios.delete(API_URL + "/wishlist/delete/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const deleteUserWishlist = (id) => {
    return axios.delete(API_URL + "/wishlist/deleteUserWishlist/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const WishlistService = {
    viewUserWishlist, addWishlist, deleteWishlistById, deleteUserWishlist
}

export default WishlistService;