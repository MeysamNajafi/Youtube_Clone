import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Stack } from "@mui/system";
import { useEffect } from "react";
import { fetchFromApi } from "../utils/fetch";
import { Typography } from "@mui/material";
import { VideoCard } from "./";
import { CheckCircle, ThumbUp, Visibility } from "@mui/icons-material";

const VideoDetail = () => {
	const [videoDetails, setVideoDetails] = useState(null);
	const [relatedVideos, setRelatedVideos] = useState([]);
	const { videoId } = useParams();

	useEffect(() => {
		fetchFromApi("videos?part=snippet,statistics&id=" + videoId).then(
			(data) => setVideoDetails(data.items[0])
		);

		fetchFromApi(
			`search?part=snippet&realtedToVideoId=${videoId}&type=video`
		).then((data) => setRelatedVideos(data.items));
	}, [videoId]);

	if (!videoDetails?.snippet) return "Loading";

	const {
		snippet: { title, channelId, channelTitle },
		statistics: { viewCount, likeCount },
	} = videoDetails;

	return (
		<Box sx={{ backgroundColor: "#181818" }} minHeight="95vh">
			<Stack direction={{ xs: "column", lg: "row" }}>
				<Box flex={1}>
					<Box
						sx={{ width: "100%", position: "sticky", top: "83px" }}
					>
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${videoId}`}
							className="react-player"
							controls
						/>
						<Typography
							color="#fff"
							variant="h5"
							fontWeight="bold"
							p={2}
						>
							{title}
						</Typography>
						<Stack
							direction="row"
							justifyContent="space-between"
							sx={{ color: "#fff " }}
							py={1}
							px={2}
						>
							<Link to={`/channel/${channelId}`}>
								<Typography
									color="#fff"
									variant={{ sm: "subtitle1", md: "h6" }}
									sx={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<span style={{ fontFamily: "sans-serif" }}>
										{channelTitle}
									</span>
									<CheckCircle
										sx={{
											fontSize: 18,
											color: "rgb(170,170,170)",
											ml: "5px",
										}}
									/>
								</Typography>
							</Link>
							<Stack direction="row" gap={2} alignItems="center">
								<Typography
									sx={{
										opacity: 0.7,
										display: "flex",
										alignItems: "center",
										gap: 1,
									}}
									variant="body1"
								>
									<Visibility sx={{ fontSize: 17 }} />
									{parseInt(viewCount).toLocaleString()} views
								</Typography>
								<Typography
									sx={{
										opacity: 0.7,
										display: "flex",
										alignItems: "center",
										gap: 1,
									}}
									variant="body1"
								>
									<ThumbUp sx={{ fontSize: 17 }} />
									{parseInt(likeCount).toLocaleString()} likes
								</Typography>
							</Stack>
						</Stack>
					</Box>
				</Box>
				<Box
					px={2}
					justifyContent="center"
					sx={{ marginTop: { xs: 5, lg: 0 } }}
				>
					<Stack
						flexWrap="wrap"
						gap={3}
						direction={{ xs: "row", lg: "column" }}
					>
						{relatedVideos.map((item, i) => (
							<>
								{item?.id?.videoId && (
									<Box
										sx={{
											width: "300px",
											flex: "1 0 300px",
											// marginBottom: "10px",
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
				</Box>
			</Stack>
		</Box>
	);
};

export default VideoDetail;
