import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import style from "../style/style.css";

import Avatar from "../../public/images/avatar.png";

export class User extends React.Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		company: PropTypes.object.isRequired
	};

	render() {
		const {
			username,
			email,
			date_joined,
			first_name,
			last_name
		} = this.props.user;
		const { name } = this.props.company;

		return (
			<div className="card card-body mb-3 text-center">
				<h1>Info</h1>
				<img src={Avatar} className={style.avatar} />
				<h4>
					<strong>
						{first_name !== "" && last_name !== ""
							? `${first_name} ${last_name}`
							: username}
					</strong>
				</h4>
				<h4>{email}</h4>
				<h4>Joined: {date_joined}</h4>
				<h4>
					Company:{" "}
					<Link to="/company" className="text-primary">
						{name}
					</Link>
				</h4>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	company: state.companies.company
});

export default connect(mapStateToProps)(User);
