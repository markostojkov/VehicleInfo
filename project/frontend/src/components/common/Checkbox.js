import React, { Fragment } from "react";

import { Icon } from "react-icons-kit";

export default class FormField extends React.Component {
	state = {
		value: true
	};

	onChange = e => {
		this.setState({ value: !this.state.value });
		this.props.onChange(e);
	};

	render() {
		const { value } = this.state;
		return (
			<div className="form-group">
				<label>
					{this.props.fieldLabel}
					{this.props.fieldRequired ? (
						<small className="text-muted"> (required)</small>
					) : (
						""
					)}
				</label>
				<div className="input-group">
					<div className="input-group-prepend">
						<span className="input-group-text">
							<Icon icon={this.props.iconType} />
						</span>
					</div>
					<input
						type="checkbox"
						className="form-control form-control-lg"
						placeholder={this.props.fieldLabel}
						name={this.props.fieldName}
						onChange={this.onChange}
						value={value}
					/>
				</div>
			</div>
		);
	}
}
