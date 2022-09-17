import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, VideoDetail, ChannelInfo, Search, Feed } from "./components";

function App() {
	return (
		<BrowserRouter>
			<Box sx={{ backgroundColor: "#000" }}>
				<Navbar />
				<Routes>
					<Route path="/" exact element={<Feed />}></Route>
					<Route
						path="/video/:videoId"
						element={<VideoDetail />}
					></Route>
					<Route
						path="/channel/:channelId"
						element={<ChannelInfo />}
					></Route>
					<Route path="/search/:query" element={<Search />}></Route>
				</Routes>
			</Box>
		</BrowserRouter>
	);
}

export default App;
