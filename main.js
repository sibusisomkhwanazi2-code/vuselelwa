/* ============================================================
   VUSELELWA — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── NAV SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ── MOBILE MENU ── */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay * 1);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  /* ── CONTACT FORM — mailto fallback + fetch to Formspree ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      const successDiv = document.getElementById('form-success');
      btn.disabled = true;
      btn.innerHTML = '<span>Sending…</span>';

      const fname = document.getElementById('fname').value;
      const lname = document.getElementById('lname').value;
      const email = document.getElementById('email').value;
      const company = document.getElementById('company').value;
      const phone = document.getElementById('phone').value;
      const segment = document.getElementById('segment').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;

      // Build mailto as primary delivery (works without server)
      const subject = encodeURIComponent(`Vuselelwa Enquiry — ${service} — ${company || fname}`);
      const body = encodeURIComponent(
        `New enquiry from the Vuselelwa website:\n\n` +
        `Name: ${fname} ${lname}\n` +
        `Email: ${email}\n` +
        `Company: ${company}\n` +
        `Phone: ${phone}\n` +
        `Segment: ${segment}\n` +
        `Service: ${service}\n\n` +
        `Message:\n${message}`
      );
      const mailtoUrl = `mailto:info@vuselelwa.co.za?subject=${subject}&body=${body}`;

      // Try Formspree first (replace YOUR_FORM_ID with actual Formspree ID once set up)
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/info@vuselelwa.co.za';
      let sent = false;
      try {
        const resp = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ fname, lname, email, company, phone, segment, service, message })
        });
        if (resp.ok) sent = true;
      } catch (err) { /* fall through to mailto */ }

      if (!sent) {
        // Open user's mail client as fallback
        window.location.href = mailtoUrl;
      }

      // Show success state
      form.style.display = 'none';
      successDiv.style.display = 'block';
    });
  }

  /* ── DUPLICATE TICKER ── */
  const track = document.querySelector('.ticker-track');
  if (track) {
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  }

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
  });

});
