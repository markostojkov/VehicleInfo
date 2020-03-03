import React from "react";
import { Link } from "react-router-dom";

import { Icon } from "react-icons-kit";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";

import style from "../style/card.css";

export default class Widget extends React.Component {
	render() {
		const { value, text, backgroundColor, icon, link } = this.props;
		return (
			<div
				className={`${style.card_box}`}
				style={{ backgroundColor: backgroundColor }}
			>
				<div className={style.inner}>
					<h3> {value} </h3>
					<p> {text} </p>
				</div>
				<div className={style.icon}>
					<Icon icon={icon} size={80} />
				</div>
				<Link to={link} className={style.card_box_footer}>
					View More <Icon icon={ic_keyboard_arrow_right} />
				</Link>
			</div>
		);
	}
}
