(function($) {
  
$.widget('ui.stylizerInput', {
  _init: function() {
    this.element
      .addClass('ui-stylizer-input')
      .change(function() {
        $(this).stylizerInput('applyStyle');
      });
    
    this.widgetType = '';
    if ($.ui.stylizerInput.widgets[this.options.type]) {
      this.widgetType = $.ui.stylizerInput.widgets[this.options.type];
    }
    else {
      this.widgetType = $.ui.stylizerInput.widgets.default;
    }

    this.element[this.widgetType](this.options);

    this.refresh();
  },
  
  _setData: function(key, value) {
    $.widget.prototype._setData.apply(this, arguments);
    this.refresh();
  },

  enable: function() {
    this.element.removeAttr('disabled');
  },
  
  disable: function() {
    this.element.val('');
    this.element.attr('disabled', 'disabled');
  },
  
  refresh: function() {
    if (this.options.selector) {
      this.element.val(this.currentValue());
      this.enable();
    }
    else {
      this.disable();
    }
  },

  applyStyle: function() {
    var val = this.element.val();
    console.log(val);
    $(this.options.selector).stylable('applyStyle', this.property, val);
  },

  value: function() {
    return this._normalizeValue(this.element.val());
  },

  defaultValue: function() {
    $(this.options.selector).css(this.property, '');
    var val = this._normalizeValue($(this.options.selector).css(this.property));
    return val;
  },

  currentValue: function() {
    var val = this._normalizeValue($(this.options.selector).css(this.property));
    return val;
  },

  _normalizeValue: function(val) {
    switch (this.property) {
      case 'font-family':
        val = val.split(',')[0].replace(/^\s*/, "").replace(/\s*$/, "").toLowerCase();
        break;
      case 'color':
        if (val.match(/^#[0-9a-fA-F]$/)) {
          return val;
        }
        return $.ui.stylizerInput.rgb2hex(val);
    }
    return val;
  }
  
});

$.extend($.ui.stylizerInput, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  widgets: {
    'default': 'stylizerWidgetDefault',
    'number': 'stylizerWidgetNumber',
    // 'color': 'stylizerWidgetColor',
    'select': 'stylizerWidgetSelect'
  },

  //Function to convert hex format to a rgb color
  rgb2hex: function(rgb) {
   rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
   function hex(x) {
    hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
   }
   return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
});

/**
 * Stylizer Widget Base class.
 */
$.ui.stylizerWidgetBase = {
  label: null,
  widget: null,
  value: function(newValue) {
    return this.widget.val(newValue);
  }
};

$.widget('ui.stylizerWidgetDefault', $.extend({}, $.ui.stylizerWidgetBase, {
  _init: function() {
    this.widget = $('<input type="text" class="form-text" />')
      .attr('id', this.options.id)
      .attr('rel', this.options.property)
      .appendTo(this.element)
      .wrap('<div class="form-widget" />');

    this.label = $('<label>' + this.options.title + '</label>')
      .attr('for', this.options.id)
      .prependTo(this.element);
  }
}));

$.extend($.ui.stylizerWidgetDefault, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  getter: 'value',
  setter: 'value'
});

$.widget('ui.stylizerWidgetNumber', $.extend({}, $.ui.stylizerWidgetBase, {
  _init: function() {
    this.widget = $('<input type="text" class="form-text" size="10" />')
      .attr('id', this.options.id)
      .attr('rel', this.options.property)
      .appendTo(this.element)
      .wrap('<div class="form-widget" />');

    this.label = $('<label>' + this.options.title + '</label>')
      .attr('for', this.options.id)
      .prependTo(this.element);
  }
}));

$.extend($.ui.stylizerWidgetNumber, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  getter: 'value',
  setter: 'value'
});

$.widget('ui.stylizerWidgetSelect', $.extend({}, $.ui.stylizerWidgetBase, {
  _init: function() {
    console.log(this.options);
    this.widget = $('<select class="form-select"></select>')
      .attr('id', this.options.id)
      .attr('rel', this.options.property)
      .appendTo(this.element)
      .wrap('<div class="form-widget" />');

    var i;
    for (i in this.options.options) {
      console.log(i);
      console.log(this.options.options[i]);
      $('<option value="' + i + '">' + this.options.options[i] + '</option>').appendTo(this.widget);
    }

    this.label = $('<label>' + this.options.title + '</label>')
      .attr('for', this.options.id)
      .prependTo(this.element);
  }
}));

$.extend($.ui.stylizerWidgetSelect, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  getter: 'value',
  setter: 'value'
});



}(jQuery));
