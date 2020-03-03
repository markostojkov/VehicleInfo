import {
	ADD_VEHICLE,
	GET_VEHICLES,
	GET_VEHICLE_DETAIL,
	EDIT_VEHICLE,
	DELETE_VEHICLE,
	ADD_REPAIR
} from "../actions/types";

const initialState = {
	vehicle_pagination: {
		results: []
	},
	vehicle_detail: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_VEHICLES:
			return {
				...state,
				vehicle_pagination: action.payload
			};
		case GET_VEHICLE_DETAIL:
			return {
				...state,
				vehicle_detail: action.payload
			};
		case ADD_VEHICLE:
			return {
				...state,
				vehicle_pagination: {
					...state.vehicle_pagination,
					results: [
						...state.vehicle_pagination.results,
						action.payload
					]
				}
			};
		case EDIT_VEHICLE:
			return {
				...state,
				vehicle_detail: action.payload
			};
		case DELETE_VEHICLE:
			return {
				...state,
				vehicle_pagination: {
					...state.vehicle_pagination,
					results: state.vehicle_pagination.results.filter(
						vehicle => vehicle.id !== action.payload
					)
				}
			};
		case ADD_REPAIR:
			return {
				...state,
				vehicle_detail: {
					...state.vehicle_detail,
					repairs: [...state.vehicle_detail.repairs, action.payload]
				}
			};
		default:
			return state;
	}
}
