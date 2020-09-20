import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { StackScreenProps } from "@react-navigation/stack";
import { Playlists } from "../models/Playlists";

const API_ENDPOINT = "http://localhost:3001";

type RootStackParamList = {
  Playlists: undefined;
  PlaylistDetail: { id: string };
};

type Props = StackScreenProps<RootStackParamList, "Playlists">;

export default function PlaylistsScreen({ navigation }: Props) {
  const [playlists, setPlaylists] = React.useState<Playlists[]>([]);
  const [selectedId, setSelectedId] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${API_ENDPOINT}/v1/browse/featured-playlists`
      );
      setPlaylists(response.data.playlists.items);
    };
    fetchData();
  });

  // console.log("playlists : ", JSON.stringify(playlists));

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate("PlaylistDetail", { id: item.id });
        }}
      >
        <View style={styles.cover}>
          <Image
            source={{ uri: item.images[0].url }}
            style={{ width: 145, height: 145 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editor's picks</Text>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <FlatList
            data={playlists}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            numColumns={2}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191414",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },
  cover: {
    paddingLeft: 20,
    paddingTop: 10,
  },
});
