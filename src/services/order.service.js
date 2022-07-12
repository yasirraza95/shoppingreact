import axios from 'axios';

const API_URL = "https://shoppingnode-yasir.herokuapp.com";

const viewAllOrders = () => {
    return axios.get(API_URL + "/order/all", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const viewUserOrders = (id) => {
    return axios.get(API_URL + "/order/get/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const placeOrder = (user_id, address, email, phone) => {
    return axios.post(API_URL + "/order/add", {
        user_id, address, email, phone
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const deleteOrderById = (id) => {
    return axios.delete(API_URL + "/order/delete/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


const OrderService = {
    viewAllOrders, viewUserOrders, placeOrder, deleteOrderById
}

export default OrderService;