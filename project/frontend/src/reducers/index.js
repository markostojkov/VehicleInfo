import { combineReducers } from "redux";
import auth from "./auth";
import companies from "./companies";
import messages from "./messages";
import vehicles from "./vehicles";
import repairShops from "./repairShops";
import dashboard from "./dashboard";

export default combineReducers({
	auth,
	companies,
	messages,
	vehicles,
	repairShops,
	dashboard
});
