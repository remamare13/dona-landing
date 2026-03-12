// FAQ accordion
document.querySelectorAll('.faq-question').forEach(function (q) {
  q.addEventListener('click', function () {
    q.parentElement.classList.toggle('open');
  });
});

// Fade-in on scroll
if (typeof IntersectionObserver !== 'undefined') {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Active nav link
(function () {
  var path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (path.startsWith(href) && href !== '/') {
      a.classList.add('active');
    }
  });
})();

// Mobile hamburger menu
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  // Create hamburger button
  var hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Odpri meni');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(hamburger);

  // Create mobile menu overlay
  var menu = document.createElement('div');
  menu.className = 'mobile-menu';

  var path = window.location.pathname;

  // Build mobile menu: Funkcije (expandable) + other links
  var funcToggle = document.createElement('a');
  funcToggle.href = '#';
  funcToggle.textContent = 'Funkcije';
  funcToggle.className = 'mobile-func-toggle';
  if (path.startsWith('/funkcije/')) funcToggle.classList.add('active');
  menu.appendChild(funcToggle);

  var funcSub = document.createElement('div');
  funcSub.className = 'mobile-func-sub';
  var funcPages = [
    { href: '/funkcije/raziskava', text: 'Pravno raziskovanje' },
    { href: '/funkcije/posta', text: 'Vhodna pošta' },
    { href: '/funkcije/spisi', text: 'Spisi' },
    { href: '/funkcije/roki', text: 'Roki' },
    { href: '/funkcije/dokumenti', text: 'Dokumenti' },
    { href: '/funkcije/skladnost', text: 'Skladnost' }
  ];
  funcPages.forEach(function (p) {
    var a = document.createElement('a');
    a.href = p.href;
    a.textContent = p.text;
    a.className = 'mobile-func-link';
    if (path.endsWith(p.href) || path.endsWith(p.href + '/')) a.classList.add('active');
    funcSub.appendChild(a);
  });
  menu.appendChild(funcSub);

  // Auto-open sub-menu on /funkcije/* pages
  if (path.startsWith('/funkcije/')) {
    funcSub.classList.add('open');
  }

  // Toggle sub-menu
  funcToggle.addEventListener('click', function (e) {
    e.preventDefault();
    funcSub.classList.toggle('open');
  });

  // Add remaining nav links
  var navItems = [
    { text: 'Primeri', href: '/primeri' },
    { text: 'Blog', href: '/blog' },
    { text: 'FAQ', href: '/faq' },
    { text: 'O nas', href: '/o-nas' }
  ];
  navItems.forEach(function (item) {
    var a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.text;
    if (path.startsWith(item.href)) a.classList.add('active');
    menu.appendChild(a);
  });

  // Add CTA
  var cta = document.querySelector('.nav-cta');
  if (cta) {
    var ctaClone = document.createElement('a');
    ctaClone.href = cta.href;
    ctaClone.textContent = cta.textContent;
    ctaClone.className = 'mobile-cta';
    menu.appendChild(ctaClone);
  }

  document.body.appendChild(menu);

  // Toggle
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      hamburger.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// Sticky mobile CTA
(function () {
  var cta = document.getElementById('mobile-cta');
  if (!cta) return;
  var footer = document.querySelector('.footer');
  var footerVisible = false;
  var scrolledPast = false;

  if (footer && typeof IntersectionObserver !== 'undefined') {
    var io = new IntersectionObserver(function (entries) {
      footerVisible = entries[0].isIntersecting;
      cta.style.opacity = (scrolledPast && !footerVisible) ? '1' : '0';
      cta.style.pointerEvents = (scrolledPast && !footerVisible) ? 'auto' : 'none';
    }, { threshold: 0 });
    io.observe(footer);
  }

  cta.style.opacity = '0';
  cta.style.pointerEvents = 'none';
  cta.style.transition = 'opacity 0.3s ease';

  window.addEventListener('scroll', function () {
    scrolledPast = window.scrollY > 300;
    cta.style.opacity = (scrolledPast && !footerVisible) ? '1' : '0';
    cta.style.pointerEvents = (scrolledPast && !footerVisible) ? 'auto' : 'none';
  }, { passive: true });
})();

