import actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';


const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    user: {},
    users: [],
    topDoctors: [],
}

const adminReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FIRE_FETCH':
            let copy = state;
            copy.isLoading = true;
            return {
                ...copy
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState1 = state;
            copyState1.genders = action.payload.data;
            // copyState1.isLoading = false;
            return {
                ...copyState1
            };
        case actionTypes.FETCH_GENDER_FAIL:
            let copyState1f = state;
            copyState1f.isLoading = false;
            // copyState1.isLoading = false;
            return {
                ...copyState1f
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyState2 = state;
            copyState2.positions = action.pyload.data;
            // copyState2.isLoading = false;
            return {
                ...copyState2
            };
        case actionTypes.FETCH_POSITION_FAIL:
            let copyState2f = state;
            copyState2f.isLoading = false;
            // copyState1.isLoading = false;
            return {
                ...copyState2f
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyState3 = state;
            copyState3.roles = action.pyload.data;
            copyState3.isLoading = false;
            return {
                ...copyState3
            };
        case actionTypes.FETCH_ROLE_FAIL:
            let copyState3f = state;
            copyState3f.isLoading = false;
            return {
                ...copyState3f
            };

        case actionTypes.CREATE_USER_SUCCESS:
            let copyState4 = state;
            copyState4.user = action.pyload;
            copyState4.isLoading = false;
            toast.success('Created User success');
            return {
                ...copyState4
            };
        case actionTypes.CREATE_USER_FAIL:
            let copyState5 = state;
            copyState5.isLoading = false;
            copyState5.user = '';
            toast.error('Created User Fail!!');
            return {
                ...copyState5,
            }

        case actionTypes.GET_ALL_USER_SUCCESS:
            let copyState6 = state;
            copyState6.users = action.payload;
            copyState6.isLoading = false;
            return {
                ...copyState6
            };
        case actionTypes.GET_ALL_USER_FAIL:
            let copyState7 = state;
            copyState7.isLoading = false;
            return {
                ...copyState7,
            }
        case actionTypes.DELETE_USER_SUCCESS:
            toast.success('User deleted');
            return {
                ...state
            }
        case actionTypes.DELETE_USER_FAIL:
            toast.error('Delete User f=Fail!!!')
            return {
                ...state
            }
        case actionTypes.UPDATE_USER_SUCCESS:
            toast.info('Update User Success');
            return {
                ...state
            }
        case actionTypes.UPDATE_USER_FAIL:
            toast.error('Update User Failll!!!')
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.payload;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            return {
                ...state,
            }


        default:
            return state;
    }
}

export default adminReducer;