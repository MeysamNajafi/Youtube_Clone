import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
	Navbar,
	VideoDetail,
	ChannelInfo,
	Search,
	Feed,
	Profile,
} from "./components";
import MainLayout from "./components/MainLayout";

function App() {
	document.title = "Youtube";
	return (
		<BrowserRouter>
			<Box sx={{ backgroundColor: "#000" }}>
				<Navbar />
				<Routes>
					<Route
						path="/"
						exact
						element={
							<MainLayout>
								<Feed />
							</MainLayout>
						}
					></Route>
					<Route
						path="/video/:videoId"
						element={<VideoDetail />}
					></Route>
					<Route
						path="/profile"
						element={
							<MainLayout>
								<Profile />
							</MainLayout>
						}
					></Route>
					<Route
						path="/channel/:channelId"
						element={
							<MainLayout>
								<ChannelInfo />
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
