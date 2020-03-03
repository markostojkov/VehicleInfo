import axios from "axios";

import { createMessage } from "./messages";

import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	LOGOUT_SUCCESS,
	USER_UPDATE,
	MESSAGE
} from "./types";

export const loadUser = () => (dispatch, getState) => {
	dispatch({ type: USER_LOADING });

	axios
		.get("api/auth/user", tokenConfig(getState))
		.then(res => {
			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: AUTH_ERROR
			});
		});
};

export const editUser = body => (dispatch, getState) => {
	axios
		.post("api/auth/user", body, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: USER_UPDATE,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const login = (username, password) => dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	const body = JSON.stringify({ username, password });

	axios
		.post("/api/auth/login", body, config)
		.then(res => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err.response.data);
			dispatch({
				type: AUTH_ERROR
			});
		});
};

export const register = (username, email, password) => dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	const body = JSON.stringify({ username, email, password });

	axios
		.post("api/auth/register", body, config)
		.then(res => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err.response.data);
			dispatch({
				type: AUTH_ERROR
			});
		});
};

export const logout = () => (dispatch, getState) => {
	axios
		.post("api/auth/logout/", null, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: LOGOUT_SUCCESS,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err.response.data);
			dispatch({
				type: AUTH_ERROR
			});
		});
};

//HELPER FUNCTION TO SET THE HEADER CONFIG AND AUTH TOKEN
export const tokenConfig = getState => {
	const token = getState().auth.token;

	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}

	return config;
};
