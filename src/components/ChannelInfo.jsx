import { Box, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/fetch";
import { ChannelHeader, Videos, ErrorToast } from "./";

const ChannelInfo = () => {
	const { channelId } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState("");
	const [channelInfo, setChannelInfo] = useState([]);
	const [tab, setTab] = useState(0);

	useEffect(() => {
		const runner = async () => {
			try {
				const data = await fetchFromApi(
					`channels?id=${channelId}&part=part=snippet%2Cstatistics`
				);
				setChannelInfo(data.items[0]);
			} catch (err) {
				setError(err.message);
				setIsOpen(true);
			}
		};

		if (channelId) runner();
	}, [channelId]);

	const changeTabHandler = (t) => {
		setTab(t);
	};

	return (
		<Box
			sx={{
				flex: 2,
				backgroundColor: "#0f0f0f",
			}}
		>
			<Stack direction="column">
				<ChannelHeader
					bannerImage={
						channelInfo?.brandingSettings?.image?.bannerExternalUrl
					}
					profileImage={channelInfo?.snippet?.thumbnails?.high?.url}
					title={channelInfo?.snippet?.title}
					subscribers={
						channelInfo?.statistics?.hiddenSubscriberCount
							? "hidden"
							: channelInfo?.statistics?.subscriberCount
					}
					onChangeTab={changeTabHandler}
				/>
			</Stack>
			{tab === 0 && (
				<Box p={3}>
					<Videos
						url="search"
						searchQuery="channelId"
						selectedCategory={channelId}
					/>
				</Box>
			)}
			<ErrorToast
				open={isOpen}
				error={error}
				closeHandler={() => {
					setIsOpen((o) => !o);
				}}
			/>
		</Box>
	);
};

export default ChannelInfo;
