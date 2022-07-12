import axios from 'axios';

const API_URL = "https://shoppingnode-yasir.herokuapp.com";

const getAllSubCategoriues = () => {
    return axios.get(API_URL + "/subcategory/all", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const getSubCategoryById = (id) => {
    return axios.get(API_URL + "/subcategory/get/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const addSubCategory = (name) => {
    return axios.post(API_URL + "/subcategory/add", {
        name
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const updateSubCategory = (id, name) => {
    return axios.put(API_URL + "/subcategory/update/" + id, {
        name
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const deleteSubCategory = (id) => {
    return axios.delete(API_URL + "/subcategory/delete/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


const SubCategoryService = {
    getAllSubCategoriues, getSubCategoryById, addSubCategory, updateSubCategory, deleteSubCategory
}

export default SubCategoryService;