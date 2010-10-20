/***************************************
* Same Height jQuery Plugin
* @author Karl Swedberg
* @version 1.0 (Oct 20, 2010)
* @requires jQuery v1.3+
*
* Dual licensed under the MIT and GPL licenses (just like jQuery):
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html

************************************** */


(function($) {

  $.fn.sameHeight = function(options) {

    var opts = $.extend({}, $.fn.sameHeight.defaults, options),
        $els = this;

    if ( $.isFunction(opts.elements) ) {
      $els = opts.elements.call(this);
    } else if ( opts.elements === 'children' ) {
      $els = $els.children();
    }

    var heights = $els.map(function() {
      return $(this).height();
    });
    
    var maxHeight = Math.max.apply( Math, heights.get() );

    if (opts.adjust === 'height') {

      maxHeight += opts.extra;
      $els.each(function() {
        $(this).height(maxHeight);
      });

    } else {

      var idx = $.inArray(maxHeight, heights.get());
      maxHeight += parseInt( $els.eq(idx).css(opts.adjust), 10 );
      $els.each(function() {
        var thisAdjust = Math.max( 0, maxHeight - $(this).height() );
        $(this).css(opts.adjust, thisAdjust + 'px');
      });

    }

    return this;
  };

  $.fn.sameHeight.defaults = {
    extra: 0,
    adjust: 'height', // one of 'height', 'padding-top', 'padding-bottom'
    elements: 'children'  // can be a falsy value, in which case it uses the jQuery collection; 
                          // a function, which is scoped to the jQuery collection ( this == jQuery collection)
                          // or "children" which will just use all children of the elements in jQuery collection
  };

})(jQuery);