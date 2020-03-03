import React, { Fragment } from "react";

import VehicleList from "./VehicleList";

const Vehicle = () => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-lg-12 mb-2">
					<h1 className="card card-body">Vehicles</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-12">
					<VehicleList />
				</div>
			</div>
		</Fragment>
	);
};

export default Vehicle;
