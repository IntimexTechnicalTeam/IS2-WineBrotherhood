
// 滾動頁面 橫幅縮小
function scrollPage () {
  var wHeight = $(window).height();
  $(window).scroll(function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    $('.attach_one').each(function (i, v) {
      if ($(v).offset().top < scrollTop + wHeight - 50 && $(v).offset().top > scrollTop - 600) {
        $(v).css('background-position-y', -(scrollTop - $(v).offset().top) / 3 + 'px');
        $(v).css({ 'background-size': '100%' });
        $(v).find('.attach_one_in').delay(5000).css('margin-top', '0'); // 中間文字滑出
      }
    });
  });
}

function IndexBanner () {
  $('.header-index .header_mid .big_text_in ').delay(500).animate({ 'margin-top': '0px' }, 1000, 'linear');
  $('.header-index .header_mid .tutor-btn').delay(1500).animate({ opacity: 1 }, 1000, 'linear');
  $('.header-index-bg').delay(0).animate({ 'opacity': '1' }, 1000, 'linear');
  $('.header-index-bg').css({ 'transform': 'translate(-50%,-50%) scale(1)' }, 1000, 'linear');
}

function MobilescrollPage () {
  $(window).scroll(function () {
    var wHeight = $(window).height();
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    $('.attach_one').each(function (i, v) {
      if ($(v).offset().top < scrollTop + wHeight - 50 && $(v).offset().top > scrollTop - 200) {
        $(v).css({ 'background-size': '100%' });
      } else {
        $(v).css({ 'background-size': '130%' });
      }
    });
  });
}

export {
  scrollPage, IndexBanner, MobilescrollPage
};
