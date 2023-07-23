import actionTypes from '../actions/actionTypes';



const initialState = {
    genders: [],
    roles: [],
    positions: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('start được rồi nè');
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = state;
            copyState.genders = action.pyload.data;
            return {
                ...copyState
            };

        default:
            return state;
    }
}

export default adminReducer;