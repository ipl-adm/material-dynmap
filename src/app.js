/* eslint-env browser */
(function(window, factory) {
	if (
		window.L && window.dynmap
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
	if (
		window.L && window.dynmap
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

		if (window.screen.width < 640) {
			window.dynmap.sidebar.get(0).classList.remove("pinned");
		} else {
			window.dynmap.sidebar.get(0).classList.add("pinned");
		}

		const worldlist = window.dynmap.worldlist.get(0);
		if (worldlist && worldlist.parentElement) {
			worldlist.parentElement.setAttribute("style", "display: none;");
		}

		const timeofdayclock = window.dynmap.options.components.filter(function(c) {
			return c.type === "timeofdayclock";
		})[0];
		if (timeofdayclock && !timeofdayclock.showdigitalclock) {
			const clockObserver = new MutationObserver(hideEmptyClock);
			hideEmptyClock();
			clockObserver.observe(window.dynmap.options.container.get(0), {
				childList: true
			});
		}

		const worlds = window.dynmap.worlds;
		const components = {};

		const Chips = window.L.Control.extend({
			_state: {
				focus: false,
				scrollLeft: 0,
				startX: 0
			},

			_update: function(name) {
				if (!this.getContainer() || !components.minimaps) {
					return;
				}
				window.dynmap.selectWorld(worlds[name], components.minimaps.onAdd.bind(this));
			},

			getContainer: function() {
				return this._container;
			},

			getPosition: function() {
				return "topleft";
			},

			onAdd: function() {
				if (!this.getContainer()) {
					return;
				}
				this._container = window.L.DomUtil.create("div", "leaflet-chip-container");

				this._container.addEventListener("mousedown", function(e) {
					this.state.focus = true;
					this._container.classList.add("active");
					this.state.startX = e.pageX - this._container.offsetLeft;
					this.state.scrollLeft = this._container.scrollLeft;
				});

				this._container.addEventListener("mouseleave", function() {
					this.state.focus = false;
					this._container.classList.remove("active");
				});

				this._container.addEventListener("mouseup", function() {
					this.state.focus = false;
					this._container.classList.remove("active");
				});

				this._container.addEventListener("mousemove", function(e) {
					if(!this.state.focus) {
						return;
					}
					e.preventDefault();
					const x = e.pageX - this._container.offsetLeft;
					const walk = (x - this.state.startX) * 3;
					this._container.scrollLeft = this.state.scrollLeft - walk;
				});

				for (const name in worlds) {
					if ( Object.prototype.hasOwnProperty.call(worlds, name)) {
						const world = worlds[name];
						const chip = window.L.DomUtil.create("div", "leaflet-chip");
						chip.textContent = world.title;
						chip.title = name;
						chip.onclick = this._update.bind(this, name);
						this._container.appendChild(chip);
					}
				}

				this._container.classList.add("leaflet-chip-container");
			}
		});

		const Minimaps = window.L.Control.extend({
			_state: {
				world: window.dynmap.world
			},

			_update: function(type, el) {
				if (!this.getContainer()) {
					return;
				}
				const world = window.dynmap.world;
				if (window.dynmap.maptype.options.name === type) {
					return;
				}
				[...el.parentElement.children].forEach(function(item) {
					if (item.childNodes[0].title === type) {
						item.classList.add("selected");
					} else {
						item.classList.remove("selected");
					}
				});
				components.minimaps.remove();
				window.dynmap.selectMap(world.maps[type]);
			},

			getContainer: function() {
				return this._container;
			},

			getPosition: function() {
				return "bottomleft";
			},

			onAdd: function() {
				this._container = window.L.DomUtil.create("div", "leaflet-minimap-container");

				const world = window.dynmap.world;
				const maplist = world.element.get(0).cloneNode(true);

				this._container.classList.add(world.title);
				maplist.removeAttribute("style");
				this._container.appendChild(maplist);

				this._container.querySelectorAll(".item").forEach(function(el) {
					const type = Object.keys(world.maps).filter(function(name) {
						return el.childNodes[0].title === world.maps[name].options.title;
					})[0];
					el.classList.add(type);
					el.onclick = this._update.bind(this, type, el);
				}, this);

				return this.getContainer();
			}
		});

		components.chips = new Chips();
		window.dynmap.map.addControl(components.chips);

		components.minimaps = new Minimaps();
		window.dynmap.map.addControl(components.minimaps);

		const materialDynmapLoaded = new CustomEvent("material-dynmap.load", {
			bubbles: true,
			detail: { login: false }
		});
		window.document.dispatchEvent(materialDynmapLoaded);
	}

	function hideEmptyClock() {
		const clock = Array.prototype.slice
			.call(window.dynmap.options.container.get(0).children)
			.filter(function(e) {
				return e.className === "largeclock";
			})[0];
		if (clock) {
			clock.style.display = "none";
		}
	}
}));
