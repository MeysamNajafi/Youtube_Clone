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
		<Stack direction={{ xs: "column", md: "row" }}>
			<Box
				sx={{
					height: "calc(100% - 80px)",
					px: { sx: 0, md: 2 },
					boxSizing: "border-box",
					backgroundColor: "#212121",
					position: { xs: "relative", md: "fixed" },
					top: { xs: "0px", md: "83px" },
					zIndex: { xs: 0, md: 1000 },
					overflowY: "auto",
					overflowX: { xs: "auto", md: "hidden" },
					width: { xs: "100%", md: "230px" },
				}}
			>
				<Sidebar
					selectedCategory={selectedCategory}
					selectCategoryHandler={setSelectedCategory}
				/>
				<Typography
					sx={{ display: { xs: "none", md: "block" } }}
					variant="body2"
					color="white"
					my={2}
				>
					Copyright 2022 Meysam Najafi
				</Typography>
			</Box>
			<Box
				sx={{
					width: { xs: "100%", md: "calc(100% - 230px)" },
					marginLeft: { xs: 0, md: "230px" },
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
