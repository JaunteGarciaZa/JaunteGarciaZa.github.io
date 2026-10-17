// Page motion: Lenis smooth scroll on GSAP's ticker, plus the sticker-book animations.
// Everything lives inside a reduced-motion media query, so those visitors get the static page and native scrolling.
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const { random } = gsap.utils;

// Letters drop in like stickers being slapped down.
function dropChars(el: Element, aria: 'auto' | 'none') {
  const split = SplitText.create(el, { type: 'chars', aria });
  return gsap.from(split.chars, {
    yPercent: 70,
    scale: 0.6,
    opacity: 0,
    rotation: () => random(-28, 28),
    duration: 0.8,
    ease: 'back.out(1.8)',
    stagger: 0.04,
  });
}

// Ribbon paths carry pathLength=1, so a dash of 1 is the whole tube. Dash tweens need autoRound off,
// or GSAP snaps these fractions of a pixel to 0 or 1.
function drawRibbon(poster: Element) {
  const paths = poster.querySelectorAll('.ribbon path:not(.glint)');
  if (!paths.length) return null;
  return gsap.fromTo(
    paths,
    { strokeDasharray: 1, strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', autoRound: false },
  );
}

function popStickers(poster: Element) {
  const stickers = poster.querySelectorAll('.sticker');
  if (!stickers.length) return null;
  return gsap.from(stickers, {
    scale: 0,
    rotation: () => random(-90, 90),
    duration: 0.7,
    ease: 'back.out(2.4)',
    stagger: 0.12,
  });
}

// Idle loops: every sticker bobs, then does its own thing. Tweens target the inner artwork
// so they never fight the pop-in and parallax tweens on the outer <svg>.
function idleSticker(sticker: SVGSVGElement): gsap.core.Animation[] {
  const art = sticker.querySelector('g');
  if (!art) return [];
  const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;
  const tweens: gsap.core.Animation[] = [
    gsap.to(art, { y: random(-7, -4), duration: random(1.6, 2.4), delay: random(0, 1), ...loop }),
  ];

  switch (sticker.dataset.kind) {
    case 'rocket':
      tweens.push(
        gsap.to(art, { rotation: 5, duration: 1.3, transformOrigin: '50% 60%', ...loop }),
        gsap.to(art.querySelector('.flame'), {
          scaleY: () => random(0.55, 1.25),
          transformOrigin: '50% 0%',
          duration: 0.09,
          repeat: -1,
          repeatRefresh: true,
          ease: 'none',
        }),
      );
      break;
    case 'coin':
      // A full spin every few seconds: flip to the back, then on round to the front.
      tweens.push(
        gsap
          .timeline({ repeat: -1, repeatDelay: random(2, 3.5) })
          .to(art, { scaleX: -1, duration: 0.45, ease: 'power2.in', transformOrigin: '50% 50%' })
          .to(art, { scaleX: 1, duration: 0.45, ease: 'power2.out' }),
      );
      break;
    case 'check': {
      const tick = art.querySelector('.tick');
      tweens.push(gsap.to(art, { rotation: 6, duration: 1.8, transformOrigin: '50% 50%', ...loop }));
      if (tick) {
        gsap.set(tick, { strokeDasharray: 1 });
        tweens.push(
          gsap
            .timeline({ repeat: -1, repeatDelay: 3 })
            .fromTo(tick, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', autoRound: false }),
        );
      }
      break;
    }
    case 'wallet':
      tweens.push(
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.8 })
          .to(art.querySelector('.peek'), { y: -10, duration: 0.35, ease: 'back.out(3)' })
          .to(art.querySelector('.peek'), { y: 0, duration: 0.4, ease: 'power2.in' }, '+=0.6'),
      );
      break;
    case 'code':
      tweens.push(gsap.to(art, { rotation: -8, duration: 1.4, transformOrigin: '50% 50%', ...loop }));
      break;
    case 'sparkle':
      tweens.push(
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.8 })
          .to(art, { scale: 1.25, rotation: '+=45', duration: 0.4, ease: 'power2.out', transformOrigin: '50% 50%' })
          .to(art, { scale: 1, rotation: '+=45', duration: 0.5, ease: 'power2.in' }),
      );
      break;
    case 'bolt':
      // A quick zap: a few sharp jolts, then rest.
      tweens.push(
        gsap
          .timeline({ repeat: -1, repeatDelay: 2.2 })
          .to(art, { x: () => random(-5, 5), rotation: () => random(-10, 10), duration: 0.05, repeat: 7, yoyo: true, transformOrigin: '50% 50%' })
          .to(art, { x: 0, rotation: 0, duration: 0.1 }),
      );
      break;
  }
  return tweens;
}

