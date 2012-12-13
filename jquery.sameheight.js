/*!
 * Same Height jQuery Plugin v1.1
 *
 * Date: Thu Dec 13 16:23:19 2012 EST
 * Requires: jQuery v1.3+
 *
 * Copyright 2012, Karl Swedberg
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 *
 *
 *
*/


(function($) {

  $.fn.sameHeight = function(options) {


    var heights, maxHeight, idx,
        opts = $.extend({}, $.fn.sameHeight.defaults, options),
        $els = this;

    if ( $.isFunction(opts.elements) ) {
      $els = opts.elements.call(this);
    } else if ( opts.elements === 'children' ) {
      $els = $els.children();
    }

    opts.before.call(this, $els);

    heights = $els.map(function() {
      return $(this).height();
    });

    maxHeight = Math.max.apply( Math, heights.get() );

    if (opts.adjust === 'height') {

      maxHeight += opts.extra;
      $els.css({height: maxHeight});

    } else {

      idx = $.inArray(maxHeight, heights.get());
      maxHeight += parseInt( $els.eq(idx).css(opts.adjust), 10 );

      $els.each(function() {
        var $el = $(this),
            style = {};

        style[opts.adjust] = ( Math.max(0, maxHeight - $el.height()) ) + 'px';
        $el.css(style);
      });

    }

    opts.after.call(this, $els);

    return this;
  };

  $.fn.sameHeight.defaults = {
    before: function() {},
    after: function() {},
    extra: 0,
    adjust: 'height', // one of 'height', 'padding-top', 'padding-bottom'
    elements: 'children'  // can be a falsy value, in which case it uses the jQuery collection;
                          // a function, which is scoped to the jQuery collection ( this == jQuery collection)
                          // or "children" which will just use all children of the elements in jQuery collection
  };

})(jQuery);
