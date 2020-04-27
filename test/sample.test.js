const express = require("express");
const app = express();
const RefreshableRouter = require(__dirname + "/index.js");
let index = 0;
const refreshableRouter = new RefreshableRouter(app).setMounter(function(router) {
	index++;
	router.get("/", (req, res) => res.send("Something: " + index));
});

setInterval(refreshableRouter.refresh.bind(refreshableRouter), 5000);

app.listen(8001);

