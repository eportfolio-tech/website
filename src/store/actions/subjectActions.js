import { subjectConstants } from '../constants/subjectConstants';

export const subjectActions = {
    set,
    clear
};

function set(code) {
    return { type: subjectConstants.SET_SUBJECT, code };
}

function clear(code) {
    return { type: subjectConstants.CLEAR_SUBJECT, code};
}