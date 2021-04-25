import "./login.css";
import { connect } from "react-redux";
import React from "react";
import axios from "axios";

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			failedAttempt: false,
		};
		this.changeUsername = this.changeUsername.bind(this);
		this.changePassword = this.changePassword.bind(this);
	}

	changeUsername(event) {
		this.setState({
			username: event.target.value,
		});
	}

	changePassword(event) {
		this.setState({
			password: event.target.value,
		});
	}

	authenticateUser(action, name, pass, db_user) {
		this.props.dispatch({
			type: action,
			username: name,
			password: pass,
			auth: db_user,
		});
	}

	setSessionStorage(token, user) {
		sessionStorage.setItem("cookie", token);
		sessionStorage.setItem("username", user.username);
		sessionStorage.setItem("password", user.password);
	}

	setCookieToState(action, user, cookie) {
		this.props.dispatch({ type: action, setUser: user, setCookie: cookie });
	}

	getFromDatabase(event) {
		event.preventDefault();
		const loginUser = {
			username: this.state.username,
			password: this.state.password,
		};

		console.log("User Logging in:", loginUser);

		axios
			.post("http://localhost:4000/users/authenticate", loginUser)
			.then((res) => {
				let cookie = "token=" + res.data.token;
				this.setSessionStorage(res.data.token, loginUser);
				this.setCookieToState("SET_COOKIE", loginUser, cookie);
				document.cookie = cookie;
				document.location = "../";
			})
			.catch((error) => {
				this.setState({
					failedAttempt: true,
				});
				console.log(error);
			});
	}

	wrongUsernamePassword() {
		const failedAttempt = this.state.failedAttempt;
		if (failedAttempt) {
			return <h3>Invalid Username or password! Please try again</h3>;
		}
	}

	render() {
		return (
			<div className="container">
				<div className="form-group">
					<form onSubmit={this.getFromDatabase.bind(this)}>
						<div className="form-group row">
							<label htmlFor="username">Username:</label>
							<input
								type="text"
								placeholder="Username"
								onChange={this.changeUsername}
								value={this.state.username}
								className="form-control form-group"
								required={true}
							/>
						</div>
						<div className="form-group row">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								placeholder="Password"
								minLength="8"
								onChange={this.changePassword}
								value={this.state.password}
								className="form-control form-group register"
								required={true}
							/>
						</div>
						<small id="login-help" className="form-text text-muted">
							Enter your username and password to login!
						</small>
						<div className="form-group" id="register-outer-button">
							<input
								type="submit"
								className="btn btn-success"
								value="Login"
							/>
						</div>
						<div id="login-back-button">
							<a href="../">Cancel</a>
						</div>
					</form>
				</div>
				{this.state.failedAttempt ? this.wrongUsernamePassword() : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
