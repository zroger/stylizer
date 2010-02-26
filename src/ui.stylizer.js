(function($) {

$.widget('ui.stylizer', {
  forms: [],
  
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

    this._buildForm('default', $.ui.stylizer.configs.default);

    for (var i in this.options.selectors) {
      var title = this.options.selectors[i];
      $(i).stylable({selector: i, title: title});
    }

    this._resizeSpacer();

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

  _buildForm: function(name, elements, reset) {
    if (reset && this.forms[name]) {
      this.forms[name].remove();
      this.forms[name] = null;
    }

    if (!this.forms[name]) {
      this.forms[name] = $('<div />')
        .appendTo(this.content)
        .stylizerForm({
          elements: elements
        });
    }
  },
  
  _activateForm: function(name, selector) {
    this._buildForm(name);
    for(i in this.forms) {
      this.forms[i].hide().stylizerForm('disable');
    }
    this.forms[name].show();
    if (selector) {
      this.forms[name].stylizerForm('activate', selector);
    }
    this.forms[name].stylizerForm('enable');
  },

  _setTitle: function(newValue) {
    return;
  },

  _setData: function(key, value) {
    switch (key) {
      case 'title':
        this._setTitle(value);
        break;
    }
    $.widget.prototype._setData.apply(this, arguments);
  },

  _resizeSpacer: function() {
    this.spacer.height(this.element.height());
  },
  
  show: function(form) {
    this._activateForm(form);

    var self = this;
    this.content.slideDown('slow', function() {
      self._resizeSpacer();
    });
    this.titleBar.find('.ui-icon-triangle-1-n')
      .removeClass('ui-icon-triangle-1-n')
      .addClass('ui-icon-triangle-1-s');
  },
  
  hide: function() {
    var self = this;
    this.content.slideUp('slow', function() {
      self._resizeSpacer();
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
  
  refresh: function() {
    if (this.currentSelector) {
      this.selector.val(this.currentSelector);
    }
  },

  loadSelector: function(selector) {
    this.currentSelector = selector;
    this.refresh();
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
    
    var form = $(element).stylable('option', 'form');
    this._activateForm(form, selector);
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
    'default': [
      ['font-family', 'font-size', 'font-weight', 'font-style', 'color', 'line-height'],
      ['padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'],
      ['border-top-width', 'border-bottom-width', 'border-left-width', 'border-right-width', 'border-color', 'border-style']
    ]
  },
  getter: 'getExport'
});

})(jQuery);