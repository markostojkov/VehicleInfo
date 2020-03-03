import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { logout } from "../../actions/auth";

import Avatar from "../../public/images/avatar.png";
import Logo from "../../public/images/logo.png";
import style from "../style/header.css";
import mainStyle from "../style/style.css";

import { Icon } from "react-icons-kit";
import { ic_menu } from "react-icons-kit/md/ic_menu";
import { ic_dashboard } from "react-icons-kit/md/ic_dashboard";
import { ic_directions_car } from "react-icons-kit/md/ic_directions_car";
import { ic_shopping_basket } from "react-icons-kit/md/ic_shopping_basket";
import { ic_account_balance } from "react-icons-kit/md/ic_account_balance";
import { ic_account_box } from "react-icons-kit/md/ic_account_box";
import { ic_exit_to_app } from "react-icons-kit/md/ic_exit_to_app";

const sidebar = [
	{ name: "Dashboard", icon: ic_dashboard, link: "/" },
	{ name: "Vehicles", icon: ic_directions_car, link: "/vehicles" },
	{
		name: "Repair Shops",
		icon: ic_shopping_basket,
		link: "/repairs",
		hr: true
	},
	{ name: "My Company", icon: ic_account_balance, link: "/company" },
	{ name: "Profile", icon: ic_account_box, link: "/profile" }
];

export class Page extends React.Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		logout: PropTypes.func.isRequired
	};

	toggleBigSidebar = e => {
		document.getElementById("big_sidebar").style.display = "block";
		document.getElementById("small_sidebar").style.display = "none";
		document.getElementById("content").style.marginLeft = "250px";
	};

	toggleSmallSidebar = e => {
		document.getElementById("big_sidebar").style.display = "none";
		document.getElementById("small_sidebar").style.display = "block";
		document.getElementById("content").style.marginLeft = "75px";
	};

	render() {
		const PageComponent = this.props.component;

		return (
			<div>
				<div className="sidebar">
					<div id="big_sidebar" className={style.big_sidebar}>
						<button
							className={style.big_button}
							onClick={this.toggleSmallSidebar}
						>
							<Icon size={26} icon={ic_menu} />
						</button>
						<img src={Logo} className={mainStyle.logo} />
						<ul>
							<hr />
							{sidebar.map((data, index) => (
								<Fragment key={index}>
									<li>
										<Link to={data.link} className="btn">
											<Icon
												size={26}
												style={{ marginRight: 10 }}
												icon={data.icon}
											/>
											{data.name}
										</Link>
									</li>
									{data.hr ? <hr /> : <Fragment />}
								</Fragment>
							))}
							<li>
								<button
									className="btn"
									onClick={this.props.logout}
								>
									<Icon
										size={26}
										style={{ marginRight: 10 }}
										icon={ic_exit_to_app}
									/>
									Logout
								</button>
							</li>
						</ul>
					</div>
					<div id="small_sidebar" className={style.small_sidebar}>
						<button
							className={`btn mt-1 ${style.hamburger_button}`}
							onClick={this.toggleBigSidebar}
						>
							<Icon size={26} icon={ic_menu} />
						</button>
						<ul>
							<hr />
							{sidebar.map((data, index) => (
								<li key={index}>
									<Link to={data.link} className="btn">
										<Icon size={26} icon={data.icon} />
									</Link>
								</li>
							))}
							<li>
								<button
									className="btn"
									onClick={this.props.logout}
								>
									<Icon size={26} icon={ic_exit_to_app} />
								</button>
							</li>
						</ul>
					</div>
				</div>
				<div className={mainStyle.content} id="content">
					<div className={style.topbar}>
						<div>
							<a
								type="button"
								className="dropdown-toggle pr-3"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
								href="#"
							>
								<img
									src={Avatar}
									className={mainStyle.avatar_profile}
								/>
							</a>
							<div className="dropdown-menu dropdown-menu-right">
								<button className="dropdown-item" type="button">
									<Link to="/profile">Profile</Link>
								</button>
								<button className="dropdown-item" type="button">
									<Link to="/company">My Company</Link>
								</button>
								<button
									className="dropdown-item"
									type="button"
									onClick={this.props.logout}
								>
									<Link to="#">Logout</Link>
								</button>
							</div>
						</div>
					</div>
					<div className="m-1">
						<PageComponent {...this.props} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Page);
