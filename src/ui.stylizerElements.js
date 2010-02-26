(function($) {

  var stdUnits = {
    'px': 'px',
    'em': 'em',
    '%': '%'
  };
  var borderStyles = {
    'none': 'None',
    'dotted': 'Dotted',
    'dashed': 'Dashed',
    'solid': 'Solid',
    'double': 'Double',
    'groove': 'Groove',
    'ridge': 'Ridge',
    'inset': 'Inset',
    'outset': 'Outset'
  };

  $.extend($.ui.stylizer, {
    elements: {
      'background-attachment': {
        title: 'Background attachment',
        type: 'select',
        options: {
          'scroll': 'Scroll',
          'fixed': 'Fixed'
        }
      },
      'background-color': {
        title: 'Background color',
        type: 'color'
      },
      'background-image': {
        title: 'Background image',
        type: 'file'
      },
      'background-position': {
        title: 'Background position',
        type: 'text'
      },
      'background-repeat': {
        title: 'Background repeat',
        type: 'select',
        options: {
          'repeat': 'Repeat',
          'repeat-x': 'Repeat X',
          'repeat-y': 'Repeat Y',
          'no-repeat': 'No repeat'
        }
      },

      'border-color': {
        title: 'Border color',
        type: 'color'
      },
      'border-style': {
        title: 'Border style',
        type: 'select',
        options: borderStyles
      },
      'border-width': {
        title: 'Border width',
        type: 'number',
        units: stdUnits
      },

      'border-bottom-color': {
        title: 'Border bottom color',
        type: 'color'
      },
      'border-bottom-style': {
        title: 'Border bottom style',
        type: 'select',
        options: borderStyles
      },
      'border-bottom-width': {
        title: 'Border bottom width',
        type: 'number',
        units: stdUnits
      },

      'border-left-color': {
        title: 'Border left color',
        type: 'color'
      },
      'border-left-style': {
        title: 'Border left style',
        type: 'select',
        options: borderStyles
      },
      'border-left-width': {
        title: 'Border left width',
        type: 'number',
        units: stdUnits
      },

      'border-right-color': {
        title: 'Border right color',
        type: 'color'
      },
      'border-right-style': {
        title: 'Border right style',
        type: 'select',
        options: borderStyles
      },
      'border-right-width': {
        title: 'Border right width',
        type: 'number',
        units: stdUnits
      },

      'border-top-color': {
        title: 'Border top color',
        type: 'color'
      },
      'border-top-style': {
        title: 'Border top style',
        type: 'select',
        options: borderStyles
      },
      'border-top-width': {
        title: 'Border top width',
        type: 'number',
        units: stdUnits
      },

      'outline-color': {
        title: 'Outline color',
        type: 'color'
      },
      'outline-style': {
        title: 'Outline style',
        type: 'select',
        options: borderStyles
      },
      'outline-width': {
        title: 'Outline width',
        type: 'number',
        units: stdUnits
      },

      'height': {
        title: 'Height',
        type: 'number',
        units: stdUnits
      },
      'max-height': {
        title: 'Maximum height',
        type: 'number',
        units: stdUnits
      },
      'min-height': {
        title: 'Minimum height',
        type: 'number',
        units: stdUnits
      },

      'width': {
        title: 'Width',
        type: 'number',
        units: stdUnits
      },
      'max-width': {
        title: 'Maximum width',
        type: 'number',
        units: stdUnits
      },
      'min-width': {
        title: 'Minimum width',
        type: 'number',
        units: stdUnits
      },


      'font-family': {
        title: 'Font',
        type: 'select',
        options: {
          'arial': 'Arial',
          'courier': 'Courier',
          'georgia': 'Georgia',
          'tahoma': 'Tahoma',
          'trebuchet ms': 'Trebuchet MS',
          'verdana': 'Verdana'
        }
      },
      'font-size': {
        title: 'Font size',
        type: 'number',
        units: stdUnits
      },
      'font-style': {
        title: 'Font style',
        type: 'select',
        options: {
          'normal': 'Normal',
          'italic': 'Italic'
        }
      },
      'font-variant': {
        title: 'Font variant',
        type: 'select',
        options: {
          'normal': 'Normal',
          'small-caps': 'Small caps'
        }
      },
      'font-weight': {
        title: 'Font weight',
        type: 'select',
        options: {
          'normal': 'Normal',
          'bold': 'Bold',
          'bolder': 'Bolder',
          'lighter': 'Lighter'
        }
      },

      'list-style-type': {
        title: 'List style',
        type: 'select',
        options: {
          'none': 'None',
          'circle': 'Circle',
          'disc': 'Disc',
          'square': 'Square',
          'decimal': 'Decimal number',
          'lower-alpha': 'Lower alpha',
          'lower-roman': 'Lower roman',
          'upper-alpha': 'Upper alpha',
          'upper-greek': 'Upper greek',
          'upper-roman': 'Upper roman'
        }
      },
      'list-style-image': {
        title: 'List style image',
        type: 'file'
      },
      'list-style-position': {
        title: 'List style position',
        type: 'select',
        'option': {
          'inside': 'Inside',
          'outside': 'Outside'
        }
      },

      'margin-bottom': {
        title: 'Margin bottom',
        type: 'number',
        units: stdUnits
      },
      'margin-left': {
        title: 'Margin left',
        type: 'number',
        units: stdUnits
      },
      'margin-right': {
        title: 'Margin right',
        type: 'number',
        units: stdUnits
      },
      'margin-top': {
        title: 'Margin top',
        type: 'number',
        units: stdUnits
      },

      'padding-bottom': {
        title: 'Padding bottom',
        type: 'number',
        units: stdUnits
      },
      'padding-left': {
        title: 'Padding left',
        type: 'number',
        units: stdUnits
      },
      'padding-right': {
        title: 'Padding right',
        type: 'number',
        units: stdUnits
      },
      'padding-top': {
        title: 'Padding top',
        type: 'number',
        units: stdUnits
      },

      'position': {
        title: 'Position',
        type: 'select',
        options: {
          'static': 'Static',
          'absolute': 'Absolute',
          'relative': 'Relative',
          'fixed': 'Fixed'
        }
      },

      'bottom': {
        title: 'Bottom',
        type: 'number',
        units: stdUnits
      },
      'left': {
        title: 'Left',
        type: 'number',
        units: stdUnits
      },
      'right': {
        title: 'right',
        type: 'number',
        units: stdUnits
      },
      'top': {
        title: 'Top',
        type: 'number',
        units: stdUnits
      },

      'clear': {
        title: 'Clear',
        type: 'select',
        options: {
          'none': 'None',
          'left': 'Left',
          'right': 'Right',
          'both': 'Both'
        }
      },
      'float': {
        title: 'Float',
        type: 'select',
        options: {
          'none': 'None',
          'left': 'Left',
          'right': 'Right'
        }
      },
      'display': {
        title: 'Display',
        type: 'select',
        options: {
          'block': 'Block',
          'inline': 'Inline',
          'list-item': 'List item',
          'none': 'None'
        }
      },
      'overflow': {
        title: 'Overflow',
        type: 'select',
        options: {
          'visible': 'Visible',
          'hidden': 'Hidden',
          'scroll': 'Scroll',
          'auto': 'Auto'
        }
      },
      'overflow-x': {
        title: 'Overflow X',
        type: 'select',
        options: {
          'visible': 'Visible',
          'hidden': 'Hidden',
          'scroll': 'Scroll',
          'auto': 'Auto'
        }
      },
      'overflow-y': {
        title: 'Overflow Y',
        type: 'select',
        options: {
          'visible': 'Visible',
          'hidden': 'Hidden',
          'scroll': 'Scroll',
          'auto': 'Auto'
        }
      },

      'visibility': {
        title: 'Visibility',
        type: 'select',
        options: {
          'visible': 'Visible',
          'hidden': 'Hidden'
        }
      },

      'z-index': {
        title: 'Z index',
        type: 'number',
        units: false
      },

      'cursor': {
        title: 'Cursor',
        type: 'select',
        options: {
          'auto': 'Auto',
          'crosshair': 'Crosshair',
          'default': 'Default',
          'help': 'Help',
          'move': 'Move',
          'pointer': 'Pointer',
          'progress': 'Progress',
          'text': 'Text',
          'wait': 'Wait',
          'n-resize': 'n resize',
          'e-resize': 'e resize',
          's-resize': 'S resize',
          'w-resize': 'W resize',
          'ne-resize': 'NE resize',
          'nw-resize': 'NW resize',
          'se-resize': 'SE resize',
          'sw-resize': 'SW resize'
        }
      },

      'border-collapse': {
        title: 'Border collapse',
        type: 'select',
        options: {
          'collapse': 'Collapse',
          'separate': 'Separate'
        }
      },

      'color': {
        title: 'Text color',
        type: 'color'
      },
      'line-height': {
        title: 'Line height',
        type: 'number',
        units: stdUnits
      },
      'letter-spacing': {
        title: 'Letter spacing',
        type: 'number',
        units: stdUnits
      },
      'word-spacing': {
        title: 'Word spacing',
        type: 'number',
        units: stdUnits
      },
      'text-align': {
        title: 'Text align',
        type: 'select',
        options: {
          'left': 'Left',
          'right': 'Right',
          'center': 'Center',
          'justify': 'Justify'
        }
      },
      'text-decoration': {
        title: 'Text decoration',
        type: 'select',
        options: {
          'none': 'none',
          'underline': 'Underline',
          'overline': 'Overline',
          'line-through': 'Line-through',
          'blink': 'Blink'
        }
      },
      'text-indent': {
        title: 'Text indent',
        type: 'number',
        units: stdUnits
      },
      'text-transform': {
        title: 'Text transform',
        type: 'select',
        options: {
          'none': 'None',
          'capitalize': 'Capitalize',
          'uppercase': 'Uppercase',
          'lowercase': 'Lowercase'
        }
      },
      'vertical-align': {
        title: 'Vertical align',
        type: 'select',
        options: {
          'baseline': 'Baseline',
          'sub': 'Sub',
          'super': 'Super',
          'top': 'Top',
          'text-top': 'Text top',
          'middle': 'Middle',
          'bottom': 'Bottom',
          'text-bottom': 'Text bottom'
        }
      },
      'white-space': {
        title: 'White space',
        type: 'select',
        options: {
          'normal': 'Normal',
          'nowrap': 'No wrap',
          'pre': 'Preformatted'
        }
      },
    }
  });

} (jQuery));

