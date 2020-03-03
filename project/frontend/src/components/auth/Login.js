import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

import { login } from "../../actions/auth";

import Logo from "../../public/images/logo.png";
import style from "../style/style.css";

import FormField from "../common/FormField";
import DrawForm from "../common/DrawForm";

import { Icon } from "react-icons-kit";
import { ic_vpn_key } from "react-icons-kit/md/ic_vpn_key";
import { ic_account_box } from "react-icons-kit/md/ic_account_box";

export class Login extends React.Component {
	state = {
		username: "",
		password: ""
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		login: PropTypes.func.isRequired
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.login(this.state.username, this.state.password);
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		if (this.props.isAuthenticated) return <Redirect to="/" />;

		const { username, password } = this.state;
		const loginFormFields = [
			{
				fieldLabel: "Username",
				fieldName: "username",
				fieldType: "text",
				iconType: ic_account_box,
				value: username,
				fieldRequired: true
			},
			{
				fieldLabel: "Password",
				fieldName: "password",
				fieldType: "password",
				iconType: ic_vpn_key,
				value: password,
				fieldRequired: true
			}
		];
		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-lg-10 m-auto card">
						<form className="card-body" onSubmit={this.onSubmit}>
							<img src={Logo} className={style.avatar} />
							<hr />
							<h1 className="text-center">Login Now!</h1>
							{DrawForm(loginFormFields, this.onChange, false)}
							<button
								type="submit"
								className="btn btn-primary btn-lg mb-3"
							>
								Login
							</button>
							<p>
								Don't have an account?
								<Link to="/register"> Register Now!</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
