define(['jQuery', 'player'], function($, player) {
    var playaModel = function () {
        var that = this;
        window.p = this;
        this.Player = {};
        this.trackOrder = [];
        this.current = 0;

        $.getJSON("tracklist.json", function(data) {
            that.tracks=data.tracks;
            that.trackCount = data.tracks.length; 
            var trackUrls = [];
            for (var i = 0; i<that.trackCount; ++i) {
                trackUrls.push(that.tracks[i].url);
                that.trackOrder.push({"id":i});
            };

            that.Player = new player(trackUrls);
            
            $(that.Player).on("fileLoaded", function(event, id) {
                alert(id+" loaded!!!! that.Player");
            });
        });


        $(this.Player).on("fileLoaded", function(event, id) {
            alert(id+" loaded!!!! this.Player");
        });

    };


    playaModel.prototype.setVolume = function (value) {
        console.log("model.setVolume");
        this.Player.setVolume(value);
    };
    playaModel.prototype._play = function(id) {
        console.log("model._play");
        this.Player._play(id);
    };
    playaModel.prototype.playPause = function() {
        console.log("model.playPause");
        this.Player.playPause();
    };
    playaModel.prototype.stop = function() {
        console.log("model.stop");
        this.current = 0;
        this.Player.stop();
    };
    playaModel.prototype.next = function() {
        if (this.current == this.trackCount-1)
            return

        this.play(this.trackOrder[++this.current].id);
    };
    playaModel.prototype.prev = function() {
        if (this.current == 0)
            return

        this.Player.prev(this.trackOrder[--this.current].id);
    };


    playaModel.prototype.getArtist = function(id) {
        id = (typeof id !== 'undefined') ? id : this.Player.currId;
        return this.tracks[id].artist;
    };
    playaModel.prototype.getTitle = function(id) {
        id = (typeof id !== 'undefined') ? id : this.Player.currId;
        return this.tracks[id].title;
    };
    playaModel.prototype.getGenre = function(id) {
        id = (typeof id !== 'undefined') ? id : this.Player.currId;
        return this.tracks[id].genre;
    };
    playaModel.prototype.getAlbum = function(id) {
        id = (typeof id !== 'undefined') ? id : this.Player.currId;
        return this.tracks[id].album;
    };
    playaModel.prototype.getCurrentId = function() {
        return this.Player.currId;
    };
    playaModel.prototype.getTrackList = function() {
        return this.tracks;
    };

    return playaModel;
});