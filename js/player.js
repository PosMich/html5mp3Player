define(['jQuery'], function($) {
    var player = function (trackUrls) {
        this.volume = 1;
        this.trackpause = 1;
        this.fadeTime = 5;

        this.trackCount = trackUrls.length;
        this.buffer = [];
        this.FilesLoaded = [];

        /* init audio api */
        this.ctx = new webkitAudioContext();
        this.sources = [];
        this.sourceCurrent;
        this.gainNode;

        this.currTime;
        this.currId;

        this.timeoutfunc;


        for (var i = 0; i<this.trackCount; ++i) {
            this.FilesLoaded[i]=false;
        };

        var that = this
        /* load files into buffer */
        $.each(trackUrls, function(key,val) {
            var req = new XMLHttpRequest();
            req.open("GET", val, true);
            req.responseType = "arraybuffer";
            req.onload = function() {
                /* decode files and store them into the buffer */
                that.ctx.decodeAudioData(req.response, function(b) {
                    that.buffer[key] = b;
                    console.log(that.buffer);
                    that.FilesLoaded[key] = true;
                    $(that).trigger(that.events.FILELOADED, key);
                }, function(err) {console.log("ERROR DECODING AUDIO");});
            };
            req.onerror = function() {
                console.log("ERROR WHILE GETTING AUDIO FILES");
            }
            req.send();
        });
        
        this.statuses = {
            PLAY: "play",
            STOP: "stop",
            PAUSE: "pause"
        };

        this.status = this.statuses.STOP;

        this.events = {
            FILELOADED:     "fileLoaded",
            ALLFILESLOADED: "allFilesLoaded",
        };
        //$(this).on("fileLoaded", function(event, id) {
        //    alert(id+" loaded!!!!");
        //})
    };

    player.prototype.setVolume = function (value) {
        if (value == this.volume)
            return;

        if (value < 0 || value > 1)
            return;

        if (this.gainNode != undefined)
            this.gainNode.gain.value = value;

        this.volume = value;
    };

    player.prototype.play = function(id, offset) {

        offset = (typeof offset !== 'undefined') ? offset : 0;
        id = (typeof id !== 'undefined') ? id : 0;
        
        if (id < 0 || id > this.trackCount-1)
            return;

        // fade out
        /*
        if (this.status == this.statuses.PLAY) {
            this.gainNode.gain.linearRampToValueAtTime(this.volume,this.ctx.currentTime);
            this.gainNode.gain.linearRampToValueAtTime(0,this.ctx.currentTime+this.fadeTime);
        }
        */

        if (typeof this.gainNode !== "undefined") {
            this.gainNode.stop(0);
            this.gainNode.disconnect(0);
        }
        if (typeof this.gainNode !== "undefined") {
            this.sourceCurrent.disconnect(0);
            this.sourceCurrent.stop(0);
        }

        this.sourceCurrent = this.ctx.createBufferSource();
        this.sourceCurrent.buffer = this.buffer[id];

        this.gainNode = this.ctx.createGainNode();
        this.sourceCurrent.connect(this.gainNode);
        
        this.gainNode.connect(this.ctx.destination);
        
        //fade in
        /*
        if (this.status != this.statuses.PAUSE) {
            this.gainNode.gain.linearRampToValueAtTime(0,this.ctx.currentTime);
            this.gainNode.gain.linearRampToValueAtTime(this.volume,this.ctx.currentTime+this.fadeTime);
        }
        */
        
        this.sourceCurrent.start(0,offset);

        this.currId = id;
        this.status = this.statuses.PLAY;

        /* play next song if this one ends */
        var that = this;
        clearTimeout(this.timeoutfunc);
        this.timeoutfunc = setTimeout(function() {
            that.next();
        }, (this.buffer[id].duration+this.trackpause)*1000);
    };

    player.prototype.playPause = function() {
        if (this.status == this.statuses.STOP) {
            this.play();
            return;
        }
        if (this.status == this.statuses.PLAY) {
            this.currTime = this.ctx.currentTime;

            this.status = this.statuses.PAUSE;

            this.sourceCurrent.stop(0);
        } else {
            this.play(this.currId,this.currTime);
        }
    };


    player.prototype.stop = function() {
        this.status = this.statuses.STOP;
        this.sourceCurrent.stop(0);
    };

    player.prototype.next = function() {
        if (this.currId > this.trackCount-1)
            return;
        
        this.play(++this.currId);
    };

    player.prototype.prev = function() {
        if (this.currId == 0)
            return;

        this.play(--this.currId);
    };
    return player;
});