/* eslint-disable max-len */
/* global GM_addElement */
// ==UserScript==
// @name            Material Dynmap
// @version         0.1.0
// @description     Material styling for Bukkit's dynmap Minecraft plugin.
// @author          2021, SNDST00M (https://github.com/SNDST00M/)
// @license	        MIT
// @homepage        https://github.com/SNDST00M/material-dynmap/blob/v0.1.0/README.md
// @icon            https://raw.githubusercontent.com/SNDST00M/material-dynmap/v0.1.0/assets/icon.png
// @updateURL       https://raw.githubusercontent.com/SNDST00M/material-dynmap/main/src/user.js
// @downloadURL     https://raw.githubusercontent.com/SNDST00M/material-dynmap/main/src/user.js
// @include         *://*/*
// @exclude         *://*.(google|youtube|bing|msn|live|amazon|yahoo|wikipedia|live|reddit|netflix|microsoft|office|instagram|twitch|myshopify|naver|zoom|csdn|ebay|twitter|yy|apple|vk|baidu|qq|sohu|facebook|taobao|360|jd|weibo|sina|xinhuanet).*
// @grant           GM_addElement
// ==/UserScript==
(function(window, factory) {
	if (![...window.document.body.children].filter(isDynmapContainer).length) {
		return;
	}

	if (window.DynMap) {
		factory.call(window, window, false);
		return;
	}

	if (window.document.body.querySelector(":scope > .dynmaplogin")) {
		factory.call(window, window, true);
		return;
	}

	window.materialDynmapHandle = window.setInterval(factory.bind(window, window, false), 100);
	setTimeout(function() {
		if (window.materialDynmapHandle) {
			window.clearInterval(window.materialDynmapHandle);
			delete window.materialDynmapHandle;
		}
	}, 10000);

	function isDynmapContainer(e) {
		return e.tagName.toLowerCase() === "div" && (e.id === "mcmap" || e.className === "dynmaplogin");
	}
}(this.unsafeWindow, function(window, login) {
	if (!window.DynMap && !login) {
		return;
	}

	if (window.materialDynmapHandle) {
		window.clearInterval(window.materialDynmapHandle);
		delete window.materialDynmapHandle;
	}

	if (login) {
		GM_addElement("link", {
			href: "https://unpkg.com/material-dynmap@0.1.1/src/login.css",
			id: "material-dynmap-login-style",
			rel: "stylesheet"
		});
		return;
	}

	GM_addElement("link", {
		href: "https://unpkg.com/material-dynmap@0.1.1/src/main.css",
		id: "material-dynmap-style",
		media: "not all",
		rel: "stylesheet"
	});

	GM_addElement("script", {
		id: "material-dynmap-script",
		src: "https://unpkg.com/material-dynmap@0.1.1/src/app.js",
		type: "text/javascript"
	});

	document.head.querySelector("link[rel='icon']").href = "https://unpkg.com/material-dynmap@0.1.1/assets/icon.ico";
}));
