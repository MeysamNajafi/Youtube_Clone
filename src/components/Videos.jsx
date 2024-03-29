import { Box, Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { VideoCard, ChannelCard, ErrorToast } from "./";
import { fetchFromApi } from "../utils/fetch";
import { useCallback } from "react";
import { CircularProgress } from "@mui/material";

let nextPageToken = "";
let throttleTimer;
let previousSelectedCategory = "";

const Videos = ({ url, selectedCategory, searchQuery }) => {
	const [videos, setVideos] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState("");
	const [isFetching, setIsFetching] = useState(false);
	const containerRef = useRef();

	const fetchVideos = useCallback(async () => {
		try {
			let URL = "";
			if (nextPageToken && previousSelectedCategory === selectedCategory)
				URL = `${url}?part=snippet&${searchQuery}=${selectedCategory}&pageToken=${nextPageToken}&maxResults=48`;
			else
				URL = `${url}?part=snippet&${searchQuery}=${selectedCategory}&maxResults=48`;

			setIsFetching(true);
			if (previousSelectedCategory !== selectedCategory) {
				setVideos([]);
			}

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
			setError(err.message);
			setIsOpen(true);
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
					<>
						{item?.id?.videoId && (
							<Box
								sx={{
									flex: {
										xs: "1 0 200px",
										md: "1 0 300px",
										lg: "1 0 250px",
									},
								}}
								key={i}
							>
								<VideoCard video={item} />
								{/* {item.id.channelId && <ChannelCard channel={item} />} */}
							</Box>
						)}
					</>
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
			<ErrorToast
				open={isOpen}
				error={error}
				closeHandler={() => {
					setIsOpen((o) => !o);
				}}
			/>
		</div>
	);
};

export default Videos;
