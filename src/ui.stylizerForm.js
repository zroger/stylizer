(function($){

$.widget('ui.stylizerForm', {
  _init: function() {
    var group, prop, obj, html, value, groupElement, formItem, i;
    var data = this.options.elements;
    var $table = $('<table></table>').appendTo(this.element);
    var $tr = $('<tr></tr>').appendTo($table);
    for (group in data) {
      html = '<td><div id="ui-stylizer-group-' + group + '" class="ui-stylizer-form-group"></div></td>';
      groupElement = $(html).appendTo($tr).find('.ui-stylizer-form-group');

      for (i = 0; i < data[group].length; i++) {
        prop = data[group][i];
        info = $.ui.stylizer.elements[prop];
        info.id = 'ui-stylizer-input-' + prop;
        info.property = prop;
        info.selector = this.options.selector;
        formItem = $('<div class="form-item" />').appendTo(groupElement).stylizerInput(info);
      }
    }
  },

  activate: function(selector) {
    this.element.find('.ui-stylizer-input-wrapper').stylizerInput('activate', selector);
  },

  enable: function() {
    this.element.find('.ui-stylizer-input-wrapper').stylizerInput('enable');
  },

  disable: function() {
    this.element.find('.ui-stylizer-input-wrapper').stylizerInput('disable');
  }
  
  
});

$.extend($.ui.stylizerForm, {
  version: '1.7.2',
  defaults: {
    elements: [],
    selector: null
  }
});

}(jQuery));