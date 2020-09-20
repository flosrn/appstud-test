const playlistsRoutes = (app, fs) => {
  const playlistsDataPath = "./data/playlists.json";
  const playlistDetailDataPath = "./data/playlistDetail.json";

  app.get("/v1/playlists/:id", (req, res) => {
    fs.readFile(playlistDetailDataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      // const result = JSON.parse(data).playlists.items.filter(
      //   (item) => item.id === req.params.id
      // );

      res.send(data);
    });
  });

  app.get("/v1/browse/featured-playlists", (req, res) => {
    fs.readFile(playlistsDataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });
};

module.exports = playlistsRoutes;
