/* eslint-env node, mocha */
const webdriverio = require("webdriverio");
const assert = require("assert");

webdriverio.remote({
	capabilities: {
		browserName: "chrome",
		pageloadStrategy: this.loadStrategy
	}
}).then(function(browser) {
	const scriptStagingDomain = "https://cdn.jsdelivr.net/gh/SNDST00M/material-dynmap@v0.8.1";
	const userScriptUrl = `${scriptStagingDomain}/src/user.js`;
	const electronScriptUrl = `${scriptStagingDomain}/src/electron.js`;

	suite("Userscript Tests", function() {
		this.timeout(20000);
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
	function scriptTest(done) {
		browser.url(process.env.CI_ADDRESS).then(function() {
			browser.execute(`;(function() {
				const promise = new Promise();
				window.document.addEventListener("material-dynmap.load", promise.resolve.bind.promise);
				setTimeout(promise.reject.bind.promise, 5000);
				import("${userScriptUrl}");
				return promise;
			}())`.replace(/^\t\t/g, "")).then(async function() {
				const sidebarBackgroundColor = await $(".sidebar").getCSSProperty("background-color");
				assert.strictEqual(sidebarBackgroundColor, "rgb(33, 33, 33)");
				const chipContainer = await $(".leaflet-chip-container");
				assert(chipContainer.isExisting(), "Chip container does not exist!");
				const typeContainer = await $(".leaflet-type-container");
				assert(typeContainer.isExisting(), "Type container does not exist!");
				done();
			});
		});
	}
});
