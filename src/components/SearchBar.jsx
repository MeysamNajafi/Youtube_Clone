import { Search } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const submitFormHandler = () => {};

	return (
		<Paper
			component="for"
			onSubmit={submitFormHandler}
			sx={{
				borderRadius: 20,
				border: "1px solid #404040",
				pl: 2,
				boxShadow: "none",
				mr: { sm: 5 },
				backgroundColor: "#181818",
			}}
		>
			<input
				style={{ backgroundColor: "#181818", color: "white" }}
				className="search-bar"
				placeholder="search..."
			/>
			<IconButton type="submit" sx={{ color: "#e01000", p: "10px" }}>
				<Search />
			</IconButton>
		</Paper>
	);
};

export default SearchBar;
