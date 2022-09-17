import { Box, Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { VideoCard, ChannelCard } from "./";
import { fetchFromApi } from "../utils/fetch";
import { useCallback } from "react";
import { CircularProgress } from "@mui/material";

let nextPageToken = "";
let throttleTimer;
let previousSelectedCategory = "";

const Videos = ({ url, selectedCategory }) => {
	const [videos, setVideos] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const fetchVideos = useCallback(async () => {
		console.log(previousSelectedCategory, selectedCategory);
		try {
			let URL = "";
			if (nextPageToken && previousSelectedCategory === selectedCategory)
				URL = `${url}?part=snippet&q=${selectedCategory}&pageToken=${nextPageToken}`;
			else URL = `${url}?part=snippet&q=${selectedCategory}`;

			setIsFetching(true);
			const data = await fetchFromApi(URL);
			if (previousSelectedCategory === selectedCategory)
				setVideos((prev) => [...prev, ...data.items]);
			else setVideos(data.items);

			nextPageToken = data.nextPageToken;
			previousSelectedCategory = selectedCategory;
		} catch (err) {
			console.log(err);
		} finally {
			setIsFetching(false);
		}
	}, [selectedCategory, url]);

	// const throttle = (callback, time) => {
	// 	if (throttleTimer) return;

	// 	throttleTimer = true;

	// 	setTimeout(() => {
	// 		callback();
	// 		throttleTimer = false;
	// 	}, time);
	// };

	// window.addEventListener(
	// 	"scroll",
	// 	() => {
	// 		if (
	// 			window.innerHeight + window.pageYOffset >=
	// 			document.body.offsetHeight
	// 		) {
	// 			setIsFetching(true);
	// 			throttle(fetchVideos, 1000);
	// 		}
	// 	},
	// 	{
	// 		passive: true,
	// 	}
	// );

	useEffect(() => {
		fetchVideos();
	}, [fetchVideos]);

	return (
		<>
			<Stack direction="row" flexWrap="wrap" gap={2}>
				{videos.map((item, i) => (
					<Box
						sx={{
							flex: {
								md: "1 0 300px",
								lg: "1 0 250px",
							},
						}}
						key={i}
					>
						{item.id.videoId && <VideoCard video={item} />}
						{item.id.channelId && <ChannelCard channel={item} />}
					</Box>
				))}
			</Stack>
			{isFetching && (
				<div
					style={{
						margin: "20px 0px",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<CircularProgress color="error" />
				</div>
			)}
		</>
	);
};

export default Videos;
