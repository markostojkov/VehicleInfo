import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { editUser } from "../../actions/auth";

import FormField from "../common/FormField";
import DrawForm from "../common/DrawForm";

import { Icon } from "react-icons-kit";
import { ic_email } from "react-icons-kit/md/ic_email";
import { ic_person_pin } from "react-icons-kit/md/ic_person_pin";
import { ic_account_box } from "react-icons-kit/md/ic_account_box";

export class EditUser extends React.Component {
	state = {
		username: this.props.user.username,
		email: this.props.user.email,
		first_name: this.props.user.first_name,
		last_name: this.props.user.last_name
	};

	static propTypes = {
		user: PropTypes.object.isRequired,
		editUser: PropTypes.func.isRequired
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.editUser(this.state);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { username, email, first_name, last_name } = this.state;
		const editUserFormFields = [
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
				fieldLabel: "First Name",
				fieldName: "first_name",
				fieldType: "text",
				iconType: ic_person_pin,
				value: first_name,
				fieldRequired: false
			},
			{
				fieldLabel: "Last Name",
				fieldName: "last_name",
				fieldType: "text",
				iconType: ic_person_pin,
				value: last_name,
				fieldRequired: false
			}
		];
		return (
			<form onSubmit={this.onSubmit} className="card card-body mb-3">
				<h1 className="text-center">Edit Profile</h1>
				{DrawForm(editUserFormFields, this.onChange, false)}
				<button
					type="submit"
					className="btn btn-primary btn-block btn-lg"
				>
					Save
				</button>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps, { editUser })(EditUser);
