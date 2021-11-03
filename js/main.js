gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//LOADING
jQuery(window).on('load', function () {
  $('.loading__wrapper').delay(100).fadeOut(500);
  $('.page-wrap').delay(100).fadeIn(500);
});

tl1 = new TimelineMax({ repeat: -1 });
tl1
  .set('#c1', { autoAlpha: 0.7 })
  .to('#c1', 0.5, { scale: 0.2, x: '+=5', transformOrigin: '50% 50%' })
  .to('#c1', 0.5, { scale: 1, x: '-=5', transformOrigin: '50% 50%' });

tl2 = new TimelineMax({ repeat: -1 });
tl2
  .set('#c2', { autoAlpha: 0.7 })
  .to('#c2', 0.5, { scale: 0.2, x: '-=5', transformOrigin: '50% 50%' })
  .to('#c2', 0.5, { scale: 1, x: '+=5', transformOrigin: '50% 50%' });

//AFTER IMAGE
gsap.to('.after-intro-image img', {
  scrollTrigger: {
    trigger: '.after-intro-image',
    scrub: true,
    start: 'top 70%',
    end: 'bottom top',
  },
  scale: 1.2,
});

//TEAM
const images = gsap.utils.toArray(".cmssite-galleries-wrapper img");
let cmssiteSectionScrollTriggers = [];
const cmssiteSection = $('.cmssite-galleries-wrapper');
const cmssiteSectionGalleries = cmssiteSection.find('.cmssite-galleries');
const cmssiteSectionPeopleAmount = cmssiteSection.find('.person-card').length;
const cmssiteSectionCardsWrappers = cmssiteSection.find('.cmssite-gallery__wrapper');

function cmssiteSectionCreateScrollFunctions () {
	const cmssiteSectionLengthK = $(window).width() >= 768 ? 0.15 : 0.2; // Desktop value : mobile value
	var headerSize = $(window).width() >= 768 ? 106 : 75; // Desktop value : mobile value
	cmssiteSection.height(`${cmssiteSectionGalleries.outerHeight() / $(window).outerWidth() * 100 * (1 + cmssiteSectionPeopleAmount * cmssiteSectionLengthK)}vw`)

	$.each(cmssiteSectionScrollTriggers, function () {
		this.kill();
	});

	cmssiteSectionScrollTriggers = [];

	cmssiteSectionScrollTriggers.push(ScrollTrigger.create({
		trigger: cmssiteSection[0],
		start: `top+=${cmssiteSectionGalleries.outerHeight() / 2}px center+=${headerSize / 2}px`,
		end: `bottom-=${cmssiteSectionGalleries.outerHeight() / 2}px center+=${headerSize / 2}px`,
		scrub: true,
		pin: cmssiteSectionGalleries[0],
	}))

	cmssiteSectionCardsWrappers.each(function (index) {
		const cmssiteCurrentWrapper = $(this);
		const [x, xEnd] = (index) % 2 ? ["50%", 0] : ["-50%", 0];

		cmssiteSectionScrollTriggers.push(ScrollTrigger.create({
			trigger: cmssiteSection[0],
			start: "top bottom",
			end: `bottom top+=${headerSize}px`,
			scrub: 0.1,
			animation: gsap.fromTo(cmssiteCurrentWrapper[0], { x: x }, { x: xEnd, ease: "none" }),
		}))
	})
}

const showDemo = () => {
	cmssiteSectionCreateScrollFunctions();

	$(window).resize(debounce(function () {
		cmssiteSectionCreateScrollFunctions();
	}, 100, false));

	triggerResize();
};

imagesLoaded(images).on('always', showDemo);

//MOBILE MENU
window.onload = function () {
  const bars = document.querySelector('.bars');
  const menu = document.querySelector('.menu');
  bars.addEventListener('click', function (e) {
    this.classList.toggle('active');
    if (this.classList.contains('active')) {
      gsap.to('.menu', {
        duration: 0.1,
        display: 'flex',
        ease: 'expo.in',
      });
      gsap.to('.navBefore', {
        duration: 0.5,
        marginLeft: '0',
        ease: 'expo.in',
      });
      gsap.to('.nav', {
        duration: 0.8,
        marginLeft: '0',
        delay: 0.3,
        ease: 'expo.in',
      });
      gsap.to('.navigation', {
        duration: 1,
        opacity: '1',
        delay: 0.8,
        ease: 'expo.in',
      });
      gsap.to('.nav-email', {
        duration: 1,
        opacity: '1',
        delay: 1.2,
        ease: 'expo.in',
      });
    } 
    else {
      gsap.to('.nav-email', {
        duration: 0.4,
        opacity: '0',
        ease: 'expo.in',
      });
      gsap.to('.navigation', {
        duration: 0.2,
        opacity: '0',
        ease: 'expo.in',
      });
      gsap.to('.nav', {
        duration: 1,
        marginLeft: '100%',
        delay: 0.3,
        ease: 'expo.in',
      });
      gsap.to('.navBefore', {
        duration: 1,
        marginLeft: '100%',
        delay: 0.5,
        ease: 'expo.in',
      });
      gsap.to('.menu', {
        duration: 1,
        display: 'none',
        delay: 1,
        ease: 'expo.in',
      });
    }
  });
};

