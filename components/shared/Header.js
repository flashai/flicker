import React from "react";

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import styles from "../../styles";

function Header(props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.removeItem("GOOGLE_TOKEN");
          props.navigate("Login");
        }}
      >
        <Image
          source={require("../../assets/icon.png")}
          style={{ height: 35, width: 35 }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigate("Feed")}>
        <Text
          style={{
            color: "#000",
            fontWeight: "bold",
            marginTop: 12,
            fontSize: 25
          }}
        >
          flash.ai
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Header;
