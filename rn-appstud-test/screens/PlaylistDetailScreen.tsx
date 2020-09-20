import * as React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import { StackScreenProps } from "@react-navigation/stack";
import { PlaylistDetail, Item, Track } from "../models/PlaylistDetail";
import { Audio } from "expo-av";

const API_ENDPOINT = "http://localhost:3001";

type RootStackParamList = {
  PlaylistDetail: { id: string };
};

type AudioState = {
  isPlaying: boolean;
  playbackInstance: any;
  volume: number;
  isBuffering: boolean;
};

type Props = StackScreenProps<RootStackParamList, "PlaylistDetail">;

export default function PlaylistDetailScreen({ route }: Props) {
  const { id } = route.params;
  const [playlistDetail, setPlaylistDetail] = React.useState<PlaylistDetail>();
  const [track, setTrack] = React.useState<Track>();
  const [audioState, setAudioState] = React.useState<AudioState>({
    isPlaying: false,
    playbackInstance: null,
    volume: 1.0,
    isBuffering: false,
  });

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/v1/playlists/${id}`);
        setPlaylistDetail(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const loadAudio = async (soundUri: string) => {
    if (!soundUri) return;
    audioState?.playbackInstance &&
      (await audioState?.playbackInstance.unloadAsync());

    const playbackInstance = new Audio.Sound();
    try {
      await playbackInstance.loadAsync(
        {
          uri: soundUri,
        },
        {
          shouldPlay: true,
          volume: audioState.volume,
        },
        false
      );
      setAudioState({ ...audioState, playbackInstance, isPlaying: true });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePlayPause = async () => {
    if (audioState?.playbackInstance) {
      setAudioState({
        ...audioState,
        isPlaying: !audioState.isPlaying,
      });
      audioState.isPlaying
        ? await audioState?.playbackInstance?.pauseAsync()
        : await audioState?.playbackInstance?.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      {playlistDetail && (
        <View>
          <View style={styles.header}>
            <Image
              source={{ uri: playlistDetail.images[0].url }}
              style={{ width: 85, height: 85 }}
            />
            <View style={{ paddingLeft: 5 }}>
              <Text style={styles.title}>{playlistDetail.name}</Text>
              <Text style={styles.description}>
                {playlistDetail.description}
              </Text>
            </View>
          </View>
          <ScrollView style={styles.body}>
            {playlistDetail.tracks.items.map((item: Item) => (
              <TouchableOpacity
                key={item.track.id}
                onPress={() => {
                  setTrack(item.track);
                  loadAudio(item.track.preview_url);
                }}
                style={styles.track}
                disabled={!item.track.preview_url}
              >
                <Text
                  style={{
                    color: "#fff",
                    opacity: item.track.preview_url ? 1 : 0.6,
                  }}
                >
                  {item.track.name}
                </Text>
                <Text
                  style={{
                    color: "lightgrey",
                    opacity: item.track.preview_url ? 1 : 0.4,

                    fontSize: 10,
                  }}
                >
                  {item.track?.artists[0]?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {track && (
        <View style={styles.footer}>
          <View style={styles.player}>
            <Text style={styles.playerText}>{track?.name}</Text>
            <Text style={styles.playerAuthor}>{track?.artists[0]?.name}</Text>
          </View>
          <View>
            <View style={styles.buttonPlayPause}>
              <Button
                title={audioState.isPlaying ? "I I" : "▶️"}
                color="#1DB954"
                onPress={handlePlayPause}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191414",
  },
  header: {
    height: "20vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "#1DB954",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    width: "90%",
  },
  description: {
    color: "#fff",
    fontSize: 12,
    width: "90%",
  },
  body: {
    height: "70vh",
    overflow: "hidden",
    paddingLeft: 20,
    backgroundColor: "#191414",
  },
  track: {
    marginTop: 5,
    marginBottom: 5,
  },
  footer: {
    width: "100%",
    height: 50,
    backgroundColor: "#191414",
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#1DB954",
    borderTopWidth: 1,
  },
  player: {
    paddingLeft: 20,
  },
  playerText: {
    color: "#fff",
  },
  playerAuthor: {
    color: "#fff",
    fontSize: 10,
    opacity: 0.7,
  },
  buttonPlayPause: {
    width: 50,
    marginRight: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
