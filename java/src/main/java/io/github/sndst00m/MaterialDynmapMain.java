package io.github.sndst00m;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.net.URL;
import java.net.URLConnection;

import com.google.common.base.Charsets;
import com.google.common.collect.ImmutableMap;
import com.google.common.io.ByteSink;
import com.google.common.io.Files;
import com.google.gson.JsonParser;
import com.google.gson.JsonObject;
import com.google.template.soy.jbcsrc.api.SoySauce;
import com.google.template.soy.jbcsrc.api.SoySauceBuilder;

import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;
import org.bukkit.event.server.PluginEnableEvent;
import org.bukkit.plugin.Plugin;
import org.bukkit.plugin.PluginManager;
import org.bukkit.plugin.java.JavaPlugin;
import org.dynmap.DynmapAPI;

public class MaterialDynmapMain extends JavaPlugin {
    private static Logger log;
    Plugin dynmap;
    DynmapAPI api;
    FileConfiguration cfg;
    
    int updates_per_tick = 20;
    int vupdates_per_tick = 20;
    
    HashMap<String, Integer> lookup_cache = new HashMap<String, Integer>();
    HashMap<String, Integer> vlookup_cache = new HashMap<String, Integer>();

    @Override
    public void onLoad() {
        log = this.getLogger();
    }
    
    public static void info(String msg) {
        log.log(Level.INFO, msg);
    }
    public static void severe(String msg) {
        log.log(Level.SEVERE, msg);
    }
    
    private class OurServerListener implements Listener {
        @EventHandler(priority=EventPriority.MONITOR)
        public void onPluginEnable(PluginEnableEvent event) {
            Plugin p = event.getPlugin();
            String name = p.getDescription().getName();
            if(name.equals("dynmap")) {
                activate();
            }
        }
    }
    
    public void onEnable() {
        info("initializing");
        PluginManager pm = getServer().getPluginManager();
        /* Get dynmap */
        dynmap = pm.getPlugin("dynmap");
        if(dynmap == null) {
            severe("Cannot find dynmap!");
            return;
        }
        api = (DynmapAPI)dynmap; /* Get API */

        getServer().getPluginManager().registerEvents(new OurServerListener(), this);        

        /* If enabled, activate */
        if(dynmap.isEnabled())
            activate();
    }

    private void activate() {
		String jarVersion = this.getDescription().getVersion();

		try {
			Path dynmapPath = Paths.get(dynmap.getDataFolder().toURI());
			File dynmapWebIndex = new File(dynmapPath.resolve("web/index.html").toString());
			String content = Files.toString(dynmapWebIndex, Charsets.UTF_8);

            if (content.indexOf("material-dynmap") != -1) {
				info("Material Dynmap v" + jarVersion + " already installed");
				return;
            }

			URL registry = new URL("https://registry.npmjs.org/material-dynmap");
			URLConnection request = registry.openConnection();
			request.connect();
			JsonParser jp = new JsonParser();
			JsonObject obj = jp.parse(new InputStreamReader((InputStream) request.getContent())).getAsJsonObject();
			String version = obj.getAsJsonObject("dist_tag").get("latest").getAsString();

			SoySauce soySauce = new SoySauceBuilder().build();
			SoySauce.Renderer renderer = soySauce.renderTemplate("io.github.sndst00m.MaterialDynmap");
			renderer = renderer.setData(ImmutableMap.of("version", version));
			String injection = renderer.renderText().get();

            content = content.replaceFirst("(?=</head>)", injection + "\n\n");
			ByteSink sink = Files.asByteSink(dynmapWebIndex);
			sink.write(content.getBytes());
        } catch (IOException e) {
            //Simple exception handling, replace with what's necessary for your use case!
            throw new RuntimeException("Material Dynmap v" + jarVersion + " installation failed", e);
        }

        info("Material Dynmap v" + jarVersion + " installation succeeded");
    }

    public void onDisable() {
    }

}
