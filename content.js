console.log('[DEMO] loaded content script');

function demoExtensionClickHandler(event) {
  if (!event.isTrusted) return;
  event.preventDefault();
  event.stopPropagation();

  console.log('[DEMO] Intercepting click:', event);

  let target = event.target;
  // If the element is e.g. a SVG element, go up to find the closest link or button
  if (!(target instanceof HTMLElement)) {
    target = target.closest('a,button');
  }

  setTimeout(() => {
    target?.click();
  }, 1000);
}

document.removeEventListener('click', demoExtensionClickHandler);
document.addEventListener('click', demoExtensionClickHandler, { capture: true });

function demoExtensionMouseEventHandler(event) {
  if (!event.isTrusted) return;
  event.preventDefault();
  event.stopPropagation();

  console.log('[DEMO] Intercepting mouse event:', event);
  let target = event.target;

  setTimeout(() => {
    const newEvent = new event.constructor(event.type, event);
    target?.dispatchEvent(newEvent);
  }, 1000);
}

document.removeEventListener('mousedown', demoExtensionMouseEventHandler);
document.removeEventListener('mouseup', demoExtensionMouseEventHandler);
document.addEventListener('mousedown', demoExtensionMouseEventHandler, { capture: true });
document.addEventListener('mouseup', demoExtensionMouseEventHandler, { capture: true });