// Ribbons float gently and a glint of light travels along the tube.
function idleRibbon(ribbon: SVGSVGElement): gsap.core.Animation[] {
  const tweens: gsap.core.Animation[] = [
    gsap.to(ribbon, { y: -8, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' }),
  ];
  const glint = ribbon.querySelector('.glint');
  if (glint) {
    tweens.push(gsap.fromTo(glint, { strokeDashoffset: 0.1 }, { strokeDashoffset: -0.95, duration: 3.5, repeat: -1, repeatDelay: 1.5, ease: 'power1.inOut', autoRound: false }));
  }
  return tweens;
}

// Loops only run while their section is on screen.
function whileVisible(el: Element, tweens: gsap.core.Animation[]) {
  tweens.forEach((t) => t.pause());
  ScrollTrigger.create({
    trigger: el.closest('.band') ?? el,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: ({ isActive }) => tweens.forEach((t) => (isActive ? t.resume() : t.pause())),
  });
}

export function useMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Smooth scroll, driven by GSAP's clock so ScrollTrigger reads the same scroll position.
      // Anchor links glide to their section; Lenis honours scroll-padding-top for the sticky nav.
      const lenis = new Lenis({ anchors: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Marquee: GSAP takes over from the CSS loop and speeds up while the page scrolls.
      const track = document.querySelector('.marquee-track');
      if (track) {
        gsap.set(track, { animation: 'none' });
        const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
        lenis.on('scroll', ({ velocity }: Lenis) => {
          gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(velocity) / 3, 8), duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.3, ease: 'power2.out' });
        });
      }

      // Hero intro on load.
      const hero = document.querySelector('.hero .poster');
      const intro = gsap.timeline();
      intro.from('.nav .logo, .nav .pill, .nav-end > *', {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.05,
      });
      if (hero) {
        const name = hero.querySelector('[data-split]');
        const ribbon = drawRibbon(hero);
        const stickers = popStickers(hero);
        if (ribbon) intro.add(ribbon, 0.1);
        if (name) intro.add(dropChars(name, 'none'), 0.2);
        if (stickers) intro.add(stickers, 0.8);
      }
      intro.from(
        '.hero .label, .hero .tagline, .hero .cta',
        { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
        0.7,
      );

      // Stats count up from zero; the real value is kept so a revert can put it back.
      const stats = gsap.utils.toArray<HTMLElement>('.stats dt');
      stats.forEach((dt, i) => {
        dt.dataset.value ??= dt.textContent ?? '';
        const match = dt.dataset.value.match(/^(\d+)(.*)$/);
        if (!match) return;
        const counter = { n: 0 };
        intro.to(
          counter,
          {
            n: Number(match[1]),
            duration: 1.6,
            ease: 'power3.out',
            snap: { n: 1 },
            onUpdate: () => {
              dt.textContent = `${counter.n}${match[2]}`;
            },
          },
          1 + i * 0.1,
        );
      });

      // Section headings: draw the ribbon, drop the letters, pop the stickers as each one scrolls in.
      gsap.utils.toArray<Element>('.band:not(.hero) .poster').forEach((poster) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: poster, start: 'top 80%', once: true } });
        const ribbon = drawRibbon(poster);
        const stickers = popStickers(poster);
        const title = poster.querySelector('[data-split]');
        if (ribbon) tl.add(ribbon, 0);
        if (title) tl.add(dropChars(title, 'auto'), 0.1);
        if (stickers) tl.add(stickers, 0.5);
      });

      // Stickers drift against the scroll, each at its own pace.
      gsap.utils.toArray<Element>('.sticker').forEach((sticker) => {
        gsap.to(sticker, {
          yPercent: random(-90, -30),
          ease: 'none',
          scrollTrigger: { trigger: sticker.closest('.band'), start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // Idle loops for the graphics.
      gsap.utils.toArray<SVGSVGElement>('.sticker').forEach((sticker) => whileVisible(sticker, idleSticker(sticker)));
      gsap.utils.toArray<SVGSVGElement>('.ribbon').forEach((ribbon) => whileVisible(ribbon, idleRibbon(ribbon)));

      // Supporting copy rises in.
      gsap.utils.toArray<Element>('.band:not(.hero) :is(.tagline, .cta, .note, .arch figcaption)').forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      // Cards tumble into place in batches as they reach the viewport.
      const cards = gsap.utils.toArray<Element>(
        '.stats .card, .node, .product, .caps .card, .repo, .timeline li, .gh-card',
      );
      gsap.set(cards, { y: 80, opacity: 0, rotation: () => random(-6, 6) });
      ScrollTrigger.batch(cards, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.08, overwrite: true }),
      });

      // Bowlby One changes heading heights once it loads; re-measure the triggers.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        stats.forEach((dt) => {
          if (dt.dataset.value) dt.textContent = dt.dataset.value;
        });
      };
    });
  });
}
