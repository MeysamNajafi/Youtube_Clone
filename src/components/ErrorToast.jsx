import { Alert, Snackbar } from "@mui/material";
import React from "react";

const ErrorToast = ({ open, closeHandler, error }) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={4000}
			onClose={closeHandler}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
		>
			<Alert
				onClose={closeHandler}
				severity="error"
				sx={{ width: "100%" }}
			>
				{error}
			</Alert>
		</Snackbar>
	);
};

export default ErrorToast;
