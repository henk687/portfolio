// Script is "freezing" the page and disables scrolling
var freezeFunctions = {
    lastTopPosition: 0,
    freeze: function () {
      var h = $('html');
  
      if (h.css('position') !== 'fixed') {
        this.lastTopPosition = h.scrollTop() ? h.scrollTop() : $('body').scrollTop();
  
        // Pause scrollTriggers in Team section
        $.each(cmssiteSectionScrollTriggers, function () {
          ScrollTrigger.saveStyles(cmssiteSectionCardsWrappers);
          this.disable();
        });
  
        setTimeout(function () {
          if (window.innerWidth > h.width()) {
            h.css('overflow-y', 'scroll');
          }
  
          h.css({
            position: 'fixed',
            top: -top,
          });
        }, 1);
      }
    },
    unfreeze: function () {
      var h = $('html');
  
      if (h.css('position') === 'fixed') {
        h.css('position', 'static');
        h.css({
          position: '',
          top: '',
          'overflow-y': '',
        });
  
        // Unpause scrollTriggers in Team section
        setTimeout(function () {
          $.each(cmssiteSectionScrollTriggers, function () {
            this.enable();
            setTimeout(() => {
              this.refresh();
            }, 1);
          });
        }, 100);
      }
    },
  };