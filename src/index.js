/* eslint-env browser */
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
}(this, function(window, login) {
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
		loginStyle.href = "https://cdn.jsdelivr.net/npm/material-dynmap@0.41/src/login.css";
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
		style.href = "https://cdn.jsdelivr.net/npm/material-dynmap@0.41/src/main.css";
		style.id = "material-dynmap-style";
		style.media = "not all";
		window.document.head.append(style);

		const script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.id = "material-dynmap-script";
		script.src = "https://cdn.jsdelivr.net/npm/material-dynmap@0.41/src/app.js";
		window.document.head.appendChild(script);
	}

	window.document.head
		.querySelector("link[rel='icon']")
		.href = "https://cdn.jsdelivr.net/npm/material-dynmap@0.41/assets/icon.ico";
}));
