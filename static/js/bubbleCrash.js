var zepto = require('zepto');
var animation = require('./animation');


var BubbleCrash = function (config) {
  var config = config || {};

  this.$container = $(config.container);
  this.boundaryWidth = this.$container.width();
  this.boundaryHeight = this.$container.height();
  this.bubbleList = [];

  var self = this;
  this.ani = animation({
    duration: 1000 * 60,
    easing: 'linear',
    onStep: function (progress) {
      for (var i in self.bubbleList) {
        var bubble = self.bubbleList[i];

        if (!self.hasBoundary) {
          checkBoundary.apply(self, [bubble]);
        }
        checkCrash.apply(self, [bubble]);
        bubbleMove.apply(self, [bubble]);
      }
    },
    onComplete: function (progress) {
      //
    }
  });
}

// 检测边界
function checkBoundary(bubble) {
  var $bubble = bubble.elem;
  var bubbleRaidus = $bubble.width() / 2;
  var bubbleLeft = parseFloat($bubble.css('left')) + bubbleRaidus;
  var bubbleTop = parseFloat($bubble.css('top')) + bubbleRaidus;

  // 检测右边界
  if (bubble.velocity[0] > 0) {
    if (bubbleLeft - bubbleRaidus >= this.boundaryWidth) {
      // bubble.velocity[0] = -bubble.velocity[0];
      $bubble.css('left', 0 - bubbleRaidus * 2);
    }
  }
  // 检测左边界
  else {
    if (bubbleLeft + bubbleRaidus <= 0) {
      // bubble.velocity[0] = -bubble.velocity[0];
      $bubble.css('left', this.boundaryWidth);
    }
  }
  // 检测下边界
  if (bubble.velocity[1] > 0) {
    if (bubbleTop - bubbleRaidus >= this.boundaryHeight) {
      // bubble.velocity[1] = -bubble.velocity[1];
      $bubble.css('top', 0 - bubbleRaidus * 2);
    }
  }
  // 检测上边界
  else {
    if (bubbleTop + bubbleRaidus <= 0) {
      // bubble.velocity[1] = -bubble.velocity[1];
      $bubble.css('top', this.boundaryHeight);
    }
  }
}

// 检查碰撞
function checkCrash(bubble) {
  var $bubble = bubble.elem;
  var bubbleRaidus = $bubble.width() / 2;
  var bubbleLeft = parseFloat($bubble.css('left')) + bubbleRaidus;
  var bubbleTop = parseFloat($bubble.css('top')) + bubbleRaidus;

  for (var i in this.bubbleList) {
    var subBubble = this.bubbleList[i];

    var $subBubble = subBubble.elem;
    var subBubbleRaidus = $subBubble.width() / 2;
    var subBubbleLeft = parseFloat($subBubble.css('left')) + subBubbleRaidus;
    var subBubbleTop = parseFloat($subBubble.css('top')) + subBubbleRaidus;

    var distance = Math.sqrt(Math.pow(bubbleLeft - subBubbleLeft, 2) + Math.pow(bubbleTop - subBubbleTop, 2));

    // 假设气泡质量相等，完全弹性碰撞
    if (distance <= bubbleRaidus + subBubbleRaidus) {
      // 计算碰撞角度
      // var rad = Math.atan((subBubbleLeft - bubbleLeft) / (subBubbleTop - bubbleTop));

      // var vb = Math.cos(rad) * bubble.velocity[1] + Math.sin(rad) * subBubble.velocity[0];
      // var vsb = Math.cos(rad) * subBubble.velocity[1] + Math.sin(rad) * bubble.velocity[0];
      // var _vb = Math.sin(rad) * bubble.velocity[1] + Math.cos(rad) * subBubble.velocity[0];
      // var _vsb = Math.sin(rad) * subBubble.velocity[1] + Math.cos(rad) * subBubble.velocity[0];

      // bubble.velocity = [Math.sin(rad) * vb + Math.cos(rad) * _vb, Math.cos(rad) * vb + Math.sin(rad) * _vb];
      // subBubble.velocity = [Math.sin(rad) * vsb + Math.cos(rad) * _vb, Math.cos(rad) * _vsb + Math.sin(rad) * _vb];

      // // var _velocity = bubble.velocity;
      // // bubble.velocity = subBubble.velocity;
      // // subBubble.velocity = _velocity;
    }
  }
}

// 增加力场
function addGravity(left, top, level) {
  this.hasBoundary = true;

  for (var i in this.bubbleList) {
    var bubble = this.bubbleList[i];

    var $bubble = bubble.elem;
    var bubbleRaidus = $bubble.width() / 2;
    var bubbleLeft = parseFloat($bubble.css('left')) + bubbleRaidus;
    var bubbleTop = parseFloat($bubble.css('top')) + bubbleRaidus;

    // 计算碰撞角度
    var rad = Math.atan((bubbleLeft - left) / (bubbleTop - top));

    if (bubbleTop > top) {
      bubble.velocity = [Math.sin(rad) * level, Math.cos(rad) * level];
    } else {
      bubble.velocity = [-Math.sin(rad) * level, -Math.cos(rad) * level];
    }
  }
}

// 气泡缓动
function bubbleMove(bubble) {
  var $bubble = bubble.elem;
  $bubble.css({
    left: parseFloat($bubble.css('left')) + bubble.velocity[0] * .25,
    top: parseFloat($bubble.css('top')) + bubble.velocity[1] * .25
  });
}


BubbleCrash.prototype = {
  constructor: BubbleCrash,
  addBubble: function (left, top, radius, velocity) {
    var $bubble = $('<div>').addClass('bubble').css({
      left: (left - radius) * $(window).width() / 320,
      top: (top - radius) * $(window).height() / 520,
      width: radius * 2,
      height: radius * 2
    });

    $bubble.appendTo(this.$container);
    this.bubbleList.push({
      elem: $bubble,
      velocity: velocity
    });

    return $bubble;
  },
  addGravity: function (left, top, level) {
    addGravity.apply(this, [left, top, level]);
  },
  stop: function() {
    this.ani.stop();
  }
};


module.exports = BubbleCrash;