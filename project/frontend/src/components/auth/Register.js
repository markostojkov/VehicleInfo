import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

import { createMessage } from "../../actions/messages";
import { register } from "../../actions/auth";

import Logo from "../../public/images/logo.png";
import style from "../style/style.css";

import FormField from "../common/FormField";
import DrawForm from "../common/DrawForm";

import { Icon } from "react-icons-kit";
import { ic_vpn_key } from "react-icons-kit/md/ic_vpn_key";
import { ic_account_box } from "react-icons-kit/md/ic_account_box";
import { ic_email } from "react-icons-kit/md/ic_email";

export class Register extends React.Component {
	state = {
		username: "",
		email: "",
		password: "",
		password2: ""
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		register: PropTypes.func.isRequired
	};

	onSubmit = e => {
		e.preventDefault();

		const { username, email, password, password2 } = this.state;

		if (password !== password2) {
			this.props.createMessage({
				passwordNotMatch: "Passwords do not match!"
			});
		} else {
			this.props.register(username, email, password);
		}
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		if (this.props.isAuthenticated) return <Redirect to="/" />;

		const { username, email, password, password2 } = this.state;
		const registerFormFields = [
			{
				fieldLabel: "Username",
				fieldName: "username",
				fieldType: "text",
				iconType: ic_account_box,
				value: username,
				fieldRequired: true
			},
			{
				fieldLabel: "Email",
				fieldName: "email",
				fieldType: "email",
				iconType: ic_email,
				value: email,
				fieldRequired: true
			},
			{
				fieldLabel: "Password",
				fieldName: "password",
				fieldType: "password",
				iconType: ic_vpn_key,
				value: password,
				fieldRequired: true
			},
			{
				fieldLabel: "Confirm Password",
				fieldName: "password2",
				fieldType: "password",
				iconType: ic_vpn_key,
				value: password2,
				fieldRequired: true
			}
		];
		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-lg-10 m-auto card">
						<form onSubmit={this.onSubmit} className="card-body">
							<img src={Logo} className={style.avatar} />
							<hr />
							<h1 className="text-center">Register Now!</h1>
							{DrawForm(registerFormFields, this.onChange, false)}
							<button
								type="submit"
								className="btn btn-primary btn-lg mb-3"
							>
								Register
							</button>
							<p>
								Already have an account?
								<Link to="/login"> Login Now!</Link>
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

export default connect(mapStateToProps, { register, createMessage })(Register);
