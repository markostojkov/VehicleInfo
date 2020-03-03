import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FormField from "../common/FormField";
import Checkbox from "../common/Checkbox";
import DrawForm from "../common/DrawForm";

import { editRepairShop } from "../../actions/repairShops";

import { Icon } from "react-icons-kit";
import { ic_account_balance } from "react-icons-kit/md/ic_account_balance";
import { ic_place } from "react-icons-kit/md/ic_place";

export class EditRepairShop extends React.Component {
	state = {
		name: "",
		place: "",
		open: false
	};

	static propTypes = {
		editRepairShop: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.setState({
			name: this.props.values.name,
			place: this.props.values.place,
			open: false
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.values !== prevProps.values)
			this.setState({
				name: this.props.values.name,
				place: this.props.values.place,
				open: false
			});
	}

	onSubmit = e => {
		e.preventDefault();
		this.props.editRepairShop(this.state, this.props.values.id);
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
					className="btn btn-secondary my-2"
				>
					{!this.state.open ? "Edit Shop" : "Close"}
				</button>
				{this.state.open ? (
					<form
						className="card card-body mb-2"
						onSubmit={this.onSubmit}
					>
						<h1 className="text-center">Edit Repair Shop!</h1>
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
							Edit
						</button>
					</form>
				) : (
					<Fragment />
				)}
			</Fragment>
		);
	}
}

export default connect(null, { editRepairShop })(EditRepairShop);
