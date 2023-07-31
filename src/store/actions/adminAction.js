import actionTypes from "./actionTypes";
import { getAllCode, createNewAUser } from '../../services/userService';
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
export const fetchPositionStart = async () => {
    try {
        let pyload = await getAllCode('position');
        if (pyload.errCode) {
            return fetchPositionFail();
        }
        if (pyload)
            return {
                ...fetchPositionSuccess(),
                pyload: pyload,
            }
        else
            return fetchPositionFail();
    } catch (e) {
        return fetchGenderFail();
    }
}

export const fetchPositionSuccess = () => (
    {
        type: actionTypes.FETCH_POSITION_SUCCESS
    }
)
export const fetchPositionFail = () => (
    {
        type: actionTypes.FETCH_POSITION_FAIL
    }
)


export const fetchRoleStart = async () => {
    try {
        let pyload = await getAllCode('role');
        if (pyload.errCode) {
            return fetchRoleFail();
        }
        if (pyload)
            return {
                ...fetchRoleSuccess(),
                pyload: pyload,
            }
        else
            return fetchRoleFail();
    } catch (e) {
        return fetchRoleFail();
    }
}

export const fetchRoleSuccess = () => (
    {
        type: actionTypes.FETCH_ROLE_SUCCESS
    }
)
export const fetchRoleFail = () => (
    {
        type: actionTypes.FETCH_ROLE_FAIL
    }
)

export const createUserStart = async (data) => {
    if (!data)
        return createUserFail();
    else {
        try {
            let response = await createNewAUser(data);
            if (response.errCode == 0)
                return {
                    ...createUserSuccess(),
                    pyload: data
                }
            else
                return createUserFail()
        } catch (e) {
            return createUserFail();
        }
    }
}

export const createUserSuccess = () => {
    return {
        type: "CREATE_USER_SUCCESS"
    }
}
export const createUserFail = () => {
    return {
        type: 'CREATE_USER_FAIL',
    }
}