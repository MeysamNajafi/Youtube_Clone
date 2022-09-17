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
	const containerRef = useRef();

	const fetchVideos = useCallback(async () => {
		try {
			let URL = "";
			if (nextPageToken && previousSelectedCategory === selectedCategory)
				URL = `${url}?part=snippet&q=${selectedCategory}&pageToken=${nextPageToken}&maxResults=48`;
			else
				URL = `${url}?part=snippet&q=${selectedCategory}&maxResults=40`;

			setIsFetching(true);
			const data = await fetchFromApi(URL);
			if (previousSelectedCategory === selectedCategory)
				setVideos((prev) => [...prev, ...data.items]);
			else {
				setVideos(data.items);
				containerRef.current.scroll({
					top: 0,
					behavior: "smooth",
				});
			}

			nextPageToken = data.nextPageToken;
			previousSelectedCategory = selectedCategory;
		} catch (err) {
			console.log(err);
		} finally {
			setIsFetching(false);
		}
	}, [selectedCategory, url]);

	// useEffect(() => {
	// 	console.log(videos);
	// }, [videos]);

	const throttle = (callback, time) => {
		if (throttleTimer) return;

		throttleTimer = true;

		setTimeout(() => {
			callback();
			throttleTimer = false;
		}, time);
	};

	const scrollHandler = (e) => {
		if (
			e.target.scrollTop + e.target.offsetHeight + 1 >=
			e.target.scrollHeight
		) {
			setIsFetching(true);
			throttle(fetchVideos, 500);
		}
	};

	useEffect(() => {
		fetchVideos();
		// setIsFetching(true);
	}, [fetchVideos]);

	return (
		<div
			style={{ overflowY: "auto", height: "90vh", marginTop: 1 }}
			onScroll={scrollHandler}
			ref={containerRef}
		>
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
						position: "relative",
						bottom: videos.length ? "40px" : "-10px",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<CircularProgress color="error" />
				</div>
			)}
		</div>
	);
};

export default Videos;
