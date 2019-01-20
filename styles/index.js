import { StyleSheet } from "react-native";

const Dimensions = require("Dimensions");
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginImage: {
    height: 500,
    width: 500,
    position: "absolute",
    transform: [{ rotate: "20deg" }]
  },
  loginButton: {
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#478AFF",
    borderRadius: 50,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 250,
    marginLeft: 80
  },

  /* ----------------------- */

  header: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 30
  },

  /* ----------------------- */

  searchBar: {
    marginVertical: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 35
  },

  /* ----------------------- */
  feed: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  feedThumbnail: {
    width: width / 1.1,
    height: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    resizeMode: "cover",
    marginBottom: 10
  },
  feedList: {
    marginTop: 15,
    marginBottom: 50
  },
  feedThumbnailContainer: {
    marginBottom: 20
  }
});
