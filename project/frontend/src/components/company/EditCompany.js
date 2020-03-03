import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { editCompany } from "../../actions/companies";

import FormField from "../common/FormField";
import SelectField from "../common/SelectField";
import DrawForm from "../common/DrawForm";

import { Icon } from "react-icons-kit";
import { ic_account_balance } from "react-icons-kit/md/ic_account_balance";
import { ic_call } from "react-icons-kit/md/ic_call";
import { ic_location_on } from "react-icons-kit/md/ic_location_on";
import { ic_attach_money } from "react-icons-kit/md/ic_attach_money";
import { ic_transfer_within_a_station } from "react-icons-kit/md/ic_transfer_within_a_station";

export class EditCompany extends React.Component {
	state = {
		name: this.props.company.name,
		address: this.props.company.address,
		phone: this.props.company.phone,
		currencies: this.props.company.currencies,
		distances: this.props.company.distances
	};

	static propTypes = {
		company: PropTypes.object.isRequired,
		editCompany: PropTypes.func.isRequired
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.editCompany(this.props.company.id, this.state);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const {
			name,
			address,
			phone,
			currencies,
			distances
		} = this.props.company;
		const editCompanyFormFields = [
			{
				fieldLabel: "Company Name",
				fieldName: "name",
				fieldType: "text",
				iconType: ic_account_balance,
				value: name,
				fieldRequired: true
			},
			{
				fieldLabel: "Address",
				fieldName: "address",
				fieldType: "text",
				iconType: ic_location_on,
				value: address,
				fieldRequired: false
			},
			{
				fieldLabel: "Phone",
				fieldName: "phone",
				fieldType: "text",
				iconType: ic_call,
				value: phone,
				fieldRequired: false
			}
		];
		const currencyFormFields = [
			{ name: "USD", id: "USD" },
			{ name: "CHF", id: "CHF" },
			{ name: "GBP", id: "GBP" },
			{ name: "EUR", id: "EUR" },
			{ name: "MKD", id: "MKD" }
		];
		const distanceFormFields = [
			{ name: "KM", id: "KM" },
			{ name: "Mile", id: "Mile" }
		];
		return (
			<form onSubmit={this.onSubmit} className="card card-body mb-3">
				<h1 className="text-center">Edit Company</h1>
				{DrawForm(editCompanyFormFields, this.onChange, false)}
				<SelectField
					choices={currencyFormFields}
					onChange={this.onChange}
					fieldLabel="Currency"
					fieldName="currencies"
					iconType={ic_attach_money}
					value={currencies}
					fieldRequired={true}
				/>
				<SelectField
					choices={distanceFormFields}
					onChange={this.onChange}
					fieldLabel="Distance"
					fieldName="distances"
					iconType={ic_transfer_within_a_station}
					value={distances}
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
	company: state.companies.company
});

export default connect(mapStateToProps, { editCompany })(EditCompany);
