import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FormField from "../common/FormField";
import DrawForm from "../common/DrawForm";

import { createMessage } from "../../actions/messages";
import { addUserToCompany } from "../../actions/companies";

import { Icon } from "react-icons-kit";
import { ic_vpn_key } from "react-icons-kit/md/ic_vpn_key";
import { ic_account_box } from "react-icons-kit/md/ic_account_box";
import { ic_email } from "react-icons-kit/md/ic_email";

class AddUserToCompany extends React.Component {
	state = {
		username: "",
		email: "",
		password: "",
		password2: ""
	};
	static propTypes = {
		company: PropTypes.object.isRequired,
		createMessage: PropTypes.func.isRequired,
		addUserToCompany: PropTypes.func.isRequired
	};

	onSubmit = e => {
		e.preventDefault();
		const { username, email, password, password2 } = this.state;

		if (password !== password2) {
			this.props.createMessage({
				passwordNotMatch: "Passwords do not match!"
			});
		} else {
			const user = {
				username,
				email,
				password
			};
			this.props.addUserToCompany(user);
		}
		this.setState({
			username: "",
			email: "",
			password: "",
			password2: ""
		});
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { username, email, password, password2 } = this.state;
		const addUserToCompanyFormFields = [
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
			<form onSubmit={this.onSubmit} className="card card-body">
				<h1 className="text-center">Add User To Company</h1>
				{DrawForm(addUserToCompanyFormFields, this.onChange, false)}
				<button
					type="submit"
					className="btn btn-primary btn-block btn-lg"
				>
					Add User
				</button>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	company: state.companies.company
});

export default connect(mapStateToProps, { addUserToCompany, createMessage })(
	AddUserToCompany
);
