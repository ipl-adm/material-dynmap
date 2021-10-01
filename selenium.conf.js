/* eslint-disable max-len */
const sha = GITHUB_EVENT_NAME === "pull_request"
	? process.env.GITHUB_HEAD_REF
	: process.env.GITHUB_SHA;

const shortSHA = sha.substr(0, 7);

const commitMsg = process.env.GITHUB_COMMIT_MSG;

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
		build: `staging/${shortSHA}-${c.toLowerCase()}`
	};
});

const browserStackAuth = `${process.env.BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}`;

exports.address = `http://${browserStackAuth}@hub-cloud.browserstack.com/wd/hub`;
