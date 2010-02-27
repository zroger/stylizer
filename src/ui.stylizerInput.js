(function($) {
  
$.widget('ui.stylizerInput', {
  _init: function() {
    this.element.addClass('ui-stylizer-input-wrapper');
    
    this.inputType = '';
    if ($.ui.stylizerInput.inputs[this.options.type]) {
      this.inputType = $.ui.stylizerInput.inputs[this.options.type];
    }
    else {
      this.inputType = $.ui.stylizerInput.inputs.default;
    }
    
    this.label = $('<label>' + this.options.title + '</label>')
      .attr('for', this.options.id)
      .appendTo(this.element);
    this.input = $('<div />').appendTo(this.element);
    this.input[this.inputType](this.options);

    this.refresh();
  },
  
  _setData: function(key, value) {
    $.widget.prototype._setData.apply(this, arguments);
    this.refresh();
  },

  activate: function(selector) {
    this.options.selector = selector;
    this.input[this.inputType]('option', 'selector', selector);
    this.enable();
  },

  enable: function() {
    if (!this.options.selector) {
      this.disable();
      return;
    }
    this.input[this.inputType]('enable');
  },
  
  disable: function() {
    this.input[this.inputType]('disable');
  },
  
  refresh: function() {
    this.input[this.inputType]('refresh');
  },

  applyStyle: function() {
    var val = this.value();
    $(this.options.selector).stylable('applyStyle', this.options.property, val);
  },

  value: function() {
    return this.input[this.inputType]('value');
  },

  defaultValue: function() {
    return this.input[this.inputType]('defaultValue');
  },

  currentValue: function() {
    return this.input[this.inputType]('currentValue');
  }
  
});

$.extend($.ui.stylizerInput, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  inputs: {
    'default': 'stylizerInputDefault',
    'number': 'stylizerInputNumber',
    'color': 'stylizerInputColor',
    'select': 'stylizerInputSelect'
  },
  getter: 'value'
});

/**
 * Stylizer Input Base class.
 */
$.ui.stylizerInputBase = {
  input: null,

  _init: function() {
    this.element.addClass('ui-stylizer-input');
    this._initInput();
    this.input.bind('focus', {widget: this.widgetName}, function(e) {
      $(this).parents('.ui-stylizer-input')[e.data.widget]('refresh');
    });
    this.refresh();
  },
  
  _initInput: function() {},

  value: function(newValue) {
    var undefined;
    if (newValue != undefined) {
      this.input.val(newValue);
      this.update();
    }
    return this.input.val();
  },

  _setData: function(key, value) {
    $.widget.prototype._setData.apply(this, arguments);
    this.refresh();
  },

  enable: function() {
    this.input.removeAttr('disabled');
  },
  
  disable: function() {
    this.input.val('');
    this.input.attr('disabled', 'disabled');
  },
  
  refresh: function() {
    if (this.options.selector) {
      this.input.val(this.currentValue());
      this.enable();
    }
    else {
      this.disable();
    }
  },
  
  defaultValue: function() {
    $(this.options.selector).css(this.property, '');
    var val = this._normalizeValue($(this.options.selector).css(this.options.property));
    return val;
  },

  currentValue: function() {
    if (!this.options.selector) {
      return '';
    }
    var val = $(this.options.selector).css(this.options.property);
    return this._normalizeValue(val);
  },

  _normalizeValue: function(val) {
    return val;
  },
  
  update: function() {
    this.element.parents('.ui-stylizer-input-wrapper').stylizerInput('applyStyle');
  }

};

$.widget('ui.stylizerInputDefault', $.extend({}, $.ui.stylizerInputBase, {
  _initInput: function() {
    this.input = $('<input type="text" class="form-text" />')
      .attr('id', this.options.id)
      .attr('rel', this.options.property)
      .appendTo(this.element)
      .change(function() {
        $(this).parents('.ui-stylizer-input-wrapper').stylizerInput('applyStyle');
      });
  }  
}));

$.extend($.ui.stylizerInputDefault, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  getter: 'value'
});

$.widget('ui.stylizerInputNumber', $.extend({}, $.ui.stylizerInputBase, {
  _initInput: function() {
    this.input = $('<input type="text" class="form-text" size="10" />')
      .attr('id', this.options.id)
      .attr('rel', this.options.property)
      .appendTo(this.element)
      .change(function() {
        $(this).parents('.ui-stylizer-input-wrapper').stylizerInput('applyStyle');
      })
      .keypress(function(e) {
        // Up
        if (e.keyCode == 40) {
          var val = $(this).parents('.ui-stylizer-input').stylizerInputNumber('value');
          val = parseInt(val, 10);
          $(this).parents('.ui-stylizer-input')
            .stylizerInputNumber('value', (val - 1) + 'px');
          return false;
        }
        else if (e.keyCode == 38) {
          var val = $(this).parents('.ui-stylizer-input').stylizerInputNumber('value');
          val = parseInt(val, 10);
          $(this).parents('.ui-stylizer-input')
            .stylizerInputNumber('value', (val + 1) + 'px');
          return false;
        }
      });
  }
}));

$.extend($.ui.stylizerInputNumber, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  getter: 'value'
});

$.widget('ui.stylizerInputSelect', $.extend({}, $.ui.stylizerInputBase, {
  _initInput: function() {
    this.input = $('<select class="form-select"></select>')
      .attr('id', this.options.id)
      .attr('rel', this.options.property)
      .appendTo(this.element)
      .change(function() {
        $(this).parents('.ui-stylizer-input-wrapper').stylizerInput('applyStyle');
      });

    var i;
    for (i in this.options.options) {
      $('<option value="' + i + '">' + this.options.options[i] + '</option>').appendTo(this.input);
    }
  }
}));

$.extend($.ui.stylizerInputSelect, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  getter: 'value'
});

$.widget('ui.stylizerInputColor', $.extend({}, $.ui.stylizerInputBase, {
  _initInput: function() {
    this.input = $('<input type="text" class="form-text" size="10" />')
      .attr('id', this.options.id)
      .attr('rel', this.options.property)
      .appendTo(this.element)
      .change(function() {
        $(this).parents('.ui-stylizer-input-wrapper').stylizerInput('applyStyle');
      });
  },
  
  _normalizeValue: function(val) {
    var rgb;
    if (val == "" || val == "transparent") {
      return val;
    }
    else if (val.match(/^#[0-9a-fA-F]$/)) {
      return val;
    }
    else if (rgb = val.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)) {
      var hex = function(rgb) {
        return parseInt(rgb[1], 10).toString(16);
      }
      return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
    return '';
    //return val;
  }  

}));

$.extend($.ui.stylizerInputColor, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  getter: 'value'
});



}(jQuery));
