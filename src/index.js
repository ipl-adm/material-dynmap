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

	if (window.materialDynmapHandle) {
		window.clearInterval(window.materialDynmapHandle);
		delete window.materialDynmapHandle;
	}

	if (login) {
		const loginStyle = window.document.createElement("link");
		loginStyle.setAttribute("rel", "stylesheet");
		loginStyle.href = "https://unpkg.com/material-dynmap@0.2.2/src/login.css";
		loginStyle.id = "material-dynmap-login-style";
		window.document.head.append(loginStyle);
	}

	const style = window.document.createElement("link");
	style.setAttribute("rel", "stylesheet");
	style.href = "https://unpkg.com/material-dynmap@0.2.2/src/main.css";
	style.id = "material-dynmap-style";
	style.media = "not all";
	window.document.head.append(style);

	const script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.src = "https://unpkg.com/material-dynmap@0.2.2/src/app.js";
	script.id = "material-dynmap-script";
	window.document.head.appendChild(script);

	window.document.head
		.querySelector("link[rel='icon']")
		.href = "https://unpkg.com/material-dynmap@0.2.2/assets/icon.ico";
}));
