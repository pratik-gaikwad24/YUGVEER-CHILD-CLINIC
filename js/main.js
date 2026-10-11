/* ==========================================================
   Yugveer Child Clinic — shared behaviour & animation
   Needs: js/config.js (loaded first). GSAP / ScrollTrigger / Lenis
   are optional — the site still works if a CDN fails.
   ========================================================== */
(function () {
  "use strict";

  const S = window.SITE || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined";
  const page = document.body.dataset.page || "home";

  /* ---------------- Icons ---------------- */
  const P = {
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    stethoscope: '<path d="M5 3v6a5 5 0 0 0 10 0V3"/><path d="M3 3h4M13 3h4"/><path d="M10 14v2a5 5 0 0 0 10 0v-3"/><circle cx="20" cy="11" r="2"/>',
    droplet: '<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.3 0z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    pill: '<path d="M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z"/><path d="M8.5 8.5l7 7"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
    map: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    award: '<circle cx="12" cy="8" r="7"/><path d="M8.2 13.9L7 23l5-3 5 3-1.2-9.1"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14l2 2 4-4"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.2-6"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.5 8.5 0 1 1 21 11.5z"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h3l1-3 2 6 1-3h3"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M15 18l-6-6 6-6"/>',
    right: '<path d="M9 18l6-6-6-6"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    youtube: '<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2C5.1 20 12 20 12 20s6.9 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><path d="M9.8 15.5l5.7-3.5-5.7-3.5z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>'
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
  const WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.4-1.7A11.8 11.8 0 0 0 12 23.7 11.8 11.8 0 0 0 20.5 3.5z"/></svg>';

  const tel = "tel:" + String(S.phone || "").replace(/[^\d+]/g, "");
  const wa = (msg) => "https://wa.me/" + (S.whatsapp || "") + (msg ? "?text=" + encodeURIComponent(msg) : "");

  /* ---------------- Layout: header, menu, footer, widgets ---------------- */
  const LINKS = [
    ["index.html", "Home", "home"],
    ["about.html", "About", "about"],
    ["services.html", "Services", "services"],
    ["gallery.html", "Gallery", "gallery"],
    ["contact.html", "Contact", "contact"]
  ];
  const navLinks = LINKS.map(([h, t, k]) => `<a href="${h}"${k === page ? ' class="is-active" aria-current="page"' : ""}>${t}</a>`).join("");
  const logo = (sub) => `<a href="index.html" class="logo" aria-label="${S.clinicName} home"><img class="logo__img" src="images/logo.png" alt="" width="52" height="52"><span class="logo__text"><strong>${S.clinicName}</strong><small>${sub}</small></span></a>`;

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="preloader" aria-hidden="true"><div class="preloader__inner">
      <svg viewBox="0 0 400 90"><path d="M0 45 H120 L140 45 L155 15 L172 80 L190 5 L205 60 L215 45 H400"/></svg>
      <img class="preloader__logo" src="images/logo.png" alt=""><div class="preloader__name">${S.clinicName}</div><div class="preloader__count">LOADING <span>0</span>%</div>
    </div></div>
    <div class="curtain" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
    <div class="cursor" aria-hidden="true"></div>
    <header class="header"><div class="wrap">
      ${logo(S.doctorName + " · " + S.degrees)}
      <nav class="nav" aria-label="Main">${navLinks}</nav>
      <div class="header__cta">
        <a class="btn btn--ghost" href="${tel}">${icon("phone")}<span data-c="phone">${S.phone}</span></a>
        <a class="btn btn--teal magnetic" href="contact.html#appointment">Book visit ${icon("arrow")}</a>
        <button class="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div></header>
    <div class="mobile-menu" aria-hidden="true">
      <nav aria-label="Mobile">${navLinks}</nav>
      <div class="mobile-menu__foot">
        <p>Call the clinic<br><a href="${tel}">${S.phone}</a></p>
        <p>${S.address}</p>
      </div>
    </div>`);

  const hours = (S.timings || []).map(t => `<li><strong style="color:#fff">${t.day}</strong><br>${t.time}</li>`).join("");
  const socials = Object.entries(S.social || {}).filter(([, v]) => v).map(([k, v]) => `<a href="${v}" aria-label="${k}" target="_blank" rel="noopener">${icon(k)}</a>`).join("");
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer"><div class="wrap">
      <h2 class="footer__big" data-reveal>Little lives deserve <a href="contact.html#appointment">big care.</a></h2>
      <div class="footer__grid">
        <div>${logo(S.tagline)}<p style="margin-top:20px;max-width:36ch">${S.doctorName}, ${S.degrees}. Caring for newborns, children and teenagers in Moshi, Pune since ${S.since}.</p><div class="socials">${socials}</div></div>
        <div><h5>Explore</h5><ul>${LINKS.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
        <div><h5>Clinic hours</h5><ul>${hours}</ul></div>
        <div><h5>Reach us</h5><ul>
          <li><a href="${tel}">${S.phone}</a></li>
          <li><a href="mailto:${S.email}">${S.email}</a></li>
          <li>${S.address}</li>
        </ul></div>
      </div>
      <div class="footer__bottom"><span>© ${new Date().getFullYear()} ${S.clinicName}. All rights reserved.</span><span>Information on this site is not a substitute for a medical consultation.</span></div>
    </div></footer>
    <a class="fab-wa" href="${wa("Hello " + S.doctorName + ", I would like to book an appointment.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA_SVG}</a>
    <button class="to-top" aria-label="Back to top"><svg class="ring-p" viewBox="0 0 46 46"><circle cx="23" cy="23" r="22"/></svg><svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${P.up}</svg></button>`);

  /* ---------------- Fill config values & icons ---------------- */
  $$("[data-c]").forEach(el => {
    const v = S[el.dataset.c];
    if (v !== undefined && el.dataset.count === undefined) el.textContent = v;
  });
  $$("[data-href]").forEach(el => {
    const k = el.dataset.href;
    if (k === "tel") el.href = tel;
    else if (k === "mail") el.href = "mailto:" + S.email;
    else if (k === "wa") el.href = wa("Hello " + S.doctorName + ", I would like to book an appointment.");
    else if (k === "map") el.href = S.mapLink || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.mapQuery || S.address);
    else if (k === "review") el.href = S.reviewLink || S.mapLink;
  });
  $$("[data-icon]").forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  $$("[data-timings]").forEach(el => {
    el.innerHTML = (S.timings || []).map(t => `<div class="hours__row"><strong>${t.day}</strong><span>${t.time}</span></div>`).join("");
  });
  const mapFrame = $("[data-map]");
  if (mapFrame) mapFrame.src = "https://maps.google.com/maps?q=" + encodeURIComponent(S.mapQuery || S.address) + "&z=15&output=embed";

  /* ---------------- Mobile menu ---------------- */
  const burger = $(".burger"), mm = $(".mobile-menu");
  function setMenu(open) {
    document.documentElement.classList.toggle("menu-open", open);
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mm.setAttribute("aria-hidden", !open);
    if (lenis) open ? lenis.stop() : lenis.start();
  }
  burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  document.addEventListener("keydown", e => { if (e.key === "Escape") { setMenu(false); closeLb && closeLb(); } });

  /* ---------------- Smooth scroll (Lenis) ---------------- */
  let lenis = null;
  if (!reduced && typeof window.Lenis !== "undefined") {
    lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    if (hasGsap && window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  const scrollTo = (y) => lenis ? lenis.scrollTo(y) : window.scrollTo({ top: typeof y === "number" ? y : y.offsetTop, behavior: "smooth" });

  /* ---------------- Header hide/show + back-to-top ring ---------------- */
  const header = $(".header"), toTop = $(".to-top"), ringC = $(".to-top circle");
  let lastY = 0;
  function onScroll() {
    const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle("is-scrolled", y > 30);
    header.classList.toggle("is-hidden", y > 400 && y > lastY && !document.body.classList.contains("menu-open"));
    toTop.classList.toggle("is-on", y > 600);
    ringC.style.strokeDashoffset = 138 - 138 * (max > 0 ? y / max : 0);
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => scrollTo(0));

  /* ---------------- Page transitions ---------------- */
  const curtainBars = $$(".curtain span");
  $$("a[href]").forEach(a => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || a.target === "_blank" || /^(tel:|mailto:|https?:)/.test(href)) return;
    a.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      const samePage = href.split("#")[0] === location.pathname.split("/").pop() || (href.split("#")[0] === "index.html" && /\/$/.test(location.pathname));
      if (samePage && href.includes("#")) {
        const t = $("#" + href.split("#")[1]);
        if (t) { e.preventDefault(); setMenu(false); scrollTo(t); return; }
      }
      if (!hasGsap || reduced) return;
      e.preventDefault();
      setMenu(false);
      gsap.to(curtainBars, { scaleY: 1, transformOrigin: "bottom", duration: .55, ease: "power4.inOut", stagger: .05, onComplete: () => { location.href = href; } });
    });
  });
  // bfcache: make sure the curtain is open when coming back
  window.addEventListener("pageshow", e => { if (e.persisted && hasGsap) gsap.set(curtainBars, { scaleY: 0 }); });

  /* ---------------- FAQ ---------------- */
  $$(".faq__item").forEach(item => {
    const q = $(".faq__q", item);
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", () => {
      const open = !item.classList.contains("is-open");
      $$(".faq__item.is-open", item.parentElement).forEach(o => { o.classList.remove("is-open"); $(".faq__q", o).setAttribute("aria-expanded", "false"); });
      item.classList.toggle("is-open", open);
      q.setAttribute("aria-expanded", open);
      setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 550);
    });
  });

  /* ---------------- Testimonials ---------------- */
  const testi = $(".testi");
  if (testi) {
    const slides = $$(".testi__slide", testi), nav = $(".testi__nav", testi);
    let i = 0, timer;
    nav.innerHTML = slides.map((_, n) => `<button class="testi__dot" aria-label="Show review ${n + 1}"></button>`).join("");
    const dots = $$(".testi__dot", nav);
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); };
    dots.forEach((d, k) => d.addEventListener("click", () => { go(k); auto(); }));
    go(0); auto();
  }

  /* ---------------- Gallery filter + lightbox ---------------- */
  let closeLb = null;
  const masonry = $(".masonry");
  if (masonry) {
    const figs = $$("figure", masonry);
    $$(".filter").forEach(btn => btn.addEventListener("click", () => {
      $$(".filter").forEach(b => b.classList.toggle("is-active", b === btn));
      const f = btn.dataset.filter;
      figs.forEach(fig => {
        const show = f === "all" || fig.dataset.cat === f;
        if (hasGsap && !reduced) {
          if (show && fig.classList.contains("is-hidden")) { fig.classList.remove("is-hidden"); gsap.fromTo(fig, { opacity: 0, scale: .9 }, { opacity: 1, scale: 1, duration: .6, ease: "power3.out" }); }
          else if (!show) fig.classList.add("is-hidden");
        } else fig.classList.toggle("is-hidden", !show);
      });
      window.ScrollTrigger && ScrollTrigger.refresh();
    }));

    document.body.insertAdjacentHTML("beforeend", `<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button class="lb-btn lb-close" aria-label="Close">${icon("x")}</button>
      <button class="lb-btn lb-prev" aria-label="Previous">${icon("left")}</button>
      <div><img alt=""><div class="lightbox__cap"></div></div>
      <button class="lb-btn lb-next" aria-label="Next">${icon("right")}</button></div>`);
    const lb = $(".lightbox"), lbImg = $("img", lb), lbCap = $(".lightbox__cap", lb);
    let cur = 0;
    const visible = () => figs.filter(f => !f.classList.contains("is-hidden"));
    const show = (n) => {
      const v = visible(); cur = (n + v.length) % v.length;
      const img = $("img", v[cur]);
      lbImg.src = img.src; lbImg.alt = img.alt;
      lbCap.textContent = ($("figcaption strong", v[cur]) || {}).textContent || img.alt;
    };
    figs.forEach(fig => {
      fig.tabIndex = 0;
      const open = () => { show(visible().indexOf(fig)); lb.classList.add("is-open"); lenis && lenis.stop(); $(".lb-close", lb).focus(); };
      fig.addEventListener("click", open);
      fig.addEventListener("keydown", e => { if (e.key === "Enter") open(); });
    });
    closeLb = () => { if (lb.classList.contains("is-open")) { lb.classList.remove("is-open"); lenis && lenis.start(); } };
    $(".lb-close", lb).addEventListener("click", closeLb);
    $(".lb-prev", lb).addEventListener("click", () => show(cur - 1));
    $(".lb-next", lb).addEventListener("click", () => show(cur + 1));
    lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", e => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  /* ---------------- Appointment form → WhatsApp ---------------- */
  const form = $("#appointment-form");
  if (form) {
    const dateIn = form.elements.date;
    if (dateIn) dateIn.min = new Date().toISOString().slice(0, 10);
    form.addEventListener("submit", e => {
      e.preventDefault();
      let ok = true;
      $$("[required]", form).forEach(f => {
        const bad = !f.value.trim() || (f.name === "phone" && f.value.replace(/\D/g, "").length < 10);
        f.closest(".field").classList.toggle("has-error", bad);
        if (bad) ok = false;
      });
      if (!ok) { const first = $(".has-error input, .has-error select", form); first && first.focus(); return; }
      const d = Object.fromEntries(new FormData(form));
      const msg = `Hello ${S.doctorName},\nI would like to book an appointment at ${S.clinicName}.\n\nParent's name: ${d.name}\nPhone: ${d.phone}\nChild's name: ${d.child || "-"}\nChild's age: ${d.age || "-"}\nReason: ${d.service}\nPreferred date: ${d.date || "Any"}\nTime: ${d.slot}\n${d.message ? "Note: " + d.message : ""}`;
      window.open(wa(msg), "_blank", "noopener");
      $(".form__ok", form).classList.add("is-on");
      form.reset();
    });
    $$("input, select", form).forEach(f => f.addEventListener("input", () => f.closest(".field").classList.remove("has-error")));
    // preselect service from ?service= in URL
    const q = new URLSearchParams(location.search).get("service");
    if (q && form.elements.service) form.elements.service.value = q;
  }

  /* ---------------- Card spotlight + tilt ---------------- */
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (fine && !reduced) {
    $$(".card").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty("--mx", x + "px"); card.style.setProperty("--my", y + "px");
        card.style.transform = `perspective(900px) rotateX(${(y / r.height - .5) * -6}deg) rotateY(${(x / r.width - .5) * 6}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });

    // magnetic buttons
    $$(".magnetic").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });

    // cursor
    const cur = $(".cursor");
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    window.addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; cur.classList.add("is-on"); }, { passive: true });
    document.addEventListener("mouseleave", () => cur.classList.remove("is-on"));
    (function loop() { cx += (tx - cx) * .2; cy += (ty - cy) * .2; cur.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", e => cur.classList.toggle("is-big", !!e.target.closest("a, button, .masonry figure, .card")));
  }

  /* ---------------- Counters ---------------- */
  function countUp(el) {
    const end = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length, dur = 2000;
    const t0 = performance.now();
    const fmt = (v) => dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-IN");
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(end * e);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  $$("[data-count]").forEach(el => {
    const key = el.dataset.c;
    if (key && S[key] !== undefined) el.dataset.count = S[key];
    el.textContent = (+el.dataset.count).toLocaleString("en-IN");
  });

  /* ==========================================================
     GSAP motion
     ========================================================== */
  const preloader = $(".preloader");
  if (!hasGsap || reduced) {
    if (preloader) preloader.remove();
    document.documentElement.classList.add("no-motion");
    return;
  }

  gsap.registerPlugin(window.ScrollTrigger);

  // Counters on view
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { countUp(en.target); io.unobserve(en.target); }
  }), { threshold: .6 });
  $$("[data-count]").forEach(el => { el.textContent = "0"; io.observe(el); });

  // Split hero headline into word spans
  $$("[data-split]").forEach(h => {
    $$(".line", h).forEach(line => {
      line.innerHTML = line.innerHTML.split(/(\s+|<[^>]+>)/).map(part =>
        /^\s+$/.test(part) || part.startsWith("<") || !part ? part : `<span class="w" style="display:inline-block">${part}</span>`
      ).join("");
    });
  });

  function intro() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from("[data-split] .w", { yPercent: 110, rotate: 4, duration: 1.2, stagger: .06 })
      .from("[data-intro]", { y: 30, opacity: 0, duration: 1, stagger: .1 }, "-=.9")
      .from(".portrait", { clipPath: "inset(100% 0 0 0 round 240px 240px 36px 36px)", duration: 1.5, ease: "expo.inOut" }, 0)
      .from(".portrait img", { scale: 1.4, duration: 1.8, ease: "expo.out" }, .3)
      .from(".ring", { scale: .8, opacity: 0, rotate: -20, duration: 1.4 }, .6)
      .from(".float-card", { scale: .5, opacity: 0, duration: .9, stagger: .15, ease: "back.out(1.8)" }, 1)
      .from(".page-hero .crumbs, .page-hero .eyebrow, .page-hero .lead, .page-hero .btn-row", { y: 30, opacity: 0, duration: 1, stagger: .1 }, .2)
      .from(".page-hero__img", { clipPath: "inset(30% 10% 30% 10% round 36px)", duration: 1.6, ease: "expo.inOut" }, .2)
      .from(".big-word", { xPercent: 20, opacity: 0, duration: 2 }, 0);
    return tl;
  }

  // Preloader on first visit of the session, curtain reveal otherwise
  let seen = false;
  try { seen = sessionStorage.getItem("hc-seen") === "1"; sessionStorage.setItem("hc-seen", "1"); } catch (e) {}
  if (preloader && !seen) {
    gsap.set(curtainBars, { scaleY: 0 });
    const path = $("path", preloader), len = path.getTotalLength(), cnt = $(".preloader__count span", preloader);
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const o = { v: 0 };
    gsap.timeline()
      .to(path, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" })
      .to(o, { v: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => { cnt.textContent = Math.round(o.v); } }, 0)
      .to(".preloader__inner", { y: -30, opacity: 0, duration: .5, ease: "power2.in" }, "+=.15")
      .to(preloader, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut", onComplete: () => preloader.remove() })
      .add(intro(), "-=.6");
  } else {
    if (preloader) preloader.remove();
    gsap.set(curtainBars, { scaleY: 1, transformOrigin: "top" });
    gsap.timeline()
      .to(curtainBars, { scaleY: 0, transformOrigin: "top", duration: .7, ease: "power4.inOut", stagger: .05 })
      .add(intro(), "-=.4");
  }

  // Generic reveals
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    onEnter: els => gsap.from(els, { y: 60, opacity: 0, duration: 1.1, ease: "power3.out", stagger: .12, overwrite: true }),
    once: true
  });
  $$("[data-stagger]").forEach(group => {
    gsap.from(group.children, {
      y: 70, opacity: 0, duration: 1, ease: "power3.out", stagger: .1,
      scrollTrigger: { trigger: group, start: "top 85%", once: true }
    });
  });
  $$(".reveal-img").forEach(el => {
    gsap.from(el, { clipPath: "inset(100% 0 0 0)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
  });

  // Parallax images
  $$("[data-parallax]").forEach(img => {
    gsap.fromTo(img, { yPercent: -10 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });

  // Hero portrait scroll drift
  if ($(".hero__visual")) {
    gsap.to(".hero__visual", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".blob", { yPercent: 40, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }
  if ($(".big-word")) gsap.to(".big-word", { xPercent: -15, ease: "none", scrollTrigger: { trigger: ".page-hero", start: "top top", end: "bottom top", scrub: true } });

  // Highlighted words fill on scroll
  $$("[data-words]").forEach(p => {
    p.innerHTML = p.textContent.split(" ").map(w => `<span style="opacity:.18">${w}</span>`).join(" ");
    gsap.to(p.children, { opacity: 1, stagger: .05, ease: "none", scrollTrigger: { trigger: p, start: "top 80%", end: "bottom 45%", scrub: true } });
  });

  // Horizontal journey (desktop only)
  const mm2 = gsap.matchMedia();
  mm2.add("(min-width: 861px)", () => {
    const track = $(".journey__track");
    if (!track) return;
    gsap.to(track, {
      x: () => -(track.scrollWidth - innerWidth + 80),
      ease: "none",
      scrollTrigger: { trigger: ".journey", start: "top top", end: () => "+=" + (track.scrollWidth - innerWidth), scrub: 1, pin: true, invalidateOnRefresh: true, anticipatePin: 1 }
    });
  });

  // Timeline progress
  const tlLine = $(".timeline__progress");
  if (tlLine) {
    gsap.to(tlLine, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".timeline", start: "top 65%", end: "bottom 65%", scrub: true } });
    $$(".tl-item").forEach((it, k) => gsap.from(it, { x: k % 2 ? 60 : -60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: it, start: "top 82%", once: true } }));
  }

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
