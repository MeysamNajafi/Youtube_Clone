import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Videos } from "./";
import { useSearchParams } from "react-router-dom";

const Feed = () => {
	const [selectedCategory, setSelectedCategory] = useState("New");
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedCategoryFromParam = searchParams.get("category");

	useEffect(() => {
		setSelectedCategory(selectedCategoryFromParam);
	}, [selectedCategoryFromParam]);

	return (
		<Box
			px={2}
			py={1}
			sx={{
				flex: 2,
				backgroundColor: "#181818",
			}}
		>
			<Videos
				url={"search"}
				searchQuery="q"
				selectedCategory={selectedCategory}
			/>
		</Box>
	);
};

export default Feed;
