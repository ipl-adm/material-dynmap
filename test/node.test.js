/* eslint-env node, mocha */
const assert = require("assert");
const webdriver = require("selenium-webdriver");
const conf = require("../selenium.conf");

const scriptStagingDomain = `https://cdn.jsdelivr.net/gh/SNDST00M/material-dynmap@staging/${conf.github.sha}`;
const userScriptUrl = `${scriptStagingDomain}/src/user.js`;
const electronScriptUrl = `${scriptStagingDomain}/src/electron.js`;

conf.capabilities.forEach(function(cap) {
	suite(`${cap.browserName} Tests`, function() {
		this.timeout(30000);
		test("./src/user.js", scriptTest.bind({
			capability: cap,
			loadStrategy: "eager",
			resourceUrl: userScriptUrl
		}));
		test("./src/electron.js", scriptTest.bind({
			capability: cap,
			loadStrategy: "none",
			resourceUrl: electronScriptUrl
		}));
	});
});

async function scriptTest() {
	this.capability.pageLoadStrategy = this.loadStrategy;
	const driver = await new webdriver.Builder()
		.usingServer(conf.address)
		.withCapabilities(this.capability)
		.build();

	await driver.get(process.env.CI_ADDRESS);
	driver.executeAsyncScript(`
	const callback = arguments[arguments.length - 1];
	window.addEventListener("material-dynmap.load", callback);
	const materialScript = document.createElement("script");
	materialScript.setAttribute("src", "${this.resourceUrl}");
	window.document.head.appendChild(materialScript);
	`);

	const sidebarColor = await driver.findElement(webdriver.By.css("#mcmap .sidebar")).getCssValue("background-color");
	assert.strictEqual(/\(33, 33, 33\b/.test(sidebarColor), true, "Sidebar background not applied");
	const chipContainer = await driver.findElement(webdriver.By.css("#mcmap .leaflet-chip-container"));
	assert.strictEqual(chipContainer instanceof webdriver.WebElement, true, "Chip component not present");
	const minimapContainer = await driver.findElement(webdriver.By.css("#mcmap .leaflet-minimap-container"));
	assert.strictEqual(minimapContainer instanceof webdriver.WebElement, true, "Minimap component not present");

	await driver.quit();
}
