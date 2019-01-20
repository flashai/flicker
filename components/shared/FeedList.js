import React from "react";

import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking
} from "react-native";

import styles from "../../styles";

export default class FeedList extends React.Component {
  render() {
    const data = this.props.data;

    return (
      <ScrollView style={styles.feedList} showsVerticalScrollIndicator={false}>
        {data.map((vid, index) => (
          <View key={index} style={styles.feedThumbnailContainer}>
            <TouchableOpacity onPress={() => Linking.openURL(vid.url)}>
              <Image
                source={{ uri: vid.thumbnail }}
                style={styles.feedThumbnail}
              />
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View style={{ width: 450 }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 30 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {vid.title}
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 20 }}>
                  {vid.channel}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity onPress={() => Linking.openURL(vid.url)}>
                  <Image
                    source={require("../../assets/youtube.png")}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.normalize(vid)}>
                  <Image
                    source={require("../../assets/icon_purple.png")}
                    style={{ height: 30, width: 30, marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}
