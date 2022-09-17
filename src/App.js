import { Box } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, VideoDetail, ChannelInfo, Search, Feed } from "./components";
import MainLayout from "./components/MainLayout";

function App() {
	const [selectedCategory, setSelectedCategory] = useState("New");
	return (
		<BrowserRouter>
			<Box sx={{ backgroundColor: "#000" }}>
				<Navbar />
				<Routes>
					<Route
						path="/"
						exact
						element={
							<MainLayout
								selectedCategory={selectedCategory}
								selectCategoryHandler={setSelectedCategory}
							>
								<Feed selectedCategory={selectedCategory} />
							</MainLayout>
						}
					></Route>
					<Route
						path="/video/:videoId"
						element={<VideoDetail />}
					></Route>
					<Route
						path="/channel/:channelId"
						element={
							<MainLayout
								selectedCategory={selectedCategory}
								selectCategoryHandler={setSelectedCategory}
							>
								<ChannelInfo
									selectedCategory={selectedCategory}
								/>
							</MainLayout>
						}
					></Route>
					<Route path="/search/:query" element={<Search />}></Route>
				</Routes>
			</Box>
		</BrowserRouter>
	);
}

export default App;
