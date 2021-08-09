/* eslint-env node, browser */
((function(global, boot, factory) {
	if (["interactive", "complete", "loaded"].includes(document.readyState)) {
		boot.call(global, global, factory);
	} else {
		global.document.addEventListener(
			"DOMContentLoaded",
			boot.bind(global, global, factory)
		);
	}
}).call(global, global, function(global, factory) {
	if (![...global.document.body.children].filter(isDynmapContainer).length) {
		return;
	}

	if (document.getElementsByClassName("dynmap").length) {
		factory.call(global, global, false);
		return;
	}

	if (global.document.body.querySelector(":scope > .dynmaplogin")) {
		factory.call(global, global, true);
		return;
	}

	global.materialDynmapHandle = global.setInterval(factory.bind(global, global, false), 100);
	setTimeout(function() {
		if (global.materialDynmapHandle) {
			global.clearInterval(global.materialDynmapHandle);
			delete global.materialDynmapHandle;
		}
	}, 10000);

	function isDynmapContainer(e) {
		return e.tagName.toLowerCase() === "div" && (e.id === "mcmap" || e.className === "dynmaplogin");
	}
}, function(global, login) {
	if (!document.getElementsByClassName("dynmap").length && !login) {
		return;
	}

	if (global.materialDynmap || global.document.getElementById("#material-dynmap-script")) {
		return;
	}
	global.materialDynmap = true;

	if (global.materialDynmapHandle) {
		global.clearInterval(global.materialDynmapHandle);
		delete global.materialDynmapHandle;
	}

	if (new window.URLSearchParams(window.location.search).get("nogui") === "true") {
		return;
	}

	if (login) {
		const loginStyle = global.document.createElement("link");
		loginStyle.setAttribute("rel", "stylesheet");
		loginStyle.href = "https://cdn.jsdelivr.net/npm/material-dynmap@0.4.0/src/login.css";
		loginStyle.id = "material-dynmap-login-style";
		global.document.head.append(loginStyle);
	} else {
		const style = global.document.createElement("link");
		style.setAttribute("rel", "stylesheet");
		style.href = "https://cdn.jsdelivr.net/npm/material-dynmap@0.4.0/src/main.css";
		style.id = "material-dynmap-style";
		style.media = "not all";
		global.document.head.append(style);

		const script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.src = "https://cdn.jsdelivr.net/npm/material-dynmap@0.4.0/src/app.js";
		script.id = "material-dynmap-script";
		global.document.head.appendChild(script);
	}

	global.document.head
		.querySelector("link[rel='icon']")
		.href = "https://cdn.jsdelivr.net/npm/material-dynmap@0.4.0/assets/icon.ico";
}));
