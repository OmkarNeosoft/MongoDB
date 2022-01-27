import axios from "axios";

const URL = "http://localhost:5555/";

export function getUsers() {
    return axios.get(`${URL}users`);
}

export function postUsers(data) {
    return axios.post(`${URL}register`, data);
}

export function userLogin(data) {
    return axios.post(`${URL}login`, data);
}

export function addInvoice(data) {
    return axios.post(`${URL}addinvoice`, data);
}

export function getInvoice() {
    return axios.get(`${URL}getinvoice`);
}

export function sendMail(data) {
    return axios.post(`${URL}sendmail`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
