console.log("INFERNO Fashion Night site started");

/* =========================================================
   Небольшие утилиты
   Тут лежит то, что используется в разных местах сайта.
   ========================================================= */

const header = document.querySelector(".header");
const headerHeight = () => (header ? header.offsetHeight : 58);

const hasGSAP = typeof gsap !== "undefined";
const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

/* =========================================================
   Плавный скролл Lenis
   Lenis делает прокрутку мягче. Если библиотека вдруг не подключится,
   сайт всё равно будет работать на обычном скролле браузера.
   ========================================================= */

let lenis = null;

if (typeof Lenis !== "undefined") {
  lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.075,
    wheelMultiplier: 0.8
  });

  if (hasGSAP) {
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }
} else {
  console.warn("Lenis не подключен. Проверь файл libs/lenis/lenis.min.js");
}

/* =========================================================
   Главный hero-слайдер
   Это первые три полноэкранных слайда на главной странице.
   ========================================================= */

if (typeof Swiper !== "undefined" && document.querySelector(".hero-slider")) {
  new Swiper(".hero-slider", {
    loop: true,
    speed: 1000,
    effect: "fade",

    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },

    navigation: {
      nextEl: ".hero-arrow-right",
      prevEl: ".hero-arrow-left"
    },

    pagination: {
      el: ".hero-pagination",
      clickable: true
    }
  });
} else if (document.querySelector(".hero-slider")) {
  console.warn("Swiper не подключен. Проверь файл libs/swiper/swiper-bundle.min.js");
}

/* =========================================================
   Данные для слайдера 9 кругов
   Здесь меняются заголовки, текст, цитаты и ссылки "Узнать подробнее".
   ========================================================= */

const infernoSlides = [
  {
    title: "I. ЛИМБ — Jil Sander",
    url: "circle-1-limb.html",
    text: [
      "Состояние вечного ожидания.",
      "Чистота, лишённая надежды.",
      "Минимализм становится формой пустоты."
    ],
    quote: "«Без муки живут, но без надежды»"
  },
  {
    title: "II. ПОХОТЬ — La Perla",
    url: "circle-2-lust.html",
    text: [
      "Страсть как сила, лишающая контроля.",
      "Тела движутся, подчиняясь желанию."
    ],
    quote: "«Любовь, что в сердце нежном вспыхнет вдруг…»"
  },
  {
    title: "III. ЧРЕВОУГОДИЕ — Balenciaga",
    url: "circle-3-gluttony.html",
    text: [
      "Избыточность как форма распада.",
      "Материя искажается, теряя границы."
    ],
    quote: "«Под вечным дождём они лежат в грязи»"
  },
  {
    title: "IV. ЖАДНОСТЬ — Dolce & Gabbana",
    url: "circle-4-greed.html",
    text: [
      "Стремление к накоплению, доведённое до крайности.",
      "Роскошь превращается в тяжесть."
    ],
    quote: "«Зачем ты держишь? Зачем ты тратишь?»"
  },
  {
    title: "V. ГНЕВ — Rick Owens",
    url: "circle-5-anger.html",
    text: [
      "Энергия разрушения, направленная наружу.",
      "Движение становится агрессивным и резким."
    ],
    quote: "«Они в грязи дерутся, яростно рыча»"
  },
  {
    title: "VI. ЕРЕСЬ — Iris van Herpen",
    url: "circle-6-heresy.html",
    text: [
      "Отказ от общепринятых истин.",
      "Форма выходит за пределы привычного."
    ],
    quote: "«Здесь гробницы горят открытым пламенем»"
  },
  {
    title: "VII. НАСИЛИЕ — Raf Simons",
    url: "circle-7-violence.html",
    text: [
      "Разрушение как действие.",
      "Тело становится инструментом силы."
    ],
    quote: "«Здесь кровь кипит в реке багряной»"
  },
  {
    title: "VIII. ОБМАН — Coperni",
    url: "circle-8-deceit.html",
    text: [
      "Иллюзия и двойственность.",
      "Реальность становится нестабильной."
    ],
    quote: "«Здесь ложь скрыта в тысяче обличий»"
  },
  {
    title: "IX. ПРЕДАТЕЛЬСТВО — Valentino",
    url: "circle-9-betrayal.html",
    text: [
      "Финальная точка. Холод и неподвижность.",
      "Предательство как абсолютная форма разрыва."
    ],
    quote: "«Предатели вмёрзли в ледяную толщу»"
  }
];

