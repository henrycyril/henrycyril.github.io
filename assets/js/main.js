document.addEventListener('DOMContentLoaded', () => {
  const yearNodes = document.querySelectorAll('[data-year]');
  const currentYear = new Date().getFullYear();

  yearNodes.forEach((node) => {
    node.textContent = currentYear;
  });

  const headers = document.querySelectorAll('.site-header');

  headers.forEach((header) => {
    const siteNav = header.querySelector('.site-nav');
    const navLinks = header.querySelector('.nav-links');

    if (!siteNav || !navLinks) {
      return;
    }

    const toggleButton = document.createElement('button');
    toggleButton.className = 'nav-toggle';
    toggleButton.type = 'button';
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-controls', `site-nav-${header.dataset.instance || 'menu'}`);
    toggleButton.textContent = 'Menu';

    const navId = toggleButton.getAttribute('aria-controls');
    navLinks.id = navId;

    siteNav.insertBefore(toggleButton, navLinks);

    const setMenuState = (isOpen) => {
      navLinks.classList.toggle('is-open', isOpen);
      toggleButton.setAttribute('aria-expanded', String(isOpen));
    };

    toggleButton.addEventListener('click', () => {
      const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 720) {
          setMenuState(false);
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 720) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setMenuState(false);
      }
    });
  });
});
