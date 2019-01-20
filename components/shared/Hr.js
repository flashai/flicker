import React from "react";
import { View } from "react-native";

const Dimensions = require("Dimensions");
const { width, height } = Dimensions.get("window");

const Hr = () => {
  return (
    <View
      style={{
        marginTop: 10,
        borderBottomColor: "#DEDEDE",
        borderBottomWidth: 1,
        width: width / 1.1
      }}
    />
  );
};

export default Hr;
