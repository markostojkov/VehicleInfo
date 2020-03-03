import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Login from "../auth/Login";
import Loading from "./Loading";

import Page from "../layout/Page";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	var finalComponent;
	if (auth.isAuthenticated)
		finalComponent = () => <Page {...rest} component={Component} />;
	else if (auth.isLoading) finalComponent = Loading;
	else finalComponent = Login;

	return <Route {...rest} component={finalComponent} />;
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
