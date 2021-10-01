/* eslint-disable max-len */
const cp = require("child_process");

const shortSHA = process.env.CI
	? process.env.GITHUB_SHORT_SHA
	: cp.execSync("git rev-parse --short HEAD").toString().trim();

const commitMsg = process.env.CI
	? process.env.GITHUB_COMMIT_MSG
	: cp.execSync(`git log --format=%B -n 1 ${shortSHA}`).toString().trim();

exports.capabilities = [
	"Chrome",
	"Edge",
	"Firefox"
].map(function(browser) {
	return {
		os_version: "10",
		resolution: "1024x768",
		browserName: browser,
		browser_version: "latest",
		os: "Windows",
		name: `${browser}: ${commitMsg}`,
		build: `staging/${shortSHA}@${browser.toLowerCase()}`
	};
});

const browserStackAuth = `${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}`;

exports.address = `http://${browserStackAuth}@hub-cloud.browserstack.com/wd/hub`;
