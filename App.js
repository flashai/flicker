import { createStackNavigator, createAppContainer } from "react-navigation";

import FeedScreen from "./components/screens/Feed";
import PlayerScreen from "./components/screens/Player";
import LoginScreen from "./components/screens/Login";

const Navigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Feed: { screen: FeedScreen },
    Player: { screen: PlayerScreen }
  },
  {
    initialRouteName: "Feed",
    headerMode: "none",
    navigationOptions: { swipeEnabled: true, gesturesEnabled: true }
  }
);

const App = createAppContainer(Navigator);

export default App;
