import {
	GET_ALL_REPAIR_SHOPS,
	GET_REPAIR_SHOPS,
	ADD_REPAIR_SHOP,
	GET_REPAIR_SHOP_DETAIL,
	EDIT_REPAIR_SHOP,
	DELETE_REPAIR_SHOP
} from "../actions/types";

const initialState = {
	repairShops_pagination: {},
	repairShops_detail: {},
	repairShops: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_REPAIR_SHOPS:
			return {
				...state,
				repairShops_pagination: action.payload
			};
		case ADD_REPAIR_SHOP:
			return {
				...state,
				repairShops_pagination: {
					...state.repairShops_pagination,
					results: [
						...state.repairShops_pagination.results,
						action.payload
					]
				}
			};
		case GET_REPAIR_SHOP_DETAIL:
			return {
				...state,
				repairShops_detail: action.payload
			};
		case EDIT_REPAIR_SHOP:
			return {
				...state,
				repairShops_detail: {
					...state.repairShops_detail,
					repairShop: action.payload
				}
			};
		case DELETE_REPAIR_SHOP:
			return {
				...state,
				repairShops_pagination: {
					...state.repairShops_pagination,
					results: state.repairShops_pagination.results.filter(
						repairShop => repairShop.id !== action.payload
					)
				}
			};
		case GET_ALL_REPAIR_SHOPS:
			return {
				...state,
				repairShops: action.payload
			};
		default:
			return state;
	}
}
