import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Chart from "react-apexcharts";

import { Icon } from "react-icons-kit";
import { ic_unfold_more } from "react-icons-kit/md/ic_unfold_more";
import { ic_attach_money } from "react-icons-kit/md/ic_attach_money";

import { getCompanyUsers } from "../../actions/companies";
import { getDashboardInfo } from "../../actions/dashboard";

import Widget from "../common/Widget";

import style from "../style/style.css";

export class DashboardItems extends React.Component {
	static propTypes = {
		company: PropTypes.object.isRequired,
		getCompanyUsers: PropTypes.func.isRequired,
		getDashboardInfo: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.getCompanyUsers();
		this.props.getDashboardInfo();
	}

	render() {
		const { currencies, companyUsers } = this.props.company;
		const {
			vehicle_count,
			repairShop_count,
			registered_vehicles,
			repairs_by_month,
			most_expensive_vehicles
		} = this.props.dashboard;

		const widgets = [
			{
				backgroundColor: "#2880e3",
				icon: ic_attach_money,
				text: "TEKOST10",
				value: 13455,
				link: "/vehicles"
			},
			{
				backgroundColor: "#2880e3",
				icon: ic_attach_money,
				text: "TEKOST10",
				value: 13455,
				link: "/vehicles"
			},
			{
				backgroundColor: "#2880e3",
				icon: ic_attach_money,
				text: "TEKOST10",
				value: 13455,
				link: "/vehicles"
			},
			{
				backgroundColor: "#2880e3",
				icon: ic_attach_money,
				text: "TEKOST10",
				value: 13455,
				link: "/vehicles"
			}
		];

		const optionsRepair = {
			title: {
				text: `Monthly standards of repair costs in ${currencies}`
			},
			chart: { id: "basic-bar" },
			fill: {
				colors: ["#ee5c51"]
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec"
				]
			}
		};
		const seriesRepair = [
			{
				name: `Cost in ${currencies}`,
				data: repairs_by_month
			}
		];

		const optionsRegistered = {
			title: {
				text: "Registered and unregistered vehicles"
			},
			chart: { id: "basic-bar", type: "pie" },
			labels: ["Registered", "Unregistered"]
		};
		const seriesRegistered = [
			registered_vehicles,
			vehicle_count - registered_vehicles
		];

		return (
			<Fragment>
				<div className="row">
					{widgets.map((widget, index) => (
						<div className="col-sm-3" key={index}>
							<Widget
								backgroundColor={widget.backgroundColor}
								icon={widget.icon}
								text={widget.text}
								value={widget.value}
								link={widget.link}
							/>
						</div>
					))}
					<div className="col-lg-12 mb-3">
						<Chart
							height={450}
							options={optionsRepair}
							series={seriesRepair}
							type="bar"
							className="bg-light"
						/>
					</div>
					<div className="col-sm-5 mb-5">
						<Chart
							height={350}
							options={optionsRegistered}
							series={seriesRegistered}
							type="pie"
							className="bg-light"
						/>
					</div>
					<div className="col-sm-7">
						{companyUsers ? (
							<div className="table-responsive bg-light">
								<table
									className="table table-striped table-bordered table-hover"
									cellSpacing="0"
									width="100%"
								>
									<thead>
										<tr>
											<th>ID</th>
											<th>Username</th>
											<th>Email</th>
										</tr>
									</thead>
									<tbody>
										{companyUsers.map((user, index) => (
											<tr key={index}>
												<td>{user.id}</td>
												<td>{user.username}</td>
												<td>{user.email}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<Fragment />
						)}
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	company: state.companies,
	dashboard: state.dashboard.dashboard
});

export default connect(mapStateToProps, { getCompanyUsers, getDashboardInfo })(
	DashboardItems
);
