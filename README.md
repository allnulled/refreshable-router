# refreshable-router

Refreshable express router.

## Installation

`$ npm i -s refreshable-router`

## Why

To be able to create `express` routers that are able to refresh themselves.

## How to use it

It is very simple:

  - You create the main `express` `app` (or router).
  - You create a new `refreshable-router` from the created `app`.
  - You define the function that mounts all the routes in our `express` app (or router).
  - You set that function as the `mounter` (using method `setMounter`) of the `refreshable-router` instance.
  - You call `refresh` for the app to mount our routes by the `mounter`.
  - Once here, your `refreshable-router` instance can call to `refresh` to automatically refresh the routes.
  - Also, you can change the `mounter` (using method `setMounter`) to change the function that mounts the routes.

That is all.

*Note that this is a snippet of less than 40 lines only, but does what it promises.*

## Demo

This example demonstrates that this router can be self-refreshed with `setInterval`.

This is demonstrated because each time you to `/` from the browser, you will see how many times it is refreshed.

```js
const express = require("express");
const app = express();
let index = 0;
const routing = require("refreshable-router").create(app).setMounter(router => {
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
```

## Usage

The most typical usage is this:

`/server.js:`

```js
const { app, routing } = require(__dirname + "/app.js");
const server = app.listen(8000);
routing.refresh();
module.exports = { app, routing, server };
```

`/app.js:`

```js
const express = require("express");
const app = express();
const routing = require("refreshable-router").create(app).setMounter(require(__dirname + "/routes.js"));
module.exports = { app, routing };
```

`/routes.js:`

```js
module.exports = function(router) {
	// Here your routes, loaded dynamically when `routing.refresh()` is called.
	router.get("/", (request, response) => {
		response.send("Normal route");
	});
};
```

Which would be run by: `node server.js`.

This is an example of a refreshable router (which does not take advantage of its refreshability, by the way).

## License

This project is licensed under [WTFPL or *do What The Fuck you want to Public License*](https://es.wikipedia.org/wiki/WTFPL).

