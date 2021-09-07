import { remote } from "webdriverio";
import assert from "assert";

const scriptStagingDomain = `https://cdn.jsdelivr.net/gh/SNDST00M/material-dynmap@v0.8.1`;
const userScriptUrl = `${scriptStagingDomain}/src/user.js`
const electronScriptUrl = `${scriptStagingDomain}/src/electron.js`

suite("Userscript Tests", async function() {
	test("./src/user.js", scriptTest.bind({
		loadStrategy: "eager",
		resourceUrl: userScriptUrl
	}));
	test("./src/electron.js", scriptTest.bind({
		loadStrategy: "none",
		resourceUrl: electronScriptUrl
	}));
});

async function scriptTest() {
	browser = await remote({
		capabilities: {
			browserName: "chrome",
			pageloadStrategy: this.loadStrategy
		}
	});

	await browser.url(process.env.CI_ADDRESS);
	await browser.execute(`await import("${userScriptUrl}");`);

	const sidebarBackgroundColor = await $(".sidebar").getCSSProperty("background-color");
	assert.strictEqual(sidebarBackgroundColor, "rgb(33, 33, 33)");
	const chipContainer = await $(".leaflet-chip-container");
	assert(chipContainer.isExisting(), "Chip container does not exist!");
	const typeContainer = await $(".leaflet-type-container");
	assert(typeContainer.isExisting(), "Type container does not exist!");
}
