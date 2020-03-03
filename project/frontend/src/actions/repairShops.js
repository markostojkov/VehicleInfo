import axios from "axios";

import { createMessage } from "./messages";
import { tokenConfig } from "./auth";

import {
	GET_ALL_REPAIR_SHOPS,
	GET_REPAIR_SHOPS,
	ADD_REPAIR_SHOP,
	GET_REPAIR_SHOP_DETAIL,
	EDIT_REPAIR_SHOP,
	DELETE_REPAIR_SHOP
} from "./types";

export const getAllRepairShops = () => (dispatch, getState) => {
	axios
		.get("api/repair-shops-all", tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_ALL_REPAIR_SHOPS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const getRepairShops = link => (dispatch, getState) => {
	axios
		.get(link, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_REPAIR_SHOPS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const getRepairShopDetail = id => (dispatch, getState) => {
	axios
		.get(`api/repair-shops/${id}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_REPAIR_SHOP_DETAIL,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const addRepairShop = body => (dispatch, getState) => {
	axios
		.post("api/repair-shops/", body, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: ADD_REPAIR_SHOP,
				payload: res.data
			});
			dispatch(
				createMessage({
					successfullyAddedRepairShop:
						"Successfully added repair shop!"
				})
			);
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const editRepairShop = (body, id) => (dispatch, getState) => {
	axios
		.put(`api/repair-shops/${id}/`, body, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: EDIT_REPAIR_SHOP,
				payload: res.data
			});
			dispatch(
				createMessage({
					successfullyEditedRepairShop:
						"Successfully edited repair shop!"
				})
			);
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};

export const deleteRepairShop = id => (dispatch, getState) => {
	axios
		.delete(`api/repair-shops/${id}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: DELETE_REPAIR_SHOP,
				payload: id
			});
			dispatch(
				createMessage({
					successfullyDeletedRepairShop:
						"Successfully deleted repair shop!"
				})
			);
		})
		.catch(err => {
			dispatch(createMessage(err.response.data));
		});
};
