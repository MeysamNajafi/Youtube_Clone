import { Stack, Box, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/fetch";
import { Sidebar, ChannelHeader } from "./";

const DEFAULT_BANNER =
	"https://yt3.ggpht.com/kvYtOOlIxxS5m5nZ7d3EVznB86-hmUlCq-0s_TJHt1uS8eehxj-wEV1aU6vQcFtiQoPAqdQ-";

const ChannelInfo = () => {
	const [selectedCategory, setSelectedCategory] = useState("New");
	const { channelId } = useParams();
	const [isFetching, setIsFetching] = useState(false);
	const [channelInfo, setChannelInfo] = useState([]);

	useEffect(() => {
		const runner = async () => {
			setIsFetching(true);
			const data = await fetchFromApi(
				`channels?id=${channelId}&part=part=snippet%2Cstatistics`
			);
			console.log(data);
			setIsFetching(false);
			setChannelInfo(data.items[0]);
		};

		if (channelId) runner();
	}, [channelId]);

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
				sx={{
					flex: 2,
					backgroundColor: "#0f0f0f",
				}}
			>
				<div>
					<ChannelHeader
						bannerImage={
							channelInfo?.brandingSettings?.image
								?.bannerExternalUrl
						}
						profileImage={
							channelInfo?.snippet?.thumbnails?.high?.url
						}
						title={channelInfo?.snippet?.title}
						subscribers={
							channelInfo?.statistics?.hiddenSubscriberCount
								? "hidden"
								: channelInfo?.statistics?.subscriberCount
						}
					/>
				</div>
			</Box>
		</Stack>
	);
};

export default ChannelInfo;
