(function () {
  var pop = document.getElementById('pop');
  var popImg = pop.querySelector('img');
  var popName = pop.querySelector('.cap b');
  var popSub = pop.querySelector('.cap span');
  var showTimer = null;
  var pinned = null; // element that was tapped/clicked open

  function hide() {
    clearTimeout(showTimer);
    showTimer = null;
    pinned = null;
    pop.classList.remove('on');
    pop.hidden = true;
  }

  function place(target) {
    var r = target.getBoundingClientRect();
    pop.hidden = false;            // measurable, still transparent
    var pw = pop.offsetWidth, ph = pop.offsetHeight;
    var x = r.left + r.width / 2 - pw / 2;
    x = Math.max(8, Math.min(x, window.innerWidth - pw - 8));
    var y = r.top - ph - 10;       // prefer above
    if (y < 8) y = Math.min(r.bottom + 10, window.innerHeight - ph - 8);
    pop.style.left = x + 'px';
    pop.style.top = Math.max(8, y) + 'px';
    pop.classList.add('on');
  }

  function schedule(target, src, name, sub, delay) {
    clearTimeout(showTimer);
    showTimer = setTimeout(function () {
      popImg.src = src;
      popImg.alt = name;
      popName.textContent = name;
      popSub.textContent = sub;
      popSub.style.display = sub ? '' : 'none';
      place(target);
    }, delay);
  }

  function attach(el, getData) {
    el.addEventListener('mouseenter', function () {
      if (pinned) return;
      var d = getData();
      schedule(el, d.src, d.name, d.sub, 250);
    });
    el.addEventListener('mouseleave', function () {
      if (!pinned) hide();
    });
    el.addEventListener('click', function (e) {
      if (el.classList.contains('iref')) e.preventDefault();
      if (pinned === el) { hide(); return; }
      pinned = null;
      var d = getData();
      schedule(el, d.src, d.name, d.sub, 0);
      pinned = el;
    });
  }

  document.querySelectorAll('.loot-preview').forEach(function (button) {
    var li = button.closest('li');
    var img = button.querySelector('img');
    var nm = li.querySelector('.nm');
    var price = li.querySelector('.price');
    attach(button, function () {
      return {
        src: img.getAttribute('data-preview') || img.src,
        name: nm ? nm.textContent : (img.alt || ''),
        sub: price ? price.textContent : ''
      };
    });
  });

  document.querySelectorAll('.fight-card .shots img, .zoomable-guide-image').forEach(function (img) {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge ' + (img.alt || 'fight reference'));
    attach(img, function () {
      return {
        src: img.getAttribute('data-preview') || img.src,
        name: img.alt || 'Fight reference',
        sub: img.getAttribute('data-sub') || 'Enemy and weapon reference'
      };
    });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        img.click();
      }
    });
  });

  document.querySelectorAll('.iref').forEach(function (el) {
    attach(el, function () {
      return {
        src: el.getAttribute('data-preview'),
        name: el.getAttribute('data-cap') || el.textContent,
        sub: el.getAttribute('data-sub') || ''
      };
    });
  });

  window.addEventListener('scroll', hide, { passive: true });
  window.addEventListener('resize', hide);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  document.addEventListener('click', function (e) {
    if (pinned && !pinned.contains(e.target)) hide();
  });
})();


(function () {
  var nav = document.getElementById('pages-nav');
  if (!nav) return;
  var links = nav.querySelectorAll('a[data-page]');
  var pages = document.querySelectorAll('.page[data-page]');
  var rail = nav.querySelector('.pages-nav__rail');

  function show(id, hashValue) {
    pages.forEach(function (p) {
      p.classList.toggle('active', p.getAttribute('data-page') === id);
    });
    links.forEach(function (link) {
      var isActive = link.getAttribute('data-page') === id;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
        if (rail) {
          var left = link.offsetLeft - (rail.clientWidth - link.offsetWidth) / 2;
          var motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
          rail.scrollTo({ left: Math.max(0, left), behavior: motion });
        }
      } else {
        link.removeAttribute('aria-current');
      }
    });
    try { history.replaceState(null, '', '#' + (hashValue || id)); } catch (e) {}
    window.scrollTo(0, 0);
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      show(link.getAttribute('data-page'));
    });
  });

  // In-page company chips should jump to companies page first
  document.querySelectorAll('nav.chips a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      var page = target.closest('.page[data-page]');
      if (page) {
        e.preventDefault();
        show(page.getAttribute('data-page'), id);
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    });
  });

  var hash = (location.hash || '#home').slice(1);
  var pageMatch = [...pages].find(function (p) { return p.getAttribute('data-page') === hash; });
  var anchorMatch = pageMatch ? null : document.getElementById(hash);
  var parentPage = anchorMatch && anchorMatch.closest('.page[data-page]');
  show(pageMatch ? hash : (parentPage ? parentPage.getAttribute('data-page') : 'home'), anchorMatch ? hash : null);
  if (anchorMatch) {
    setTimeout(function () { anchorMatch.scrollIntoView({ block: 'start' }); }, 0);
  } else {
    setTimeout(function () { window.scrollTo(0, 0); }, 0);
  }

  window.addEventListener('hashchange', function () {
    var nextHash = (location.hash || '#home').slice(1);
    var nextPage = [...pages].find(function (p) { return p.getAttribute('data-page') === nextHash; });
    var nextAnchor = nextPage ? null : document.getElementById(nextHash);
    var nextParent = nextAnchor && nextAnchor.closest('.page[data-page]');
    show(nextPage ? nextHash : (nextParent ? nextParent.getAttribute('data-page') : 'home'), nextAnchor ? nextHash : null);
    if (nextAnchor) nextAnchor.scrollIntoView({ block: 'start' });
  });
})();


(function () {
  var grid = document.getElementById('outpost-grid');
  if (!grid) return;
  grid.querySelectorAll('.outpost-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var imgEl = btn.querySelector('img');
      var title = btn.querySelector('b');
      var sub = btn.querySelector('.obody span');
      var pop = document.getElementById('pop');
      if (!pop || !imgEl) return;
      pop.querySelector('img').src = imgEl.src;
      pop.querySelector('img').alt = imgEl.alt;
      pop.querySelector('.cap b').textContent = title ? title.textContent : imgEl.alt;
      var subEl = pop.querySelector('.cap span');
      subEl.textContent = sub ? sub.textContent : '';
      subEl.style.display = subEl.textContent ? '' : 'none';
      pop.hidden = false;
      var r = btn.getBoundingClientRect();
      var pw = pop.offsetWidth, ph = pop.offsetHeight;
      var x = Math.max(8, Math.min(r.left + r.width / 2 - pw / 2, window.innerWidth - pw - 8));
      var y = r.top - ph - 10;
      if (y < 8) y = Math.min(r.bottom + 10, window.innerHeight - ph - 8);
      pop.style.left = x + 'px';
      pop.style.top = Math.max(8, y) + 'px';
      pop.classList.add('on');
      // mark as pinned via dataset so outside-click handler can clear
      pop.dataset.pinnedOutpost = '1';
      btn.focus();
    });
  });
  document.addEventListener('click', function (e) {
    var pop = document.getElementById('pop');
    if (!pop || pop.dataset.pinnedOutpost !== '1') return;
    if (e.target.closest && e.target.closest('.outpost-btn')) return;
    pop.classList.remove('on');
    pop.hidden = true;
    delete pop.dataset.pinnedOutpost;
  });
})();

