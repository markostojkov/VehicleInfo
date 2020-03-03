import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Icon } from "react-icons-kit";
import { ic_unfold_more } from "react-icons-kit/md/ic_unfold_more";

import style from "../style/style.css";

class Table extends React.Component {
	state = {
		body: [],
		order: true
	};

	static propTypes = {
		company: PropTypes.object.isRequired
	};

	componentDidUpdate(prevProps) {
		if (prevProps.body !== this.props.body) {
			this.setState({
				body: this.props.body,
				order: true
			});
		}
	}

	setValue = (val, index) => {
		let value;
		if (val === true)
			value = <span className="badge badge-success">&#x2714;</span>;
		else if (val === false)
			value = <span className="badge badge-danger">&#x2715;</span>;
		else {
			if (index === 5 && val)
				value = `${val} ${this.props.company.distances}`;
			else value = val;
		}
		return value;
	};

	sortTable = row => e => {
		let sortedTable;
		const order = [this.state.order ? "asc" : "desc"];

		if (row === "distance_passed" || row === "id" || row === "functional") {
			sortedTable = _.orderBy(
				this.state.body,
				function(num) {
					return parseInt(num[row]);
				},
				order
			);
		} else {
			sortedTable = _.orderBy(
				this.state.body,
				[item => (item[row] ? item[row].toLowerCase() : item[row])],
				order
			);
		}

		this.setState({
			body: sortedTable,
			order: !this.state.order
		});
	};

	openDetail = id => e => {
		this.props.getDetail(id);
	};

	render() {
		const { header, Modal } = this.props;
		const { body } = this.state;
		return (
			<div className="table-responsive">
				<table
					className="table table-striped table-bordered table-hover table-sm"
					cellSpacing="0"
					width="100%"
				>
					<thead>
						<tr>
							{header.map((data, index) => (
								<th
									key={index}
									className={style.sortRow}
									onClick={this.sortTable(data.tableRow)}
								>
									{data.name}
									<span className="float-right">
										<Icon icon={ic_unfold_more} />
									</span>
								</th>
							))}
							<th className={style.sortRow}>Overview</th>
						</tr>
					</thead>
					<tbody>
						{body.map((data, index) => (
							<tr key={index}>
								{Object.values(data).map((value, index) => (
									<td
										key={index}
										className={
											value === true || value === false
												? "text-center"
												: null
										}
									>
										{this.setValue(value, index)}
									</td>
								))}
								<td>
									<button
										className="btn btn-outline-primary"
										onClick={this.openDetail(data.id)}
										data-toggle="modal"
										data-target="#modal"
									>
										Open
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Modal />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	company: state.companies.company
});

export default connect(mapStateToProps)(Table);
