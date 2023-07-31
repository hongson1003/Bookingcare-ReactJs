import actionTypes from '../actions/actionTypes';



const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    user: {},
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
            copyState1.genders = action.pyload.data;
            // copyState1.isLoading = false;
            return {
                ...copyState1
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyState2 = state;
            copyState2.positions = action.pyload.data;
            // copyState2.isLoading = false;
            return {
                ...copyState2
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyState3 = state;
            copyState3.roles = action.pyload.data;
            copyState3.isLoading = false;

            return {
                ...copyState3
            };

        case actionTypes.CREATE_USER_SUCCESS:
            let copyState4 = state;
            copyState4.user = action.pyload.data;
            copyState4.isLoading = false;
            alert('Tạo user thành công!');
            console.log(action)
            return {
                ...copyState4
            };
        case actionTypes.CREATE_USER_FAIL:
            let copyState5 = state;
            copyState5.isLoading = false;
            copyState5.user = '';
            alert('Tạo user thất bại, Vui lòng kiểm tra lại!');
            return {
                ...copyState5,
            }
        default:
            return state;
    }
}

export default adminReducer;