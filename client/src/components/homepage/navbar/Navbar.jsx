import React from "react";
import { connect } from "react-redux";
import "./Navbar.css";
import LoggedInNav from "./user_verified/logged_in_nav";
import LoggedOutNav from "./user_verified/logged_out_nav";

class Navbar extends React.Component {
	render() {
		return (
			<section className="nav-section">
				<div className="navigation-bar">
					<ul id="header-navigation">
						<div id="hack-news-logo-container">
							<p id="hacker-news-logo">Y</p>
						</div>
						<li>
							<a href="/">
								<b>Hacker News Clone</b>
							</a>
							&nbsp;
						</li>
						{this.props.loggedOn ? (
							<LoggedInNav />
						) : (
							<LoggedOutNav />
						)}
					</ul>
				</div>
			</section>
		);
	}
}

let mapDispatchToProps = function (dispatch, props) {
	return {
		dispatch: dispatch,
	};
};

let mapStateToProps = function (state, props) {
	return {
		state_is_verified: state.verified,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
