import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class CompanyInfo extends React.Component {
	static propTypes = {
		company: PropTypes.object.isRequired
	};

	render() {
		const { name, address, phone, subscription } = this.props.company;

		return (
			<div className="card card-body mb-3 text-center">
				<h1>Info</h1>
				<h4>
					<strong>{name}</strong>
				</h4>
				{address !== "" ? <h4>Address: {address}</h4> : ""}
				{phone !== "" ? <h4>Phone: {phone}</h4> : ""}
				<h4>Package: {subscription}</h4>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	company: state.companies.company
});

export default connect(mapStateToProps)(CompanyInfo);
