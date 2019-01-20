import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Google } from "expo";

import config from "../../services/config";

import styles from "../../styles";

export default class Login extends React.Component {
  async componentDidMount() {
    try {
      const { navigate } = this.props.navigation;
      const token = await AsyncStorage.getItem("GOOGLE_TOKEN");

      token && navigate("Feed");
    } catch (e) {
      console.log(e);
    }
  }

  signIn = async () => {
    const { navigate } = this.props.navigation;

    try {
      const google_options = {
        iosClientId: config.GOOGLE_CLIENT_ID_IOS,
        scopes: ["profile"],
        behavior: "web"
      };

      const result = await Google.logInAsync(google_options);

      await AsyncStorage.setItem("GOOGLE_TOKEN", result.accessToken);
      navigate("Feed");
    } catch (e) {
      console.log("error", e);
    }
  };

  render() {
    return (
      <View style={styles.login}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.loginImage}
        />

        <TouchableOpacity onPress={this.signIn} style={styles.loginButton}>
          <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>
            Sign in with Google
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            position: "absolute",
            bottom: 15,
            right: 20
          }}
        >
          flash.ai
        </Text>
      </View>
    );
  }
}
