import { MESSAGE } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case MESSAGE:
			return (state = action.payload);
		default:
			return state;
	}
}
