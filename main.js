// Fade transition between pages + mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  document.documentElement.classList.remove('js-loading');

  var burger = document.getElementById('burgerBtn');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var internalLinks = document.querySelectorAll('a[data-transition]');
  internalLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' || link.target === '_blank') return;
      e.preventDefault();
      document.body.classList.add('page-exit');
      window.setTimeout(function () {
        window.location.href = href;
      }, 260);
    });
  });
});
