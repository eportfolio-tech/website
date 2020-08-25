import { subjectConstants } from "../constants/subjectConstants";

export interface ISubjectState {
	selected?: String | null;
}

let subject = JSON.parse(localStorage.getItem("subject") || "{}");

const initialState = subject ? { selected: subject } : { selected: null };

export const subjectReducer = (
	state: ISubjectState = initialState,
	action: any
): ISubjectState => {
	switch (action.type) {
		case subjectConstants.SET_SUBJECT:
			return {
				selected: action.code,
			};
		case subjectConstants.CLEAR_SUBJECT:
			return {};
	}
	return state;
};