// Function page navigation: SPA-like slide transitions
(function () {
  var funcPages = [
    { href: '/funkcije/raziskava', text: 'Pravno raziskovanje' },
    { href: '/funkcije/posta', text: 'Vhodna pošta' },
    { href: '/funkcije/spisi', text: 'Spisi' },
    { href: '/funkcije/roki', text: 'Roki' },
    { href: '/funkcije/dokumenti', text: 'Dokumenti' },
    { href: '/funkcije/skladnost', text: 'Skladnost' }
  ];

  var path = window.location.pathname.replace(/\/$/, '');
  var idx = -1;
  funcPages.forEach(function (p, i) { if (path === p.href) idx = i; });
  if (idx === -1) return;

  var prevIdx = idx > 0 ? idx - 1 : funcPages.length - 1;
  var nextIdx = idx < funcPages.length - 1 ? idx + 1 : 0;

  // Prefetch ALL function pages into cache for instant swap
  var pageCache = {};
  funcPages.forEach(function (p) {
    if (p.href === path) return;
    fetch(p.href).then(function (r) { return r.text(); }).then(function (html) {
      pageCache[p.href] = html;
    });
  });

  // Build arrows
  var prev = document.createElement('div');
  prev.className = 'func-arrow func-arrow-prev';
  prev.innerHTML = '<a href="' + funcPages[prevIdx].href + '" data-slide="prev" aria-label="' + funcPages[prevIdx].text + '">' +
    '&#8249;<span class="func-arrow-label">' + funcPages[prevIdx].text + '</span></a>';
  document.body.appendChild(prev);

  var next = document.createElement('div');
  next.className = 'func-arrow func-arrow-next';
  next.innerHTML = '<a href="' + funcPages[nextIdx].href + '" data-slide="next" aria-label="' + funcPages[nextIdx].text + '">' +
    '&#8250;<span class="func-arrow-label">' + funcPages[nextIdx].text + '</span></a>';
  document.body.appendChild(next);

  // Build bottom func-nav
  var footer = document.querySelector('.footer');
  if (footer) {
    var bottomNav = document.createElement('div');
    bottomNav.className = 'func-nav func-nav-bottom';
    funcPages.forEach(function (p) {
      var a = document.createElement('a');
      a.href = p.href;
      a.textContent = p.text;
      if (path === p.href) a.classList.add('active');
      a.setAttribute('data-slide', funcPages.indexOf(p) > idx ? 'next' : 'prev');
      bottomNav.appendChild(a);
    });
    footer.parentNode.insertBefore(bottomNav, footer);
  }

  var sliding = false;

  function getSlideEls() {
    return [
      document.querySelector('.func-nav:not(.func-nav-bottom)'),
      document.querySelector('.content'),
      document.querySelector('.func-nav-bottom')
    ].filter(Boolean);
  }

  // Swap page content in-place (no full reload)
  function swapPage(href, dir) {
    if (sliding) return;
    sliding = true;

    var slideEls = getSlideEls();
    var content = document.querySelector('.content');
    document.body.classList.add('sliding');

    // Slide out
    var outCls = dir === 'next' ? 'slide-out-left' : 'slide-out-right';
    slideEls.forEach(function (el) { el.classList.add(outCls); });

    function doSwap(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      // Swap content
      var newContent = doc.querySelector('.content');
      var newFuncNav = doc.querySelector('.func-nav');
      var oldContent = document.querySelector('.content');
      var oldFuncNav = document.querySelector('.func-nav:not(.func-nav-bottom)');

      if (newContent && oldContent) oldContent.parentNode.replaceChild(newContent, oldContent);
      if (newFuncNav && oldFuncNav) oldFuncNav.parentNode.replaceChild(newFuncNav, oldFuncNav);

      // Update title
      var newTitle = doc.querySelector('title');
      if (newTitle) document.title = newTitle.textContent;

      // Update URL
      history.pushState(null, '', href);
      path = href;

      // Recalculate index
      idx = -1;
      funcPages.forEach(function (p, i) { if (path === p.href) idx = i; });
      prevIdx = idx > 0 ? idx - 1 : funcPages.length - 1;
      nextIdx = idx < funcPages.length - 1 ? idx + 1 : 0;

      // Update arrows
      var prevA = document.querySelector('.func-arrow-prev a');
      var nextA = document.querySelector('.func-arrow-next a');
      prevA.href = funcPages[prevIdx].href;
      prevA.setAttribute('aria-label', funcPages[prevIdx].text);
      prevA.querySelector('.func-arrow-label').textContent = funcPages[prevIdx].text;
      nextA.href = funcPages[nextIdx].href;
      nextA.setAttribute('aria-label', funcPages[nextIdx].text);
      nextA.querySelector('.func-arrow-label').textContent = funcPages[nextIdx].text;

      // Rebuild bottom func-nav
      var oldBot = document.querySelector('.func-nav-bottom');
      if (oldBot) oldBot.remove();
      var ft = document.querySelector('.footer');
      if (ft) {
        var bn = document.createElement('div');
        bn.className = 'func-nav func-nav-bottom';
        funcPages.forEach(function (p) {
          var a = document.createElement('a');
          a.href = p.href;
          a.textContent = p.text;
          if (path === p.href) a.classList.add('active');
          a.setAttribute('data-slide', funcPages.indexOf(p) > idx ? 'next' : 'prev');
          bn.appendChild(a);
        });
        ft.parentNode.insertBefore(bn, ft);
        bindFuncNavClicks();
      }

      // Re-init fade-in observer for new content
      if (typeof IntersectionObserver !== 'undefined') {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'translateY(0)'; }
          });
        }, { threshold: 0.1 });
        document.querySelectorAll('.content .fade-in').forEach(function (el) {
          el.style.opacity = 0;
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          obs.observe(el);
        });
      }

      // Scroll to top
      window.scrollTo(0, 0);

      // Slide in
      var newSlideEls = getSlideEls();
      var inCls = dir === 'next' ? 'slide-in-from-right' : 'slide-in-from-left';
      newSlideEls.forEach(function (el) { el.classList.add(inCls); });
      var newC = document.querySelector('.content');
      newC.addEventListener('animationend', function () {
        newSlideEls.forEach(function (el) { el.classList.remove(inCls); });
        document.body.classList.remove('sliding');
        sliding = false;
      }, { once: true });
    }

    content.addEventListener('animationend', function () {
      if (pageCache[href]) {
        doSwap(pageCache[href]);
      } else {
        fetch(href).then(function (r) { return r.text(); }).then(doSwap);
      }
    }, { once: true });
  }

  function handleSlideClick(e) {
    var link = e.currentTarget;
    var dir = link.getAttribute('data-slide');
    var href = link.getAttribute('href');
    if (!dir || !href || href === path) return;
    e.preventDefault();
    swapPage(href, dir);
  }

  // Bind clicks on arrows
  document.querySelectorAll('.func-arrow a').forEach(function (a) {
    a.addEventListener('click', handleSlideClick);
  });

  // Bind clicks on all func-nav links
  function bindFuncNavClicks() {
    document.querySelectorAll('.func-nav a:not(.active)').forEach(function (a) {
      if (!a.getAttribute('data-slide')) {
        var linkIdx = -1;
        funcPages.forEach(function (p, i) { if (a.getAttribute('href') === p.href) linkIdx = i; });
        a.setAttribute('data-slide', linkIdx > idx ? 'next' : 'prev');
      }
      a.removeEventListener('click', handleSlideClick);
      a.addEventListener('click', handleSlideClick);
    });
  }
  bindFuncNavClicks();

  // Handle browser back/forward
  window.addEventListener('popstate', function () {
    window.location.reload();
  });
})();

