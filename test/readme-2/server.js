const { app, routing } = require(__dirname + "/app.js");
const server = app.listen(8002);
routing.refresh();
module.exports = { app, routing, server };