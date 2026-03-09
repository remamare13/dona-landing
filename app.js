/* ============================================
   DONA — Scroll-Driven Frame Animation
   ============================================ */

(function () {
  'use strict';

  const FRAME_COUNT = 243;
  const FRAME_PATH = 'frames/frame_';
  const FRAME_EXT = '.webp';

  const images = [];
  let loadedCount = 0;
  let currentFrame = 0;
  let targetFrame = 0;
  let rafId = null;
  const canvas = document.getElementById('video-canvas');
  const ctx = canvas.getContext('2d');

  // --- Format number with dots (Slovenian locale) ---
  function formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // --- Canvas sizing ---
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrame);
  }
  window.addEventListener('resize', resizeCanvas);

  // --- Frame drawing (cover fit) ---
  function drawFrame(index) {
    const img = images[index];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }

  // --- Preload frames (progressive: key frames first, then fill in) ---
  function preloadFrames() {
    return new Promise((resolve) => {
      const loaderPercent = document.querySelector('.loader-percent');
      const loaderBarFill = document.querySelector('.loader-bar-fill');

      // Phase 1: every 5th frame (fast initial load)
      const keyFrames = [];
      const fillFrames = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        if (i % 5 === 1 || i === FRAME_COUNT) {
          keyFrames.push(i);
        } else {
          fillFrames.push(i);
        }
      }

      let keyLoaded = 0;
      const totalKey = keyFrames.length;

      function loadFrame(i) {
        return new Promise((res) => {
          const img = new Image();
          const num = String(i).padStart(4, '0');
          img.src = `${FRAME_PATH}${num}${FRAME_EXT}`;
          img.onload = () => { loadedCount++; res(); };
          img.onerror = () => { loadedCount++; res(); };
          images[i - 1] = img;
        });
      }

      // Load key frames first
      const keyPromises = keyFrames.map((i) =>
        loadFrame(i).then(() => {
          keyLoaded++;
          const pct = Math.round((keyLoaded / totalKey) * 100);
          if (loaderPercent) loaderPercent.textContent = pct + '%';
          if (loaderBarFill) loaderBarFill.style.width = pct + '%';
        })
      );

      Promise.all(keyPromises).then(() => {
        // Show page immediately with key frames
        resolve();
        // Phase 2: fill remaining frames in background
        fillFrames.forEach((i) => loadFrame(i));
      });
    });
  }

  function hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    setTimeout(() => { loader.style.display = 'none'; }, 700);
  }

  function initLenis() {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return lenis;
  }

  // --- Smooth frame interpolation via rAF ---
  function smoothFrameLoop() {
    if (currentFrame !== targetFrame) {
      // Lerp toward target for buttery smooth transitions
      const diff = targetFrame - currentFrame;
      const step = diff > 0 ? Math.max(1, Math.ceil(diff * 0.3)) : Math.min(-1, Math.floor(diff * 0.3));
      currentFrame += step;
      drawFrame(currentFrame);
    }
    rafId = requestAnimationFrame(smoothFrameLoop);
  }

  function initFrameScrub() {
    // Start the smooth render loop
    smoothFrameLoop();

    ScrollTrigger.create({
      trigger: '#scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        targetFrame = Math.min(
          FRAME_COUNT - 1,
          Math.floor(self.progress * FRAME_COUNT)
        );
      },
    });
  }

  function initSectionAnimations() {

    // --- HERO ---
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-hero',
        start: 'top 70%',
        end: 'center center',
        scrub: false,
        toggleActions: 'play none none reverse',
      },
    });

    heroTl
      .fromTo('.hero-title .line-1', {
        opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)',
      }, {
        opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
        duration: 0.9, ease: 'power3.out',
      }, 0)
      .fromTo('.hero-title .line-2', {
        opacity: 0, y: 30,
      }, {
        opacity: 1, y: 0,
        duration: 0.7, ease: 'power2.out',
      }, 0.3)
      .to('.hero-sub', {
        opacity: 1, duration: 0.6, ease: 'power2.out',
      }, 0.5);

    // --- PROBLEM (Odvetniška pisarna danes) ---
    const probTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-problem',
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    probTl
      .fromTo('.problem-heading', {
        opacity: 0, y: 30,
      }, {
        opacity: 1, y: 0,
        duration: 0.7, ease: 'power3.out',
      }, 0)
      .fromTo('.problem-col', {
        opacity: 0, y: 35,
      }, {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      }, 0.2)
      .fromTo('.problem-punchline', {
        opacity: 0, y: 20,
      }, {
        opacity: 1, y: 0,
        duration: 0.6, ease: 'power2.out',
      }, 0.6);

    // --- HARDWARE (zaupnost) ---
    const hwTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-hardware',
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    hwTl
      .fromTo('.section-hardware .section-heading', {
        opacity: 0, x: -50,
      }, {
        opacity: 1, x: 0,
        duration: 0.7, ease: 'power3.out',
      }, 0)
      .fromTo('.section-hardware .section-body', {
        opacity: 0, y: 25,
      }, {
        opacity: 1, y: 0,
        duration: 0.6, ease: 'power2.out',
      }, 0.2);

    // --- INTELLIGENCE ---
    const intTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-intelligence',
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    intTl
      .fromTo('.section-intelligence .section-heading', {
        opacity: 0, x: 50,
      }, {
        opacity: 1, x: 0,
        duration: 0.7, ease: 'power3.out',
      }, 0)
      .fromTo('.section-intelligence .section-body', {
        opacity: 0, y: 25,
      }, {
        opacity: 1, y: 0,
        duration: 0.6, ease: 'power2.out',
      }, 0.2);

    // --- STATS — count up with Slovenian formatting ---
    gsap.set('.stat', { opacity: 0, y: 35 });

    ScrollTrigger.create({
      trigger: '.section-stats',
      start: 'top 70%',
      onEnter: () => {
        document.querySelectorAll('.stat').forEach((stat, i) => {
          gsap.to(stat, {
            opacity: 1, y: 0,
            duration: 0.5, delay: i * 0.15,
            ease: 'power2.out',
          });
        });

        document.querySelectorAll('.stat-number').forEach((el) => {
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          const obj = { val: 0 };

          gsap.to(obj, {
            val: target,
            duration: 2,
            delay: 0.3,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = formatNumber(Math.round(obj.val)) + suffix;
            },
          });
        });
      },
      once: true,
    });

    // --- WORKFLOW (Kako deluje) ---
    gsap.set('.workflow-step', { opacity: 0, y: 35 });
    gsap.set('.workflow-line', { opacity: 0, scaleX: 0 });

    const wfTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-workflow',
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    wfTl
      .fromTo('.workflow-heading', {
        opacity: 0, y: 25,
      }, {
        opacity: 1, y: 0,
        duration: 0.6, ease: 'power2.out',
      }, 0);

    // Stagger: step → line → step → line → step
    const steps = document.querySelectorAll('.workflow-step');
    const lines = document.querySelectorAll('.workflow-line');
    let t = 0.3;
    steps.forEach((step, i) => {
      wfTl.to(step, {
        opacity: 1, y: 0,
        duration: 0.5, ease: 'power2.out',
      }, t);
      t += 0.25;
      if (lines[i]) {
        wfTl.to(lines[i], {
          opacity: 1, scaleX: 1,
          duration: 0.4, ease: 'power2.out',
        }, t);
        t += 0.15;
      }
    });

    // --- USECASE (Primer iz prakse) ---
    const ucTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-usecase',
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    ucTl
      .fromTo('.usecase-heading', {
        opacity: 0, y: 30,
      }, {
        opacity: 1, y: 0,
        duration: 0.7, ease: 'power3.out',
      }, 0)
      .fromTo('.usecase-scenario', {
        opacity: 0, y: 25,
      }, {
        opacity: 1, y: 0,
        duration: 0.6, ease: 'power2.out',
      }, 0.2)
      .fromTo('.usecase-step', {
        opacity: 0, x: -30,
      }, {
        opacity: 1, x: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
      }, 0.4)
      .fromTo('.usecase-result', {
        opacity: 0, y: 20,
      }, {
        opacity: 1, y: 0,
        duration: 0.6, ease: 'power2.out',
      }, 0.9);

    // --- FEATURES ---
    const featuresTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-features',
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });

    featuresTl
      .fromTo('.features-heading', {
        opacity: 0, y: 30,
      }, {
        opacity: 1, y: 0,
        duration: 0.6, ease: 'power2.out',
      }, 0)
      .fromTo('.features-sub', {
        opacity: 0, y: 20,
      }, {
        opacity: 1, y: 0,
        duration: 0.5, ease: 'power2.out',
      }, 0.15)
      .fromTo('.feature', {
        opacity: 0, y: 40,
      }, {
        opacity: 1, y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      }, 0.25);

    // --- CTA ---
    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-cta',
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    ctaTl
      .fromTo('.cta-heading', {
        opacity: 0, scale: 0.93,
      }, {
        opacity: 1, scale: 1,
        duration: 0.8, ease: 'power3.out',
      }, 0)
      .to('.cta-sub', {
        opacity: 1,
        duration: 0.6, ease: 'power2.out',
      }, 0.3)
      .to('.cta-button', {
        opacity: 1,
        duration: 0.5, ease: 'power2.out',
      }, 0.5)
      .to('.cta-badge', {
        opacity: 1,
        duration: 0.5, ease: 'power2.out',
      }, 0.65);

    // --- TRUST STRIP ---
    ScrollTrigger.create({
      trigger: '.section-trust',
      start: 'top 85%',
      onEnter: () => {
        gsap.to('.trust-items', {
          opacity: 1, duration: 0.7, ease: 'power2.out',
        });
      },
      once: true,
    });

    // --- FOOTER ---
    ScrollTrigger.create({
      trigger: '.section-footer',
      start: 'top 85%',
      onEnter: () => {
        gsap.to('.footer-content', {
          opacity: 1, duration: 0.8, ease: 'power2.out',
        });
      },
      once: true,
    });
  }

  // --- Init ---
  async function init() {
    resizeCanvas();
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await preloadFrames();
    drawFrame(0);
    hideLoader();

    gsap.registerPlugin(ScrollTrigger);
    initLenis();
    initFrameScrub();
    initSectionAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
