const express = require("express");
const app = express();
const routing = require(__dirname + "/../../index.js").create(app).setMounter(require(__dirname + "/routes.js"));
module.exports = { app, routing };