/* Обновляем текст справа от видео, когда пользователь листает круги. */
function updateInfernoText(index) {
  const currentSlide = infernoSlides[index];
  if (!currentSlide) return;

  const titleElement = document.querySelector(".inferno-slide-title");
  const textElement = document.querySelector(".inferno-slide-text");
  const quoteElement = document.querySelector(".inferno-slide-quote");
  const counterElement = document.querySelector(".inferno-counter");
  const detailLink = document.querySelector(".more-link");

  if (!titleElement || !textElement || !quoteElement || !counterElement) return;

  titleElement.textContent = currentSlide.title;
  textElement.innerHTML = currentSlide.text.join("<br>");
  quoteElement.textContent = currentSlide.quote;
  counterElement.textContent = `${index + 1}/${infernoSlides.length}`;

  if (detailLink && currentSlide.url) {
    detailLink.setAttribute("href", currentSlide.url);
  }

  if (hasGSAP) {
    gsap.fromTo(
      [titleElement, textElement, quoteElement],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: "power2.out" }
    );
  }
}

/* В активном слайде видео играет, остальные ставим на паузу. */
function playActiveInfernoVideo(swiperInstance) {
  const videos = document.querySelectorAll(".inferno-video");

  videos.forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });

  const activeVideo = swiperInstance.slides[swiperInstance.activeIndex]?.querySelector("video");

  if (activeVideo) {
    activeVideo.play().catch(() => {
      // Иногда браузер блокирует автозапуск. Для сайта это не критично.
    });
  }
}

if (typeof Swiper !== "undefined" && document.querySelector(".inferno-slider")) {
  new Swiper(".inferno-slider", {
    loop: true,
    speed: 650,
    effect: "fade",
    allowTouchMove: true,

    navigation: {
      nextEl: ".inferno-next",
      prevEl: ".inferno-prev"
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    on: {
      init() {
        updateInfernoText(this.realIndex);
        playActiveInfernoVideo(this);
      },
      slideChange() {
        updateInfernoText(this.realIndex);
        playActiveInfernoVideo(this);
      }
    }
  });
}

/* =========================================================
   GSAP-анимации
   Все анимации ниже проверяют наличие нужного блока на странице.
   Поэтому один и тот же main.js можно подключать ко всем HTML-страницам.
   ========================================================= */

if (hasGSAP && hasScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
  }

  gsap.defaults({
    ease: "power3.out",
    duration: 1
  });

  animateHomePage();
  animateAboutPage();
  animateCatalogPage();
  animateCircleDetailPage();
  animateTicketsPage();
  animateErrorPage();
  initFallingStars();

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
} else {
  console.warn("GSAP или ScrollTrigger не подключены. Проверь файлы libs/gsap/");
}

