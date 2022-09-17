import React from "react";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Sidebar, Videos } from "./";

const MainLayout = ({ selectedCategory, selectCategoryHandler, children }) => {
	return (
		<Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
			<Box
				sx={{
					height: "calc(100% - 80px)",
					px: { sx: 0, md: 2 },
					boxSizing: "border-box",
					backgroundColor: "#212121",
					position: "fixed",
					top: "83px",
					zIndex: 1000,
					overflowY: "auto",
					width: "230px",
				}}
			>
				<Sidebar
					selectedCategory={selectedCategory}
					selectCategoryHandler={selectCategoryHandler}
				/>
				<Typography variant="body2" color="white" my={2}>
					Copyright 2022 Meysam Najafi
				</Typography>
			</Box>
			<Box
				sx={{
					width: "calc(100% - 230px)",
					marginLeft: "230px",
				}}
			>
				{children}
			</Box>
		</Stack>
	);
};

export default MainLayout;
