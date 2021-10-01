/* eslint-env node, mocha */
const webdriver = require("selenium-webdriver");
const conf = require("../selenium.conf");
const assert = require("assert");

const scriptStagingDomain = "https://cdn.jsdelivr.net/gh/SNDST00M/material-dynmap@v0.8.1";
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

/**
 * @param {Mocha.Done} done
 */
async function scriptTest() {
	const driver = await new webdriver.Builder()
		.usingServer(conf.address)
		.withCapabilities(this.capability)
		.build();

	await driver.get(process.env.CI_ADDRESS);
	await driver.executeAsyncScript(function() {
		const promise = new Promise(function(resolve, reject) {
			window.document.addEventListener(
				"material-dynmap.load",
				resolve.bind(this, true)
			);
			setTimeout(reject.bind(this, false), 10000);
		});
		import(`${userScriptUrl}`);
		return promise;
	});

	const sidebarColor = await driver.findElement(By.css("#mcmap .sidebar")).getCssValue("background-color");
	assert.strictEqual(sidebarColor, "rgb(33, 33, 33)", "Sidebar background not applied");
	const chipContainer = await driver.findElement(By.css("#mcmap .leaflet-chip-container"));
	assert.strictEqual(chipContainer instanceof webdriver.WebElement, true, "Chip component not present");
	const minimapContainer = await driver.findElement(By.css("#mcmap .leaflet-minimap-container"));
	assert.strictEqual(minimapContainer instanceof webdriver.WebElement, true, "Minimap component not present");

	await driver.quit();
}
