import React, { Fragment } from "react";

import { Icon } from "react-icons-kit";

export default class FormField extends React.Component {
	state = {
		value: ""
	};

	onChange = e => {
		this.setState({ value: e.target.value });
		this.props.onChange(e);
	};

	componentDidMount() {
		this.setState({ value: this.props.value });
	}

	componentDidUpdate(prevProps) {
		if (this.props.value !== prevProps.value) {
			this.setState({ value: this.props.value });
		}
	}

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
						type={this.props.fieldType}
						required={this.props.fieldRequired ? true : ""}
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
