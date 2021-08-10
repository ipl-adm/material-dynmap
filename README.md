<p align="center">
  <a href="https://github.com/SNDST00M/material-dynmap">
    <img alt="logo" title="material-dynmap" src="https://raw.githubusercontent.com/SNDST00M/material-dynmap/v0.4.2/assets/icon.svg" width="100" alt="Logo">
  </a>
  <h1 align="center"><code>material-dynmap</code></h1>
  <h4 align="center">Material theming userscript for Webbukit's Dynmap plugin.</h4>
</p>

<p align="center">
<a href="https://github.com/SNDST00M/material-dynmap/releases" target="_blank"><img src="https://img.shields.io/github/v/release/SNDST00M/material-dynmap.svg?style=flat-square&label=Release&logo=github&labelColor=212121&color=0093ed" /></a> <a href="https://npmjs.org/material-dynmap" target="_blank"><img lt="npm" src="https://img.shields.io/npm/v/material-dynmap?style=flat-square&label=NPM&logo=nodedotjs&logoColor=ffffff&labelColor=212121&color=0093ed" /></a> <a href="https://openuserjs.org/scripts/SNDST00M/Material_Dynmap" target="_blank"><img src="https://img.shields.io/badge/dynamic/json?style=flat-square&label=OpenUserJS&logo=tampermonkey&query=%24.OpenUserJS.installs%5B0%5D.value&suffix=%20installs&url=https%3A%2F%2Fopenuserjs.org%2Fmeta%2FSNDST00M%2FMaterial_Dynmap.meta.json&logoColor=ffffff&labelColor=212121&color=0093ed" /></a>
</p>

<p align="center"><a href="https://github.com/SNDST00M/material-dynmap/actions/workflows/main.yml" target="_blank"><img src="https://img.shields.io/github/workflow/status/SNDST00M/material-dynmap/Node.js%20CI?style=flat-square&label=Build&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI%2BPHBhdGggZD0ibTUgMTlhMSAxIDAgMCAwIDEgMWgxMmExIDEgMCAwIDAgMSAtMWMwLS4yMS0uMDctLjQxLS4xOC0uNTdsLTUuODItMTAuMDh2LTQuMzVoLTJ2NC4zNWwtNS44MiAxMC4wOGMtLjExLjE2LS4xOC4zNi0uMTguNTdtMSAzYTMgMyAwIDAgMSAtMyAtM2MwLS42LjE4LTEuMTYuNS0xLjYzbDUuNS05LjU2di0xLjgxYTEgMSAwIDAgMSAtMSAtMXYtMWEyIDIgMCAwIDEgMiAtMmg0YTIgMiAwIDAgMSAyIDJ2MWExIDEgMCAwIDEgLTEgMXYxLjgxbDUuNSA5LjU2Yy4zMi40Ny41IDEuMDMuNSAxLjYzYTMgMyAwIDAgMSAtMyAzaC0xMm03LTZsMS4zNC0xLjM0IDEuOTMgMy4zNGgtOC41NGwyLjY2LTQuNjEgMi42MSAyLjYxbS0uNS00YS41IC41IDAgMCAxIC41IC41IC41IC41IDAgMCAxIC0uNSAuNSAuNSAuNSAwIDAgMSAtLjUgLS41IC41IC41IDAgMCAxIC41IC0uNXoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4%3D&labelColor=212121&color=0093ed" /></a> <a href="https://dev.bukkit.org/projects/dynmap" target="_blank"><img src="https://img.shields.io/static/v1.svg?style=flat-square&label=Dynmap&message=>=v3.0&logo=curseforge&labelColor=212121&color=0093ed" /></a></p>

<p align="center">A modern, material and focused <a href="https://www.spigotmc.org/resources/dynmap.274" target="_blank">Webbukit Dynmap</a> theme.</p>

<p align="center">Designed for fluent and clear navigation with the Material Design language.</p>

## Screenshots

<p align="center"><a href="https://openuserjs.org/scripts/SNDST00M/Material_Dynmap" target="_blank"><img src="https://raw.githubusercontent.com/SNDST00M/material-dynmap/v0.4.2/assets/westeroscraft-surface.png"/></a></p>

> The Red Keep in King's Landing on the [WesterosCraft Minecraft server][westeroscraft].

<p align="center"><a href="https://openuserjs.org/scripts/SNDST00M/Material_Dynmap" target="_blank"><img src="https://raw.githubusercontent.com/SNDST00M/material-dynmap/v0.4.2/assets/earthmc-login.png"/></a></p>

> The Dynmap login page on the [EarthMC Minecraft server][earthmc].

## Installation

### Server-side installation

To install the script server-side with automatic updates, use the following options in your Dynmap location context:
```conf
        sub_filter '</head>' '<script src="https://cdn.jsdelivr.net/npm/material-dynmap/src/index.js" type="text/javascript" id="material-dynmap-script" defer></script></head>';
        sub_filter_last_modified on;
```

### Personal installation

To install the script for personal use on all Dynmap instances, you need to have a userscript manager installed. For a modern seamless UI with an open source extension, [Tampermonkey] is strongly recommended.

Then visit [OpenUserJS][material-dynmap-openuserjs] and click the `Install` button. The userscript will update automatically. Alternatively, this button lets you install it directly:

<a href="https://openuserjs.org/install/SNDST00M/Material_Dynmap.user.js" target="_blank"><p align="center"><img src="https://img.shields.io/badge/dynamic/json?style=for-the-badge&label=OpenUserJS&logo=tampermonkey&query=%24.OpenUserJS.installs%5B0%5D.value&suffix=%20installs&url=https%3A%2F%2Fopenuserjs.org%2Fmeta%2FSNDST00M%2FMaterial_Dynmap.meta.json&logoColor=ffffff&labelColor=212121&color=0093ed" width="332px" /></p></a>

### Electron installation

To create a Electron app and save RAM while gaming, open the `material-dynmap` folder in your IDE and insert the following code in your terminal:

```bash
npm install nativefier -g && npx nativefier 'mc.westeroscraft.com' './.electron' --name 'WesterosCraft Map' --browserwindow-options '{ \"nodeIntegration\": false, \"contextIsolation\": false }' --inject './src/electron.js' --icon './assets/icon.ico'
```

See the [Nativefier API][nativefier-api] for how to adjust the options. You can copy the `.electron` folder anywhere and rename it - the app will continue to work.

## Contributing

Contributions, especially bug reports and feature requests, are all greatly appreciated.

Here are some of the things you can do to help:
- [Reporting bugs or requesting new features][material-dynmap-issue]
- [Opening pull requests][material-dynmap-pr] for [roadmap items][material-dynmap-roadmap]

----

Copyright © 2021 [SNDST00M](https://github.com/SNDST00M) and [other contributors](https://github.com/SNDST00M/material-dynmap/graphs/contributors).

<!-- Installation -->
[tampermonkey]: https://www.tampermonkey.net/
[material-dynmap-openuserjs]: https://openuserjs.org/scripts/SNDST00M/Material_Dynmap
[nativefier-api]: https://github.com/nativefier/nativefier/blob/master/API.md#command-line
<!-- Screenshots -->
[westeroscraft]:https://westeroscraft.com/launcher
[earthmc]: https://earthmc.net/
<!-- Contributing -->
[material-dynmap-issue]: https://github.com/millsp/material-candy/issues/new/choose/
[material-dynmap-pr]: https://github.com/millsp/material-candy/compare/
[material-dynmap-roadmap]: https://github.com/SNDST00M/material-dynmap/blob/main/CHANGELOG.md#roadmap
