define(['jQuery'], function($) {
    var AbstractView = function(model, $element) {
        this.model = model;
        this.$element = $element;
        $(model).on('change', this.render.bind(this));

    };
    AbstractView.prototype.render = function() {
    };
    return AbstractView;
});