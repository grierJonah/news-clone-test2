import React from "react";
import "../Navbar.css";

export default class logged_out_nav extends React.Component {
	render() {
		return (
			<div className="inner-nav-list">
				<li className="tags" id="submit-tag">
					<a href="../add_post">&nbsp;submit</a>
				</li>
				<li className="tags" id="comments-tag">
					<a href="/">&nbsp;comments</a>
				</li>
				<li className="tags" id="ask-tag">
					<a href="/">&nbsp;ask</a>
				</li>
				<li className="tags" id="show-tag">
					<a href="/">&nbsp;show</a>
				</li>
				<li className="tags" id="jobs-tag">
					<a href="/">&nbsp;jobs</a>
				</li>
				<li className="tags" id="user-login">
					<a href="../authenticate">login</a>
				</li>
				<li className="tags" id="user-register">
					&nbsp;
					<a href="../signup">register</a>
				</li>
			</div>
		);
	}
}
