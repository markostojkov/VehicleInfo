import React, { Fragment } from "react";

import style from "../style/style.css";

export default class Pagination extends React.Component {
	pagginate = page => {
		this.props.pagginate(page);

		let paginationPage = document.getElementsByClassName("page-item");
		for (let i = 0; i < paginationPage.length; i++) {
			if (page === i + 1) {
				paginationPage[i].classList.add(style.active, "disabled");
			} else paginationPage[i].classList.remove(style.active, "disabled");
		}
	};

	createPaginator = pages => {
		let paginator = [];
		for (let i = 1; i <= pages; i++) {
			paginator.push(
				<li
					key={i}
					className={
						i === 1 ? `${style.active} page-item` : "page-item"
					}
				>
					<button
						className="page-link"
						onClick={() => this.pagginate(i)}
					>
						{i}
					</button>
				</li>
			);
		}

		return paginator;
	};

	render() {
		const { pages } = this.props;
		return (
			<Fragment>
				<nav aria-label="Page navigation example">
					<ul
						className={`pagination justify-content-end ${style.pagination_rounded}`}
					>
						{this.createPaginator(pages)}
					</ul>
				</nav>
			</Fragment>
		);
	}
}
