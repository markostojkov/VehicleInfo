import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	LOGOUT_SUCCESS,
	USER_UPDATE
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	isLoading: null,
	user: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true
			};
		case USER_LOADED:
		case USER_UPDATE:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem("token", action.payload.token);

			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false
			};
		case LOGOUT_SUCCESS:
		case AUTH_ERROR:
			localStorage.removeItem("token");

			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: null,
				isLoading: false
			};
		default:
			return state;
	}
}
