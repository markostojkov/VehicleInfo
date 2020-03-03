import axios from "axios";

import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

import {
	GET_VEHICLES,
	ADD_VEHICLE,
	GET_VEHICLE_DETAIL,
	EDIT_VEHICLE,
	DELETE_VEHICLE
} from "./types";

export const getVehicles = link => (dispatch, getState) => {
	axios
		.get(link, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_VEHICLES,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const getVehicleDetail = id => (dispatch, getState) => {
	axios
		.get(`api/vehicles/${id}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_VEHICLE_DETAIL,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const addVehicle = body => (dispatch, getState) => {
	axios
		.post("api/vehicles/", body, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: ADD_VEHICLE,
				payload: res.data
			});
			dispatch(
				createMessage({
					successfullyAddedVehicle:
						"Successfully added a new vehicle!"
				})
			);
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const editVehicle = (body, id) => (dispatch, getState) => {
	axios
		.put(`api/vehicles/${id}/`, body, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: EDIT_VEHICLE,
				payload: res.data
			});
			dispatch(
				createMessage({
					successfullyEditedVehicle: "Successfully edited a vehicle!"
				})
			);
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const deleteVehicle = id => (dispatch, getState) => {
	axios
		.delete(`api/vehicles/${id}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: DELETE_VEHICLE,
				payload: id
			});
			dispatch(
				createMessage({
					successfullyDeletedVehicle: "Successfully deleted vehicle!"
				})
			);
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};
