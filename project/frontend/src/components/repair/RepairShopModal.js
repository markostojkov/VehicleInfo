import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table from "../layout/Table";
import EditRepairShop from "./EditRepairShop";

import { deleteRepairShop } from "../../actions/repairShops";

import { Icon } from "react-icons-kit";
import { ic_more_vert } from "react-icons-kit/md/ic_more_vert";
import { ic_date_range } from "react-icons-kit/md/ic_date_range";

const repairHeading = ["ID", "Part Changed", "Price", "Repaired"];

export class RepairShopModal extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		company: PropTypes.object.isRequired,
		deleteRepairShop: PropTypes.func.isRequired
	};

	drawTable = (repairs = []) => {
		if (repairs.length > 0) {
			let table = (
				<div className="table-responsive">
					<h3>Repairs</h3>
					<table
						className="table table-striped table-bordered table-hover"
						width="100%"
					>
						<thead>
							<tr>
								{repairHeading.map((heading, index) => (
									<th key={index}>{heading}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{repairs.map((repair, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{repair.part_changed}</td>
									<td>
										{repair.price}{" "}
										{this.props.company.currencies}
									</td>
									<td>{repair.date_of_repair}</td>
								</tr>
							))}
						</tbody>
					</table>
					<h5></h5>
				</div>
			);
			return table;
		} else {
			return <h3 className="text-right">No Repairs!</h3>;
		}
	};

	closeModal = () => {
		document.getElementsByTagName("body")[0].classList.remove("modal-open");
		if (document.getElementsByClassName("modal-backdrop")[0])
			document.getElementsByClassName("modal-backdrop")[0].remove();
	};

	repairShopDelete = id => e => {
		this.props.deleteRepairShop(id);
	};

	componentWillUnmount() {
		this.closeModal();
	}

	render() {
		const { item } = this.props;
		return (
			<div className="modal fade" id="modal" aria-hidden="true">
				<div className="modal-dialog modal-xl" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-lg-12">
									{item.repairShop ? (
										<EditRepairShop
											values={item.repairShop}
										/>
									) : (
										<Fragment />
									)}
								</div>
							</div>
							<div className="row">
								<div className="col-lg-12">
									<h1>
										<div className="dropdown">
											<button
												className="btn btn-outline-secondary btn-sm dropdown-toggle mr-2"
												type="button"
												id="dropdownMenuButton"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											></button>
											<div
												className="dropdown-menu"
												aria-labelledby="dropdownMenuButton"
											>
												<button
													className="dropdown-item text-danger"
													onClick={this.repairShopDelete(
														item.repairShop
															? item.repairShop.id
															: 1
													)}
													data-dismiss="modal"
													aria-label="Close"
												>
													Delete
												</button>
											</div>
											<span className="font-weight-bold text-primary">
												{item.repairShop
													? item.repairShop.name
													: ""}
											</span>
										</div>
									</h1>
									<hr />
								</div>
								<div className="col-lg-4">
									<h4>
										Place:{" "}
										{item.repairShop
											? item.repairShop.place
											: ""}
									</h4>
								</div>
								<div className="col-lg-8">
									{this.drawTable(item.repairs)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	item: state.repairShops.repairShops_detail,
	company: state.companies.company
});

export default connect(mapStateToProps, { deleteRepairShop })(RepairShopModal);
