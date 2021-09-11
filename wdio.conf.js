/* eslint-disable max-len */
exports.browsers = ["chrome", "firefox"];

exports.config = {
	afterTest(_1, _2, tests) {
		if (tests.passed) {
			browser.executeScript("browserstack_executor: { \"action\": \"setSessionStatus\",\"arguments\": { \"status\": \"passed\",\"reason\": \"Assertions passed\" } }");
		} else {
			browser.executeScript("browserstack_executor: {\"action\": \"setSessionStatus\",\"arguments\": { \"status\": \"failed\",\"reason\": \"At least 1 assertion failed\" } }");
		}
	},
	baseUrl: "",
	capabilities: exports.browsers.map(function(b) {
		return { browserName: b };
	}),
	coloredLogs: true,
	connectionRetryCount: 3,
	connectionRetryTimeout: 90000,
	exclude: [],
	framework: "mocha",
	host: "hub.browserstack.com",
	key: process.env.BROWSERSTACK_ACCESS_KEY,
	logLevel: "warn",
	mochaOpts: {
		timeout: 60000,
		ui: "tdd"
	},
	screenshotPath: "./errorShots/",
	services: ["selenium-standalone"],
	specs: ["test/**"],
	user: process.env.BROWSERSTACK_USERNAME,
	waitforTimeout: 30000
};
