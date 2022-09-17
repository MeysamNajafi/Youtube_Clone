import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
	method: "GET",

	headers: {
		"X-RapidAPI-Key": "a465eca166msh45537a8b67cc5f0p13cea1jsna42cf6ffa015",
		// "X-RapidAPI-Key": "32c3988e4fmsh7751036602a6be5p15044cjsn476fe5f80cad",
		"X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
	},
};

export const fetchFromApi = async (url) => {
	try {
		const { data } = await axios.get(`${BASE_URL}/${url}`, options);

		return data;
	} catch (err) {
		throw new Error(err?.response?.data?.message);
	}
};
