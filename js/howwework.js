function howWeWorkFunctions() {
    // Find needed elements
    var container = $(document).find('#howwework-animation'),
      stepsContainer = $(document).find('.howwework-steps'),
      steps = $(document).find('.howwework-step'),
      header = $(document).find('.header');
  
    // Stop function if there is no needed elements
    if (stepsContainer.length === 0 || container.length === 0 || steps.length === 0) return;
  
    // Load Lottie animation
    let anim = lottie.loadAnimation({
      container: container[0],
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'js/data.json',
    });
  
    // Variables for calculations
    var svgSectionHeight, sectionAnimationDurationMultiplier, sectionHeight, headerHeight;
    var scrollTriggersObjects = [];
  
    // Calculate and init everything after Lottie animation is loaded
    anim.addEventListener('DOMLoaded', function () {
      calculateAndSetStepsSizes();
      initializeScrollTriggers();
  
      // Debounced update everything on resize
      var debounceResize = debounce(
        function () {
          calculateAndSetStepsSizes();
          ScrollTrigger.refresh();
        },
        100,
        false
      );
      $(window).resize(debounceResize);
    });
  
    /*
    ###########################
    Main functions
    ###########################
     */
  
    // Calculate sizes of steps and duration of whole section
    function calculateAndSetStepsSizes() {
      svgSectionHeight = container.height() / steps.length; // Base height of each step based on SVG size
      sectionAnimationDurationMultiplier = 5; // Change this multiplier to change the duration of each section
      sectionHeight = svgSectionHeight * sectionAnimationDurationMultiplier; // Calculated height of each step
      headerHeight = 106; // Should be header.outerHeight(), but header's height is changing (.scrolled class). Need to decide, is it reasonable to calculate it onScroll or not.
  
      steps.outerHeight(sectionHeight); // Set height to each step
    }
  
    // ScrollTriggers
    function initializeScrollTriggers() {
      var animObject = {
        progress: 0,
      };
  
      // Animation for Lottie
      ScrollTrigger.create({
        trigger: stepsContainer[0],
        scrub: 0.5, // Sets how smooth the animation is
        start: `top top+=${headerHeight}px`,
        end: 'bottom bottom',
        animation: gsap.fromTo(
          animObject,
          { progress: 0 },
          {
            progress: 1,
            onUpdate: function () {
              anim.goToAndStop(Math.floor(animObject.progress * (anim.totalFrames / anim.frameModifier - 1)));
            },
            ease: 'none', // To prevent wrong calculations
          }
        ),
      });
  
      // Animations for each step
      steps.each(function (i) {
        var stepShapesContainer = $(steps[i]).find('.howwework-shapes'), // Container for triangles
          stepTextsWrapper = $(steps[i]).find('.howwework-texts-wrapper'), // Wrapper of texts container
          stepTexts = stepTextsWrapper.find('.howwework-texts'), // Texts container
          stepTriangleThatAppearInEnd = stepShapesContainer.find('.howwework-step-end-appear-triangle');
  
        if (stepTextsWrapper.length > 0) {
          // Pinning the texts wrapper
          ScrollTrigger.create({
            trigger: steps[i],
            pin: stepTextsWrapper[0],
            start: `top top+=${headerHeight}px`,
            end: 'bottom bottom',
          });
  
          // Parallax animations for text wrapper
          /* const textTimeline = gsap.timeline();
          textTimeline.fromTo(stepTexts[0], {y: `5vw`}, {y: `-5vw`, ease: 'none'});
  
          ScrollTrigger.create({
            trigger: steps[i],
            scrub: .5, // Sets how smooth the animation is
            start: `top top+=${headerHeight}px`,
            end: "bottom bottom",
            animation: textTimeline,
          }); */
        }
  
        function createStepsPin() {
          return ScrollTrigger.create({
            trigger: steps[i],
            pin: stepShapesContainer[0],
            start: `top+=${stepShapesContainer.outerHeight()}px bottom`,
            end: 'bottom bottom',
          });
        }
  
        var stepsPin = null;
  
        if (stepShapesContainer.length > 0) {
          // Pinning the shapes (triangles)
          stepsPin = createStepsPin();
  
          if (stepTriangleThatAppearInEnd.length > 0) {
            ScrollTrigger.create({
              trigger: steps[i],
              scrub: 0.25,
              start: `top top+=${headerHeight}px`,
              end: `bottom bottom+=${svgSectionHeight / +stepTriangleThatAppearInEnd.data('time-modifier')}px`,
              animation: gsap.fromTo(stepTriangleThatAppearInEnd[0], { y: '100vh' }, { y: '0', ease: 'none' }), // Animation of triangle before the bounce
            });
          }
        }
  
        // Pinning the animation container
        function createAnimationPin() {
          return ScrollTrigger.create({
            trigger: steps[i],
            pin: container[0],
            start: `top+=${svgSectionHeight}px bottom`,
            end: 'bottom bottom',
          });
        }
  
        var animationPin = createAnimationPin();
  
        /*
        Kill and create the ScrollTrigger instance again for pinning the animation
        to prevent wrong calculations
         */
        var debouncedAnimationPinReInit = debounce(
          function () {
            animationPin.kill();
            stepsPin?.kill();
            setTimeout(function () {
              animationPin = createAnimationPin();
              if (stepShapesContainer.length > 0) stepsPin = createStepsPin();
            }, 1);
          },
          100,
          false
        );
        $(window).resize(debouncedAnimationPinReInit);
      });
    }
  }
  
  howWeWorkFunctions();