/* Главная страница: hero, карточки, блок INFERNO и футер. */
function animateHomePage() {
  if (document.querySelector(".hero-button")) {
    gsap.from(".hero-button", {
      opacity: 0,
      y: 30,
      scale: 0.96,
      delay: 0.4,
      duration: 1.1
    });
  }

  if (document.querySelector(".hero-arrow")) {
    gsap.from(".hero-arrow", {
      opacity: 0,
      x: 20,
      stagger: 0.15,
      delay: 0.7,
      duration: 0.9
    });
  }

  if (document.querySelector(".about-section")) {
    gsap.from(".about-title-text h1", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 72%",
        once: true
      },
      opacity: 0,
      y: 35
    });

    gsap.from(".about-subtitle", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 70%",
        once: true
      },
      opacity: 0,
      y: 25,
      delay: 0.15
    });

    gsap.from(".about-star", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 68%",
        once: true
      },
      opacity: 0,
      scale: 0.4,
      rotation: -35,
      stagger: 0.12,
      duration: 0.9
    });

    gsap.from(".card", {
      scrollTrigger: {
        trigger: ".cards",
        start: "top 78%",
        once: true
      },
      opacity: 0,
      y: 50,
      scale: 0.94,
      stagger: 0.12,
      duration: 0.9
    });

    gsap.from(".slogan-block", {
      scrollTrigger: {
        trigger: ".slogan-block",
        start: "top 88%",
        once: true
      },
      opacity: 0,
      y: 35,
      duration: 1
    });
  }

  if (document.querySelector(".inferno-one-screen")) {
    gsap.from(".one-screen-top", {
      scrollTrigger: {
        trigger: ".inferno-one-screen",
        start: "top 70%",
        once: true
      },
      opacity: 0,
      y: 35
    });

    gsap.from(".circle-left-image", {
      scrollTrigger: {
        trigger: ".one-screen-middle",
        start: "top 75%",
        once: true
      },
      opacity: 0,
      x: -45,
      rotate: -3,
      duration: 1
    });

    gsap.from(".circle-center", {
      scrollTrigger: {
        trigger: ".one-screen-middle",
        start: "top 75%",
        once: true
      },
      opacity: 0,
      y: 45,
      scale: 0.96,
      duration: 1
    });

    gsap.from(".circle-right", {
      scrollTrigger: {
        trigger: ".one-screen-middle",
        start: "top 75%",
        once: true
      },
      opacity: 0,
      x: 45,
      duration: 1
    });

    gsap.from(".ticket-content", {
      scrollTrigger: {
        trigger: ".one-screen-bottom",
        start: "top 78%",
        once: true
      },
      opacity: 0,
      y: 45,
      scale: 0.96,
      duration: 1
    });

    gsap.from(".bottom-left-decor", {
      scrollTrigger: {
        trigger: ".one-screen-bottom",
        start: "top 82%",
        once: true
      },
      opacity: 0,
      x: -80,
      y: 50,
      duration: 1.1
    });

    gsap.from(".bottom-character-group", {
      scrollTrigger: {
        trigger: ".one-screen-bottom",
        start: "top 82%",
        once: true
      },
      opacity: 0,
      x: 80,
      y: 50,
      duration: 1.1
    });

    gsap.to(".bottom-star-left", {
      rotation: 10,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  animateFooter();
}

/* Футер общий, поэтому анимация работает на всех страницах. */
function animateFooter() {
  if (!document.querySelector(".footer")) return;

  gsap.from(".footer-title", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 78%",
      once: true
    },
    opacity: 0,
    y: 35
  });

  gsap.from(".contact-form input, .contact-form textarea, .form-bottom", {
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 85%",
      once: true
    },
    opacity: 0,
    y: 25,
    stagger: 0.08,
    duration: 0.8
  });

  gsap.from(".footer-video-block", {
    scrollTrigger: {
      trigger: ".footer-video-block",
      start: "top 90%",
      once: true
    },
    opacity: 0,
    y: 30
  });

  gsap.from(".footer-info", {
    scrollTrigger: {
      trigger: ".footer-main",
      start: "top 85%",
      once: true
    },
    opacity: 0,
    y: 35
  });

  gsap.from(".footer-white, .footer-face, .footer-right-images, .footer-star", {
    scrollTrigger: {
      trigger: ".footer-main",
      start: "top 85%",
      once: true
    },
    opacity: 0,
    y: 50,
    stagger: 0.12,
    duration: 1
  });
}

