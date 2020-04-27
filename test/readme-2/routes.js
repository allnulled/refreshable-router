module.exports = function(router) {
	router.get("/", (request, response) => {
		response.send("Normal route");
	});
};