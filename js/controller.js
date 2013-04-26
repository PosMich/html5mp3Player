define([], function() {
    var TimeController = function (model) {
        this.model = model;
    };

    TimeController.prototype.decTimezoneOffset = function () {
        this.model.setTimezoneOffset(this.model.getTimezoneOffset() - 1);
    };

    TimeController.prototype.incTimezoneOffset = function () {
        this.model.setTimezoneOffset(this.model.getTimezoneOffset() + 1);
    };
    return TimeController;
});