/* Страница "О нас". */
function animateAboutPage() {
  if (!document.querySelector(".about-page .about-figma-section")) return;

  const aboutTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.9
    }
  });

  aboutTimeline
    .from(".about-page .about-figma-head h1", {
      opacity: 0,
      x: -42,
      duration: 0.85
    })
    .from(".about-page .about-figma-star-top", {
      opacity: 0,
      scale: 0.25,
      rotation: -90,
      duration: 0.85
    }, "-=0.55")
    .from(".about-page .about-intro-grid p", {
      opacity: 0,
      y: 28,
      stagger: 0.12,
      duration: 0.8
    }, "-=0.45")
    .from(".about-page .about-preview-image-box", {
      opacity: 0,
      x: 56,
      scale: 0.96,
      duration: 1
    }, "-=0.65")
    .from(".about-page .about-line", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.75
    }, "-=0.45")
    .from(".about-page .about-info-block", {
      opacity: 0,
      y: 35,
      stagger: 0.13,
      duration: 0.8
    }, "-=0.35")
    .from(".about-page .about-space-head h2", {
      opacity: 0,
      x: -45,
      duration: 0.8
    }, "-=0.35")
    .from(".about-page .about-figma-star-space", {
      opacity: 0,
      scale: 0.35,
      rotation: 80,
      duration: 0.8
    }, "-=0.55")
    .from(".about-page .about-space-lead", {
      opacity: 0,
      y: 22,
      duration: 0.75
    }, "-=0.35")
    .from(".about-page .about-space-image-box", {
      opacity: 0,
      y: 42,
      scale: 0.97,
      stagger: 0.14,
      duration: 0.9
    }, "-=0.45")
    .from(".about-page .about-space-description", {
      opacity: 0,
      y: 20,
      duration: 0.75
    }, "-=0.35");

  gsap.to(".about-page .about-figma-star", {
    rotation: "+=14",
    duration: 2.3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

/* Каталог: появление карточек и лёгкий hover на товаре. */
function animateCatalogPage() {
  if (!document.querySelector(".catalog-page .catalog-section")) return;

  const catalogTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.85
    }
  });

  catalogTimeline
    .from(".catalog-page .catalog-title", {
      opacity: 0,
      x: -48,
      duration: 0.85
    })
    .from(".catalog-page .catalog-card", {
      opacity: 0,
      y: 34,
      scale: 0.97,
      stagger: {
        each: 0.09,
        from: "start"
      },
      duration: 0.85
    }, "-=0.35")
    .from(".catalog-page .catalog-image-box", {
      opacity: 0,
      scale: 0.92,
      stagger: 0.08,
      duration: 0.75
    }, "-=0.7")
    .from(".catalog-page .catalog-info h2, .catalog-page .catalog-price, .catalog-page .catalog-description, .catalog-page .catalog-button", {
      opacity: 0,
      y: 14,
      stagger: 0.025,
      duration: 0.55
    }, "-=0.55");

  document.querySelectorAll(".catalog-page .catalog-card").forEach((card) => {
    const image = card.querySelector(".catalog-image");

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -6,
        duration: 0.35,
        ease: "power2.out"
      });

      if (image) {
        gsap.to(image, {
          scale: 1.035,
          duration: 0.45,
          ease: "power2.out"
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.35,
        ease: "power2.out"
      });

      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.45,
          ease: "power2.out"
        });
      }
    });
  });
}

/* Падающие звёзды по краям главной страницы. */
function initFallingStars() {
  const rightStars = gsap.utils.toArray(".falling-stars-scroll:not(.falling-stars-left) .falling-star");
  const leftStars = gsap.utils.toArray(".falling-stars-left .falling-star");

  rightStars.forEach((star, index) => {
    const startY = -180 - index * 110;
    const finishY = window.innerHeight + 240 + index * 80;
    const sideShift = index % 2 === 0 ? -34 : 22;

    gsap.fromTo(
      star,
      {
        y: startY,
        x: 0,
        rotation: index * 24
      },
      {
        y: finishY,
        x: sideShift,
        rotation: 280 + index * 70,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          endTrigger: ".footer",
          end: "top 35%",
          scrub: 1.4
        }
      }
    );
  });

  leftStars.forEach((star, index) => {
    const startY = -200 - index * 100;
    const finishY = window.innerHeight + 260 + index * 70;
    const sideShift = index % 2 === 0 ? 28 : -20;

    gsap.fromTo(
      star,
      {
        y: startY,
        x: 0,
        rotation: -index * 22
      },
      {
        y: finishY,
        x: sideShift,
        rotation: -260 - index * 65,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          endTrigger: ".footer",
          end: "top 35%",
          scrub: 1.4
        }
      }
    );
  });
}

