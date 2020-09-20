const playlistsRoutes = require("./playlists");

const appRouter = (app, fs) => {
  // Handles empty routes
  app.get("/", (req, res) => {
    res.send("Welcome to the Spotify API server ! 🎵");
  });

  // Playlist route module
  playlistsRoutes(app, fs);
};

module.exports = appRouter;
