import { GET_DASHBOARD_INFO } from "../actions/types";

const initialState = {
	dashboard: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_DASHBOARD_INFO:
			return {
				...state,
				dashboard: action.payload
			};
		default:
			return state;
	}
}
