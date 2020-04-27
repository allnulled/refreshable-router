const express = require("express");
const app = express();
let index = 0;
const routing = require(__dirname + "/index.js").create(app).setMounter(router => {
	++index;
	router.get("/", (req, res) => {
		res.send("Times refreshed: " + (index));
	});
});
app.listen(8001);
routing.refresh().then(() => {
	console.log("The router was mounted successfully!");
	setInterval(routing.refresh.bind(routing), 3000);
});