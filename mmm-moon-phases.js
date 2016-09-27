Module.register("mmm-moon-phases", {
        defaults: {
                updateInterval: 86400 * 1000 // every day
        },
        getDom: function() {
                // fetch a picture, that changes daily but it has the same name - many sites can provide that
                // api.usno.navy.mil/imagery/moon.png is in reality 1024x1024 but we show by default at 200px x 200px
                var src = "http://api.usno.navy.mil/imagery/moon.png";

                var style = "position: absolute; left: 5px; top: -35px;";

                var img = "<img height='200' width='200' src='" + src + "' style='" + style + "'>";

                var wrapper = document.createElement("div");
                wrapper.style.width = "200px";
                wrapper.style.height = "200px";
                wrapper.style.overflow = "hidden";
                wrapper.style.position = "relative";
                wrapper.innerHTML = img;
                return wrapper;
        },
        start: function() {
                var self = this;
                setInterval(function() {
                        self.updateDom(); // no speed defined, so it updates instantly.
                }, this.config.updateInterval);
        },
});
