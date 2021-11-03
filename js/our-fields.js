function initOurFIeldsAnimation() {
    var ourFieldsScene = $(document).find('.our-fields__scene'),
      ourFieldsWrapper = ourFieldsScene.find('.our-fields__wrapper'),
      ourFieldsAnimation = lottie.loadAnimation({
        container: $('#our-fields-animation')[0],
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'js/our-fields-animation.json',
      }),
      ourFieldsTitles = ourFieldsWrapper.find('.our-fields__title'),
      ourFieldsStep = 1 / (ourFieldsTitles.length + 1),
      ourFieldsAnimObject = {
        progress: 0,
      },
      ourFieldsAnimationFinished = false,
      ourFieldsScrollTrigger,
      ourFieldsScrollStateTrigger;
  
    function ourFieldsCalculateHeaderHeight() {
      return $(window).outerWidth() < 768 ? 75 : 106;
    }
  
    // Controller for animations and titles states
    function createOurFieldsScrollTrigger() {
      return ScrollTrigger.create({
        trigger: ourFieldsScene[0],
        pin: ourFieldsWrapper[0],
        scrub: 0.5,
        start: `top+=${ourFieldsWrapper.outerHeight() / 2}px center+=${ourFieldsCalculateHeaderHeight() / 2}px`,
        end: `bottom-=${ourFieldsWrapper.outerHeight() / 2}px center+=${ourFieldsCalculateHeaderHeight() / 2}px`,
        animation: gsap.fromTo(
          ourFieldsAnimObject,
          { progress: 0 },
          {
            progress: 1,
            onUpdate: function () {
              if (!ourFieldsAnimationFinished) {
                // Animate titles
                $(ourFieldsTitles[Math.floor(ourFieldsAnimObject.progress / ourFieldsStep)])
                  .addClass('is-active')
                  .siblings()
                  .removeClass('is-active');
  
                // Animate Lottie
                ourFieldsAnimation.goToAndStop(
                  Math.floor(
                    ourFieldsAnimObject.progress * (ourFieldsAnimation.totalFrames / ourFieldsAnimation.frameModifier - 1)
                  )
                );
              }
            },
            ease: 'none', // To prevent wrong calculations
          }
        ),
        onLeave: function () {
          ourFieldsAnimationFinished = true;
        },
      });
    }
  
    // Resets the animation state if we scroll to top and the scene leaves the screen
    function createOurFieldsStateTrigger() {
      return ScrollTrigger.create({
        trigger: ourFieldsScene[0],
        pin: false,
        scrub: true,
        start: 'top bottom',
        end: 'bottom bottom',
        onLeaveBack: function () {
          ourFieldsAnimationFinished = false;
          $(ourFieldsTitles[0]).addClass('is-active').siblings().removeClass('is-active');
          ourFieldsAnimation.goToAndStop(0);
        },
      });
    }
  
    // Init ScrollTrigger instances
    ourFieldsScrollTrigger = createOurFieldsScrollTrigger();
    ourFieldsScrollStateTrigger = createOurFieldsStateTrigger();
  
    // Update on resize
    $(window).resize(
      debounce(
        function () {
          ourFieldsScrollTrigger?.kill();
          ourFieldsScrollStateTrigger?.kill();
          setTimeout(function () {
            ourFieldsScrollTrigger = createOurFieldsScrollTrigger();
            ourFieldsScrollStateTrigger = createOurFieldsStateTrigger();
          }, 1);
        },
        100,
        false
      )
    );
  }
  
  // Run the whole script only if page contains scene block
  if ($(document).find('.our-fields__scene').length > 0) {
    initOurFIeldsAnimation();
  }