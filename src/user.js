/* eslint-disable max-len */
// ==UserScript==
// @name            Material Dynmap
// @version         0.2.2
// @description     Material styling for Bukkit's dynmap Minecraft plugin.
// @author          2021, SNDST00M (https://github.com/SNDST00M/)
// @license	        MIT
// @homepage        https://github.com/SNDST00M/material-dynmap/blob/v0.2.2/README.md
// @icon            https://raw.githubusercontent.com/SNDST00M/material-dynmap/v0.2.2/assets/icon.png
// @updateURL       https://raw.githubusercontent.com/SNDST00M/material-dynmap/main/src/user.js
// @downloadURL     https://raw.githubusercontent.com/SNDST00M/material-dynmap/main/src/user.js
// @include         *://*/*
// @exclude         *://*.google.*
// @exclude         *://*.youtube.*
// @exclude         *://*.bing.*
// @exclude         *://*.msn.*
// @exclude         *://*.live.*
// @exclude         *://*.amazon.*
// @exclude         *://*.ebay.*
// @exclude         *://*.gmarket.*
// @exclude         *://*.gittigidiyor.*
// @exclude         *://*.yahoo.*
// @exclude         *://*.wikipedia.*
// @exclude         *://*.live.*
// @exclude         *://*.reddit.*
// @exclude         *://*.netflix.*
// @exclude         *://*.microsoft.*
// @exclude         *://*.office.*
// @exclude         *://*.instagram.*
// @exclude         *://*.twitch.*
// @exclude         *://vimeo.com
// @exclude         *://*.dailymotion.com
// @exclude         *://bilibili.com
// @exclude         *://*.bilibili.com
// @exclude         *://*.nicovideo.jp
// @exclude         *://*.myshopify.*
// @exclude         *://*.naver.*
// @exclude         *://*.zoom.*
// @exclude         *://*.csdn.*
// @exclude         *://*.ebay.*
// @exclude         *://*.twitter.*
// @exclude         *://*.apple.*
// @exclude         *://discord.com/*
// @exclude         *://*.slack.com/*
// @exclude         *://*.whatsapp.com/*
// @exclude         *://*.skype.com/*
// @exclude         *://*.telegram.org/*
// @exclude         *://*.tumblr.com/*
// @exclude         *://*.steampowered.com/*
// @exclude         *://steamcommunity.com/*
// @exclude         *://github.com/*
// @exclude         *://*.gitlab.com/*
// @exclude         *://*.vk.*
// @exclude         *://*.yy.*
// @exclude         *://*.baidu.*
// @exclude         *://*.qq.*
// @exclude         *://*.sohu.*
// @exclude         *://*.facebook.*
// @exclude         *://*.taobao.*
// @exclude         *://*.360.*
// @exclude         *://*.jd.*
// @exclude         *://*.weibo.*
// @exclude         *://*.sina.*
// @exclude         *://*.xinhuanet.*
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

	if (window.materialDynmap || window.document.getElementbyId("#material-dynmap-script")) {
		return;
	}
	window.materialDynmap = true;

	if (window.materialDynmapHandle) {
		window.clearInterval(window.materialDynmapHandle);
		delete window.materialDynmapHandle;
	}

	if (new window.URLSearchParams(window.location.search).get("nogui") === "true") {
		return;
	}

	if (login) {
		const loginStyle = GM_addElement("link", {
			href: "https://cdn.jsdelivr.net/npm/material-dynmap@0.2.2/src/login.css",
			rel: "stylesheet"
		});
		loginStyle.id = "material-dynmap-login-style";
		const materialDynmapLoaded = new CustomEvent("material-dynmap.load", {
			bubbles: true,
			detail: { login: true }
		});
		window.document.dispatchEvent(materialDynmapLoaded);
	} else {
		const style = GM_addElement("link", {
			href: "https://cdn.jsdelivr.net/npm/material-dynmap@0.2.2/src/main.css",
			media: "not all",
			rel: "stylesheet"
		});
		style.id = "material-dynmap-style";

		const script = GM_addElement("script", {
			src: "https://cdn.jsdelivr.net/npm/material-dynmap@0.2.2/src/app.js",
			type: "text/javascript"
		});
		script.id = "material-dynmap-script";
	}

	window.document.head
		.querySelector("link[rel='icon']")
		.href = "https://cdn.jsdelivr.net/npm/material-dynmap@0.2.2/assets/icon.ico";
}));
