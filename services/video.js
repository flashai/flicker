import axios from "react-native-axios";
import config from "./config";

const vi = axios.create({
  baseURL: config.GLEAM_API,
  timeout: 5000000,
  "Cache-Control": "no-cache"
});

async function normalize(url) {
  const { data } = await vi.post("/normalize", { url });

  return data;
}

export default { normalize };
