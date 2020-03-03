import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getVehicles, getVehicleDetail } from "../../actions/vehicles";

import Pagination from "../layout/Pagination";
import Table from "../layout/Table";
import VehicleModal from "./VehicleModal";
import AddVehicle from "./AddVehicle";

import style from "../style/style.css";

import { Icon } from "react-icons-kit";
import { ic_unfold_more } from "react-icons-kit/md/ic_unfold_more";

const tableHeader = [
	{
		tableRow: "id",
		name: "ID"
	},
	{
		tableRow: "brand",
		name: "Brand"
	},
	{
		tableRow: "model",
		name: "Model"
	},
	{
		tableRow: "manufactured",
		name: "Manufactured"
	},
	{
		tableRow: "registered_till",
		name: "Registered till"
	},
	{
		tableRow: "distance_passed",
		name: "Distance Passed"
	},
	{
		tableRow: "functional",
		name: "Functional"
	}
];

export class VehicleList extends React.Component {
	state = {
		vehicles: this.props.vehicle_pagination.results,
		order: true
	};

	static propTypes = {
		vehicle_pagination: PropTypes.object.isRequired,
		getVehicles: PropTypes.func.isRequired,
		getVehicleDetail: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.getVehicles("api/vehicles/?page=1");
	}

	pagginate = page => {
		this.props.getVehicles(`api/vehicles/?page=${page}`);
	};

	render() {
		const { total_pages, results } = this.props.vehicle_pagination;
		return (
			<div className="card card-body">
				<div>
					<AddVehicle />
				</div>
				<Table
					header={tableHeader}
					body={results}
					getDetail={this.props.getVehicleDetail}
					Modal={VehicleModal}
				/>
				<Pagination pages={total_pages} pagginate={this.pagginate} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	vehicle_pagination: state.vehicles.vehicle_pagination
});

export default connect(mapStateToProps, { getVehicles, getVehicleDetail })(
	VehicleList
);
