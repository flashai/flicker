import axios from "react-native-axios";
import config from "./config";

const yi = axios.create({ baseURL: config.YOUTUBE_URL, timeout: 500000 });

async function search(query) {
  const limit = 30;
  const { data } = await yi.get(
    `/search?part=snippet&order=rating&maxResults=${limit}&q=${query}&key=${
      config.GOOGLE_API_KEY
    }`
  );

  let feed = new Array();

  data.items.map(vid => {
    const title = vid.snippet.title;
    const id = vid.id.videoId;
    const channel = vid.snippet.channelTitle;
    const thumbnail = vid.snippet.thumbnails.high.url;

    if (id) {
      const video = {
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail,
        title,
        channel
      };

      feed.push(video);
    }
  });

  return feed;
}

export default { search };
