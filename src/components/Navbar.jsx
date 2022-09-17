import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/consts";

import { SearchBar } from "./index";

const Navbar = () => {
	return (
		<Stack
			alignItems="center"
			direction="row"
			p={2}
			sx={{
				// position: "sticky",
				background: "#212121",
				// top: 0,
				justifyContent: "space-between",
				borderBottom: "1px solid #333",
			}}
		>
			<Link to="/" style={{ display: "flex", alignItems: "center" }}>
				<img src={logo} width="45" alt="Logo" />
			</Link>
			<SearchBar />
			<div></div>
		</Stack>
	);
};

export default Navbar;
