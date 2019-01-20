import React from "react";
import { View, AsyncStorage, Image, Text, AlertIOS } from "react-native";

import Hr from "../shared/Hr";
import Header from "../shared/Header";
import FeedList from "../shared/FeedList";
import SearchBar from "../shared/SearchBar";

import feedService from "../../services/feed";
import videoService from "../../services/video";
import youtubeService from "../../services/youtube";

const Dimensions = require("Dimensions");
const { width, height } = Dimensions.get("window");

import styles from "../../styles";

const dummy_feed = [
  {
    url: "https://www.youtube.com/watch?v=gCcx85zbxz4&t=1s",
    title: "BLADE RUNNER 2049 - Official Trailer",
    channel: "YouTube Movies",
    thumbnail:
      "https://i.kinja-img.com/gawker-media/image/upload/s--xc3DUPyM--/c_scale,f_auto,fl_progressive,q_80,w_800/pxjocvpnxxv3jhvrbeto.jpg"
  },
  {
    url: "https://www.youtube.com/watch?v=GOPrG1QH_2U",
    title: "Blade Runner Blues - Rain 1 Hour",
    channel: "Cole Phelps",
    thumbnail: "https://i.imgur.com/IbKkgCp.jpg"
  },
  {
    url: "https://www.youtube.com/watch?v=XYdc9butRXI",
    title: "Blade Runner 2049 - Soundtrack - Hans Zimmer & Benjamin Wallfisch",
    channel: "BEST SOUNDTRACKS",
    thumbnail:
      "https://img2.akspic.com/image/72922-night-art-city-camera-safety-1920x1080.jpg"
  },
  {
    url: "https://www.youtube.com/watch?v=RScZrvTebeA",
    title: "Blade Runner Blues - Vangelis - 1982 - [HD]",
    channel: "Peaches Lamb",
    thumbnail:
      "http://yesofcorsa.com/wp-content/uploads/2018/08/Blade-Runner-Black-Out-2022-High-Quality-Wallpaper.jpg"
  }
];

export default class Feed extends React.Component {
  state = {
    search: "",
    searching: false,
    feed: dummy_feed,
    loadingQuery: "Searching.."
  };

  async componentDidMount() {
    try {
      const { navigate } = this.props.navigation;
      const token = await AsyncStorage.getItem("GOOGLE_TOKEN");

      token || navigate("Login");

      this.setState({ search: "", searching: false });

      // this.setState({ searching: true, loadingQuery: "flash.ai" });

      // const queries = ["MLH Hackathon", "MHacks", "Major League Hacking"];
      // var randomQuery = queries[Math.floor(Math.random() * queries.length)];

      // this.search(randomQuery);
    } catch (e) {
      console.log(e);
    }
  }

  read = async token => {
    try {
      const data = await feedService.read(token);
    } catch (e) {
      console.log(e);
    }
  };

  search = async query => {
    try {
      if (query.length != 0) {
        this.setState({ searching: true });
        const data = await youtubeService.search(query);

        this.setState({ searching: false, feed: data });
        return;
      } else {
        AlertIOS.alert("flash.ai", "Search result cannot be empty.");
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  normalize = async vid => {
    const { navigate } = this.props.navigation;

    const { search } = this.state;
    try {
      this.setState({
        searching: true,
        loadingQuery: "Normalizing your video!"
      });

      const data = await videoService.normalize(vid.url);

      if (data.success) {
        this.setState({ searching: false });
        navigate("Player", { video: vid, url: data.url, query: search });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { searching, feed, loadingQuery, search } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.feed}>
        {/* Header */}
        <Header navigate={navigate} />
        <Hr />

        {/* SearchBar */}
        <SearchBar
          search={() => this.search(search)}
          value={search}
          onChangeText={value => this.setState({ search: value })}
        />

        {/* Feed */}

        {searching || (
          <FeedList data={feed} normalize={vid => this.normalize(vid)} />
        )}

        {searching && (
          <View
            style={{
              position: "absolute",
              top: height / 4,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 35 }}>
              {loadingQuery}
            </Text>
            <Image
              source={require("../../assets/loader.gif")}
              style={{ height: 100, width: 250 }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>one sec..</Text>
          </View>
        )}
      </View>
    );
  }
}
