import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PlaylistsScreen from "./screens/PlaylistsScreen";
import PlaylistDetailScreen from "./screens/PlaylistDetailScreen";
import "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Playlists" component={PlaylistsScreen} />
        <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
