import {pageConstants} from '../constants/pageConstants';

export interface IPageState {
    loading?: boolean | null;
    openDrawer?: boolean;
}

export function pageReducer(
    state: IPageState = {loading: false, openDrawer: true},
    action: any
): IPageState {
    switch (action.type) {
        case pageConstants.LOADING:
            return {
                loading: true,
                openDrawer: true,
            };
        case pageConstants.LOADED:
            return {
                loading: false,
                openDrawer: true,
            };
        case pageConstants.OPEN_DRAWER:
            return {
                loading: false,
                openDrawer: true,
            };
        case pageConstants.CLOSE_DRAWER:
            return {
                loading: false,
                openDrawer: false,
            };
        default:
            return state;
    }
}
