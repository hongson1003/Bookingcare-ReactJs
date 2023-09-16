import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});
export const CHANGE_LANGUAGE_APP = (language) => {
    return {
        type: actionTypes.CHANGE_LANGUAGE_APP,
        payload: language,
    }
}
export const turnOnModal = (data) => {
    return {
        type: actionTypes.TURN_ON_MODAL,
        payload: data,
    }
}
export const turnOffModalAction = () => {
    return {
        type: actionTypes.TURN_OFF_MODAL
    }
}

