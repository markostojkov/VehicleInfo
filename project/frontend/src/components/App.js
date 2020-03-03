import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Alert from "./layout/Alert";

import Dashboard from "./layout/Dashboard";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./profile/Profile";

import Company from "./company/Company";

import Vehicle from "./vehicle/Vehicle";

import Repair from "./repair/Repair";

import { loadUser } from "../actions/auth";
import { getCompany } from "../actions/companies";

const _ = require("lodash");

const alertOptions = {
	timeout: 3500,
	position: "top center",
	containerStyle: {
		zIndex: 1051
	}
};

export default class App extends React.Component {
	componentDidMount() {
		store.dispatch(loadUser());
		store.dispatch(getCompany());
	}

	render() {
		return (
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...alertOptions}>
					<Router>
						<Alert />
						<Switch>
							<PrivateRoute
								exact
								path="/"
								component={Dashboard}
							/>
							<PrivateRoute
								exact
								path="/vehicles"
								component={Vehicle}
							/>
							<PrivateRoute
								exact
								path="/repairs"
								component={Repair}
							/>
							<PrivateRoute
								exact
								path="/company"
								component={Company}
							/>
							<PrivateRoute
								exact
								path="/profile"
								component={Profile}
							/>
							<Route exact path="/login" component={Login} />
							<Route
								exact
								path="/register"
								component={Register}
							/>
						</Switch>
					</Router>
				</AlertProvider>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
