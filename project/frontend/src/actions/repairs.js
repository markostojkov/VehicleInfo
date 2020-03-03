import axios from "axios";

import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

import { ADD_REPAIR } from "./types";

export const addRepair = body => (dispatch, getState) => {
	axios
		.post("api/repairs/", body, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: ADD_REPAIR,
				payload: res.data
			});
			dispatch(
				createMessage({
					successfullyAddedRepair: "Successfully added a new repair!"
				})
			);
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};
