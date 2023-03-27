console.log('[DEMO] loaded content script');

document.addEventListener('click', function demoExtensionClickHandler(event) {
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
}, { capture: true });
