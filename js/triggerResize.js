function triggerResize() {
    // Trigger resize event to update all sliders etc.
    var resizeEvent = window.document.createEvent('UIEvents');
    resizeEvent.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(resizeEvent);
    $(window).trigger('resize');
  }