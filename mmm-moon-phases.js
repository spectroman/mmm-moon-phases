/* global Log, Module */
/* MMM2 Module */

/* spectroman's
 * Module: Moon Phases
 *
 * By Spectroman https://juliochegedus.com
 * MIT Licensed.
 */

Module.register("mmm-moon-phases", {
        defaults: {
                updateInterval: 14400 * 1000, // every 2 hours
                initialLoadDelay: 1,
                retryDelay: 2500,
                height: 150,
                width: 150,
//              delay: 0,
                domain: "tycho.usno.navy.mil",
                path: "/gif/phase.gif",
                homeMM: "/home/pi/MagicMirror"
        },

        // Define required scripts.
        getScripts: function() {
                return ["moment.js"];

        },

        getDom: function() {
                var wrapper = document.createElement("div");
                wrapper.style.width = this.config.width + "px";
                wrapper.style.height = this.config.height + "px";
                wrapper.style.overflow = "hidden";
                wrapper.style.position = "relative";

                var img = document.createElement("img");
                img.style.position = "absolute";
                img.style.left = "5px";
                img.style.top = "-15px";
                img.height = this.config.height;
                img.width = this.config.width;
                img.src = this.imgmoon;
                wrapper.appendChild(img);
                return wrapper;
        },

        // Define start sequence.
        start: function() {
                Log.info("Starting module: " + this.name);

                this.loaded = false;
                this.scheduleUpdate(this.config.initialLoadDelay);
                this.updateTimer = null;

        },

        updateMoon: function() {
                var self = this;
                self.sendSocketNotification("BRING_MOON", { homeMM: this.config.homeMM, domain: this.config.domain, path: this.config.path } );
        },

        socketNotificationReceived: function(notification, payload) {
                if(notification === "MOON"){
                        this.imgmoon=payload
                        if (typeof this.imgmoon !== "undefined") {
                            this.loaded=true;
                            this.updateDom();
                        };
                        this.scheduleUpdate();
                }

        },

        scheduleUpdate: function(delay) {
                var nextLoad = this.config.updateInterval;
                if (typeof delay !== "undefined" && delay >= 0) {
                        nextLoad = delay;
                }

                var self = this;
                clearTimeout(this.updateTimer);
                this.updateTimer = setTimeout(function() {
                        self.updateMoon();
                }, nextLoad);
        },

});
