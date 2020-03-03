import React, { Fragment } from "react";

import RepairShopList from "./RepairShopList";

const Repair = () => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-lg-12 mb-2">
					<h1 className="card card-body">Repair Shops</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-12">
					<RepairShopList />
				</div>
			</div>
		</Fragment>
	);
};

export default Repair;
