(function($) {

$.widget('ui.stylable', {
  indicator: false,

  _init: function() {
    this.element
      .addClass('ui-stylable')
      .click(function() {
        if (!$(this).is('body')) {
          $(this).stylable('activate');
        }
        return false;
      });

    if (this.options.useIndicator && !this.element.is('body')) {
      this._createIndicator();
    }

    this.deactivate();

    this.newStyles = {};
  },

  activate: function() {
    this.activated = true;
    this.showIndicator();
    //$('.ui-stylizer').stylizer('edit', this.element);
    $('.ui-stylizer').stylizer('edit', this.element);
    $('.ui-stylable').not(this.element).stylable('deactivate');
    this.element[0].scrollIntoView();
  },

  deactivate: function() {
    this.activated = false;
    this.hideIndicator();
  },
  
  _createIndicator: function() {
    var html = '<div class="ui-stylable-indicator ui-corner-all"></div>';
    this.indicator = $(html)
      .attr('title', this.options.title)
      .appendTo('body')
      .data('stylable', this)
      .click(function() {
        var widget = $(this).data('stylable');
        widget.activate();
      })
      .mouseout(function() {
        var widget = $(this).data('stylable');
        if (!widget.active) {
          widget.deactivate();
        }
      });
    this.element.mouseover(function(e) {
      $(this).stylable('showIndicator');
      e.stopPropagation();
    });

    this._positionIndicator();
  },
  
  _positionIndicator: function() {
    if (!this.indicator) return;

    this.indicator
      .css(this.element.offset())
      .width(this.element.outerWidth())
      .height(this.element.outerHeight());
  },

  showIndicator: function() {
    if (!this.indicator) return;

    this._positionIndicator();
    this.indicator.show();
    $('.ui-stylable').not(this.element).stylable('hideIndicator');
  },

  hideIndicator: function() {
    if (!this.indicator) return;

    this.indicator.hide();
  },

  applyStyle: function(property, value) {
    this.newStyles[property] = value;
    this.element.css(property, value);
    this._positionIndicator();
  },

  export: function() {
    return this.newStyles;
  }
});

$.extend($.ui.stylable, {
  version: "1.7.2",
  defaults: {
    selector: '',
    title: '',
    sessionCookie: '',
    useIndicator: true,
    form: 'default'
  },
  getter: 'export'
});

})(jQuery);