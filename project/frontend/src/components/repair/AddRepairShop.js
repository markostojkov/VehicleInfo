import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FormField from "../common/FormField";
import Checkbox from "../common/Checkbox";
import DrawForm from "../common/DrawForm";

import { addRepairShop } from "../../actions/repairShops";

import { Icon } from "react-icons-kit";
import { ic_account_balance } from "react-icons-kit/md/ic_account_balance";
import { ic_place } from "react-icons-kit/md/ic_place";

export class AddRepairShop extends React.Component {
	state = {
		name: "",
		place: "",
		open: false
	};

	static propTypes = {
		addRepairShop: PropTypes.func.isRequired
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.addRepairShop(this.state);
		this.setState({
			name: "",
			place: "",
			open: false
		});
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		const { name, place } = this.state;

		const addRepairShopFormFields = [
			{
				fieldLabel: "Name",
				fieldName: "name",
				fieldType: "text",
				iconType: ic_account_balance,
				value: name,
				fieldRequired: true
			},
			{
				fieldLabel: "Place",
				fieldName: "place",
				fieldType: "text",
				iconType: ic_place,
				value: place,
				fieldRequired: true
			}
		];

		return (
			<Fragment>
				<button
					onClick={() => this.setState({ open: !this.state.open })}
					className="btn btn-primary my-2"
				>
					{!this.state.open ? "Add Repair Shop" : "Close"}
				</button>
				{this.state.open ? (
					<form
						className="card card-body mb-2"
						onSubmit={this.onSubmit}
					>
						<h1 className="text-center">Add Repair Shop!</h1>
						<div className="row">
							{DrawForm(
								addRepairShopFormFields,
								this.onChange,
								true
							)}
						</div>
						<button
							type="submit"
							className="btn btn-outline-primary btn-block btn-lg mb-4"
						>
							Add
						</button>
					</form>
				) : (
					<Fragment />
				)}
			</Fragment>
		);
	}
}

export default connect(null, { addRepairShop })(AddRepairShop);
