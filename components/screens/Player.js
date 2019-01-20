import React from "react";
import { View, ScrollView, Text, Image, AlertIOS } from "react-native";
import { Video } from "expo";

import Hr from "../shared/Hr";
import Header from "../shared/Header";
import FeedList from "../shared/FeedList";
import SearchBar from "../shared/SearchBar";

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
export default class Player extends React.Component {
  state = {
    search: "",
    searching: false,
    feed: dummy_feed,
    loadingQuery: "Searching..",
    url: "",
    video: { title: "Blade Runner", channel: "VSauce" },
    query: ""
  };

  componentDidMount() {
    const { navigation } = this.props;

    const { query } = this.state;

    const url = navigation.getParam("url");
    const video = navigation.getParam("video");

    console.log(url);

    if (url && video) {
      this.setState({ url, video });
    }

    if (query.length > 0) {
      this.search(query);
    }
  }

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
    const { push } = this.props.navigation;

    const { search } = this.state;
    try {
      this.setState({
        searching: true,
        loadingQuery: "Normalizing your video!"
      });

      const data = await videoService.normalize(vid.url);

      if (data.success) {
        const data_search = await youtubeService.search(search);
        this.setState({
          searching: false,
          feed: data_search,
          video: vid,
          url: data.url,
          query: search
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const { searching, feed, loadingQuery, search, url, video } = this.state;

    return (
      <View>
        <Header navigate={navigate} />

        <SearchBar
          search={() => this.search(search)}
          value={search}
          onChangeText={value => this.setState({ search: value })}
        />

        {searching || (
          <ScrollView
            style={styles.feedList}
            showsVerticalScrollIndicator={false}
            style={{ alignSelf: "center" }}
          >
            {url.length > 0 && (
              <View style={{ alignSelf: "center", marginTop: 10 }}>
                <Video
                  source={{ uri: url }}
                  useNativeControls={true}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay={false}
                  style={{
                    width: width / 1.1,
                    height: 500,
                    alignSelf: "center"
                  }}
                />
                <View
                  style={{
                    marginVertical: 15,
                    width: 450
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                    {video.title}
                  </Text>
                  <Text style={{ fontWeight: "500", fontSize: 20 }}>
                    {video.channel}
                  </Text>
                </View>
              </View>
            )}

            <Text style={{ fontWeight: "bold", fontSize: 30 }}>
              Suggestions
            </Text>

            <Hr />

            <FeedList data={feed} normalize={vid => this.normalize(vid)} />
          </ScrollView>
        )}

        {searching && (
          <View
            style={{
              top: height / 7,
              alignSelf: "center",
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
