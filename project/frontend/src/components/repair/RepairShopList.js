import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getRepairShops, getRepairShopDetail } from "../../actions/repairShops";

import AddRepairShop from "./AddRepairShop";
import RepairShopModal from "./RepairShopModal";
import Pagination from "../layout/Pagination";
import Table from "../layout/Table";

const tableHeader = [
	{
		tableRow: "id",
		name: "ID"
	},
	{
		tableRow: "name",
		name: "Name"
	},
	{
		tableRow: "place",
		name: "Place"
	}
];

export class RepairShopList extends React.Component {
	static propTypes = {
		getRepairShops: PropTypes.func.isRequired,
		getRepairShopDetail: PropTypes.func.isRequired,
		repairShops_pagination: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.props.getRepairShops("api/repair-shops/?page=1");
	}

	pagginate = page => {
		this.props.getRepairShops(`api/repair-shops/?page=${page}`);
	};

	render() {
		const { total_pages, results } = this.props.repairShops_pagination;

		return (
			<div className="card card-body">
				<div>
					<AddRepairShop />
				</div>
				<Table
					header={tableHeader}
					body={results}
					getDetail={this.props.getRepairShopDetail}
					Modal={RepairShopModal}
				/>
				<Pagination pages={total_pages} pagginate={this.pagginate} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	repairShops_pagination: state.repairShops.repairShops_pagination
});

export default connect(mapStateToProps, {
	getRepairShops,
	getRepairShopDetail
})(RepairShopList);
