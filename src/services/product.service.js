import axios from 'axios';

// const API_URL = "https://shoppingnode-yasir.herokuapp.com";
const API_URL = "http://localhost:9000";

const getAllProducts = (token) => {
    return axios.get(API_URL + "/product/all")
}

const getProductById = (token, id) => {
    return axios.get(API_URL + "/product/get/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const addProduct = (token, name, image, price, sub_cat_id) => {
    return axios.post(API_URL + "/product/add", {
        name, image, price, sub_cat_id
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const updateProduct = (token, id, name) => {
    return axios.put(API_URL + "/product/update/" + id, {
        name
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const deleteProduct = (token, id) => {
    return axios.delete(API_URL + "/product/delete/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const ProductService = {
    getAllProducts, getProductById, addProduct, updateProduct, deleteProduct
}

export default ProductService;