import actionTypes from "./actionTypes";
import { getAllCode } from '../../services/userService';
export const fetchGenderStart = async () => {
    try {
        let pyload = await getAllCode('gender');
        if (pyload.errCode) {
            return fetchGenderFail();
        }
        if (pyload)
            return {
                ...fetchGenderSuccess(),
                pyload: pyload,
            }
        else
            return fetchGenderFail();
    } catch (e) {
        console.log('lỗi rồi');
        return fetchGenderFail();
    }
}

export const fetchGenderSuccess = () => (
    {
        type: actionTypes.FETCH_GENDER_SUCCESS
    }
)
export const fetchGenderFail = () => (
    {
        type: actionTypes.FETCH_GENDER_FAIL
    }
)