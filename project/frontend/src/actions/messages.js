import { MESSAGE } from "./types";

export const createMessage = msg => {
	return {
		type: MESSAGE,
		payload: msg
	};
};