/* Отдельные страницы кругов: circle-1 ... circle-9. */
function animateCircleDetailPage() {
  if (!document.querySelector(".circle-detail-page")) return;

  const detailTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.85
    }
  });

  detailTimeline
    .from(".circle-detail-kicker", {
      opacity: 0,
      y: -18,
      duration: 0.65
    })
    .from(".circle-detail-title", {
      opacity: 0,
      y: 34,
      duration: 0.85
    }, "-=0.35")
    .from(".circle-detail-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.7
    }, "-=0.45")
    .from(".circle-detail-text p", {
      opacity: 0,
      y: 24,
      stagger: 0.08,
      duration: 0.75
    }, "-=0.35")
    .from(".circle-detail-image-box", {
      opacity: 0,
      scale: 0.92,
      rotate: 1.5,
      duration: 0.9
    }, "-=0.75")
    .from(".circle-detail-quote", {
      opacity: 0,
      y: 16,
      duration: 0.7
    }, "-=0.4")
    .from(".circle-detail-nav", {
      opacity: 0,
      y: 18,
      duration: 0.65
    }, "-=0.35");

  gsap.to(".circle-detail-star", {
    rotation: "+=16",
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

/* Плавный переход по якорям внутри текущей страницы. */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();

    const targetSection = target.classList.contains("snap-section")
      ? target
      : target.closest(".snap-section");

    if (!targetSection) return;

    if (lenis) {
      lenis.scrollTo(targetSection, {
        offset: -headerHeight(),
        duration: 1.2
      });
    } else {
      const top = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight();

      window.scrollTo({
        top,
        behavior: "smooth"
      });
    }
  });
});

/* Страница покупки билетов. */
function animateTicketsPage() {
  if (!document.querySelector(".tickets-page .tickets-section")) return;

  const ticketsTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.85
    }
  });

  ticketsTimeline
    .from(".tickets-left-image-box", {
      opacity: 0,
      x: -48,
      scale: 0.94
    })
    .from(".tickets-heading", {
      opacity: 0,
      y: 28
    }, "-=0.55")
    .from(".tickets-flower-box", {
      opacity: 0,
      x: 46,
      scale: 0.7,
      rotation: -18
    }, "-=0.65")
    .from(".tickets-hand-line", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.75
    }, "-=0.45")
    .from(".tickets-amount", {
      opacity: 0,
      y: 18,
      duration: 0.65
    }, "-=0.25")
    .from(".tickets-form-title", {
      opacity: 0,
      y: 18,
      duration: 0.55
    }, "-=0.25")
    .from(".tickets-form label", {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.65
    }, "-=0.25")
    .from(".tickets-submit-row", {
      opacity: 0,
      y: 22,
      duration: 0.65
    }, "-=0.2");

  gsap.to(".tickets-flower-image", {
    rotation: 4,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

/* Страница 404. Смена двух вариантов 404 сделана в CSS через keyframes. */
function animateErrorPage() {
  if (!document.querySelector(".error-page .error-card")) return;

  gsap.from(".error-page .error-card", {
    opacity: 0,
    y: 34,
    scale: 0.97,
    duration: 0.9,
    ease: "power3.out"
  });
}

/* PRELOADER
   Показываем загрузочный экран до полной загрузки страницы.
   Событие window.load срабатывает, когда браузер уже получил картинки,
   видео, стили и скрипты. После этого плавно убираем loader.
*/
function hideSiteLoader() {
  const loader = document.querySelector("#site-loader");

  if (!loader || loader.classList.contains("is-hidden")) return;

  // Небольшая пауза нужна, чтобы loader не мигал слишком резко на быстром интернете.
  setTimeout(() => {
    loader.classList.add("is-hidden");
  }, 450);

  // После анимации убираем блок из потока, чтобы он точно не мешал кликам.
  setTimeout(() => {
    loader.remove();
  }, 1300);
}

if (document.readyState === "complete") {
  hideSiteLoader();
} else {
  window.addEventListener("load", hideSiteLoader, { once: true });
}

// Запасной вариант: если какой-то файл долго не отвечает, сайт всё равно откроется.
setTimeout(hideSiteLoader, 5000);