// Savings calculator
(function () {
  var lawyers = document.getElementById('calc-lawyers');
  var hours = document.getElementById('calc-hours');
  var rate = document.getElementById('calc-rate');
  if (!lawyers || !hours || !rate) return;

  function fmt(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function calc() {
    var l = parseInt(lawyers.value);
    var h = parseInt(hours.value);
    var r = parseInt(rate.value);
    document.getElementById('calc-lawyers-val').textContent = l;
    document.getElementById('calc-hours-val').textContent = h;
    document.getElementById('calc-rate-val').textContent = r;

    // ur/mesec prihranjen = odvetniki * ur/teden * 4.33 tednov * 70% avtomatizacije
    var savedHours = Math.round(l * h * 4.33 * 0.7);
    // EUR/mesec prihranjen prihodek (pridobljene ure * urna postavka)
    var savedMoney = savedHours * r;
    // ROI: investicija 8.000 EUR / (mesečni prihranek - 300 EUR tekoči stroški)
    var netMonthly = savedMoney - 300;
    var roiMonths = netMonthly > 0 ? Math.max(1, Math.ceil(8000 / netMonthly)) : 99;

    document.getElementById('calc-hours-saved').textContent = fmt(savedHours);
    document.getElementById('calc-money-saved').textContent = fmt(savedMoney);

    // Slovenska sklanjatev: 1 mesec, 2 meseca, 3-4 mesece, 5+ mesecev
    var roiText;
    if (roiMonths <= 1) { roiText = '< 1'; }
    else if (roiMonths > 24) { roiText = '24+'; }
    else { roiText = roiMonths; }
    document.getElementById('calc-roi').textContent = roiText;

    var m = roiMonths % 100;
    var label;
    if (roiMonths <= 1) { label = 'mesec do povrnitve investicije'; }
    else if (m === 2) { label = 'meseca do povrnitve investicije'; }
    else if (m === 3 || m === 4) { label = 'mesece do povrnitve investicije'; }
    else { label = 'mesecev do povrnitve investicije'; }
    document.getElementById('calc-roi').parentElement.querySelector('.calc-result-label').textContent = label;
  }

  lawyers.addEventListener('input', calc);
  hours.addEventListener('input', calc);
  rate.addEventListener('input', calc);
  calc();
})();
