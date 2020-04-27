const express = require("express");

class RefreshableRouter {

	static create(...args) {
		return new this(...args);
	}

	constructor(app) {
		this.routerConnector = (...args) => this.router(...args);
		this.router = express.Router();
		app.use(this.routerConnector);
	}

	setMounter(mounter) {
		this.mounter = mounter;
		return this;
	}

	async refresh() {
		try {
			const router = new express.Router();
			await this.mounter(router);
			this.router = router;
		} catch(error) {
			console.error("Error refreshing router:", error);
			throw error;
		}
	}

}

module.exports = RefreshableRouter;