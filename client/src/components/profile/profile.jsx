import React, { useState } from "react";
import "../homepage/navbar/Navbar.css";
import "./profile.css";
import profileStyles from "./styles";
import profileColors from "./colors";
import UserForm from "./UserForm";
import {
	Avatar,
	Container,
	Paper,
	Typography,
	Button,
	Grid,
} from "@material-ui/core";

const initialData = { email: "", password: "", avatarUrl: "" };

const Profile = () => {
	const styles = profileStyles();
	const colors = profileColors();
	const name = sessionStorage.getItem("username");
	const [data, setData] = useState(initialData);

	const handleSubmitForm = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	return (
		<div className="user-profile-container">
			<section className="nav-section">
				<div className="navigation-bar">
					<ul id="header-navigation">
						<li className="tags" id="user-profile">
							<a href="/profile">Profile</a>
						</li>
						<li id="user-settings">
							<a href="/settings-page">Settings</a>
						</li>
						<li id="user-home">
							<a href="../">Homepage</a>
						</li>
					</ul>
				</div>
			</section>

			<Container component="main" maxWidth="md">
				<div className="user-profile-avatar">
					<Paper className={styles.paper} elevation={5}>
						<Typography variant="h3">Welcome {name}</Typography>
						<Avatar className={colors.orangeAvatar}>
							{name[0]}
						</Avatar>
						<form
							className={styles.form}
							onSubmit={handleSubmitForm}>
							<Grid container spacing={5}>
								<UserForm
									name="email"
									label="Email Address"
									handleChange={handleChange}
									type="email"
								/>
								<UserForm
									name="password"
									label="Password"
									handleChange={handleChange}
									type="password"
								/>
								<UserForm
									name="avatarUrl"
									label="Avatar Link"
									handleChange={handleChange}
									type="text"
								/>
							</Grid>
							<Button
								type="submit"
								half="true"
								variant="contained"
								color="primary"
								className={styles.submit}>
								Save Changes
							</Button>
						</form>
					</Paper>
				</div>
			</Container>
		</div>
	);
};

export default Profile;
