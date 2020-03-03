import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FormField from "../common/FormField";
import Checkbox from "../common/Checkbox";
import DrawForm from "../common/DrawForm";

import { editVehicle } from "../../actions/vehicles";

import { Icon } from "react-icons-kit";
import { ic_drive_eta } from "react-icons-kit/md/ic_drive_eta";
import { ic_date_range } from "react-icons-kit/md/ic_date_range";
import { ic_transfer_within_a_station } from "react-icons-kit/md/ic_transfer_within_a_station";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { ic_info } from "react-icons-kit/md/ic_info";

export class EditVehicle extends React.Component {
	state = {
		brand: "",
		model: "",
		manufactured: undefined,
		registered_till: undefined,
		distance_passed: undefined,
		functional: false,
		details: "",
		open: false
	};

	static propTypes = {
		editVehicle: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.setTheState();
	}

	componentDidUpdate(prevProps) {
		if (this.props.item !== prevProps.item) this.setTheState();
	}

	setTheState = () => {
		this.setState({
			brand: this.props.item.brand,
			model: this.props.item.model,
			manufactured: this.props.item.manufactured,
			registered_till: this.props.item.registered_till,
			distance_passed: this.props.item.distance_passed,
			functional: this.props.item.functional,
			details: this.props.item.details
		});
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.editVehicle(this.state, this.props.item.id);
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		const {
			brand,
			model,
			manufactured,
			registered_till,
			distance_passed,
			functional,
			details
		} = this.state;
		const editVehicleFormFields = [
			{
				fieldLabel: "Brand",
				fieldName: "brand",
				fieldType: "text",
				iconType: ic_drive_eta,
				value: brand,
				fieldRequired: true
			},
			{
				fieldLabel: "Model",
				fieldName: "model",
				fieldType: "text",
				iconType: ic_drive_eta,
				value: model,
				fieldRequired: true
			},
			{
				fieldLabel: "Manufactured",
				fieldName: "manufactured",
				fieldType: "date",
				iconType: ic_date_range,
				value: manufactured,
				fieldRequired: false
			},
			{
				fieldLabel: "Registered Till",
				fieldName: "registered_till",
				fieldType: "date",
				iconType: ic_date_range,
				value: registered_till,
				fieldRequired: true
			},
			{
				fieldLabel: "Distance Passed",
				fieldName: "distance_passed",
				fieldType: "number",
				iconType: ic_transfer_within_a_station,
				value: distance_passed,
				fieldRequired: false
			},
			{
				fieldLabel: "Details",
				fieldName: "details",
				fieldType: "text",
				iconType: ic_info,
				value: details,
				fieldRequired: false
			}
		];

		return (
			<Fragment>
				<button
					onClick={() => this.setState({ open: !this.state.open })}
					className="btn btn-primary m-2"
				>
					{!this.state.open ? "Edit Vehicle" : "Close"}
				</button>
				{this.state.open ? (
					<form
						className="card card-body mb-2"
						onSubmit={this.onSubmit}
					>
						<h1 className="text-center">Edit Vehicle!</h1>
						<div className="row">
							{DrawForm(
								editVehicleFormFields,
								this.onChange,
								true
							)}
							<div className="col-lg-6">
								<Checkbox
									onChange={this.onChange}
									fieldLabel="Functional"
									fieldName="functional"
									iconType={ic_check_circle}
									value={functional}
								/>
							</div>
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

export default connect(null, { editVehicle })(EditVehicle);
