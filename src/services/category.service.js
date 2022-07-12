import axios from 'axios';

const API_URL = "https://shoppingnode-yasir.herokuapp.com";

const getAllCategoriues = () => {
    return axios.get(API_URL + "/category/all", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const getCategoryById = (id) => {
    return axios.get(API_URL + "/category/get/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const addCategory = (name) => {
    return axios.post(API_URL + "/category/add", {
        name
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const updateCategory = (id, name) => {
    return axios.put(API_URL + "/category/update/" + id, {
        name
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const deleteCategory = (id) => {
    return axios.delete(API_URL + "/category/delete/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}



const CategoryService = {
    getAllCategoriues, getCategoryById, addCategory, updateCategory, deleteCategory
}

export default CategoryService;