import {
	GET_COMPANY,
	EDIT_COMPANY,
	ADD_USER_TO_COMPANY,
	GET_COMPANY_USERS
} from "../actions/types";

const initialState = {
	company: {},
	companyUsers: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_COMPANY:
		case EDIT_COMPANY:
			return {
				...state,
				company: action.payload
			};
		case GET_COMPANY_USERS:
			return {
				...state,
				companyUsers: action.payload
			};
		case ADD_USER_TO_COMPANY:
			return {
				...state,
				companyUsers: [...state.companyUsers, action.payload]
			};
		default:
			return state;
	}
}
