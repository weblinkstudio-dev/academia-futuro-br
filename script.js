const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('[data-scroll-target]');
const faqItems = document.querySelectorAll('.faq-item');
const revealSections = document.querySelectorAll('[data-reveal]');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((button) => {
  button.addEventListener('click', () => {
    const targetSelector = button.dataset.scrollTarget;
    const target = document.querySelector(targetSelector);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (mobileMenu && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-button');

  if (!button) return;

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove('open');
    });

    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const isValid = form.checkValidity();

    if (!isValid) {
      form.reportValidity();
      return;
    }

    form.classList.add('hidden');
    formSuccess?.classList.remove('hidden');

    form.reset();

    setTimeout(() => {
      form.classList.remove('hidden');
      formSuccess?.classList.add('hidden');
    }, 3000);
  });
}
