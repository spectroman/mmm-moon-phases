var http = require('http');
var fs = require('fs');
var del = require('del');
var request = require('request');
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

        start: function() {
                console.log("Starting node helper: " + this.name);

        },

        socketNotificationReceived: function(notification, payload) {
                var self = this;
                console.log("Downloading moon img with signal: " + notification + " From URL: " + payload.domain + payload.path);

                var options = { host: payload.domain, path: payload.path, strictSSL : false, rejectUnauthorized : false };

                if(notification === "BRING_MOON"){

                        var request = http.get(options, function (response) {
                                var imagedata = '';
                                del([payload.homeMM+'/modules/mmm-moon-phases/cache/*.gif']);
                                var cache_file = '/modules/mmm-moon-phases/cache/moon-'+new Date().getTime()+'.gif';

                                var newimage = fs.createWriteStream(payload.homeMM+cache_file);

                                response.pipe(newimage);
                                newimage.on('finish',function() { newimage.close(); });
                                self.sendSocketNotification("MOON", cache_file);
                        });

                }

        },
});
