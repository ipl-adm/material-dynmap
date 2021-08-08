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

		renderTypeLayers.call(this, types);

		window.map._controlContainer.appendChild(chips);
		window.map._controlContainer.appendChild(types);

		const materialDynmapLoaded = new CustomEvent("material-dynmap.load", {
			bubbles: true,
			detail: { login: false }
		});
		window.document.dispatchEvent(materialDynmapLoaded);
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
