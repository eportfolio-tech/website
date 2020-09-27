import {pageConstants} from '../constants/pageConstants';

export interface IPageState {
    loading?: boolean | null;
}

export function pageReducer(
    state: IPageState = {loading: false},
    action: any
): IPageState {
    switch (action.type) {
        case pageConstants.LOADING:
            return {
                loading: true,
            };
        case pageConstants.LOADED:
            return {
                loading: false,
            };
        default:
            return state;
    }
}
