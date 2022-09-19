import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import { logo } from "../utils/consts";
import { SearchBar } from "./index";
import { demoProfilePicture } from "../utils/consts";
import { NotificationsNone } from "@mui/icons-material";

const Navbar = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const getSearchInputValue = (val) => {
		setSearchParams({ category: val });
	};

	return (
		<Stack
			alignItems="center"
			direction="row"
			p={{ xs: 1, sm: 2 }}
			sx={{
				position: "sticky",
				background: "#212121",
				top: -1,
				justifyContent: "space-between",
				borderBottom: "1px solid #333",
				height: "83px",
				zIndex: 1000,
				boxSizing: "border-box",
			}}
		>
			<Link to="/" style={{ display: "flex", alignItems: "center" }}>
				<img src={logo} width="40" alt="Logo" />
			</Link>
			<SearchBar onSubmit={getSearchInputValue} />
			<Stack
				sx={{ display: { xs: "none", sm: "flex" } }}
				direction="row"
				gap={2}
				alignItems="center"
			>
				<button
					style={{
						outline: "none",
						border: "none",
						cursor: "pointer",
						background: "transparent",
					}}
				>
					<NotificationsNone sx={{ color: "white", fontSize: 30 }} />
				</button>
				<Link to="/profile">
					<img
						src={demoProfilePicture}
						width={30}
						height={30}
						style={{ borderRadius: "50%" }}
					/>
				</Link>
			</Stack>
		</Stack>
	);
};

export default Navbar;
