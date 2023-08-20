import axios from "../axios";

let handleCheckLogin = async (email, password) => {
    let data = await axios.post('/api/login', {
        email, password
    });
    return data;
}

let getUsers = async (id) => {
    return await axios.get(`/api/get-users?id=${id}`)
}
let createNewAUser = async (user) => {
    return await axios.post('/api/create-newuser', user);
}
let deleteUser = async (id) => {
    let response = await axios.delete('/api/delete-user', {
        data: {
            id: id,
        }
    })
    return response;
}

let editUser = (item) => {
    return axios.put('/api/update-user', item);
}

let getAllCode = async (type) => {
    return await axios.get(`/api/getAllCode?type=${type}`);
}
let getTopDoctors = async (limit) => {
    return await axios.get('/api/get-top-doctor');
}

export { handleCheckLogin, getUsers, createNewAUser, deleteUser, editUser, getAllCode, getTopDoctors };