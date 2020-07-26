import { post, baseurl, get } from './baseservice.js';
// import { user } from '../store/stores.js';
// import { get as getStore } from 'svelte/store'; 


export async function login(email, password) {
    return post(`${baseurl}/auth/login`, {
        email: email,
        password: password
    });
}

export async function signup(email, password, firstname, lastname) {
    return post(`${baseurl}/auth/signup`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    });
}

export async function isValidToken(token) {
    return post(`${baseurl}/auth/token/valid`, {
        token: token
    });
}

export async function getUser() {
    return get(`${baseurl}/user`);
}

export async function createEmployee(employee) {
    return post(`${baseurl}/employee/create`, employee);
}

export async function getEmployees(limit = 20, offset = 0) {
    return get(`${baseurl}/employee/list?limit=${limit}&offset=${offset}`)
}

export async function getEmployee(uuid) {
    return get(`${baseurl}/employee/single?uuid=${uuid}`)
}

export async function createSchedule(schedule) {
    return post(`${baseurl}/schedule/create`, schedule);
}

export async function getSchedules(employeeUUID, limit = 20, offset = 0) {
    return get(`${baseurl}/schedule/list?uuid=${employeeUUID}&limit=${limit}&offset=${offset}`);
}

export async function getAllSchedules(limit = 20, offset = 0) {
    return get(`${baseurl}/schedule/list?limit=${limit}&offset${offset}`);
}