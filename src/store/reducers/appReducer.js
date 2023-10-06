import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    started: true,
    language: 'vi',
    systemMenuPath: '/system/user-manage',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    },
    modal: false,
    dataSchedule: {},
    confirm: false,
    dataPatient: {}
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE:
            return {
                ...state,
                started: true
            }
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            }
        case actionTypes.CHANGE_LANGUAGE_APP:
            return {
                ...state,
                language: action.payload,
            }
        case actionTypes.TURN_ON_MODAL:
            let tempppp = { ...state };
            tempppp.modal = true;
            tempppp.dataSchedule = { doctorId: action.payload.doctorId, ...action.payload.item };
            return {
                ...tempppp
            }
        case actionTypes.TURN_OFF_MODAL:
            return {
                ...state,
                modal: false,
            }


        case actionTypes.TURN_ON_CONFIRM:
            let confirmOn = { ...state };
            confirmOn.confirm = true;
            confirmOn.dataPatient = action.payload;
            return {
                ...confirmOn
            }
        case actionTypes.TURN_OFF_CONFIRM:
            console.log('off')
            return {
                ...state,
                confirm: false,
            }
        default:
            return state;
    }
}

export default appReducer;