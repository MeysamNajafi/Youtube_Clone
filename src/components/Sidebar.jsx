import { Stack } from "@mui/system";
import React from "react";

import { categories } from "../utils/consts";

const Sidebar = ({ selectedCategory, selectCategoryHandler }) => {
	return (
		<Stack
			direction="row"
			sx={{
				flexDirection: { md: "column" },
			}}
		>
			{categories.map((category, i) => (
				<button
					onClick={() => {
						selectCategoryHandler(category.name);
					}}
					key={i}
					className="category-btn"
					style={{
						background:
							category.name === selectedCategory && "#e01000",
						color: "white",
					}}
				>
					<span
						style={{
							color:
								category.name === selectedCategory
									? "white"
									: "red",
							marginRight: "15px",
						}}
					>
						{category.icon}
					</span>
					<span
						style={{
							opacity:
								category.name === selectedCategory
									? "1"
									: "0.8",
						}}
					>
						{category.name}
					</span>
				</button>
			))}
		</Stack>
	);
};

export default Sidebar;
