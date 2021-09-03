package io.github.sndst00m;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

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

    private class MaterialServerListener implements Listener {
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

        getServer().getPluginManager().registerEvents(new MaterialServerListener(), this);        

        /* If enabled, activate */
        if(dynmap.isEnabled())
            activate();
    }

    private void activate() {
		String version = this.getDescription().getVersion();

		try {
			Path dynmapWebPath = Paths.get(dynmap.getDataFolder().toURI()).resolve("web/index.html");
			String content = new String(Files.readAllBytes(dynmapWebPath));;

			InputStream injectionStream = this.getResource("injection.html");
			Scanner s = new Scanner(injectionStream).useDelimiter("\\A");
			String injection = s.hasNext() ? s.next() : "";
			injectionStream.close();
			s.close();

            if (content.indexOf("id=\"material-dynmap-script\"") != -1) {
				content = content.replaceFirst("<script[^>]+?id=\"material-dynmap-script\"[^>]+?></script>", injection);
				info("Material Dynmap installation succeeded - updated to v" + version);
				return;
            }

			content = content.replaceFirst("(?=</head>)", "\t" + injection + "\n");
			Files.write(dynmapWebPath, content.getBytes());
        } catch (IOException e) {
            //Simple exception handling, replace with what's necessary for your use case!
            throw new RuntimeException("Material Dynmap v" + version + " installation failed", e);
        }

        info("Material Dynmap v" + version + " installation succeeded");
    }

    public void onDisable() {
    }

}
