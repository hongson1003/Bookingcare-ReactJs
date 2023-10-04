import axios from "../axios";

let createBookingService = async (data) => {
    return await axios.post('/api/create-booking', data);
}

let postVerifyBooking = async (data) => {
    return await axios.post('/api/verify/appointment', data);
}

let getAllDoctorWithSepecialties = async (id) => {
    return await axios.get('/api/get-all-doctor-with-specialties?id=' + id);
}
let getMenuSearch = async () => {
    return await axios.get('/api/get-all-menu-specialties');
}
let getAllClinics = async (id) => {
    return await axios.get('/api/get-all-clinics?id=' + id);
}

export {
    createBookingService,
    postVerifyBooking,
    getAllDoctorWithSepecialties,
    getMenuSearch,
    getAllClinics
}