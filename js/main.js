require({
    appDir: "../",
    baseUrl: "js",
    waitSeconds: 15,
    paths: {
        "jQuery": [
            "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
            "../vendor/jquery-2.0.0.min"
        ]
    },
    shim: {
        "jQuery": {
            exports: "$"
        }
    }
},
["jQuery", "player","model", "controller", "views/view1"],
    function($, player, playaModel, playaController, playaView1) {
        var model = new playaModel(player);
        /*$(model).on("Player.volume", function() { console.log("EVENT: Volume changed");});
        $(model).on("Player.fileLoaded", function() { console.log("EVENT: Player.fileLoaded");});
        $(model).on("Player.allFilesLoaded", function() { console.log("EVENT: Player.allFilesLoaded");});
        $(model).on("Player.play", function() { console.log("EVENT: Player.play");});
        $(model).on("Player.pause", function() { console.log("EVENT: Player.pause");});
        $(model).on("Player.stop", function() { console.log("EVENT: Player.stop");});
        $(model).on("Player.next", function() { console.log("EVENT: Player.next");});
        $(model).on("Player.prev", function() { console.log("EVENT: Player.prev");});*/

;        //var controller = new playaController(model);
        //var playaView1 = new playaView1(model, $('.playaView1'));
});