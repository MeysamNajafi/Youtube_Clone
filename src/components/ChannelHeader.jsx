import { CheckCircle } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { demoProfilePicture } from "../utils/consts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}
const DEFAULT_BANNER =
	"https://yt3.ggpht.com/kvYtOOlIxxS5m5nZ7d3EVznB86-hmUlCq-0s_TJHt1uS8eehxj-wEV1aU6vQcFtiQoPAqdQ-";

const ChannelHeader = ({ bannerImage, profileImage, title, subscribers }) => {
	const [tab, setTab] = React.useState(0);

	const handleChange = (_, newValue) => {
		setTab(+newValue);
	};

	return (
		<Stack direction="column">
			<Box
				sx={{
					width: "100%",
					height: "calc((100vw - 240px)/6.2 - 1px)",
					backgroundPosition: "center !important",
					backgroundSize: "cover !important",
					backgroundRepeat: "no-repeat !important",
					background: `url(${bannerImage || DEFAULT_BANNER})`,
				}}
			></Box>
			<Box sx={{ background: "#181818" }}>
				<Container>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						py={3}
					>
						<Stack direction="row" gap={2} alignItems="center">
							<Box
								sx={{
									width: "85px",
									height: "85px",
									borderRadius: "50%",
									backgroundPosition: "center",
									backgroundSize: "contain !important",
									backgroundRepeat: "no-repeat",
									background: `url(${
										profileImage || demoProfilePicture
									})`,
								}}
							></Box>

							<div>
								<Typography variant="h5" color="white">
									{title}
									<CheckCircle
										sx={{
											fontSize: 16,
											color: "rgb(170,170,170)",
											ml: "5px",
										}}
									/>
								</Typography>
								<Typography
									variant="subtitle2"
									color="rgb(170,170,170)"
								>
									{subscribers === "hidden"
										? "hidden"
										: `${parseInt(
												subscribers
										  ).toLocaleString()} subscribers`}
								</Typography>
							</div>
						</Stack>
						<Button
							onClick={() => alert("Subscribe API is down")}
							color="error"
							variant="contained"
						>
							Subscribe
						</Button>
					</Stack>
					<Box sx={{ width: "100%" }}>
						<Box>
							<Tabs value={tab} onChange={handleChange}>
								<Tab
									sx={{ color: "white" }}
									label="Videos"
									{...a11yProps(0)}
								/>
								<Tab
									sx={{ color: "white" }}
									label="About"
									{...a11yProps(1)}
								/>
							</Tabs>
						</Box>
					</Box>
				</Container>
			</Box>
			<TabPanel value={tab} index={0}>
				Videos
			</TabPanel>
			<TabPanel value={tab} index={1}>
				About
			</TabPanel>
		</Stack>
	);
};

export default ChannelHeader;
