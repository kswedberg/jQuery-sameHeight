module('setup', {
  setup: function() {
    this.jqVersion = parseFloat(jQuery.fn.jquery);
  }
});
test('jQuery setup', 2, function() {
  ok( !!this.jqVersion, 'jQuery is running' );
  ok( this.jqVersion >= 1.4, 'jQuery version is at least 1.4' );
});

module('sameHeight', {
  teardown: function() {
    $('.container').children().attr('style', '');
  }
});

test('sameHeight using default elements: "children"', 3, function() {
  $('.container').sameHeight();
  var height1 = $('div.one').height(),
      height2 = $('div.two').height(),
      height3 = $('div.three').height();
  
  equals(height1, height2, 'div.one height and div.two height are equal');
  equals(height1, height3, 'div.one height and div.three height are equal');
  equals(height2, height3, 'div.two height and div.three height are equal');
  
});

test('sameHeight using default elements: "children" 2', 3, function() {
  var html2 = $('div.two').html();
  $('div.two').empty();
  $('.container').sameHeight();
  
  var height1 = $('div.one').height(),
      height2 = $('div.two').height(),
      height3 = $('div.three').height();
  
  equals(height1, height2, 'div.one height and div.two height are equal');
  equals(height1, height3, 'div.one height and div.three height are equal');
  equals(height2, height3, 'div.two height and div.three height are equal');

  $('div.two').html(html2);
});


test('sameHeight using elements: null', 3, function() {
  $('.container').children().sameHeight({elements: null});
  var height1 = $('div.one').height(),
      height2 = $('div.two').height(),
      height3 = $('div.three').height();
  
  equals(height1, height2, 'div.one height and div.two height are equal');
  equals(height1, height3, 'div.one height and div.three height are equal');
  equals(height2, height3, 'div.two height and div.three height are equal');
  
});

test('sameHeight using elements: null with 10 extra px', 3, function() {
  $('.container').children().sameHeight({elements: null, extra: 10});
  var height1 = $('div.one').height(),
      height2 = $('div.two').height(),
      height3 = $('div.three').height();
  
  equals(height1, height2, 'div.one height and div.two height are equal');
  equals(height1, height3, 'div.one height and div.three height are equal');
  equals(height2, height3, 'div.two height and div.three height are equal');
  
});

test('sameHeight using elements: null, adjusting padding-top', 3, function() {
  $('.container').children().sameHeight({elements: null, adjust: 'padding-top'});
  var height1 = $('div.one').outerHeight(),
      height2 = $('div.two').outerHeight(),
      height3 = $('div.three').outerHeight();
  
  equals(height1, height2, 'div.one height and div.two outerHeight are equal');
  equals(height1, height3, 'div.one height and div.three outerHeight are equal');
  equals(height2, height3, 'div.two height and div.three outerHeight are equal');
  
});


module('sameHeight from function', {
  teardown: function() {
    $('.container').children().attr('style', '');
  }
});

test('sameHeight from function 1', 3, function() {
  $('.container').sameHeight({
    elements: function() {
      return this.children();
    }
  });
  var height1 = $('div.one').height(),
      height2 = $('div.two').height(),
      height3 = $('div.three').height();
  
  equals(height1, height2, 'div.one height and div.two height are equal');
  equals(height1, height3, 'div.one height and div.three height are equal');
  equals(height2, height3, 'div.two height and div.three height are equal');
  
});

test('sameHeight from function 2', 3, function() {
  $('.container').sameHeight({
    elements: function() {
      return this.children('.sh');
    }
  });
  var height1 = $('div.one').height(),
      height2 = $('div.two').height(),
      height3 = $('div.three').height();
  
  equals(height1, height2, 'div.one height and div.two height are equal');
  ok(height1 !== height3, 'div.one height (' + height1 + ') and div.three height  (' + height3 + ') are not equal');
  ok(height2 !== height3, 'div.two height (' + height2 + ') and div.three height  (' + height3 + ') are not equal');
  
});

test('sameHeight divs adjusting height equal those adjusting padding-bottom', 6, function() {
  
  $('.container').sameHeight({
    elements: function() {
      return this.children('.sh');
    }
  });
  
  $('.container').sameHeight({
    elements: function() {
      return this.children().slice(1);
    }, 
    adjust: 'padding-bottom'
  });

  var height1 = $('div.one').outerHeight(),
      height2 = $('div.two').outerHeight(),
      height3 = $('div.three').outerHeight();
      height4 = $('div.four').outerHeight();
      
  equals(height1, height2, 'div.one height and div.two outerHeight are equal');
  equals(height1, height3, 'div.one height and div.three outerHeight are equal');
  equals(height1, height4, 'div.one height and div.four outerHeight are equal');

  equals(height2, height3, 'div.two height and div.three outerHeight are equal');
  equals(height2, height4, 'div.two height and div.four outerHeight are equal');
  
  equals(height3, height4, 'div.three height and div.four outerHeight are equal');
  
});
