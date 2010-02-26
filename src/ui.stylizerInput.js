(function($) {
  
$.widget('ui.stylizerInput', {
  _init: function() {
    this.element
      .addClass('ui-stylizer-input-wrapper')
      .change(function() {
        $(this).stylizerInput('applyStyle');
      });
    
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
  inputs: {
    'default': 'stylizerInputDefault',
    'number': 'stylizerInputNumber',
    // 'color': 'stylizerInputColor',
    'select': 'stylizerInputSelect'
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
 * Stylizer Input Base class.
 */
$.ui.stylizerInputBase = {
  label: null,
  input: null,
  value: function(newValue) {
    return this.input.val(newValue);
  }
};

$.widget('ui.stylizerInputDefault', $.extend({}, $.ui.stylizerInputBase, {
  _init: function() {
    this.element.addClass('ui-stylizer-input');

    this.input = $('<input type="text" class="form-text" />')
      .attr('id', this.options.id)
      .attr('rel', this.options.property)
      .appendTo(this.element);
  }
}));

$.extend($.ui.stylizerInputDefault, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  getter: 'value',
  setter: 'value'
});

$.widget('ui.stylizerInputNumber', $.extend({}, $.ui.stylizerInputBase, {
  _init: function() {
    this.element.addClass('ui-stylizer-input');

    this.input = $('<input type="text" class="form-text" size="10" />')
      .attr('id', this.options.id)
      .attr('rel', this.options.property)
      .appendTo(this.element);
  }
}));

$.extend($.ui.stylizerInputNumber, {
  version: "1.7.2",
  defaults: {
    selector: '',
    type: 'default'
  },
  getter: 'value',
  setter: 'value'
});

$.widget('ui.stylizerInputSelect', $.extend({}, $.ui.stylizerInputBase, {
  _init: function() {
    this.element.addClass('ui-stylizer-input');

    this.input = $('<select class="form-select"></select>')
      .attr('id', this.options.id)
      .attr('rel', this.options.property)
      .appendTo(this.element);

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
  getter: 'value',
  setter: 'value'
});



}(jQuery));
