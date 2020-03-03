import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FormField from "../common/FormField";

import { Icon } from "react-icons-kit";
import { ic_vpn_key } from "react-icons-kit/md/ic_vpn_key";

export class EditPassword extends React.Component {
	static propTypes = {
		user: PropTypes.object.isRequired
	};

	onSubmit = e => {
		e.preventDefault();
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		return (
			<form onSubmit={this.onSubmit} className="card card-body">
				<h1 className="text-center">Edit Password</h1>
				<FormField
					onChange={this.onChange}
					fieldLabel="Current Password"
					fieldName="current_password"
					fieldType="password"
					iconType={ic_vpn_key}
					value=""
					fieldRequired={true}
				/>
				<FormField
					onChange={this.onChange}
					fieldLabel="New Password"
					fieldName="password"
					fieldType="password"
					iconType={ic_vpn_key}
					value=""
					fieldRequired={true}
				/>
				<FormField
					onChange={this.onChange}
					fieldLabel="Confirm Password"
					fieldName="new_password"
					fieldType="password"
					iconType={ic_vpn_key}
					value=""
					fieldRequired={true}
				/>

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

export default connect(mapStateToProps)(EditPassword);
