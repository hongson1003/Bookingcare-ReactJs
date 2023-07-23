import axios from "../axios";

let handleCheckLogin = async (email, password) => {
    let data = await axios.post('/api/login', {
        email, password
    });
    return data;
}

let getUsers = (id) => {
    return axios.get(`/api/get-users?id=${id}`)
}
let createNewAUser = async (user) => {
    return await axios.post('/api/create-newuser', user);
}
let deleteUser = async (id) => {
    return await axios.delete('/api/delete-user', {
        data: {
            id: id,
        }
    })
}

let editUser = (item) => {
    return axios.put('/api/update-user', item);
}

let getAllCode = async (type) => {
    return await axios.get(`/api/getAllCode?type=${type}`);
}

export { handleCheckLogin, getUsers, createNewAUser, deleteUser, editUser, getAllCode };