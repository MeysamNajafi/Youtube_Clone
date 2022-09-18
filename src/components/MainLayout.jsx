import React from "react";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Sidebar, Videos } from "./";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const MainLayout = ({ children }) => {
	const [selectedCategory, setSelectedCategory] = useState("New");
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedCategoryFromParam = searchParams.get("category");

	useEffect(() => {
		setSelectedCategory(selectedCategoryFromParam);
	}, [selectedCategoryFromParam]);

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
					selectCategoryHandler={setSelectedCategory}
				/>
				<Typography variant="body2" color="white" my={2}>
					Copyright 2022 Meysam Najafi
				</Typography>
			</Box>
			<Box
				sx={{
					width: "calc(100% - 230px)",
					marginLeft: "230px",
					height: "calc(100vh - 83px)",
					backgroundColor: "#181818",
				}}
			>
				{children}
			</Box>
		</Stack>
	);
};

export default MainLayout;
