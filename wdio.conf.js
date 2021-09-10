/* eslint-disable indent, no-undef */
module.exports = {
	afterTest(_1, _2, tests) {
		if (tests.passed) {
			browser.executeScript(
				"browserstack_executor: { " +
					'"action": "setSessionStatus",' +
					'"arguments": { ' +
						'"status": "passed",' +
						'"reason": "Assertions passed" ' +
					"} " +
				"}"
			);
		} else {
			browser.executeScript(
				"browserstack_executor: {" +
					'"action": "setSessionStatus",' +
					'"arguments": { ' +
						'"status": "failed",' +
						'"reason": "At least 1 assertion failed" ' +
					"} " +
				"}"
			);
		}
	},
	baseUrl: "",
	capabilities: [{
		browserName: "chrome",
		build: `staging/${process.env.GITHUB_SHA.substring(0, 7)}`,
		name: "Browser Tests"
	}],
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
	specs: ["./tests/node.test.js"],
	user: process.env.BROWSERSTACK_USERNAME,
	waitforTimeout: 30000
};
