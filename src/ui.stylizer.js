(function($) {

$.widget('ui.stylizer', {
  _init: function() {
    this.element.addClass('ui-stylizer');

    this.titleBar = $('<div />')
      .addClass('ui-widget-header ui-stylizer-titlebar ui-helper-clearfix fg-toolbar')
      .append('<div class="ui-stylizer-title">' + this.options.title + '</div>')
      .appendTo(this.element);
    this._setTitle(this.options.title);

    this._addButton('Close', 'ui-icon-triangle', function() {
      $('.ui-stylizer').stylizer('toggle');
    });
    this._addButton('Export', 'ui-icon-disk', function() {
      $('.ui-stylizer').stylizer('exportCSS');
    });
    
    this._buildSelectorWidget();

    this.content = $('<div class="ui-widget-content ui-helper-clearfix" />')
      .hide()
      .appendTo(this.element);
      
    this.spacer = $('<div class="ui-stylizer-spacer" />')
      .appendTo('body');

    var self = this;
    // this.content.load('stylizer.form.html', function() {
      self._afterLoad();
    // });

    for (var i in this.options.selectors) {
      var title = this.options.selectors[i];
      $(i).stylable({selector: i, title: title});
    }

    $(window).unload(function() {
      $('.ui-stylizer').stylizer('sessionSave');
    });
    this.sessionLoad();
  },
  
  _addButton: function(text, icon, callback) {
    var html = '<a class="ui-stylizer-titlebar-button ui-state-default ui-corner-all">';
    if (icon) {
      html += '<span class="ui-icon ' + icon + '" />';
    }
    html += text + '</a>';
    
    $(html)
      .appendTo(this.titleBar)
      .click(callback)
      .hover(
        function() { $(this).addClass('ui-state-hover'); },
        function() { $(this).removeClass('ui-state-hover'); }
      );
  },
  
  _buildSelectorWidget: function() {
    this.selector = $('<select id="ui-stylizer-selector"></select>')
      .appendTo(this.titleBar.find('.ui-stylizer-title'));
    $('<option value="">-- Select an element --</option>').appendTo(this.selector);
    for (var i in this.options.selectors) {
      var title = this.options.selectors[i];
      $('<option value="' + i + '">' + title + '</option>').appendTo(this.selector);
    }
    this.selector.change(function() {
      $($(this).val()).eq(0).stylable('activate');
    });
  },

  _afterLoad: function() {
    this.content.empty();
    var self = this;
    var group, prop, obj, html, value, groupElement, formItem;
    var data = $.ui.stylizer.elements;
    var $table = $('<table></table>').appendTo(this.content);
    var $tr = $('<tr></tr>').appendTo($table);
    for (group in data) {
      html = '<td><div id="ui-stylizer-group-' + group + '" class="ui-stylizer-form-group"></div></td>';
      groupElement = $(html).appendTo($tr).find('.ui-stylizer-form-group');

      for (prop in data[group]) {
        obj = data[group][prop];
        obj.id = 'ui-stylizer-input-' + prop;
        obj.property = prop;
        formItem = $('<div class="form-item" />').appendTo(groupElement).stylizerInput(obj);
        // switch (obj.type) {
        //   case 'select':
        //     formItem.append(self._createSelect(obj));
        //     break;
        // 
        //   case 'number':
        //     formItem.append(self._createNumber(obj));
        //     break;
        // 
        //   case 'color':
        //     formItem.append(self._createColor(obj));
        //     break;
        // }
        // console.log(obj);
        // formItem.wrapInner('<div class="form-widget" />');
        // formItem.prepend('<label for="' + obj.id + '">' + obj.title + ': </label>');
      }
    }
    
    var h = 0;
    self.content.show();
    self.content.find('.ui-stylizer-form-group').each(function() {
      h = Math.max(h, $(this).outerHeight());
    });
    self.content.hide();
    self.content.height(h);
  },
  
  _createSelect: function(obj) {
    html = '<select id="' + obj.id + '" rel="' + obj.property + '">';
    for (value in obj.options) {
      html += '<option value="' + value + '">' + obj.options[value] + '</option>';
    }
    html += '</select>';
    return $(html).stylizerInput();
  },
  
  _createColor: function(obj) {
    html = '<input type="text" size="10" id="' + obj.id + '" rel="' + obj.property + '" />';
    //return $(html).stylizerInput(obj);
    return $(html);
  },
  
  _createNumber: function(obj) {
    html = '<input type="text" size="10" id="' + obj.id + '" rel="' + obj.property + '" />';
    return $(html).stylizerInput(obj);
  },
  
  _setTitle: function(newValue) {
    return;
    newValue = newValue || this.options.title;
    var current = this.currentSelector ? this.options.selectors[this.currentSelector] : 'Select an item to start';
    var replace = '<span class="ui-stylizer-current">' + current + '</span>';
    newValue = newValue.replace('%current', replace);
    this.element.find('.ui-stylizer-title').html(newValue);
  },

  _setData: function(key, value) {
    switch (key) {
      case 'title':
        this._setTitle(value);
        break;
    }
    $.widget.prototype._setData.apply(this, arguments);
  },

  show: function() {
    var self = this;
    this.content.slideDown('slow', function() {
      self.spacer.height(self.element.height());
    });
    this.titleBar.find('.ui-icon-triangle-1-n')
      .removeClass('ui-icon-triangle-1-n')
      .addClass('ui-icon-triangle-1-s');
  },
  
  hide: function() {
    var self = this;
    this.content.slideUp('slow', function() {
      self.spacer.height(0);
    });
    this.unloadSelector();
    this.titleBar.find('.ui-icon-triangle-1-s')
      .removeClass('ui-icon-triangle-1-s')
      .addClass('ui-icon-triangle-1-n');
  },
  
  toggle: function() {
    if (this.content.is(':hidden')) {
      this.show();
    }
    else {
      this.hide();
    }
  },
  
  loadSelector: function(selector) {
    this.currentSelector = selector;
    //this.selector.val(selector);
    this.content.find(':input').each(function() {
      $(this).stylizerInput('option', 'selector', selector);
    });
    this._setTitle();
  },
  
  unloadSelector: function() {
    this.currentSelector = '';
    this.content.find(':input').each(function() {
      $(this).stylizerInput('option', 'selector', '');
    });
    this._setTitle();
  },
  
  edit: function(element) {
    if (!element) {
      this.unloadSelector();
      return;
    }

    var selector = $(element).stylable('option', 'selector');
    if (this.content.is(':hidden')) {
      this.show();
    }
    this.loadSelector(selector);
  },
  
  getExport: function() {
    var o = {};
    for (i in this.options.selectors) {
      o[i] = $(i).stylable('export');
    }
    return o;
  },
  
  exportCSS: function() {
    var o = this.getExport();
    var html = '<pre class="ui-stylizer-export">';
    for (selector in o) {
      html += selector + "{\n";
      for (prop in o[selector]) {
        html += "  " + prop + ": " + o[selector][prop] + ";\n";
      }
      html += "}\n\n";
    }
    html += "</pre>";
    
    $(html).dialog();
  },
  
  sessionSave: function() {
    var json = this.getExport().toSource();
    document.cookie = this.options.sessionCookie + "=" + json + "; path=/";
  },
  
  sessionLoad: function() {
    var json = '';
  	var ca = document.cookie.split(';');
  	for(var i=0;i < ca.length;i++) {
  		var c = ca[i];
  		while (c.charAt(0)==' ') c = c.substring(1,c.length);
  		if (c.indexOf(this.options.sessionCookie) == 0) {
  		  json = c.split('=')[1];
  		  break;
  		}
  	}
    
    if (json) {
      var data = window["eval"]("(" + json + ")");
      for (selector in data) {
        for (prop in data[selector]) {
           $(selector).stylable('applyStyle', prop, data[selector][prop]);
        }
      }
      console.log(data);
    }
    else {
      console.log('nothing to load');
    }
  }
});

$.extend($.ui.stylizer, {
  version: "1.7.2",
  defaults: {
    selectors: {},
    title: 'Stylizer: '
  },
  configs: {
    'all': [
      ['font-family', 'font-size', 'font-weight', 'font-style', 'color', 'line-height'],
      ['padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'],
      ['border-top-width', 'border-bottom-width', 'border-left-width', 'border-right-width', 'border-color', 'border-style']
    ]
  },
  elements: {
    'font-settings': {
      'font-family': {title: 'Font', type: 'select', options: {
        'arial': 'Arial',
        'courier': 'Courier',
        'georgia': 'Georgia',
        'tahoma': 'Tahoma',
        'trebuchet ms': 'Trebuchet MS',
        'verdana': 'Verdana'
      }},
      'font-size': {title: 'Font size', type: 'number', min: 8, max: 300},
      'font-weight': {title: 'Font weight', type: 'select', options: {
        'normal': 'Normal',
        'bold': 'Bold'
      }},
      'font-style': {title: 'Font style', type: 'select', options: {
        'normal': 'Normal',
        'italic': 'Italic'
      }},
      'color': {title: 'Text color', type: 'color'},
      'line-height': {title: 'Line height', type: 'number', min: 8, max: 300}
    },

    'spacing': {
      'padding-top':    {title: 'Padding top', type: 'number', min: 0},
      'padding-bottom': {title: 'Padding bottom', type: 'number', min: 0},
      'padding-left':   {title: 'Padding left', type: 'number', min: 0},
      'padding-right':  {title: 'Padding right', type: 'number', min: 0},

      'margin-top':    {title: 'Margin top', type: 'number'},
      'margin-bottom': {title: 'Margin bottom', type: 'number'},
      'margin-left':   {title: 'Margin left', type: 'number'},
      'margin-right':  {title: 'Margin right', type: 'number'}
    },

    border: {
      'border-top-width':    {title: 'Border top', type: 'number', min: 0},
      'border-bottom-width': {title: 'Border bottom', type: 'number', min: 0},
      'border-left-width':   {title: 'Border left', type: 'number', min: 0},
      'border-right-width':  {title: 'Border right', type: 'number', min: 0},
      'border-color': {title: 'Border color', type: 'color'},
      'border-style': {title: 'Border style', type: 'select', 'options': {
        'none': 'None', 
        'dotted': 'Dotted',
        'dashed': 'Dashed',
        'solid': 'Solid',
        'double': 'Double',
        'groove': 'Groove',
        'ridge': 'Ridge',
        'inset': 'Inset',
        'outset': 'Outset'
      }}
    }  
  },
  getter: 'getExport'
});

})(jQuery);