import axios from "axios";

import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

import {
	GET_COMPANY,
	EDIT_COMPANY,
	ADD_USER_TO_COMPANY,
	GET_COMPANY_USERS
} from "./types";

export const editCompany = (id, company) => (dispatch, getState) => {
	axios
		.put(`api/companies/${id}/`, company, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: EDIT_COMPANY,
				payload: res.data
			});
			dispatch(
				createMessage({
					SuccessCompanyEdit: "Successfully edited company info!"
				})
			);
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const getCompany = () => (dispatch, getState) => {
	axios
		.get("api/companies/company", tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_COMPANY,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err.response.data);
		});
};

export const addUserToCompany = user => (dispatch, getState) => {
	axios
		.post("api/companies/", user, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: ADD_USER_TO_COMPANY,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err.response.data);
		});
};

export const getCompanyUsers = () => (dispatch, getState) => {
	axios
		.get("api/company-users/", tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_COMPANY_USERS,
				payload: res.data
			});
		})
		.catch(err => {
			console.log(err.response.data);
		});
};
