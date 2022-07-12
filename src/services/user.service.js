import axios from 'axios';

const API_URL = "https://shoppingnode-yasir.herokuapp.com";
const token = "";

const login = (username, password) => {
    return axios.post(API_URL + "/user/login", {
        username, password
    }).then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response));
    }).catch((error) => {
        console.log(error);
    });
};

const signup = (name, username, email, phone, password) => {
    return axios.post(API_URL + "/user/signup", {
        name, username, email, phone, password
    });
};

const showProfile = (id) => {
    return axios.get(API_URL + "/user/profile/" + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const updateProfile = (id, name, phone) => {
    return axios.put(API_URL + "/user/profile/" + id, {
        name, phone
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const forgotPassword = (email) => {
    return axios.post(API_URL + "/user/forgot", {
        email
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const chkForgotToken = (token) => {
    return axios.get(API_URL + "/user/checkToken?token=" + token, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const activateProfile = (id) => {
    return axios.put(API_URL + "/user/activate/" + id, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const contactUs = (name, email, subject, message) => {
    return axios.post(API_URL + "/user/contact", {
        name, email, subject, message
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const UserService = {
    signup, login, logout, getCurrentUser, showProfile, updateProfile, forgotPassword, chkForgotToken,
    activateProfile, contactUs
}

export default UserService;