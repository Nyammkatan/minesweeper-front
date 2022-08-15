import axios from "axios";
import { SERVER_URL } from "./constants";

export const login = (username, password) => {
    return axios({
        method: "POST",
        url: SERVER_URL+"auth/login",
        data: {
            username,
            password
        }
    });
};

export const register = (username, password) => {
    return axios({
        method: "POST",
        url: SERVER_URL+"users",
        data: {
            username,
            password
        }
    });
};

export const getSaveGame = (token) => {
    return axios({
        method: "GET",
        url: SERVER_URL+"grid/save",
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};

export const newGame = (token) => {
    return axios({
        method: "POST",
        url: SERVER_URL+"grid/new",
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};

export const loadGame = (token) => {
    return axios({
        method: "GET",
        url: SERVER_URL+"grid/load",
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};

export const markTile = (i, j, token) => {
    return axios({
        method: "POST",
        url: SERVER_URL+"grid/mark",
        data: {
            i, j
        },
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};

export const checkTile = (i, j, token) => {
    return axios({
        method: "POST",
        url: SERVER_URL+"grid/check",
        data: {
            i, j
        },
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};