import "./register.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			username: "",
			password: "",
		};
		this.changeEmail = this.changeEmail.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
		this.changePassword = this.changePassword.bind(this);
	}

	changeEmail(event) {
		this.setState({
			email: event.target.value,
		});
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

	sendToDatabase(event) {
		// Prevents the form to act in a default way --> don't want whole page to refresh, we want redirection
		event.preventDefault();

		const newRegisteredUser = {
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
		};

		axios
			.post("http://localhost:4000/users/signup", newRegisteredUser)
			.then((response) => console.log(response.data));

		document.location = "../authenticate";
		this.setState({
			email: "",
			username: "",
			password: "",
		});
	}

	render() {
		return (
			<div className="container">
				<div className="form-group">
					<form onSubmit={this.sendToDatabase.bind(this)}>
						<div className="form-group">
							<label htmlFor="username">Email:</label>
							<input
								className="form-control form-group"
								type="text"
								placeholder="Email"
								onChange={this.changeEmail}
								value={this.state.email}
								required={true}
							/>
							<small
								id="email-help"
								className="form-text text-muted">
								We'll never share your email with anyone else.
							</small>
						</div>
						<div className="form-group">
							<label htmlFor="username">Username:</label>
							<input
								className="form-control form-group"
								type="text"
								placeholder="Username"
								onChange={this.changeUsername}
								value={this.state.username}
								required={true}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								placeholder="Password"
								minLength="8"
								onChange={this.changePassword}
								value={this.state.password}
								className="form-control form-group register"
							/>
						</div>
						<div className="form-group" id="register-button">
							<input
								type="submit"
								className="btn btn-success"
								value="Register"
							/>
						</div>
						<div id="back-button">
							<a href="../">Cancel</a>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Register;
