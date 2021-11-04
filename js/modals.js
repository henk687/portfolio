// Scroll control functions
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// Popup custom logic

var modalElement = $(document).find('.js-cmssite-modal'),
  modalContentTop = modalElement.find('.js-cmssite-modal-content-top'),
  modalContentBottom = modalElement.find('.js-cmssite-modal-content-bottom'),
  modalContentImage = modalElement.find('.js-cmssite-modal-image'),
  modalContentImageSpacer,
  currentCard,
  popupBgElement,
  cardSizeAndPosition,
  modalImageSizeAndPosition,
  initialImagePositionToViewport = 0;

// An object with modal's logic
var personModal = {
  isOpened: false,
  calculateCardSizeAndPosition: function () {
    cardSizeAndPosition = {
      left: currentCard[0].getBoundingClientRect().left,
      top: currentCard[0].getBoundingClientRect().top,
      width: currentCard.outerWidth(),
      height: currentCard.outerHeight(),
    };
  },
  calculateModalImageSizeAndPosition: function () {
    modalImageSizeAndPosition = {
      left: modalContentImage[0].getBoundingClientRect().left,
      top: modalContentImage[0].getBoundingClientRect().top,
      width: modalContentImage.outerWidth(),
      height: modalContentImage.outerHeight(),
    };
  },
  open: function (cardSelector) {
    // Disable scroll
    disableScroll();

    modalElement.show(0, function () {
      // Scroll window to top
      modalElement.scrollTop(0);

      // Save the selected card to variable
      currentCard = cardSelector;

      // Remember the position we will scroll window back after closing popup
      initialImagePositionToViewport = $(window).scrollTop();

      // Active states
      modalElement.addClass('is-active');
      currentCard.addClass('is-active');

      // Save initial size and position
      personModal.calculateCardSizeAndPosition();

      // Paste the content to modal
      modalContentTop.html(currentCard.find('.js-modal-content-top').html());
      modalContentBottom.html(currentCard.find('.js-modal-content-bottom').html());
      modalContentImage.html(currentCard.find('.js-modal-image').html());

      // Add and animate bg element
      popupBgElement = $("<div class='cmssite-modal-background-floating-block'></div>");
      popupBgElement.css({
        ...cardSizeAndPosition,
        visibility: 'hidden',
      });
      $('body').append(popupBgElement);
      setTimeout(function () {
        popupBgElement.css({
          visibility: 'visible',
        });
      }, 310);
      gsap.to(popupBgElement[0], {
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        duration: 1,
        ease: Expo.easeInOut,
        delay: 0.3,
      });

      // Calculate the position of image in modal
      personModal.calculateModalImageSizeAndPosition();

      // Animate modal image
      setTimeout(function () {
        modalContentImage.css({
          ...cardSizeAndPosition,
          position: 'fixed',
          visibility: 'visible',
        });

        modalContentImageSpacer = modalContentImage.clone().removeAttr('style').insertAfter(modalContentImage);
      }, 300);
      gsap.to(modalContentImage[0], {
        ...modalImageSizeAndPosition,
        duration: 1,
        ease: Expo.easeInOut,
        delay: 0.6,
        onComplete: function () {
          enableScroll();
          freezeFunctions.freeze();
          modalContentImage.css({
            position: '',
            height: '',
            width: '',
            left: '',
            top: '',
          });
          modalContentImageSpacer.remove();
        },
      });

      // Show modal
      modalElement.addClass('is-active');
    });
  },
  close: function (popupSelector) {
    // Unfreeze
    disableScroll();
    freezeFunctions.unfreeze();

    // Trigger resize event to update all sliders etc.
    triggerResize();

    // Scroll back to latest position
    setTimeout(function () {
      $("html, body").scrollTop(
        parseInt(initialImagePositionToViewport, 0)
      );
    }, 100);

    // Remove active states
    modalElement.removeClass('is-active');
    currentCard.removeClass('is-active');

    setTimeout(function () {
      personModal.calculateCardSizeAndPosition();
      personModal.calculateModalImageSizeAndPosition();

      // Animate BG back and hide
      gsap.to(popupBgElement[0], {
        ...cardSizeAndPosition,
        duration: 0.7,
        ease: Expo.easeInOut,
        delay: 0.45,
        onComplete: function () {
          popupBgElement.remove();
        },
      });

      // Animate image back, and reset styles
      modalContentImage.css({
        ...modalImageSizeAndPosition,
        position: 'fixed',
      });
      modalContentImageSpacer = modalContentImage.clone().removeAttr('style').insertAfter(modalContentImage);
      gsap.to(modalContentImage[0], {
        ...cardSizeAndPosition,
        duration: 1,
        ease: Expo.easeInOut,
        delay: 0.15,
      });
    }, 301);

    // Hide the modal
    setTimeout(function () {
      modalElement.hide();
      modalContentImage.removeAttr('style');
      modalContentImageSpacer.remove();

      // Enable scroll
      enableScroll();
      currentCard = null;
    }, 1751);
  },
};

// Open a modal by click
$(document).on('click', '.js-cmssite-modal-open', function () {
  personModal.open($(this));
});

$(document).on('click', '.js-cmssite-modal-close', personModal.close);