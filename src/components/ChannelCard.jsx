import { CheckCircle } from "@mui/icons-material";
import { CardContent, CardMedia, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { demoProfilePicture } from "../utils/consts";

const ChannelCard = ({ channel }) => {
	return (
		<Box
			sx={{
				shadow: "none",
				borderRadius: "20px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "275px",
				magin: "auto",
			}}
		>
			<Link to={`/channel/${channel?.id?.channelId}`}>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						textAlign: "center",
						color: "#fff",
					}}
				>
					<CardMedia
						image={
							channel?.snippet?.thumbnails?.high?.url ||
							demoProfilePicture
						}
						alt={channel?.snippet?.title}
						sx={{
							borderRadius: "50%",
							height: "180px",
							width: "180px",
							mb: 2,
							border: "1px solid #e3e3e3",
						}}
					></CardMedia>
					<Typography
						sx={{ display: "flex", alignItems: "center" }}
						variant="h6"
					>
						{channel?.snippet?.title}
						<CheckCircle
							sx={{
								fontSize: 18,
								color: "rgb(170,170,170)",
								ml: "5px",
							}}
						/>
						{channel?.statistics?.subscriberCount && (
							<Typography>
								{parseInt(
									channel?.statistics?.subscriberCount
								).toLocaleString()}{" "}
								Subscribers
							</Typography>
						)}
					</Typography>
				</CardContent>
			</Link>
		</Box>
	);
};

export default ChannelCard;
