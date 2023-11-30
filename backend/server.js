const express = require("express");
const app = express();

app.use(express.json()); // NE PAS OUBLIER !!!

// inclu toutes les routes qui ont été définies
const routes = require("./controller/routes/routes.js")
routes(app);

// démarre le serveur
const port = 3000;
const serverListener = app.listen(port, () => {
  console.log(`server Up ! and listening on port ${port}`);
});

module.exports = {
  server: app,
  serverListener: serverListener,
}