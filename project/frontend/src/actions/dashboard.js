import axios from "axios";

import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

import { GET_DASHBOARD_INFO } from "./types";

export const getDashboardInfo = () => (dispatch, getState) => {
	axios
		.get("api/dashboard", tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_DASHBOARD_INFO,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};
