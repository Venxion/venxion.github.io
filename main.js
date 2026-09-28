// Mobile nav toggle + click-to-navigate fade transition
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burgerBtn');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var fadeTarget = document.querySelector('.fade-target');

  var internalLinks = document.querySelectorAll('a[data-transition]');
  internalLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' || link.target === '_blank') return;
      e.preventDefault();
      if (fadeTarget) fadeTarget.classList.add('page-exit');
      window.setTimeout(function () {
        window.location.href = href;
      }, 240);
    });
  });

  initGalleries();
});

// Runs on every page *show*, including when the browser restores a page
// from back/forward cache -- this is what fixes the black-screen-on-back
// issue, since a plain DOMContentLoaded listener never re-fires then.
window.addEventListener('pageshow', function () {
  document.documentElement.classList.remove('js-loading');
  var fadeTarget = document.querySelector('.fade-target');
  if (fadeTarget) fadeTarget.classList.remove('page-exit');
});

// Auto-rotating image galleries (used on the About page's hobbies section).
function initGalleries() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.hobby-gallery').forEach(function (gallery) {
    var slides = gallery.querySelectorAll('.hobby-slide');
    var dots = gallery.querySelectorAll('.hobby-dot');
    if (slides.length < 2) return;

    var idx = 0;
    var interval = parseInt(gallery.getAttribute('data-interval'), 10) || 4000;
    var timer = null;

    function show(i) {
      idx = i;
      slides.forEach(function (s, si) { s.classList.toggle('active', si === idx); });
      dots.forEach(function (d, di) { d.classList.toggle('active', di === idx); });
    }
    function next() { show((idx + 1) % slides.length); }
    function start() { if (!reduceMotion) timer = window.setInterval(next, interval); }
    function stop() { window.clearInterval(timer); }

    dots.forEach(function (dot, di) {
      dot.addEventListener('click', function () {
        show(di);
        stop();
        start();
      });
    });

    gallery.addEventListener('mouseenter', stop);
    gallery.addEventListener('mouseleave', start);

    show(0);
    start();
  });
}
