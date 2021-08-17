/* eslint-disable max-len */
/* eslint-env browser, greasemonkey */
// ==UserScript==
// @name            Material Dynmap
// @version         0.6.1
// @description     Material styling for Bukkit's dynmap Minecraft plugin.
// @author          2021, SNDST00M (https://github.com/SNDST00M/)
// @license	        MIT
// @homepage        https://github.com/SNDST00M/material-dynmap/blob/v0.6.1/README.md
// @icon            https://cdn.jsdelivr.net/gh/SNDST00M/material-dynmap@v0.6.1/assets/icon.png
// @updateURL       https://cdn.jsdelivr.net/gh/SNDST00M/material-dynmap/src/user.js
// @downloadURL     https://cdn.jsdelivr.net/gh/SNDST00M/material-dynmap/src/user.js
// @include         *://*/*
// @exclude         *://*.google.*
// @exclude         *://*.youtube.*
// @exclude         *://*.bing.*
// @exclude         *://*.msn.*
// @exclude         *://*.yahoo.*
// @exclude         *://*.naver.*
// @exclude         *://*.csdn.*
// @exclude         *://*.live.*
// @exclude         *://*.amazon.*
// @exclude         *://*.netflix.*
// @exclude         *://*.ebay.*
// @exclude         *://*.gmarket.*
// @exclude         *://*.gittigidiyor.*
// @exclude         *://*.myshopify.*
// @exclude         *://*.microsoft.*
// @exclude         *://*.office.*
// @exclude         *://*.zoom.*
// @exclude         *://*.instagram.*
// @exclude         *://twitter.*
// @exclude         *://*.reddit.*
// @exclude         *://*.twitch.*
// @exclude         *://vimeo.com
// @exclude         *://*.dailymotion.com
// @exclude         *://bilibili.com
// @exclude         *://*.bilibili.com
// @exclude         *://*.nicovideo.jp
// @exclude         *://*.apple.*
// @exclude         *://tidal.*
// @exclude         *://*.spotify.*
// @exclude         *://*.pandora.*
// @exclude         *://soundcloud.*
// @exclude         *://*.mixcloud.*
// @exclude         *://*.shazam.*
// @exclude         *://*.bandcamp.*
// @exclude         *://genius.*
// @exclude         *://*.musixmatch.*
// @exclude         *://*.whosampled.*
// @exclude         *://groovesharks.*
// @exclude         *://*.discogs.*
// @exclude         *://*.last.fm
// @exclude         *://*.beatport.*
// @exclude         *://discord.com/*
// @exclude         *://*.slack.com/*
// @exclude         *://*.whatsapp.com/*
// @exclude         *://*.skype.com/*
// @exclude         *://*.telegram.org/*
// @exclude         *://*.tumblr.com/*
// @exclude         *://*.steampowered.com/*
// @exclude         *://steamcommunity.com/*
// @exclude         *://*.wikipedia.*
// @exclude         *://*.fandom.*
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
// @grant           none
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
}(window, function(window, login) {
	if (!window.DynMap && !login) {
		return;
	}

	if (window.materialDynmap || window.document.getElementById("#material-dynmap-script")) {
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
		const loginStyle = window.document.createElement("link");
		loginStyle.setAttribute("rel", "stylesheet");
		loginStyle.href = "https://cdn.jsdelivr.net/npm/material-dynmap@0.6.1/src/login.css";
		loginStyle.id = "material-dynmap-login-style";
		loginStyle.addEventListener("load", function() {
			const materialDynmapLoaded = new CustomEvent("material-dynmap.load", {
				bubbles: true,
				detail: { login: true }
			});
			window.document.dispatchEvent(materialDynmapLoaded);
		});
		window.document.head.append(loginStyle);
		return;
	} else {
		const style = window.document.createElement("link");
		style.setAttribute("rel", "stylesheet");
		style.href = "https://cdn.jsdelivr.net/npm/material-dynmap@0.6.1/src/main.css";
		style.id = "material-dynmap-style";
		window.document.head.append(style);

		const script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.id = "material-dynmap-app";
		script.src = "https://cdn.jsdelivr.net/npm/material-dynmap@0.6.1/src/app.js";
		window.document.head.appendChild(script);
	}

	window.document.head
		.querySelector("link[rel='icon']")
		.href = "https://cdn.jsdelivr.net/npm/material-dynmap@0.6.1/assets/icon.ico";
}));
