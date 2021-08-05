(function(window, factory) {
	if (![...window.document.body.children].filter(isDynmapContainer).length) {
		return;
	}
	if (window.DynMap) {
		factory.call(window, window);
		return;
	}
	window.materialDynmapHandle = window.setInterval(factory.bind(window, window), 100);
	setTimeout(function() {
		if (window.materialDynmapHandle) {
			window.clearInterval(window.materialDynmapHandle);
			delete window.materialDynmapHandle;
		}
	}, 10000);
	function isDynmapContainer(e) {
		return e.tagName.toLowerCase() === "div" && e.id === "mcmap";
	}
}(this, function(window) {
	window.clearInterval(window.materialDynmapHandle);
	delete window.materialDynmapHandle;

	const style = document.createElement("link");
	style.setAttribute("rel", "stylesheet");
	style.href = "https://unpkg.com/material-dynmap@0.1.0/main.css";
	style.id = "material-dynmap-style";
	style.media = "not all";
	document.body.append(style);

	const script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.src = "https://unpkg.com/material-dynmap@0.1.0/app.js";
	script.id = "material-dynmap-script";
	document.body.appendChild(script);
	document.head.querySelector("link[rel='icon']").href = "https://unpkg.com/material-dynmap@0.1.0/icon.ico";
}));
