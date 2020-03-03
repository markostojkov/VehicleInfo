import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import DashboardItems from "./DashboardItems";

export class Dashboard extends React.Component {
	static propTypes = {};

	render() {
		return (
			<Fragment>
				<div className="row">
					<div className="col-lg-12 mb-2">
						<h1 className="card card-body">Dashboard</h1>
					</div>
				</div>
				<DashboardItems />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Dashboard);
