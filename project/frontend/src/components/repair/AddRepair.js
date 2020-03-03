import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addRepair } from "../../actions/repairs";
import { getAllRepairShops } from "../../actions/repairShops";

import FormField from "../common/FormField";
import SelectField from "../common/SelectField";
import DrawForm from "../common/DrawForm";

import { Icon } from "react-icons-kit";
import { ic_build } from "react-icons-kit/md/ic_build";
import { ic_date_range } from "react-icons-kit/md/ic_date_range";
import { ic_attach_money } from "react-icons-kit/md/ic_attach_money";
import { ic_account_balance } from "react-icons-kit/md/ic_account_balance";

export class AddRepair extends React.Component {
	state = {
		part_changed: "",
		price: 0,
		date_of_repair: "",
		open: false,
		shop_id: "",
		id: this.props.vehicle_id
	};

	static propTypes = {
		addRepair: PropTypes.func.isRequired,
		getAllRepairShops: PropTypes.func.isRequired,
		vehicle_id: PropTypes.number,
		repairShops: PropTypes.array.isRequired
	};

	componentDidMount() {
		this.props.getAllRepairShops();
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({ id: this.props.vehicle_id });
		}
	}

	onSubmit = e => {
		e.preventDefault();
		this.props.addRepair(this.state);
		this.setState({
			part_changed: "",
			price: 0,
			date_of_repair: "",
			shop_id: ""
		});
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { part_changed, price, date_of_repair, shop_id } = this.state;
		const addRepairFormFields = [
			{
				fieldLabel: "Part Changed",
				fieldName: "part_changed",
				fieldType: "text",
				iconType: ic_build,
				value: part_changed,
				fieldRequired: true
			},
			{
				fieldLabel: "Price",
				fieldName: "price",
				fieldType: "number",
				iconType: ic_attach_money,
				value: price,
				fieldRequired: true
			},
			{
				fieldLabel: "Date Repaired",
				fieldName: "date_of_repair",
				fieldType: "date",
				iconType: ic_attach_money,
				value: date_of_repair,
				fieldRequired: true
			}
		];

		return (
			<Fragment>
				<button
					onClick={() => this.setState({ open: !this.state.open })}
					className="btn btn-secondary my-2"
				>
					{!this.state.open ? "Add Repair" : "Close"}
				</button>
				{this.state.open ? (
					<form
						className="card card-body mb-2"
						onSubmit={this.onSubmit}
					>
						<h1 className="text-center">Add Repair!</h1>
						<div className="row">
							{DrawForm(addRepairFormFields, this.onChange, true)}
							<div className="col-lg-6">
								<SelectField
									choices={this.props.repairShops}
									onChange={this.onChange}
									fieldLabel="Repair Shop"
									fieldName="shop_id"
									iconType={ic_account_balance}
									value={shop_id}
									fieldRequired={true}
								/>
							</div>
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

const mapStateToProps = state => ({
	vehicle_id: state.vehicles.vehicle_detail.id,
	repairShops: state.repairShops.repairShops
});

export default connect(mapStateToProps, { addRepair, getAllRepairShops })(
	AddRepair
);
