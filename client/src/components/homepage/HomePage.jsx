import "./HomePage.css";
import React from "react";
import Navbar from "./navbar/Navbar";
import Body from "./body/MainContent";
import { connect } from "react-redux";

class HomePage extends React.Component {
	render() {
		const cookie = sessionStorage.getItem("cookie");
		return (
			<div className="main-container">
				<Navbar loggedOn={cookie} />
				<Body loggedOn={cookie} />
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