//STICKY HEADER
ScrollTrigger.create({
  start: 'top -50',
  end: 99999,
  toggleClass: { className: 'scrolled', targets: '.header' },
});

//Case study item hover image
const items = document.querySelectorAll('.footer-case-studies-list-item');

items.forEach((el) => {
  const image = el.querySelector('img');

  el.addEventListener('mouseenter', (e) => {
    gsap.to(image, { autoAlpha: 1 });
  });

  el.addEventListener('mouseleave', (e) => {
    gsap.to(image, { autoAlpha: 0 });
  });

  el.addEventListener('mousemove', (e) => {
    gsap.set(image, { x: e.offsetX - 100, y: e.offsetY - 100 });
  });
});

//Bubble modal
const bubbles = document.querySelectorAll('.whatwedo-item');

bubbles.forEach((el) => {
  const div = el.querySelector('img');

  el.addEventListener('mouseenter', (e) => {
    gsap.to(div, { autoAlpha: 1 });
  });

  el.addEventListener('mouseleave', (e) => {
    gsap.to(div, { autoAlpha: 0 });
  });

  el.addEventListener('mousemove', (e) => {
    gsap.set(div, { x: e.offsetX - 120, y: e.offsetY - 120 });
  });
});

$(document).ready(function () {

  //Close menu on click
  $('.navigation a').click(function () {
    $('.bars').removeClass('active');
    $('.menu').hide();
  });

  //Show/hide case studies filter
  $('.case-studies-options').hide();
  $('.case-studies-selected').click(function () {
    $('.case-studies-options').toggleClass('active').slideToggle('slow');
    $(this).toggleClass('active');
    return false;
  });

  $('.select-options-item').click(function () {
    var option = $(this).html();
    $('.case-studies-selected span').html(option);
    $(this).addClass('active').siblings('.select-options-item').removeClass('active');
    $('.case-studies-options').hide('slow').removeClass('active');
    $('.case-studies-selected').removeClass('active');
  });

  //Show-hide footer case studies filter
  $('.footer-case-studies-options').hide();
  $('.footer-case-studies-selected').click(function () {
    $('.footer-case-studies-options').toggleClass('active').slideToggle('slow');
    $(this).toggleClass('active');
    return false;
  });

  $('.footer-select-options-item').click(function () {
    var option = $(this).html();
    $('.footer-case-studies-selected span').html(option);
    $(this).addClass('active').siblings('.footer-select-options-item').removeClass('active');
    $('.footer-case-studies-options').hide('slow').removeClass('active');
    $('.footer-case-studies-selected').removeClass('active');

    if ($(this).is('.openAll')) {
      $('.footer-case-studies-list').hide().addClass('hiddenForAll');
      $('.footer-case-studies-content').append('<div class="footer-case-studies-list allItems" />');
      let $th;
      $('.footer-case-studies-list.hiddenForAll .footer-case-studies-list-item').each(function () {
        $th = $(this);
        $th.attr('data-belongs-to', $th.parents('.footer-case-studies-list').attr('id'));
        $th.appendTo('.footer-case-studies-list.allItems');
      });
    } else {
      if ($('.footer-case-studies-list.allItems').length > 0) {
        $('.footer-case-studies-list.allItems .footer-case-studies-list-item').each(function () {
          $(this).appendTo($('#' + $(this).data('belongs-to')));
        });
        $('.footer-case-studies-list.allItems').remove();
      }
      $('.footer-case-studies-list').hide().removeClass('hiddenForAll');
      $($(this).data('target')).show();
    }
  });

});

$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
    $('.intro-eu').addClass('hide');
  } else {
    $('.intro-eu').removeClass('hide');
  }
});

$.fn.isOnScreen = function () {
  var win = $(window);
  var viewport = {
      top: win.scrollTop(),
      left: win.scrollLeft()
  };
  viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();
  var bounds = this.offset();
  bounds.right = bounds.left + this.outerWidth();
  bounds.bottom = bounds.top + this.outerHeight();
  return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$(window).scroll(function () {
  if ($('#contact').isOnScreen() == true) {
      $('.contact-icon').addClass('hide');
  }
  else{
      $('.contact-icon').removeClass('hide');
  }
});

$('body').click(function (e) {
  let $target = $(e.target);
  if ($target.parents('.whatwedo-bubble').length <= 0 && !$target.is('.whatwedo-bubble')) {
    $('.whatwedo-item').removeClass('active');
  }
});