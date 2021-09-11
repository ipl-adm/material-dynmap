/* eslint-env node, mocha */
const { remote } = require("webdriverio");
const { config } = require("../wdio.conf");
const assert = require("assert");

const scriptStagingDomain = "https://cdn.jsdelivr.net/gh/SNDST00M/material-dynmap@v0.8.1";
const userScriptUrl = `${scriptStagingDomain}/src/user.js`;
const electronScriptUrl = `${scriptStagingDomain}/src/electron.js`;

suite("Userscript Tests", function() {
	this.timeout(30000);
	test("./src/user.js", scriptTest.bind({
		loadStrategy: "eager",
		resourceUrl: userScriptUrl
	}));
	test("./src/electron.js", scriptTest.bind({
		loadStrategy: "none",
		resourceUrl: electronScriptUrl
	}));
});

/**
 * @param {Mocha.Done} done
 */
async function scriptTest() {
	const browser = await remote({ capabilities: config.capabilities });

	await browser.url(process.env.CI_ADDRESS);
	await browser.execute(function(url) {
		const promise = new Promise(function(resolve, reject) {
			window.document.addEventListener(
				"material-dynmap.load",
				resolve.bind(this, true)
			);
			setTimeout(reject.bind(this, false), 10000);
		});
		import(`${url}`);
		return promise;
	}, userScriptUrl);

	const chipContainer = await browser.$(".leaflet-chip-container");
	assert(chipContainer.isExisting(), "Chip container does not exist!");
	const typeContainer = await browser.$(".leaflet-type-container");
	assert(typeContainer.isExisting(), "Type container does not exist!");

	browser.closeWindow();

	return true;
}
