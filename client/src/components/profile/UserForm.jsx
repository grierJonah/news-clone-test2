import React from "react";
import { TextField, Grid } from "@material-ui/core";

const UserForm = ({ name, half, handleChange, label, autoFocus, type }) => {
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				name={name}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
				label={label}
				autoFocus={autoFocus}
				type={type}
			/>
		</Grid>
	);
};

export default UserForm;
