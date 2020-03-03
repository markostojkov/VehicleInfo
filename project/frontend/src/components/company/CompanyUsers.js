import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getCompanyUsers } from "../../actions/companies";

export class CompanyUsers extends React.Component {
	static propTypes = {
		companyUsers: PropTypes.array.isRequired,
		getCompanyUsers: PropTypes.func.isRequired,
		currentUser: PropTypes.string.isRequired
	};

	componentDidMount() {
		this.props.getCompanyUsers();
	}

	render() {
		return (
			<div className="card mb-3 text-center">
				<h1 className="text-center">Users</h1>

				<table className="table table-striped table-hover">
					<tbody>
						{this.props.companyUsers.map(user => (
							<tr key={user.id}>
								<td>{user.username}</td>
								{this.props.currentUser !== user.username ? (
									<td>
										<button className="btn btn-danger">
											Delete
										</button>
									</td>
								) : (
									<td />
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	companyUsers: state.companies.companyUsers,
	currentUser: state.auth.user.username
});

export default connect(mapStateToProps, { getCompanyUsers })(CompanyUsers);
