const bcrypt = require("bcryptjs");

export default function (
	state = {
		loggedIn: false,
		username: "",
		password: "",
		email: "",
		cookie: "",
		redirect: "",
	},
	action
) {
	if (action.type === "LOG_IN") {
		// If username, password match db, set username, password, email so that we can display more information on the nav bar
		if (bcrypt.compareSync(action.password, action.auth.password)) {
			return {
				...state,
				loggedIn: true,
				username: action.username,
				password: action.password,
				email: action.auth.email,
				redirect: "/",
			};
		}
	}

	if (action.type === "SET_COOKIE") {
		return {
			...state,
			username: action.setUser.username,
			password: action.setUser.password,
			email: action.setUser.email,
			cookie: action.setCookie,
			redirect: "/",
		};
	}
	return state;
}
