// ==UserScript==
// @name            Material Dynmap
// @version         0.1.0
// @description     Material styling for Bukkit's dynmap Minecraft plugin.
// @author          2021, SNDST00M (https://github.com/SNDST00M/)
// @license	        MIT
// @homepage        https://github.com/SNDST00M/material-dynmap/blob/0.1.0/README.md
// @icon            https://raw.githubusercontent.com/SNDST00M/material-dynmap/0.1.0/assets/icon.png
// @updateURL       https://raw.githubusercontent.com/SNDST00M/material-dynmap/main/src/user.js
// @downloadURL     https://raw.githubusercontent.com/SNDST00M/material-dynmap/main/src/user.js
// @match           *://*/*
// @grant           GM_addElement
// ==/UserScript==
/* eslint-disable max-len */
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
		const loginStyle = window.document.createElement("style");
		loginStyle.setAttribute("type", "text/css");
		loginStyle.textContent = `
		@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&display=swap");

		:root {
			background: #212121;
			box-sizing: border-box;
			height: auto;
			line-height: 1em;
			padding: 40px;
		}
		
		body {
			background-color: initial;
			border: 1px solid #424242;
			border-radius: 8px;
			font-family: "Roboto", Arial, Helvetica, sans-serif;
			font-size: 14px;
			height: auto;
			margin: 0 auto;
			padding: 40px;
			width: auto;
		}
		
		.dynmaplogin h2,
		.dynmaplogin table th {
			font-family: "Open Sans", "Noto Sans Myanmar UI", Arial, sans-serif;
			font-weight: normal;
		}
		
		.dynmaplogin h2 {
			font-family: "Open Sans", "Noto Sans Myanmar UI", Arial, sans-serif;
			font-size: 24px;
		}
		
		.dynmaplogin table th {
			display: block;
			font-size: 16px;
			font-weight: bold;
			margin-top: 20px;
			text-align: center;
			width: 100%;
		}
		
		.dynmaplogin,
		.dynmaplogin table,
		.dynmaplogin tr,
		.dynmaplogin td,
		.dynmaplogin select,
		.dynmaplogin textarea,
		.dynmaplogin button {
			background-color: initial;
			border: none;
			color: inherit;
			font-family: inherit;
			font-weight: normal;
		}
		
		.dynmaplogin table table {
			margin: auto;
			width: 100%;
		}
		
		.dynmaplogin table table th {
			font-size: 16px;
		}
		
		.dynmaplogin table table tr td:nth-child(2) {
			width: 100%;
		}
		
		.dynmaplogin table table tr td:nth-last-child(2) {
			left: 0;
			line-height: 1.5em;
			padding: 10px;
			text-align: left;
			white-space: nowrap;
		}
		
		.dynmaplogin table p:first-child {
			margin: 1em;
		}
		
		.dynmaplogin table p:last-child,
		.dynmaplogin table p:empty,
		.dynmaplogin table p br {
			display: none;
		}
		
		.dynmaplogin table table input {
			background-color: transparent;
			border: 1px solid #424242;
			border-radius: 4px;
			box-sizing: border-box;
			color: inherit;
			font-family: inherit;
			font-weight: normal;
			padding: 10px;
			width: 100%;
			z-index: -1;
		}
		
		.dynmaplogin table table input:not(:placeholder-shown) {
			background-color: #212121;
		}
		
		.dynmaplogin input[type="submit"] {
			background-color: #d32f2f;
			border: none;
			border-end-end-radius: 4px;
			border-end-start-radius: 4px;
			border-radius: 4px;
			border-start-end-radius: 4px;
			border-start-start-radius: 4px;
			box-sizing: border-box;
			color: rgb(255, 255, 255);
			cursor: pointer;
			font-family: "Open Sans", Roboto, Arial, sans-serif;
			font-weight: bold;
			height: 36px;
			line-height: 1.5em;
			padding: 8px 16px;
			position: relative;
			text-align: center;
			user-select: none;
			vertical-align: middle;
		}
		
		.dynmaplogin input[type="submit"]:hover,
		.dynmaplogin input[type="submit"]:active {
			background-color: #c62828;
			transition: background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0s;
		}		
		`.replace(/^\t\t/gm, "");
		loginStyle.id = "material-dynmap-login-style";
		window.document.body.append(loginStyle);
		return;
	}

	const style = document.createElement("style");
	style.setAttribute("type", "text/css");
	style.textContent = `
	@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Roboto:wght@400;700&display=swap');
	@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.9.55/css/materialdesignicons.css');

	:root {
		font-family: Roboto, Arial, sans-serif;
		font-size: 14px;
	}

	body {
		font-family: inherit;
		font-size: inherit;
	}

	.dynmap {
		display: flex;
		flex-direction: row-reverse;
		flex-wrap: nowrap;
	}

	.dynmap .leaflet-control-container .leaflet-bar {
		border: none;
		border-radius: 5px;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers {
		background: #212121;
		border: none;
		box-sizing: border-box;
		color: #e0e0e0;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers-expanded {
		padding: 10px 10px 15px 10px;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers .leaflet-control-layers-toggle {
		border-radius: 5px;
		width: 32px;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers .leaflet-control-layers-toggle:before,
	.dynmap .leaflet-control-container .leaflet-control-layers-selector:before,
	.dynmap .leaflet-control-container .leaflet-control-zoom a:before {
		direction: ltr;
		display: inline-flex;
		font-family: 'Material Design Icons', sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: normal;
		height: 16px;
		letter-spacing: normal;
		line-height: 1em;
		margin: 0 8px;
		text-transform: none;
		white-space: nowrap;
		width: 16px;
		word-wrap: normal;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers-expanded .leaflet-control-layers-toggle {
		width: 100%;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers-expanded .leaflet-control-layers-toggle:before {
		margin: 0 8px;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers-expanded .leaflet-control-layers-toggle:after {
		content: attr(title);
		font-size: 1rem !important;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers label {
		padding: 2px 5px;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers label span {
		display: inline-flex;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers-selector {
		appearance: initial;
		color: inherit;
		margin: 0 0 0 -5px;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers-selector:before {
		content: '\\F012E';
		cursor: pointer;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers-selector:checked:before {
		content: '\\F0132';
	}

	.dynmap .leaflet-control-container .leaflet-control-layers .leaflet-control-layers-toggle:before {
		content: '\\F09FE';
	}

	.dynmap .leaflet-control-container .leaflet-control-layers .leaflet-control-layers-toggle,
	.dynmap .leaflet-control-container .leaflet-control-layers-expanded .leaflet-control-layers-toggle:before {
		background: none;
	}

	.dynmap .leaflet-control-container .leaflet-control-zoom a:first-child:before {
		content: '\\F0415';
	}

	.dynmap .leaflet-control-container .leaflet-control-zoom a:last-child:before {
		content: '\\F0374';
	}

	.dynmap .leaflet-control-container .leaflet-chip-container {
		cursor: ew-resize;
		display: flex;
		left: 52px;
		overflow-x: scroll;
		position: absolute;
		right: 102px;
		top: 10px;
		user-select: none;
	}

	@supports (scrollbar-width: none) {
		.dynmap .leaflet-control-container .leaflet-chip-container {
			scrollbar-width: none;
		}
	}

	@supports selector(::-webkit-scrollbar) {
		.dynmap .leaflet-control-container .leaflet-chip-container::-webkit-scrollbar {
			display: none;
		}
	}

	.dynmap .leaflet-control-container .leaflet-chip-container .leaflet-chip {
		background: #212121;
		border-radius: 16px;
		box-sizing: border-box;
		cursor: pointer;
		height: 32px;
		line-height: 1em;
		padding: 8px 16px;
	}

	.dynmap .leaflet-control-container .leaflet-chip-container .leaflet-chip:nth-child(n+1) {
		margin-right: 8px;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world {
		bottom: 20px;
		float: left;
		font-size: 0;
		height: 75px;
		left: 288px;
		padding: 2px;
		position: fixed;
		z-index: 120;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .maplist {
		padding: 0;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .item {
		border-radius: 8px;
		cursor: pointer;
		overflow: hidden;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .item,
	.dynmap .leaflet-control-container .leaflet-type-container .item.selected,
	.dynmap .leaflet-control-container .leaflet-type-container .item:hover {
		border: none;
		margin: 5px 2px;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .item {
		background: #142326cc !important;
		transition: background 2s;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .item:hover,
	.dynmap .leaflet-control-container .leaflet-type-container .item.selected {
		background: #142326 !important;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .item,
	.dynmap .leaflet-control-container .leaflet-type-container .world .maptype {
		height: 75px;
		margin: 0;
		width: 75px;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .item:nth-child(n+2) {
		margin: 0 0 0 10px;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .item.surface {
		position: relative;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .item.surface:after {
		border: 5px solid #437c33;
		border-radius: 6px;
		bottom: 2px;
		box-shadow: 0 0 8px 8px #142326;
		content: '';
		display: block;
		left: 2px;
		position: absolute;
		right: 2px;
		top: 2px;
		z-index: 121;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .maptype {
		display: flex;
		flex-direction: column-reverse;
		flex-wrap: nowrap;
		text-indent: initial;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .maptype:before {
		color: #fff;
		content: attr(title);
		display: flex;
		font-size: 11px;
		margin: 5px auto;
		text-shadow: #000c 0 -5px 10px;
		z-index: 121;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .maptype[title="Flat"] {
		background-image: url("https://raw.githubusercontent.com/SNDST00M/material-dynmap/0.1.0/assets/world-type.svg") !important;
		background-size: cover;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .maptype[title="Surface"] {
		background-image: url("https://raw.githubusercontent.com/SNDST00M/material-dynmap/0.1.0/assets/world-type.svg") !important;
		background-size: cover;
		font-size: 5.5px;
		transform: rotateZ(45.5deg) scale(1.42);
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .maptype[title="Surface"]:before {
		font-size: inherit;
		text-shadow: #000 0 0 10px;
		transform: rotateZ(-45.5deg) scale(142%) translateX(21px) translateY(-4.25px);
		transform-origin: bottom right;
	}

	.dynmap .leaflet-control-container .leaflet-type-container .world .maptype[title="Topography"] {
		background-image: url("https://raw.githubusercontent.com/JLyne/LiveAtlas/master/src/assets/icons/block_nether_flat.svg") !important;
		background-size: cover;
		filter: hue-rotate(180deg) contrast(1.4);
	}

	.dynmap .leaflet-control-container .dynmap-link .dynmap-link-button {
		bottom: 10px;
		left: initial;
		position: fixed;
		right: 10px;
		z-index: 121;
	}

	.dynmap .leaflet-control-container .dynmap-link .dynmap-link-button:before {
		content: '\\F0337';
		direction: ltr;
		display: inline-flex;
		font-family: 'Material Design Icons', sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: normal;
		height: 16px;
		letter-spacing: normal;
		line-height: 1em;
		margin: 0 8px;
		text-transform: none;
		white-space: nowrap;
		width: 16px;
		word-wrap: normal;
	}

	.dynmap .leaflet-control-container .leaflet-control-zoom a,
	.dynmap .leaflet-control-container .dynmap-link .dynmap-link-button {
		width: 32px;
	}

	.dynmap .leaflet-control-container .leaflet-control-layers .leaflet-control-layers-toggle,
	.dynmap .leaflet-control-container .leaflet-control-zoom a,
	.dynmap .leaflet-control-container .dynmap-link .dynmap-link-button {
		align-items: center;
		background: #212121;
		border: none;
		color: #e0e0e0;
		display: flex;
		font-size: 0;
		height: 32px;
		justify-content: flex-start;
		text-decoration: none;
	}

	.dynmap .leaflet-control-container .logincontainer .loginbutton {
		align-items: center;
		background-color: rgb(33, 33, 33);
		border: none;
		border-radius: 4px;
		bottom: 10px;
		color: rgb(224, 224, 224);
		cursor: pointer;
		display: flex;
		font-size: 11px;
		font-weight: bold;
		height: 32px;
		justify-content: flex-start;
		padding: 8px;
		position: fixed;
		right: 52px;
		z-index: 121;
	}

	.dynmap .sidebar {
		background: #212121;
		border: none;
		display: flex;
		flex-direction: column;
		flex-grow: 0;
		flex-shrink: 0;
		flex-wrap: nowrap;
		position: static;
		transition: initial;
		width: 270px;
	}

	.dynmap .sidebar legend {
		color: #e0e0e0;
		font-size: 16px;
		padding: 20px 10px 10px 10px;
	}

	.dynmap .sidebar .section .content {
		min-height: 0;
		padding: 0;
	}

	.dynmap .sidebar .panel {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
	}

	.dynmap .sidebar .panel .section {
		border: none;
		padding: 0;
	}

	.dynmap .panel .subsection {
		display: none;
	}

	.dynmap .sidebar .panel .section:first-of-type {
		margin: 0;
		padding: 0;
	}

	.dynmap .sidebar .panel .section:first-of-type legend {
		display: none;
	}

	.dynmap .sidebar .panel .hitbar,
	.dynmap .sidebar .panel .pin,
	.dynmap .sidebar .panel .slider {
		display: none;
	}

	.dynmap .playerlist .player {
		align-items: center;
		box-sizing: border-box;
		display: flex;
		padding: 4px;
	}

	.dynmap .playerlist .player .playerIcon {
		display: inline-block;
		height: auto;
		margin: 0 0.66em 0 0;
		width: auto;
	}

	.dynmap .playerlist .player .playerIcon img {
		height: 25px;
		image-rendering: pixelated;
		margin: 2px;
		width: 25px;
	}

	.dynmap .playerlist .player a {
		line-height: 1em;
	}

	.dynmap .leaflet-container {
		font-family: inherit;
		font-size: 16px;
	}

	.dynmap .leaflet-container .coord-control {
		background: #212121;
		border: none;
		border-radius: 10px;
		color: #e0e0e0;
		padding: 5px 10px;
		width: auto;
	}

	.dynmap .leaflet-container .coord-control .coord-control-label {
		font-weight: bold;
	}

	.dynmap .leaflet-container .coord-control .coord-control-value {
		font-family: Jetbrains Mono, monospace;
		font-weight: normal;
	}

	.dynmap .panel .section .scrolldown,
	.dynmap .panel .section .scrollup,
	.dynmap .panel .section .scrolldown:hover,
	.dynmap .panel .section .scrollup:hover,
	.dynmap .panel .section .scrolldown:active,
	.dynmap .panel .section .scrollup:active {
		background-color: transparent;
		border: none;
	}

	.dynmap .leaflet-container .leaflet-map-pane {
		zoom: calc(1 / var(--material-dynmap-device-pixel-ratio, 1));
	}

	.dynmap .leaflet-container .leaflet-map-pane .Marker.mapMarker > *,
	.dynmap .leaflet-container .leaflet-map-pane .Marker.playerMarker > *,
	.dynmap .leaflet-container .leaflet-popup-pane > .leaflet-popup {
		zoom: var(--material-dynmap-device-pixel-ratio, 1);
	}

	.dynmap .leaflet-tile-pane .leaflet-tile {
		filter: brightness(1.25) contrast(1.05) hue-rotate(5deg) saturate(1.1);
		image-rendering: pixelated;
		outline: 1px solid transparent;
	}

	.dynmap .leaflet-marker-pane .mapMarker .markerIcon16x16 {
		border-radius: 4px;
		height: 32px;
		image-rendering: pixelated;
		position: relative;
		right: 8px;
		top: 8px;
		width: 32px;
	}

	.dynmap .leaflet-marker-pane .playerMarker .playerIcon,
	.dynmap .leaflet-marker-pane .playerMarker .playerIconSm {
		border-radius: 4px;
		margin-left: -24px;
		margin-top: -20px;
	}

	.dynmap .leaflet-marker-pane .playerMarker .playerIcon {
		height: 40px;
		width: 40px;
	}

	.dynmap .leaflet-marker-pane .playerMarker .playerIconSm {
		height: 30px;
		width: 30px;
	}

	.dynmap .leaflet-marker-pane .playerMarker .playerName {
		line-height: 1em;
	}

	.dynmap .compass {
		align-items: center;
		background: radial-gradient(#e53935, #e53935 29px, #212121 29px, #212121);
		border: none;
		border-radius: 50%;
		color: #e5e5e5;
		display: flex;
		font-size: 72px;
		height: 72px;
		justify-content: center;
		line-height: 72px;
		padding: 5px;
		right: 10px;
		text-decoration: none;
		top: 10px;
		width: 72px;
	}

	.dynmap .compass:before {
		content: '\\F018B';
		direction: ltr;
		display: inline-flex;
		font-family: 'Material Design Icons', sans-serif;
		font-size: 72px;
		font-style: normal;
		font-weight: normal;
		height: 72px;
		letter-spacing: normal;
		line-height: 72px;
		text-transform: none;
		white-space: nowrap;
		width: 72px;
		word-wrap: normal;
	}

	.dynmap .compass_flat:before {
		transform: rotateZ(315deg);
	}

	.dynmap .alertbox {
		background-color: #e53935;
		border-radius: 4px;
		bottom: 52px;
		box-shadow: 0 2px 4px #2121214d;
		color: #fff;
		left: initial;
		margin: 0;
		right: 10px;
		top: initial;
		width: auto;
	}

	.dynmap .chat {
		display: none;
	}

	.dynmap .largeclock {
		align-items: center;
		background: #212121;
		border: none;
		border-radius: 10px;
		color: #e0e0e0;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		height: auto;
		justify-content: start;
		left: initial;
		padding: 10px;
		right: 10px;
		top: 102px;
		transform: scale(68%);
		transform-origin: top right;
		width: auto;
	}

	.dynmap .largeclock > .timeofday[style] {
		display: none;
	}

	.dynmap .largeclock .timeofday.digitalclock {
		color: inherit;
		display: flex;
		font-family: Jetbrains Mono, monospace;
		font-size: 32px;
		position: static;
		width: auto;
	}

	.dynmap .largeclock .weather {
		align-items: center;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.dynmap .largeclock .weather:before {
		direction: ltr;
		display: inline-flex;
		font-family: 'Material Design Icons', sans-serif;
		font-size: 27px;
		font-style: normal;
		font-weight: normal;
		height: 27px;
		letter-spacing: normal;
		line-height: 1em;
		text-transform: none;
		white-space: nowrap;
		width: 27px;
		word-wrap: normal;
	}

	.dynmap .largeclock .weather:after {
		direction: ltr;
		display: inline-flex;
		font-family: 'Material Design Icons', sans-serif;
		font-size: 32px;
		font-style: normal;
		font-weight: normal;
		height: 32px;
		letter-spacing: normal;
		line-height: 1em;
		margin-left: 0.4em;
		text-transform: none;
		white-space: nowrap;
		width: 32px;
		word-wrap: normal;
	}

	.dynmap .largeclock .weather.sunny_day:before,
	.dynmap .largeclock .weather.stormy_day:before,
	.dynmap .largeclock .weather.thunder_day:before {
		content: '\\F00E0';
	}

	.dynmap .largeclock .weather.sunny_night:before,
	.dynmap .largeclock .weather.stormy_night:before,
	.dynmap .largeclock .weather.thunder_night:before {
		content: '\\F00DD';
	}

	.dynmap .largeclock .weather {
		background: none;
		margin-left: 0.4em;
		position: static;
		width: auto;
	}

	.dynmap .largeclock .weather.sunny_day:after,
	.dynmap .largeclock .weather.sunny_night:after {
		content: '\\F0599';
	}

	.dynmap .largeclock .weather.stormy_day:after,
	.dynmap .largeclock .weather.stormy_night:after {
		content: '\\F0596';
	}

	.dynmap .largeclock .weather.thunder_day:after,
	.dynmap .largeclock .weather.thunder_night:after {
		content: '\\F0593';
	}
	`.replace(/^\t/gm, "");
	style.media = "not all";
	style.id = "material-dynmap-style";
	document.body.append(style);

	const script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.textContent = `
	(function(window, factory) {
		if (
			window.dynmap
			&& window.dynmap.worlds
			&& window.dynmap.playerlist
			&& window.dynmap.map
			&& window.dynmap.map._controlContainer
			&& window.dynmap.map._panes
			&& window.dynmap.map._panes.mapPane
		) {
			factory.call(window, window);
		} else if (window.DynMap) {
			window.materialDynmapHandle = window.setInterval(factory.bind(window, window), 100);
			setTimeout(function() {
				if (window.materialDynmapHandle) {
					window.clearInterval(window.materialDynmapHandle);
					delete window.materialDynmapHandle;
				}
			}, 10000);
		}
	}(this, function(window) {
		const state = {};
		if (
			window.dynmap
			&& window.dynmap.worlds
			&& window.dynmap.playerlist
			&& window.dynmap.map
			&& window.dynmap.map._controlContainer
			&& window.dynmap.map._panes
			&& window.dynmap.map._panes.mapPane
		) {
			if (window.materialDynmapHandle) {
				window.clearInterval(window.materialDynmapHandle);
				delete window.materialDynmapHandle;
			}
			window.document.getElementById("material-dynmap-style").removeAttribute("media");

			if (!window.dynmap.sidebar.get(0).classList.contains("pinned")) {
				window.dynmap.sidebar.get(0).classList.add("pinned");
			}

			if (!window.dynmap.options.components.filter(c => c.type === "timeofdayclock")[0].showdigitalclock) {
				const clockObserver = new MutationObserver(hideEmptyClock);
				hideEmptyClock();
				clockObserver.observe(window.dynmap.options.container.get(0), {
					childList: true
				});
			}

			const worlds = window.dynmap.worlds;
			const chips = window.document.createElement("div");
			const types = window.document.createElement("div");

			state.chips = {};
			state.chips.focus = false;
			state.chips.startX = 0;
			state.chips.scrollLeft = 0;

			chips.addEventListener("mousedown", (e) => {
				state.chips.focus = true;
				chips.classList.add("active");
				state.chips.startX = e.pageX - chips.offsetLeft;
				state.chips.scrollLeft = chips.scrollLeft;
			});

			chips.addEventListener("mouseleave", () => {
				state.chips.focus = false;
				chips.classList.remove("active");
			});

			chips.addEventListener("mouseup", () => {
				state.chips.focus = false;
				chips.classList.remove("active");
			});

			chips.addEventListener("mousemove", (e) => {
				if(!state.chips.focus) {
					return;
				}
				e.preventDefault();
				const x = e.pageX - chips.offsetLeft;
				const walk = (x - state.chips.startX) * 3;
				chips.scrollLeft = state.chips.scrollLeft - walk;
			});

			for (const name in worlds) {
				const world = worlds[name];
				const chip = window.document.createElement("div");
				chip.classList.add("leaflet-chip");
				chip.textContent = world.title;
				chip.title = name;
				chip.onclick = function() {
					window.dynmap.selectWorld(worlds[name], renderTypeLayers.bind(this, types));
				};
				chips.appendChild(chip);
			}

			chips.classList.add("leaflet-chip-container");
			types.classList.add("leaflet-type-container");

			renderTypeLayers(types);

			window.map._controlContainer.appendChild(chips);
			window.map._controlContainer.appendChild(types);
		}

		function renderTypeLayers(types) {
			const world = window.dynmap.world;
			types.textContent = "";
			types.appendChild(world.element.get(0).cloneNode(true));
			types.querySelectorAll(".item").forEach(function(el) {
				const typeName = Object.keys(world.maps)
					.filter(name => el.childNodes[0].title === world.maps[name].options.title)[0];
				el.classList.add(typeName);
				el.onclick = function() {
					const currentName = window.dynmap.maptype.options.name;
					if (currentName === typeName) {
						return;
					}
					[...el.parentElement.children].forEach(item => {
						if (item.childNodes[0].title === typeName) {
							item.classList.add("selected");
						} else {
							item.classList.remove("selected");
						}
					});
					window.dynmap.selectMap(world.maps[typeName]);
				};
			});
		}

		function hideEmptyClock() {
			const clock = window.dynmap.options.container.get(0).querySelector(":scope > .largeclock");
			if (clock) {
				clock.style.display = "none";
			}
		}
	}));
	`.replace(/^\t/gm, "");
	script.id = "material-dynmap-script";
	document.body.appendChild(script);
	document.head.querySelector("link[rel='icon']").href = "https://cdn.discordapp.com/attachments/299684112657154048/872125860549894154/icon.ico";
}));
