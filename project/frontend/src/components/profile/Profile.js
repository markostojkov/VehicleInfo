import React, { Fragment } from "react";

import EditPassword from "./EditPassword";
import EditUser from "./EditUser";
import User from "./User";

import style from "../style/style.css";

const Profile = () => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-lg-12 mb-2">
					<h1 className="card card-body">Profile</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-6">
					<User />
				</div>
				<div className="col-lg-6">
					<EditUser />
					<EditPassword />
				</div>
			</div>
		</Fragment>
	);
};

export default Profile;
