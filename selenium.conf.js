/* eslint-disable max-len */
const cp = require("child_process");

exports.github = {};
exports.github.sha = process.env.CI
	? process.env.GITHUB_SHORT_SHA
	: cp.execSync("git rev-parse --short HEAD").toString().trim();
exports.github.msg = process.env.CI
	? process.env.GITHUB_COMMIT_MSG
	: cp.execSync(`git log --format=%B -n 1 ${exports.github.sha}`).toString().trim()

exports.capabilities = [
	"Chrome",
	"Edge",
	"Firefox"
].map(function(browser) {
	return {
		browserName: browser,
		browser_version: "latest",
		build: `staging/${exports.github.sha}@${browser.toLowerCase()}`,
		name: `${browser}: ${exports.github.msg}`,
		os: "Windows",
		os_version: "10",
		resolution: "1024x768"
	};
});

const browserStackAuth = `${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}`;

exports.address = `http://${browserStackAuth}@hub-cloud.browserstack.com/wd/hub`;
