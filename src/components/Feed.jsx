import { Box } from "@mui/material";
import React from "react";
import { Videos } from "./";

const Feed = ({ selectedCategory }) => {
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
