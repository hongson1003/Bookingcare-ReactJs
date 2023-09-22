import axios from "../axios";

let createBookingService = async (data) => {
    return await axios.post('/api/create-booking', data);
}

let postVerifyBooking = async (data) => {
    return await axios.post('/api/verify/appointment', data);
}
export {
    createBookingService,
    postVerifyBooking
}