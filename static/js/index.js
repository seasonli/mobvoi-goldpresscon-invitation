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

  bubbleCrash.addBubble(-10, -30, 38, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[9]);
  bubbleCrash.addBubble(150, 15, 38, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[11]);
  bubbleCrash.addBubble(200, 30, 27, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[0]);
  bubbleCrash.addBubble(320, 32, 36, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[7]);
  bubbleCrash.addBubble(-10, 80, 33, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[9]);
  bubbleCrash.addBubble(80, 90, 39, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[1]);
  bubbleCrash.addBubble(240, 110, 28, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[8]);
  bubbleCrash.addBubble(310, 110, 22, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[0]);
  bubbleCrash.addBubble(-5, 160, 40, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[10]);
  bubbleCrash.addBubble(90, 180, 32, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[7]);
  bubbleCrash.addBubble(275, 180, 35, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[5]);
  bubbleCrash.addBubble(10, 240, 34, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[4]);
  bubbleCrash.addBubble(70, 260, 28, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[0]);
  bubbleCrash.addBubble(175, 180, 32, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[11]);
  bubbleCrash.addBubble(220, 280, 50, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[1]);
  bubbleCrash.addBubble(15, 350, 32, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[2]);
  bubbleCrash.addBubble(115, 330, 42, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[10]);
  bubbleCrash.addBubble(300, 340, 30, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[5]);
  bubbleCrash.addBubble(15, 430, 28, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[6]);
  bubbleCrash.addBubble(100, 430, 30, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[8]);
  bubbleCrash.addBubble(250, 470, 48, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[1]);
  bubbleCrash.addBubble(320, 500, 40, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[10]);
  bubbleCrash.addBubble(75, 540, 34, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[2]);
  bubbleCrash.addBubble(165, 510, 32, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[8]);
  bubbleCrash.addBubble(295, 550, 38, [6 + 2 * Math.random(), 6 + 2 * Math.random()], imgObjArr[11]);

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
    bubbleCrash.addGravity(e.targetTouches[0].clientX, e.targetTouches[0].clientY, 40);
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
var name = decodeURIComponent(url.queryToJson(window.location.href).name || '');
$name.text(name);


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
var imgObjArr = [];

for (var i in imgSrcArr) {
  var imgObj = new Image();
  imgObj.src = imgSrcArr[i];
  imgObj.onload = function () {
    n++;
    if (n === imgSrcArr.length) {
      startAni();
    }
  }
  imgObjArr.push(imgObj);
}


$.ajax({
  type: 'GET',
  url: 'http://wechat-platform.chumenwenwen.com/apps/common/js_config',
  data: {
    url: window.location.href
  },
  dataType: 'JSON',
  success: function (data) {
    wx.config({
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });

    wx.ready(function () {
      var title = '一起去往缎金时代吧' + (name ? '，' + name : '') + '！';
      var desc = '12月10日下午 出门问问邀你一同闪耀';
      var link = window.location.href;
      var imgUrl = 'http://baike.bdimg.com/cms/static/r/image/2015-12-07/08a65aef11fad816bbd9331fcd8f232a.jpg';

      wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imgUrl
      });
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl
      });
    });
  }
});