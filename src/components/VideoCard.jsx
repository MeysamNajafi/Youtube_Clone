import { CheckCircle } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import {
	demoThumbnailUrl,
	demoVideoUrl,
	demoVideoTitle,
	demoChannelTitle,
	demoChannelUrl,
} from "../utils/consts";

const VideoCard = ({ video: { id: videoId, snippet } }) => {
	return (
		<Card
			sx={{
				boxShadow: "none",
				borderRadius: "0",
			}}
		>
			<Link to={videoId ? `/video/${videoId?.videoId}` : demoVideoUrl}>
				<CardMedia
					image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
					alt={snippet?.title}
					sx={{ height: 150, objectFit: "cover" }}
				></CardMedia>
			</Link>
			<CardContent
				sx={{
					backgroundColor: "#181818",
					height: "125px",
					padding: "12.5px 2px !important",
				}}
			>
				<Link
					to={videoId ? `/video/${videoId?.videoId}` : demoVideoUrl}
				>
					<Typography variant="body2" fontWeight="bold" color="#fff">
						{snippet?.title.slice(0, 60) ||
							demoVideoTitle.slice(0, 60)}
					</Typography>
				</Link>
				<Link
					to={
						snippet?.channelId
							? `/channel/${snippet?.channelId}`
							: demoChannelUrl
					}
				>
					<Typography
						variant="caption"
						fontWeight="bold"
						color="rgb(170,170,170)"
						sx={{ display: "flex", alignItems: "center", mt: 1 }}
					>
						{snippet?.channelTitle || demoChannelTitle}
						<CheckCircle
							sx={{
								fontSize: 14,
								ml: "5px",
							}}
						/>
					</Typography>
					<Typography
						variant="caption"
						fontWeight="bold"
						color="rgb(170,170,170)"
						sx={{ display: "flex", alignItems: "center" }}
					>
						{new Date(snippet?.publishedAt).toLocaleDateString()}
					</Typography>
				</Link>
			</CardContent>
		</Card>
	);
};

export default VideoCard;
