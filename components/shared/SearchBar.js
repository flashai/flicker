import React from "react";

import { View, TextInput, TouchableOpacity, Image } from "react-native";

import styles from "../../styles";

const Dimensions = require("Dimensions");
const { width, height } = Dimensions.get("window");

export default class SearchBar extends React.Component {
  render() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search something cool!"
          placeholderColor="#000"
          onChangeText={value => this.props.onChangeText(value)}
          value={this.props.value}
          style={{
            fontSize: 18,
            borderBottomColor: "#626262",
            borderBottomWidth: 1,
            width: width / 2
          }}
        />
        <TouchableOpacity onPress={() => this.props.search()}>
          <Image
            source={require("../../assets/search.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
