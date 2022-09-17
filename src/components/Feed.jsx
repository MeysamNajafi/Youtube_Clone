import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Sidebar, Videos } from "./";
import { useState } from "react";

const Feed = () => {
	const [selectedCategory, setSelectedCategory] = useState("New");

	return (
		<Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
			<Box
				sx={{
					height: { sx: "auto", md: "92vh" },
					px: { sx: 0, md: 2 },
					backgroundColor: "#212121",
				}}
			>
				<Sidebar
					selectedCategory={selectedCategory}
					selectCategoryHandler={setSelectedCategory}
				/>
				<Typography variant="body2" color="white" mt={2}>
					Copyright 2022 Meysam Najafi
				</Typography>
			</Box>
			<Box
				px={2}
				py={1}
				sx={{
					flex: 2,
					backgroundColor: "#181818",
				}}
			>
				<Videos url={"search"} selectedCategory={selectedCategory} />
			</Box>
		</Stack>
	);
};

export default Feed;
