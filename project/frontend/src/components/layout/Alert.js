import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alert extends React.Component {
	static propTypes = {
		messages: PropTypes.object.isRequired
	};

	componentDidUpdate(prevProps) {
		const { alert, messages } = this.props;

		if (messages !== prevProps.messages) {
			if (messages.username) alert.error(messages.username.join());
			if (messages.name) alert.error(`Name: ${messages.name.join()}`);
			if (messages.address)
				alert.error(`Address: ${messages.address.join()}`);
			if (messages.phone) alert.error(`Phone: ${messages.phone.join()}`);
			if (messages.manufactured)
				alert.error(`Manufactured: ${messages.manufactured.join()}`);
			if (messages.distance_passed)
				alert.error(`Distance: ${messages.distance_passed.join()}`);
			if (messages.phone) alert.error(`Phone: ${messages.phone.join()}`);
			if (messages.brand) alert.error(`Brand: ${messages.brand.join()}`);
			if (messages.model) alert.error(`Model: ${messages.model.join()}`);
			if (messages.part_changed)
				alert.error(`Part: ${messages.part_changed.join()}`);
			if (messages.price) alert.error(`Price: ${messages.price.join()}`);
			if (messages.model) alert.error(`Model: ${messages.model.join()}`);
			if (messages.details)
				alert.error(`Details: ${messages.details.join()}`);
			if (messages.passwordNotMatch)
				alert.error(messages.passwordNotMatch);
			if (messages.SuccessCompanyEdit)
				alert.success(messages.SuccessCompanyEdit);
			if (messages.successfullyAddedVehicle)
				alert.success(messages.successfullyAddedVehicle);
			if (messages.successfullyEditedVehicle)
				alert.success(messages.successfullyEditedVehicle);
			if (messages.successfullyDeletedVehicle)
				alert.success(messages.successfullyDeletedVehicle);
			if (messages.successfullyAddedRepair)
				alert.success(messages.successfullyAddedRepair);
			if (messages.successfullyAddedRepairShop)
				alert.success(messages.successfullyAddedRepairShop);
			if (messages.successfullyDeletedRepairShop)
				alert.success(messages.successfullyDeletedRepairShop);
			if (messages.successfullyEditedRepairShop)
				alert.success(messages.successfullyEditedRepairShop);
		}
	}
	render() {
		return <Fragment />;
	}
}

const mapStateToProps = state => ({ messages: state.messages });

export default connect(mapStateToProps)(withAlert()(Alert));
