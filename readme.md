jQuery SameHeight Plugin
========================

NOTE: This plugin is no longer maintained. Use CSS `display: flex` or `display: grid` instead.

Sorry, not much documentation yet.

Make all children of a particular collection of elements have the height of the tallest one of those children

    $('#container').sameHeight();

Make collection of elements, filtered by a function, have height of tallest one:

    $('#container').sameHeight({elements: function() {
      return $(this).children('.special');
    });
