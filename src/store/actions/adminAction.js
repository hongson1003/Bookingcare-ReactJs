import actionTypes from "./actionTypes";
import { getAllCode, createNewAUser, getUsers, deleteUser, editUser, getTopDoctors, getAllDr } from '../../services/userService';


export const fetchGenderStart = async () => {
    try {
        let payload = await getAllCode('gender');
        if (payload.errCode) {
            return fetchGenderFail();
        }
        if (payload)
            return {
                ...fetchGenderSuccess(),
                payload: payload,
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
            if (response.errCode === 0)
                return {
                    ...createUserSuccess(),
                    pyload: data,
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

export const getAllUserStart = async () => {
    try {
        let response = await getUsers('ALL');
        if (response.errCode === 0) {
            return {
                ...getAllUserSuccess(),
                payload: response.users
            }
        }
        else
            return getAllUserFail();
    } catch (e) {
        return getAllUserFail();

    }
}
export const getAllUserSuccess = () => {
    return {
        type: actionTypes.GET_ALL_USER_SUCCESS,
    };
}
export const getAllUserFail = () => {
    return {
        type: actionTypes.GET_ALL_USER_FAIL,
    };
}
// delete user
export const delUserStart = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await deleteUser(id);
            if (response.errCode === 0) {
                resolve(delUserSuccess());
            }
            else
                resolve(delUserFail());
        } catch (e) {
            resolve(delUserFail());
        }
    })
}
export const delUserSuccess = async () => {

    return {
        type: actionTypes.DELETE_USER_SUCCESS,
    };
}
export const delUserFail = () => {
    return {
        type: actionTypes.DELETE_USER_FAIL,
    };
}

export const updateUserStart = async (data) => {
    try {
        let response = await editUser(data);
        if (!response.errCode)
            return {
                ...updateUserSuccess(),
                payload: data,
            }
        else
            return updateUserFail();
    } catch (e) {
        console.log(e);
        return updateUserFail();
    }
}
export const updateUserSuccess = () => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS
    }
}
export const updateUserFail = () => {
    return {
        type: actionTypes.UPDATE_USER_FAIL
    }
}
export const fetchTopDoctors = async (limit) => {
    let response = await getTopDoctors(limit);
    if (!response.errCode)
        return {
            type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
            payload: response.doctors,
        }
    else
        return {
            type: actionTypes.FETCH_TOP_DOCTOR_FAIL
        }

}

export const fetAllDoctors = async () => {
    let response = await getAllDr();
    if (!response.errCode)
        return {
            type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
            payload: response.data
        }
    else
        return {
            type: actionTypes.FETCH_ALL_DOCTOR_FAIL
        }
}

export const fetAllCodeTime = async () => {
    let response = await getAllCode('TIME');
    if (!response.errCode) {
        return {
            type: actionTypes.FETCH_TIME_SUCCESS,
            payload: response.data
        }
    } else {
        return {
            type: actionTypes.FETCH_TIME_FAIL
        }
    }
}

export const fetAllPrice = async () => {
    let response = await getAllCode('PRICE');
    if (!response.errCode) {
        return {
            type: actionTypes.FETCH_PRICE_SUCCESS,
            payload: response.data
        }
    } else {
        return {
            type: actionTypes.FETCH_PRICE_FAIL
        }
    }
}
export const fetAllProvince = async () => {
    let response = await getAllCode('PROVINCE');
    if (!response.errCode) {
        return {
            type: actionTypes.FETCH_PROVINCE_SUCCESS,
            payload: response.data
        }
    } else {
        return {
            type: actionTypes.FETCH_PROVINCE_FAIL
        }
    }
}

export const fetAllPayment = async () => {
    let response = await getAllCode('PAYMENT');
    if (!response.errCode) {
        return {
            type: actionTypes.FETCH_PAYMENT_SUCCESS,
            payload: response.data
        }
    } else {
        return {
            type: actionTypes.FETCH_PAYMENT_FAIL
        }
    }
}


