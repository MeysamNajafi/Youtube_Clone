import { Box, Typography } from "@mui/material";
import React from "react";

const Profile = () => {
	return (
		<Box
			px={2}
			py={1}
			sx={{
				flex: 2,
				color: "white",
			}}
		>
			<Typography>Simple Profile Page</Typography>
		</Box>
	);
};

export default Profile;
