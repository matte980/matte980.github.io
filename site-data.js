window.SITE_NAV = {
  brand: 'Matteo Monzali',
  personal: 'Human nature',
  work: 'Science',
  research: 'Found Archives'
};

(function() {
  function applySiteLabels() {
    document.querySelectorAll('[data-site-label]').forEach(function(element) {
      const key = element.getAttribute('data-site-label');
      const label = window.SITE_NAV[key];
      if (typeof label !== 'string') return;

      const prefix = element.getAttribute('data-site-label-prefix') || '';
      const suffix = element.getAttribute('data-site-label-suffix') || '';
      element.textContent = prefix + label + suffix;
    });

    document.querySelectorAll('[data-site-title]').forEach(function(element) {
      const key = element.getAttribute('data-site-title');
      const label = window.SITE_NAV[key];
      if (typeof label !== 'string') return;

      const prefix = element.getAttribute('data-site-title-prefix') || '';
      const suffix = element.getAttribute('data-site-title-suffix') || '';
      document.title = prefix + label + suffix;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySiteLabels);
  } else {
    applySiteLabels();
  }

  window.applySiteLabels = applySiteLabels;
})();
