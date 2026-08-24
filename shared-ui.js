(function() {
  const SCROLL_STATE_PREFIX = 'scroll-state:';

  function getScrollableElement() {
    const candidates = document.querySelectorAll('.work-frame, .gallery-frame, .bio-shell');
    for (let i = 0; i < candidates.length; i += 1) {
      const el = candidates[i];
      const style = window.getComputedStyle(el);
      const canScroll = (style.overflowY === 'auto' || style.overflowY === 'scroll')
        && el.scrollHeight > el.clientHeight + 1;
      if (canScroll) return el;
    }
    return document.scrollingElement || document.documentElement;
  }

  function getScrollStorageKey() {
    return SCROLL_STATE_PREFIX + window.location.pathname;
  }

  function saveScrollState() {
    const target = getScrollableElement();
    if (!target) return;
    sessionStorage.setItem(getScrollStorageKey(), String(target.scrollTop || 0));
  }

  function restoreScrollState() {
    const rawValue = sessionStorage.getItem(getScrollStorageKey());
    if (rawValue === null) return;

    const savedTop = Number(rawValue);
    sessionStorage.removeItem(getScrollStorageKey());
    if (!Number.isFinite(savedTop) || savedTop <= 0) return;

    const target = getScrollableElement();
    if (!target) return;

    target.scrollTop = savedTop;
    requestAnimationFrame(function() {
      target.scrollTop = savedTop;
    });
  }

  function navigateWithFade(targetUrl) {
    saveScrollState();
    document.body.classList.add('fade-out');
    setTimeout(function() {
      window.location.href = targetUrl;
    }, 300);
  }

  function setupFadeNavigation() {
    if (!document.body || document.body.dataset.fadeNavigationBound === 'true') return;

    document.body.dataset.fadeNavigationBound = 'true';
    document.body.addEventListener('click', function(event) {
      const link = event.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || link.target === '_blank') return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || url.href === window.location.href) return;

      event.preventDefault();
      navigateWithFade(url.href);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFadeNavigation);
    document.addEventListener('DOMContentLoaded', restoreScrollState);
  } else {
    setupFadeNavigation();
    restoreScrollState();
  }

  window.navigateWithFade = navigateWithFade;
  window.setupFadeNavigation = setupFadeNavigation;
})();