import axios from 'axios';

// const API_URL = "https://shoppingnode-yasir.herokuapp.com";
const API_URL = "http://localhost:9000";

const viewAllOrders = (token) => {
    return axios.get(API_URL + "/order/all", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const viewUserOrders = (id, token) => {
    return axios.get(API_URL + "/order/get/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const viewOrderDetail = (id, token) => {
    return axios.get(API_URL + "/order/detail/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const placeOrder = (user_id, address, email, phone, price, orderDtl, token) => {
    return axios.post(API_URL + "/order/add", {
        user_id, address, email, phone, price, order_detail: orderDtl
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const deleteOrderById = (id, token) => {
    return axios.delete(API_URL + "/order/delete/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}


const OrderService = {
    viewAllOrders, viewUserOrders, viewOrderDetail, placeOrder, deleteOrderById
}

export default OrderService;