'use strict';

angular.module('trumbowyg', []);
'use strict';

angular.module('trumbowyg').component('trumbowyg', {
  templateUrl: 'trumbowyg/components/trumbowyg/trumbowyg.html',
  bindings: {
    options: '<?',
    ngDisabled: '<?',
    placeholder: '@?',
    onFocus: '&?',
    onBlur: '&?',
    onInit: '&?',
    onChange: '&?',
    onResize: '&?',
    onPaste: '&?',
    onOpenfullscreen: '&?',
    onClosefullscreen: '&?',
    onClose: '&?'
  },
  require: {
    ngModel: 'ngModel'
  },
  controller: ['$element', '$scope', '$attrs', function ($element, $scope, $attrs) {
    var _this = this;

    var TBW_EVENTS = ['focus', 'blur', 'init', 'change', 'resize', 'paste', 'openfullscreen', 'closefullscreen', 'close'],
        EVENTS_PREFIX = 'tbw';

    this.getElementReference = function () {
      return angular.element($element.find('> div'));
    };

    this.getEditorReference = function () {
      return _this.getElementReference().find('.trumbowyg-editor');
    };

    this.updateModelValue = function () {
      $scope.$applyAsync(function () {
        var value = _this.getEditorReference().trumbowyg('html');
        _this.ngModel.$setViewValue(value);
      });
    };

    this.emitEvent = function (event) {
      var attr = $attrs.$normalize('on-' + event);
      if (angular.isFunction(_this[attr])) {
        $scope.$applyAsync(function () {
          return _this[attr]();
        });
      }
    };

    this.initializeEditor = function (element, options) {
      element.trumbowyg(options).on('tbwchange', function () {
        return _this.updateModelValue();
      }).on('tbwpaste', function () {
        return _this.updateModelValue();
      });
      angular.forEach(TBW_EVENTS, function (event) {
        element.on('' + EVENTS_PREFIX + event, function () {
          return _this.emitEvent(event);
        });
      });
      _this.ngModel.$render();
    };

    this.$onDestroy = function () {
      _this.getElementReference().trumbowyg('destroy');
    };

    this.$onChanges = function (changes) {
      var element = _this.getElementReference();

      if (changes.options && !changes.options.isFirstChange()) {
        element.trumbowyg('destroy');
      }

      if (changes.options) {
        _this.initializeEditor(element, angular.extend({}, _this.options));
      }

      if (changes.ngDisabled) {
        _this.trumbowyg(_this.ngDisabled ? 'disable' : 'enable');
      }

      if (changes.placeholder) {
        _this.getEditorReference().attr('placeholder', _this.placeholder);
      }
    };

    this.$onInit = function () {
      _this.ngModel.$render = function () {
        var element = _this.getEditorReference();
        element.trumbowyg('html', _this.ngModel.$modelValue);
      };
    };
  }]
});
'use strict';

angular.module('trumbowyg').run(['$templateCache', function ($templateCache) {
  $templateCache.put('trumbowyg/components/trumbowyg/trumbowyg.html', '<style media="screen">\n  trumbowyg {\n    display: block;\n  }\n</style>\n<div></div>\n');
}]);
//# sourceMappingURL=angular-trumbowyg.js.map