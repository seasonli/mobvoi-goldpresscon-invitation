var zepto = require('zepto');
var url = require('./url');
var BubbleCrash = require('./BubbleCrash');
var animation = require('./animation');

var $canvas = $('.canvas');
var $content = $('.content');
var $map = $('.map');
var $loading = $canvas.find('.loading');
var $detail = $content.find('.detail');
var $name = $content.find('.name');
var $address = $detail.find('.address');

function startAni() {
  $loading.hide();

  var bubbleCrash = new BubbleCrash({
    container: $canvas
  });

  bubbleCrash.addBubble(-10, -30, 38, [5, 5]).addClass('bubble-flight');
  bubbleCrash.addBubble(150, 15, 38, [5, 5]).addClass('bubble-voice bubble-rotate-reverse');
  bubbleCrash.addBubble(200, 30, 27, [5, 5]);
  bubbleCrash.addBubble(320, 32, 36, [5, 5]).addClass('bubble-restaurant');

  bubbleCrash.addBubble(-10, 80, 33, [5, 5]).addClass('bubble-flight bubble-rotate-reverse');
  bubbleCrash.addBubble(80, 90, 39, [5, 5]).addClass('bubble-tic');
  bubbleCrash.addBubble(240, 110, 28, [5, 5]).addClass('bubble-train bubble-rotate-reverse');
  bubbleCrash.addBubble(310, 110, 22, [5, 5]);

  bubbleCrash.addBubble(-5, 160, 40, [5, 5]).addClass('bubble-wen bubble-rotate-reverse');
  bubbleCrash.addBubble(90, 180, 32, [5, 5]).addClass('bubble-restaurant');
  bubbleCrash.addBubble(165, 110, 30, [5, 5]);
  bubbleCrash.addBubble(275, 180, 35, [5, 5]).addClass('bubble-navigation');

  bubbleCrash.addBubble(10, 240, 34, [5, 5]).addClass('bubble-movie');
  bubbleCrash.addBubble(70, 260, 28, [5, 5]);
  bubbleCrash.addBubble(175, 180, 32, [5, 5]).addClass('bubble-voice bubble-rotate-reverse');
  bubbleCrash.addBubble(220, 280, 50, [5, 5]).addClass('bubble-tic');

  bubbleCrash.addBubble(15, 350, 32, [5, 5]).addClass('bubble-google');
  bubbleCrash.addBubble(115, 330, 42, [5, 5]).addClass('bubble-wen');
  bubbleCrash.addBubble(220, 380, 32, [5, 5]).addClass('bubble-flight bubble-rotate-reverse');
  bubbleCrash.addBubble(300, 340, 30, [5, 5]).addClass('bubble-navigation');

  bubbleCrash.addBubble(15, 430, 28, [5, 5]).addClass('bubble-translate bubble-rotate-reverse');
  bubbleCrash.addBubble(100, 430, 30, [5, 5]).addClass('bubble-train');
  bubbleCrash.addBubble(250, 470, 48, [5, 5]).addClass('bubble-tic');
  bubbleCrash.addBubble(320, 500, 40, [5, 5]).addClass('bubble-wen bubble-rotate-reverse');

  bubbleCrash.addBubble(75, 540, 34, [5, 5]).addClass('bubble-google');
  bubbleCrash.addBubble(165, 510, 32, [5, 5]).addClass('bubble-train bubble-rotate-reverse');
  bubbleCrash.addBubble(295, 550, 38, [5, 5]).addClass('bubble-voice bubble-rotate-reverse');


  $canvas.on('touchstart', function (e) {
    animation({
      duration: 1000,
      easing: 'linear',
      onStep: function (progress) {
        $canvas.css('opacity', 2 - 2 * progress);
      },
      onComplete: function (progress) {
        $canvas.remove();
      }
    });
    bubbleCrash.addGravity(e.targetTouches[0].clientX, e.targetTouches[0].clientY, 25);
  });

  $address.on('touchstart', function () {
    $map.show();
  });

  $map.on('touchstart', function () {
    $(this).hide();
  });
}


// Initialize
$detail.css({
  display: 'block',
  top: $(window).width() / 640 * 450
});
$name.text(decodeURIComponent(url.queryToJson(window.location.href).name || ''));


var n = 0;
var imgSrcArr = [
  '../static/img/bubble-blank.png',
  '../static/img/bubble-tic.png',
  '../static/img/bubble-google.png',
  '../static/img/bubble-microphone.png',
  '../static/img/bubble-movie.png',
  '../static/img/bubble-navigation.png',
  '../static/img/bubble-translate.png',
  '../static/img/bubble-restaurant.png',
  '../static/img/bubble-train.png',
  '../static/img/bubble-flight.png',
  '../static/img/bubble-wen.png',
  '../static/img/bubble-voice.png'
];

for (var i in imgSrcArr) {
  var imgObj = new Image();
  imgObj.src = imgSrcArr[i];
  imgObj.onload = function () {
    n++;
    if (n === imgSrcArr.length) {
      startAni();
    }
  }
}