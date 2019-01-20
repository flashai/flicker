import axios from "react-native-axios";
import config from "./config";

const fi = axios.create({ baseURL: config.YOUTUBE_URL, timeout: 5000000 });

async function read(token) {
  const options = {
    channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
    maxResults: "25",
    part: "snippet,contentDetails",
    mine: true
  };

  const { data } = await fi.get(
    `/videos?part=snippet&myRating=like&order=rating&key=${config.GOOGLE_CLIENT_ID_IOS}`
  );

  return data;
}
export default { read };
