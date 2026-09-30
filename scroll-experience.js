(() => {
  const $ = (s, c = document) => [...c.querySelectorAll(s)];
  const nav = document.getElementById("nav"), links = document.getElementById("links"), burger = document.getElementById("burger");
  const setMenu = o => { links.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : ""; };
  burger.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  links.addEventListener("click", () => setMenu(false));
  addEventListener("scroll", () => nav.classList.toggle("solid", scrollY > 60), { passive: true });


  /* Registration countdown (opens 9 Oct 2026, 00:00 IST) */
  const target = new Date("2026-10-09T00:00:00+05:30").getTime(), cd = document.getElementById("cd"), cdmsg = document.getElementById("cdmsg");
  const pad = n => String(n).padStart(2, "0"), setT = (id, v) => { const e = document.getElementById(id); if (e.textContent !== v) e.textContent = v; };
  const tick = () => {
    const d = target - Date.now();
    if (d <= 0) { cd.hidden = true; cdmsg.hidden = false; clearInterval(iv); return; }
    setT("cdD", pad(Math.floor(d / 864e5))); setT("cdH", pad(Math.floor(d % 864e5 / 36e5)));
    setT("cdM", pad(Math.floor(d % 36e5 / 6e4))); setT("cdS", pad(Math.floor(d % 6e4 / 1e3)));
  };
  const iv = setInterval(tick, 1000); tick();

  /* Committee detail view */
  const C = [
    ["UNSC", "United Nations Security Council", "The UN body with primary responsibility for international peace and security. Delegates negotiate resolutions on conflicts and threats, with the five permanent members holding veto power."],
    ["UNHRC", "United Nations Human Rights Council", "The intergovernmental body of 47 member states that promotes and protects human rights worldwide. Delegates debate violations, accountability and the protections states owe their people."],
    ["UNODC", "United Nations Office on Drugs and Crime", "The UN office that works against illicit drugs, organised crime, corruption and terrorism. Delegates craft cooperative responses to transnational crime and strengthen justice systems."],
    ["AIPPM", "All India Political Parties Meet", "A domestic committee where delegates represent India's political parties. Expect sharp debate, coalition-building and negotiation over national issues."],
    ["UNW", "UN Women", "The UN entity dedicated to gender equality and the empowerment of women. Delegates work on policy that advances rights, safety and opportunity."],
    ["IPLA", "IPL Auction", "A simulated IPL auction. Delegates take on franchise roles, strategise, bid and negotiate to build the strongest squad."]
  ];
  const dt = document.getElementById("detail"), $id = id => document.getElementById(id);
  let idx = 0, opener = null;
  const fill = i => {
    idx = (i + C.length) % C.length;
    $id("dNum").textContent = pad(idx + 1) + " / " + pad(C.length);
    $id("dAcr").textContent = C[idx][0]; $id("dName").textContent = C[idx][1]; $id("dDesc").textContent = C[idx][2];
  };
  const anim = () => window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches &&
    gsap.fromTo(dt.querySelectorAll(".dx"), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .08, ease: "power3.out", delay: .3, overwrite: true });
  const openD = (i, from) => { opener = from; fill(i); dt.classList.add("open"); dt.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; dt.scrollTop = 0; anim(); setTimeout(() => $id("dClose").focus(), 500); };
  const closeD = () => { dt.classList.remove("open"); dt.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; opener && opener.focus(); };
  $(".arena").forEach(b => b.addEventListener("click", () => openD(+b.dataset.c, b)));
  $id("dClose").addEventListener("click", closeD);
  $id("dNext").addEventListener("click", () => { fill(idx + 1); anim(); });
  $id("dPrev").addEventListener("click", () => { fill(idx - 1); anim(); });
  addEventListener("keydown", e => { if (!dt.classList.contains("open")) return; if (e.key === "Escape") closeD(); if (e.key === "ArrowRight") { fill(idx + 1); anim(); } if (e.key === "ArrowLeft") { fill(idx - 1); anim(); } });

  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  const mobile = innerWidth < 768;
  const st = (trigger, start = "top 82%", extra = {}) => ({ trigger, start, toggleActions: "play none none reverse", ...extra });

  /* 1. Hero entrance */
  const L = $(".hero .l");
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .from(".pillars i", { scaleY: 0, transformOrigin: "top", duration: 1.6, stagger: .12 }, 0)
    .from(".ring", { scale: .6, opacity: 0, duration: 2.2 }, .2)
    .from(L, { yPercent: 110, opacity: 0, filter: "blur(14px)", duration: 1.6, stagger: .09 }, .3)
    .from(".yr i", { x: 120, opacity: 0, duration: 1.6 }, .9)
    .from(".tag, .meta", { y: 24, opacity: 0, duration: 1.2, stagger: .15 }, 1.3);

  /* 2. Scroll-driven hero transformation: letters separate, hero compresses under the next scene */
  gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: ".hero-wrap", start: "top top", end: "+=100%", scrub: 1 } })
    .to(L, { x: i => (i - 2.5) * (mobile ? 14 : 46), ease: "power1.in" }, 0)
    .to(".yr", { x: mobile ? 30 : 160, y: -30 }, 0)
    .to(".hero h1", { scale: .82, filter: "blur(6px)", opacity: .25 }, 0)
    .to(".tag, .meta", { y: -40, opacity: 0 }, 0)
    .to(".ring", { scale: 1.5, x: -80 }, 0)
    .to(".pillars", { opacity: .3 }, 0);

  /* 3. Headings: masked line reveals + velocity skew */
  $(".mask").forEach(m => gsap.from($(":scope > span", m), { yPercent: 115, duration: 1.3, ease: "power4.out", stagger: .14, scrollTrigger: st(m) }));
  $(".about .fade").forEach((p, i) => gsap.from(p, { y: 40, opacity: 0, filter: "blur(8px)", duration: 1.2, ease: "power3.out", delay: i * .08, scrollTrigger: st(p, "top 88%") }));
  gsap.from(".about .split", { xPercent: -6, scrollTrigger: { trigger: ".about", start: "top bottom", end: "top 20%", scrub: 1 } });
  const skew = gsap.quickTo(".skew", "skewY", { duration: .5, ease: "power3.out" });
  let t; ScrollTrigger.create({ onUpdate: s => { skew(gsap.utils.clamp(-4, 4, s.getVelocity() / -450)); clearTimeout(t); t = setTimeout(() => skew(0), 120); } });

  /* 4. Conference blocks — each different */
  const cs = { trigger: ".cgrid", start: "top 78%", toggleActions: "play none none reverse" };
  gsap.from(".b1", { xPercent: -25, opacity: 0, duration: 1.4, ease: "power4.out", scrollTrigger: cs });
  gsap.from(".b2", { clipPath: "inset(0 100% 0 0)", duration: 1.4, ease: "power4.inOut", scrollTrigger: cs });
  gsap.from(".b3", { scale: .85, opacity: 0, duration: 1.4, ease: "power3.out", scrollTrigger: cs });
  gsap.from(".b4", { yPercent: 30, opacity: 0, filter: "blur(10px)", duration: 1.4, ease: "power4.out", scrollTrigger: cs });
  const cnt = (id, trig) => { const el = document.getElementById(id), o = { v: 0 }; gsap.to(o, { v: +el.dataset.to, duration: 2.2, ease: "power3.out", onUpdate: () => el.textContent = Math.round(o.v), scrollTrigger: { trigger: trig, start: "top 80%", once: true } }); };
  cnt("fee", ".b3"); cnt("fee2", ".rgrid");

  /* 5. Committees + EB + team staggers */
  const stag = (sel, grid, extra = {}) => gsap.from(sel, { y: 110, opacity: 0, clipPath: "inset(0 0 100% 0)", duration: 1.3, ease: "power4.out", stagger: .12, scrollTrigger: st(grid, "top 80%"), ...extra });
  stag(".arena", ".agrid"); stag(".chair", ".egrid");
  $(".tgrid").forEach(g => gsap.from($(".person", g), { y: 140, opacity: 0, rotate: 1.5, duration: 1.4, ease: "power4.out", stagger: .16, scrollTrigger: st(g, "top 82%") }));
  $(".person .ph b").forEach(b => gsap.fromTo(b, { yPercent: -18 }, { yPercent: 18, ease: "none", scrollTrigger: { trigger: b.closest(".person"), start: "top bottom", end: "bottom top", scrub: true } }));
  $(".grp span").forEach(s => gsap.from(s, { xPercent: -30, opacity: 0, letterSpacing: "0.2em", duration: 1.6, ease: "power4.out", scrollTrigger: st(s, "top 88%") }));

  /* 6. Experience: rows drift sideways against scroll */
  $(".step").forEach(s => gsap.fromTo(s, { x: s.dataset.dir * 12 + "vw" }, { x: s.dataset.dir * -12 + "vw", ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: 1 } }));

  /* 7. Partner, registration, contact, footer */
  gsap.from(".pbox", { clipPath: "inset(0 50% 0 50%)", duration: 1.6, ease: "power4.inOut", scrollTrigger: st(".pbox", "top 85%") });
  gsap.from(".rd b", { x: 180, opacity: 0, duration: 1.4, ease: "power4.out", scrollTrigger: st(".rgrid", "top 80%") });
  gsap.from(".rf b", { scale: .4, opacity: 0, transformOrigin: "left center", duration: 1.6, ease: "expo.out", scrollTrigger: st(".rgrid", "top 80%") });
  gsap.from(".btn", { y: 60, opacity: 0, duration: 1, ease: "power3.out", stagger: .12, scrollTrigger: st(".btns", "top 92%") });
  gsap.from(".contact a", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out", stagger: .15, scrollTrigger: st(".contact", "top 88%") });
  gsap.from(".foot > div", { y: 60, opacity: 0, duration: 1.2, ease: "power3.out", stagger: .15, scrollTrigger: st("#foot", "top 95%") });

  /* 8. Scroll progress + scene counter */
  const scenes = $("[data-scene]"), cur = document.getElementById("pcur");
  scenes.forEach((s, i) => ScrollTrigger.create({ trigger: s, start: "top 50%", end: "bottom 50%", onToggle: self => self.isActive && (cur.textContent = String(i + 1).padStart(2, "0")) }));
  gsap.to("#pfill", { scaleY: 1, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: .3 } });

  addEventListener("load", () => setTimeout(() => ScrollTrigger.refresh(), 300));
})();
