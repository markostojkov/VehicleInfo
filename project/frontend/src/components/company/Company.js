import React, { Fragment } from "react";

import EditCompany from "./EditCompany";
import CompanyInfo from "./CompanyInfo";
import AddUserToCompany from "./AddUserToCompany";
import CompanyUsers from "./CompanyUsers";

const Company = () => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-lg-12 mb-2">
					<h1 className="card card-body">Company</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-6">
					<CompanyInfo />
					<CompanyUsers />
				</div>
				<div className="col-lg-6">
					<EditCompany />
					<AddUserToCompany />
				</div>
			</div>
		</Fragment>
	);
};

export default Company;
